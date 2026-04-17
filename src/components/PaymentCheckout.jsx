import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, Zap, ChevronDown } from 'lucide-react';

const PaymentCheckout = ({ onSuccess }) => {
  const { worker, completeClaim } = useApp();
  const [step, setStep] = useState('billing'); // billing | payment | confirm
  const [paymentMethod, setPaymentMethod] = useState('card'); // card | upi
  
  // Billing Form
  const [billing, setBilling] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: 'India',
    state: 'Tamil Nadu',
    businessPurchase: false
  });

  // Card Details
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  // UPI Details
  const [upi, setUpi] = useState({
    vpaId: worker.upi_id || 'raju.swiggy@upi'
  });

  const handleBillingChange = (field, value) => {
    setBilling(prev => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field, value) => {
    setCard(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = () => {
    if (paymentMethod === 'card') {
      if (!card.number || !card.expiry || !card.cvc || !card.name) {
        alert('Please fill all card details');
        return;
      }
    }
    
    // Simulate payment success
    const transactionId = `pay_${Math.random().toString(36).substr(2, 12).toUpperCase()}`;
    const claimData = {
      id: `CLM-2026-${Math.floor(Math.random() * 9000) + 1000}`,
      dateDay: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      trigger: 'Premium Payment',
      amount: 49,
      fraudScore: 0,
      status: 'SETTLED',
      transactionId,
      triggerType: 'PAYMENT'
    };
    
    completeClaim(claimData);
    if (onSuccess) onSuccess(transactionId);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#0F0F1A',
            marginBottom: '8px'
          }}>
            PayNest Checkout
          </div>
          <div style={{ fontSize: '14px', color: '#64748B' }}>
            Secure payment for premium coverage
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          {/* LEFT - BILLING FORM */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#0F0F1A'
            }}>
              Billing Information
            </h2>

            {/* Business Purchase */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={billing.businessPurchase}
                onChange={(e) => handleBillingChange('businessPurchase', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: '#64748B' }}>Business purchase</span>
            </label>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <input
                type="email"
                placeholder="Email *"
                value={billing.email}
                onChange={(e) => handleBillingChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            {/* Name Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="First name *"
                value={billing.firstName}
                onChange={(e) => handleBillingChange('firstName', e.target.value)}
                style={{
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
              <input
                type="text"
                placeholder="Last name *"
                value={billing.lastName}
                onChange={(e) => handleBillingChange('lastName', e.target.value)}
                style={{
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            {/* Country */}
            <div style={{ marginBottom: '16px' }}>
              <select
                value={billing.country}
                onChange={(e) => handleBillingChange('country', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  appearance: 'none',
                  background: '#fff url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748B%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpath d=%27M6 9l6 6 6-6%27/%3e%3c/svg%3e") no-repeat right 12px center / 18px'
                }}
              >
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
            </div>

            {/* State */}
            <div style={{ marginBottom: '24px' }}>
              <select
                value={billing.state}
                onChange={(e) => handleBillingChange('state', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  appearance: 'none',
                  background: '#fff url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748B%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpath d=%27M6 9l6 6 6-6%27/%3e%3c/svg%3e") no-repeat right 12px center / 18px'
                }}
              >
                <option>Tamil Nadu</option>
                <option>Karnataka</option>
                <option>Maharashtra</option>
              </select>
            </div>

            {/* Payment Method */}
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#0F0F1A'
            }}>
              Payment Method
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {/* Card Option */}
              <div
                onClick={() => setPaymentMethod('card')}
                style={{
                  padding: '16px',
                  border: paymentMethod === 'card' ? '2px solid #6C63FF' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: paymentMethod === 'card' ? 'rgba(108,99,255,0.05)' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  style={{ cursor: 'pointer' }}
                />
                <CreditCard size={20} color={paymentMethod === 'card' ? '#6C63FF' : '#94A3B8'} />
                <span style={{ fontSize: '13px', fontWeight: '600', color: paymentMethod === 'card' ? '#6C63FF' : '#64748B' }}>
                  Card
                </span>
              </div>

              {/* UPI Option */}
              <div
                onClick={() => setPaymentMethod('upi')}
                style={{
                  padding: '16px',
                  border: paymentMethod === 'upi' ? '2px solid #6C63FF' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: paymentMethod === 'upi' ? 'rgba(108,99,255,0.05)' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  style={{ cursor: 'pointer' }}
                />
                <Zap size={20} color={paymentMethod === 'upi' ? '#6C63FF' : '#94A3B8'} />
                <span style={{ fontSize: '13px', fontWeight: '600', color: paymentMethod === 'upi' ? '#6C63FF' : '#64748B' }}>
                  UPI
                </span>
              </div>
            </div>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div>
                <input
                  type="text"
                  placeholder="Card number *"
                  value={card.number}
                  onChange={(e) => handleCardChange('number', e.target.value.replace(/\D/g, '').slice(0, 16))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter, monospace',
                    marginBottom: '12px'
                  }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Expiration date *"
                    value={card.expiry}
                    onChange={(e) => handleCardChange('expiry', e.target.value)}
                    style={{
                      padding: '12px 14px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Security code *"
                    value={card.cvc}
                    onChange={(e) => handleCardChange('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                    style={{
                      padding: '12px 14px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'Inter, monospace'
                    }}
                  />
                </div>
              </div>
            )}

            {/* UPI Details */}
            {paymentMethod === 'upi' && (
              <div>
                <input
                  type="text"
                  placeholder="UPI ID *"
                  value={upi.vpaId}
                  onChange={(e) => setUpi({ vpaId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
              </div>
            )}
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            height: 'fit-content'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#0F0F1A'
            }}>
              You're buying
            </h2>

            {/* Product Card */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '24px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #6C63FF, #5A52D5)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontSize: '40px' }}>🛡️</span>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F0F1A', marginBottom: '4px' }}>
                  PayNest Standard Plan
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                  Auto-renewal
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#6C63FF' }}>
                  ₹49 per week
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div style={{
              borderTop: '1px solid #E2E8F0',
              paddingTop: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#64748B' }}>Coverage</span>
                <span style={{ fontWeight: '600', color: '#0F0F1A' }}>₹49</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                <span style={{ color: '#64748B' }}>Tax (0%)</span>
                <span style={{ fontWeight: '600', color: '#0F0F1A' }}>₹0</span>
              </div>
            </div>

            {/* Coupon */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Coupon Code"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              />
              <button style={{
                padding: '10px 16px',
                background: '#6C63FF',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '13px'
              }}>
                Apply
              </button>
            </div>

            {/* Total */}
            <div style={{
              borderTop: '2px solid #E2E8F0',
              paddingTop: '16px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F0F1A' }}>TOTAL:</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#6C63FF' }}>₹49</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitOrder}
              style={{
                width: '100%',
                padding: '14px',
                background: '#F59E0B',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                marginBottom: '16px',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Complete Purchase
            </button>

            {/* Trust Badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center' }}>Secure Payment</div>
              <span style={{ color: '#E2E8F0' }}>•</span>
              <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center' }}>Razorpay Verified</div>
              <span style={{ color: '#E2E8F0' }}>•</span>
              <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center' }}>SSL Encrypted</div>
            </div>

            {/* Legal Text */}
            <p style={{
              fontSize: '10px',
              color: '#94A3B8',
              marginTop: '16px',
              lineHeight: '1.5',
              textAlign: 'center'
            }}>
              By submitting your order, you acknowledge that you are purchasing from PayNest. Your payment information will be securely processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
