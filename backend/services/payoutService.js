/**
 * PayoutService.js — Razorpay Test Mode Payout Integration
 *
 * Features:
 * - Test mode payouts via Razorpay
 * - Bank account validation
 * - Payout tracking and status updates
 * - Instant payout processing
 * - Transaction history
 */

const axios = require('axios');

// Razorpay test credentials (replace with your actual test keys)
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_your_key_id';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'your_test_secret';
const RAZORPAY_BASE_URL = 'https://api.razorpay.com/v1';

// ─── PAYOUT STATE MANAGEMENT ──────────────────────────────────────────────────
let payoutHistory = []; // [{id, workerId, amount, status, razorpayId, createdAt, processedAt}]
let payoutStats = {
  totalPayouts: 0,
  totalAmount: 0,
  pendingPayouts: 0,
  failedPayouts: 0,
  averageProcessingTime: 0
};

// ──────────────────────────────────────────────────────────────────────────────
// RAZORPAY API HELPERS
// ──────────────────────────────────────────────────────────────────────────────

async function createRazorpayPayout(contactId, fundAccountId, amount, currency = 'INR') {
  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const payoutData = {
      account_number: '2323230032510196', // Razorpay test account
      fund_account_id: fundAccountId,
      amount: amount * 100, // Convert to paisa
      currency,
      mode: 'IMPS',
      purpose: 'payout',
      queue_if_low_balance: true,
      reference_id: `PAYNEST-${Date.now()}`,
      narration: 'PayNest Insurance Payout'
    };

    const response = await axios.post(`${RAZORPAY_BASE_URL}/payouts`, payoutData, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      payoutId: response.data.id,
      status: response.data.status,
      amount: response.data.amount / 100,
      fees: response.data.fees / 100,
      tax: response.data.tax / 100
    };

  } catch (error) {
    console.error('[RAZORPAY] Payout creation failed:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.description || error.message,
      code: error.response?.data?.error?.code
    };
  }
}

async function createContact(name, email, contact = null) {
  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const contactData = {
      name,
      email,
      contact,
      type: 'customer',
      reference_id: `PAYNEST-CONTACT-${Date.now()}`
    };

    const response = await axios.post(`${RAZORPAY_BASE_URL}/contacts`, contactData, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      contactId: response.data.id,
      name: response.data.name,
      email: response.data.email
    };

  } catch (error) {
    console.error('[RAZORPAY] Contact creation failed:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.description || error.message
    };
  }
}

async function createFundAccount(contactId, accountDetails) {
  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const fundAccountData = {
      contact_id: contactId,
      account_type: 'bank_account',
      bank_account: {
        name: accountDetails.name,
        ifsc: accountDetails.ifsc,
        account_number: accountDetails.accountNumber
      }
    };

    const response = await axios.post(`${RAZORPAY_BASE_URL}/fund_accounts`, fundAccountData, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      fundAccountId: response.data.id,
      accountType: response.data.account_type,
      bankAccount: response.data.bank_account
    };

  } catch (error) {
    console.error('[RAZORPAY] Fund account creation failed:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.description || error.message
    };
  }
}

async function getPayoutStatus(payoutId) {
  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const response = await axios.get(`${RAZORPAY_BASE_URL}/payouts/${payoutId}`, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    return {
      success: true,
      status: response.data.status,
      amount: response.data.amount / 100,
      fees: response.data.fees / 100,
      processedAt: response.data.processed_at,
      failureReason: response.data.failure_reason
    };

  } catch (error) {
    console.error('[RAZORPAY] Status check failed:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.description || error.message
    };
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// BANK ACCOUNT VALIDATION
// ──────────────────────────────────────────────────────────────────────────────

function validateBankAccount(accountDetails) {
  const { accountNumber, ifsc, name } = accountDetails;

  // Basic validation rules
  const errors = [];

  // Account number validation (should be 9-18 digits)
  if (!accountNumber || !/^\d{9,18}$/.test(accountNumber)) {
    errors.push('Invalid account number format');
  }

  // IFSC validation (should be 11 characters, first 4 letters, 7th digit)
  if (!ifsc || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
    errors.push('Invalid IFSC code format');
  }

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Account holder name is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN PAYOUT PROCESSING
// ──────────────────────────────────────────────────────────────────────────────

exports.processPayout = async (worker, claim, bankDetails) => {
  const startTime = Date.now();
  const payoutId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  console.log(`[PAYOUT] Processing payout ${payoutId} for worker ${worker.id}, amount ₹${claim.payoutAmount}`);

  try {
    // Step 1: Validate bank account
    const validation = validateBankAccount(bankDetails);
    if (!validation.isValid) {
      throw new Error(`Bank account validation failed: ${validation.errors.join(', ')}`);
    }

    // Step 2: Create Razorpay contact
    const contactResult = await createContact(
      worker.name,
      worker.email,
      worker.phone
    );

    if (!contactResult.success) {
      throw new Error(`Contact creation failed: ${contactResult.error}`);
    }

    // Step 3: Create fund account
    const fundAccountResult = await createFundAccount(contactResult.contactId, {
      name: bankDetails.name,
      ifsc: bankDetails.ifsc,
      accountNumber: bankDetails.accountNumber
    });

    if (!fundAccountResult.success) {
      throw new Error(`Fund account creation failed: ${fundAccountResult.error}`);
    }

    // Step 4: Create payout
    const payoutResult = await createRazorpayPayout(
      contactResult.contactId,
      fundAccountResult.fundAccountId,
      claim.payoutAmount
    );

    if (!payoutResult.success) {
      throw new Error(`Payout creation failed: ${payoutResult.error}`);
    }

    // Step 5: Record payout
    const payoutRecord = {
      id: payoutId,
      workerId: worker.id,
      workerName: worker.name,
      claimId: claim.id,
      amount: claim.payoutAmount,
      status: payoutResult.status,
      razorpayId: payoutResult.payoutId,
      razorpayContactId: contactResult.contactId,
      razorpayFundAccountId: fundAccountResult.fundAccountId,
      bankDetails: {
        name: bankDetails.name,
        accountNumber: `****${bankDetails.accountNumber.slice(-4)}`,
        ifsc: bankDetails.ifsc
      },
      fees: payoutResult.fees,
      tax: payoutResult.tax,
      createdAt: new Date().toISOString(),
      processedAt: null,
      processingTime: Date.now() - startTime,
      failureReason: null
    };

    payoutHistory.unshift(payoutRecord);

    // Update stats
    payoutStats.totalPayouts++;
    payoutStats.totalAmount += claim.payoutAmount;
    if (payoutResult.status === 'pending') {
      payoutStats.pendingPayouts++;
    }

    console.log(`[PAYOUT] Payout ${payoutId} created successfully — Status: ${payoutResult.status}`);

    return {
      success: true,
      payoutId,
      status: payoutResult.status,
      amount: claim.payoutAmount,
      razorpayId: payoutResult.payoutId,
      processingTime: payoutRecord.processingTime,
      message: `Payout initiated successfully. Amount: ₹${claim.payoutAmount}`
    };

  } catch (error) {
    console.error(`[PAYOUT] Payout ${payoutId} failed:`, error.message);

    // Record failed payout
    const failedRecord = {
      id: payoutId,
      workerId: worker.id,
      workerName: worker.name,
      claimId: claim.id,
      amount: claim.payoutAmount,
      status: 'failed',
      razorpayId: null,
      bankDetails: {
        name: bankDetails.name,
        accountNumber: `****${bankDetails.accountNumber.slice(-4)}`,
        ifsc: bankDetails.ifsc
      },
      fees: 0,
      tax: 0,
      createdAt: new Date().toISOString(),
      processedAt: null,
      processingTime: Date.now() - startTime,
      failureReason: error.message
    };

    payoutHistory.unshift(failedRecord);
    payoutStats.failedPayouts++;

    return {
      success: false,
      payoutId,
      error: error.message,
      message: `Payout failed: ${error.message}`
    };
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// PAYOUT STATUS CHECKING
// ──────────────────────────────────────────────────────────────────────────────

exports.checkPayoutStatus = async (payoutId) => {
  const payout = payoutHistory.find(p => p.id === payoutId);
  if (!payout) {
    return { success: false, error: 'Payout not found' };
  }

  if (!payout.razorpayId) {
    return {
      success: true,
      status: payout.status,
      amount: payout.amount,
      failureReason: payout.failureReason
    };
  }

  // Check with Razorpay
  const razorpayStatus = await getPayoutStatus(payout.razorpayId);

  if (razorpayStatus.success) {
    // Update local record
    payout.status = razorpayStatus.status;
    payout.processedAt = razorpayStatus.processedAt;
    payout.failureReason = razorpayStatus.failureReason;

    // Update stats
    if (payout.status === 'processed') {
      payoutStats.pendingPayouts = Math.max(0, payoutStats.pendingPayouts - 1);
    }
  }

  return {
    success: true,
    payoutId,
    status: payout.status,
    amount: payout.amount,
    processedAt: payout.processedAt,
    failureReason: payout.failureReason
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// PAYOUT HISTORY AND STATS
// ──────────────────────────────────────────────────────────────────────────────

exports.getPayoutHistory = (workerId = null, limit = 50) => {
  let history = payoutHistory;

  if (workerId) {
    history = history.filter(p => p.workerId === workerId);
  }

  return history.slice(0, limit);
};

exports.getPayoutStats = () => {
  const now = new Date();
  const last24h = payoutHistory.filter(p =>
    new Date(p.createdAt) > new Date(now.getTime() - 24 * 60 * 60 * 1000)
  );

  return {
    ...payoutStats,
    last24hPayouts: last24h.length,
    last24hAmount: last24h.reduce((sum, p) => sum + p.amount, 0),
    averageProcessingTime: payoutHistory.length > 0
      ? Math.round(payoutHistory.reduce((sum, p) => sum + p.processingTime, 0) / payoutHistory.length)
      : 0
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// TEST MODE UTILITIES
// ──────────────────────────────────────────────────────────────────────────────

exports.simulatePayoutSuccess = (payoutId) => {
  const payout = payoutHistory.find(p => p.id === payoutId);
  if (payout) {
    payout.status = 'processed';
    payout.processedAt = new Date().toISOString();
    payoutStats.pendingPayouts = Math.max(0, payoutStats.pendingPayouts - 1);
    console.log(`[PAYOUT] Simulated success for payout ${payoutId}`);
  }
};

exports.simulatePayoutFailure = (payoutId, reason = 'Bank account invalid') => {
  const payout = payoutHistory.find(p => p.id === payoutId);
  if (payout) {
    payout.status = 'failed';
    payout.failureReason = reason;
    payoutStats.failedPayouts++;
    payoutStats.pendingPayouts = Math.max(0, payoutStats.pendingPayouts - 1);
    console.log(`[PAYOUT] Simulated failure for payout ${payoutId}: ${reason}`);
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// RESET FUNCTIONS (FOR TESTING)
// ──────────────────────────────────────────────────────────────────────────────

exports.resetPayoutData = () => {
  payoutHistory = [];
  payoutStats = {
    totalPayouts: 0,
    totalAmount: 0,
    pendingPayouts: 0,
    failedPayouts: 0,
    averageProcessingTime: 0
  };
  console.log('[PAYOUT] Payout data reset');
};
  }

  return { lossRatio, reserveAmount, premiumsCollected, payoutsDisbursed };
};
