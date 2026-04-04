# 🧪 PayNest Testing & Verification Guide

## 🚀 QUICK START (3 commands to run everything)

### Terminal 1: Start ML Backend
```bash
cd /Users/keerthana/Downloads/files-6
python api.py
# Expected output: "Uvicorn running on http://127.0.0.1:8001"
```

### Terminal 2: Start Express Backend
```bash
cd /Users/keerthana/Downloads/files-6
node server.js
# Expected output: "Server running on http://localhost:8000"
```

### Terminal 3: Start React Frontend
```bash
cd /Users/keerthana/Downloads/files-6
npm run dev
# Expected output: "Local: http://localhost:5173"
```

---

## ✅ FEATURE VERIFICATION CHECKLIST

### 1. REGISTRATION & ONBOARDING
- [ ] Navigate to Localhost:5173 → See RegistrationPage
- [ ] Step 1: Enter name "John Smith"
- [ ] Step 2: Select city from dropdown (e.g., "Mumbai")
  - Verify: Risk factors appear based on city
- [ ] Step 3: Select vehicle type (bike/scooter/auto)
- [ ] Step 4: Select experience level (1-5 years)
- [ ] Click "Register"
  - **Expected**: Toast "Welcome to PayNest! ✨"
  - **Expected**: Navigate to Dashboard
  - **Verify API**: Check browser console → Should see `/api/auth/register` call with city + weeklyPremium

### 2. DASHBOARD (HOME TAB)
- [ ] Open Dashboard → See wallet section
- [ ] Check for 4 main cards:
  - [ ] Total Payouts (₹0 initially)
  - [ ] Weekly Earnings Protected (₹0 initially)
  - [ ] Disruption Frequency (0 events)
  - [ ] Income Stability Score (0-100)

- [ ] **Test Premium Forecast Sparkline**
  - [ ] 7 bars visible with green/yellow coloring
  - [ ] Shows last 7 days of premium history
  - [ ] Smooth animation on page load

- [ ] **Test Badge System**
  - [ ] See 4 badges: Rain Master, Fast Responder, Safe Rider, AI Veteran
  - [ ] Initially all should be dim (locked)
  - [ ] Earned badges (if any) should be glowing

- [ ] **Test Auto-Pricing (every 25 seconds)**
  - [ ] Wait 25 seconds
  - [ ] Check if weekly premium updates (simulated rain/traffic)
  - [ ] Check dashboard updates without page refresh

### 3. INSIGHTS PAGE (🧠 TAB)
- [ ] Click Insights tab
- [ ] **Timeline Component**
  - [ ] See 24-hour grid (00:00 → 23:00)
  - [ ] Colors should be green/yellow/red based on hour risk
  - [ ] Hover over hour shows risk percentage
  
- [ ] **Income Prediction**
  - [ ] Shows expected earnings (₹300-1000 range)
  - [ ] Confidence score displayed (>85%)
  - [ ] Protected amount shown (based on policy)

- [ ] **Smart Decisions**
  - [ ] See contextual recommendations
  - [ ] If weather high: "Reduce delivery distance <2km"
  - [ ] If traffic low: "Local delivery only"
  - [ ] If stability<50: "Activate Protected Earnings"

- [ ] **Weekly Patterns Table**
  - [ ] 7 rows for Monday→Sunday
  - [ ] Columns: Safety Level, Avg Earnings, Disruptions
  - [ ] Color-coded row backgrounds (green/orange/red)

- [ ] **What-If Simulator**
  - [ ] Click "🔮 What-If Simulator" button
  - [ ] Adjust rainfall slider (0-100mm)
  - [ ] Adjust traffic slider (0-50 km/h)
  - [ ] See real-time payout impact
  - [ ] Compare "Normal: ₹XXX" vs "Simulated: ₹YYY"

### 4. SAFE MAP (🗺️ TAB)
- [ ] Click Map tab
- [ ] **Map Heatmap Visualization**
  - [ ] See your current location center
  - [ ] 3 concentric rings visible:
    - [ ] Inner ring: Green (500m safe zone)
    - [ ] Middle ring: Yellow (1.5km caution)
    - [ ] Outer ring: Red (3.5km danger)
  
- [ ] **Ring Opacity Scaling**
  - [ ] When simulating high rainfall (>30mm), rings pulse
  - [ ] Outer ring becomes more opaque/dashed border
  - [ ] No rain = rings minimal opacity

- [ ] **Zone Popups**
  - [ ] Click on a zone location
  - [ ] Popup shows: Zone name, trigger type, AI payout
  - [ ] Fraud verdict: AUTO_APPROVE or MONITOR

- [ ] **Floating Recommendation Card**
  - [ ] Card appears with pulsing animation
  - [ ] Shows best zone name
  - [ ] Displays expected income (₹XXX)
  - [ ] Shows risk level (LOW/MEDIUM/HIGH)
  - [ ] Camera button (📸) visible

- [ ] **Camera Upload**
  - [ ] Click 📸 button
  - [ ] File dialog appears
  - [ ] Select an image from device
  - [ ] Toast appears: "Evidence uploaded successfully ✓"

### 5. PROTECTION PAGE (🛡️ TAB)
- [ ] Click Protection tab
- [ ] **Auto Protection Settings**
  - [ ] See 5 toggle switches:
    - [ ] Auto Claims Processing (ON/OFF)
    - [ ] Income Guarantee (ON/OFF)
    - [ ] Fraud Protection (ON/OFF)
    - [ ] Automatic Payouts (ON/OFF)
    - [ ] Smart Break Suggestions (ON/OFF)
  
  - [ ] Toggle any switch → See visual feedback
  - [ ] Toggle "Auto Claims Processing" → Toast "Setting saved ✓"

- [ ] **Premium Breakdown**
  - [ ] Shows calculation:
    ```
    Base:              ₹76.50
    Weather Risk:      + ₹5.20
    Cty/Traffic Risk:  (varies)
    Experience Disc.:  - ₹12.50
    ──────────────────────────
    Final Weekly:      ₹75.80
    ```
  - [ ] Next deduction date shown (next Sunday)
  - [ ] Annual benefit estimate (×52 weeks)

- [ ] **Claim History**
  - [ ] See recent claims (if any)
  - [ ] Each claim shows:
    - [ ] Trigger icon (🌧/🌡/⚡)
    - [ ] Timestamp
    - [ ] Payout amount (green +₹)
    - [ ] Status badge
  - [ ] Empty state message if no claims yet

- [ ] **AI Confidence Metrics**
  - [ ] 4 stat boxes showing:
    - [ ] Claim Approval Accuracy: >90%
    - [ ] Fraud Detection Rate: 99.2%
    - [ ] Avg Processing Time: 4.2 min
    - [ ] Total Processed Claims: (count)

- [ ] **Achievement Badges**
  - [ ] 4 badge cards displayed:
    - [ ] Rain Master 🌧
    - [ ] Fast Responder ⚡
    - [ ] Safe Rider 🛡
    - [ ] AI Veteran 🤖
  
  - [ ] Earned badges: Glowing, full color
  - [ ] Locked badges: Dim, grayscale filter
  - [ ] Hover: Shows description + unlock condition

---

## 🔥 STRESS TEST: TRIGGER AUTO-CLAIM

### Test Scenario 1: Heavy Rain Event
1. Go to **Dashboard**
2. Look at current weather (should show rain % or metric)
3. **Wait 25 seconds** for AppContext polling cycle
   - **Expected**: If rain > 30mm:
     - [ ] Toast: "Auto-Payout Triggered 🌧️ ₹XXX"
     - [ ] Dashboard shows new payout in payouts list
     - [ ] Total Payouts card increments
     - [ ] Weekly Earnings Protected updates
     - [ ] Badge progress increases

4. **Verify API calls** (Open DevTools → Network tab)
   - [ ] See `/api/claims/auto-check` POST request
   - [ ] See `/predict/loss` called in response
   - [ ] See `/predict/fraud` called for verification
   - [ ] Status 200 = success

### Test Scenario 2: Badge Unlock
1. Dashboard should show 0 badges earned initially
2. Trigger heavy rain auto-claim (see above)
3. **Expected**: Rain Master badge glows and unlocks
   - [ ] Toast: "Badge Unlocked! Rain Master ✨"
   - [ ] Protection page shows badge as earned
   - [ ] Badge animation plays

### Test Scenario 3: Toast Notification System
- [ ] Perform auto-claim → Toast appears (bottom-right)
- [ ] Toast type = "success" (green color)
- [ ] Auto-dismisses after 4 seconds
- [ ] No overlapping toasts (should stack)

### Test Scenario 4: Manual Settings Change
1. Go to **Protection page**
2. Toggle "Auto Claims Processing" switch
3. **Expected**:
   - [ ] Visual toggle animation
   - [ ] Toast: "Setting saved ✓"
   - [ ] State persists on page refresh

### Test Scenario 5: Dashboard Analytics Update
1. After 2-3 auto-claims are triggered:
   - [ ] Income Stability Score should update (>0)
   - [ ] Disruption Frequency increments
   - [ ] Weekly Earnings Protected increases
   - [ ] Risk Trend shows status (Increasing/Stable)

---

## 📊 DATA INSPECTION (DevTools)

### Check AppContext State
1. Open DevTools → Console
2. Type: `React.version` (should work if React DevTools installed)
3. Or check **localStorage**:
   ```javascript
   // In console:
   localStorage.getItem('paynes_user')  // Check user object
   localStorage.getItem('paynes_payouts')  // Check payouts array
   localStorage.getItem('paynes_badges')  // Check badges earned
   ```

### Monitor Network Requests
1. DevTools → Network tab
2. Filter by `XHR` (API calls)
3. Looking for:
   - [ ] `/api/pricing/dynamic` (25s interval)
   - [ ] `/api/claims/auto-check` (25s interval)
   - [ ] `/predict/loss` (on claim)
   - [ ] `/predict/fraud` (on claim)

### Check Console Errors
1. DevTools → Console tab
2. Should show **0 errors**
3. Warnings acceptable (React DevTools, etc.)

---

## 🎯 PERFORMANCE CHECKS

### Animation Smoothness
- [ ] Dashboard premium sparkline animates smoothly
- [ ] Progressive number counts smoothly (0 → amount)
- [ ] Badge unlock animation is fluid
- [ ] Map heatmap rings pulse without jank
- [ ] Toast slide-in animation smooth

### Page Load Time
- [ ] Dashboard loads in <1s
- [ ] Insights page loads in <1s
- [ ] Map loads in <2s (due to Leaflet)
- [ ] Protection page loads in <800ms

### API Response Time
- [ ] `/api/pricing/dynamic` responds in <500ms
- [ ] `/api/claims/auto-check` responds in <1s
- [ ] `/predict/loss` responds in <1s
- [ ] No timeout errors in console

---

## 🐛 EXPECTED BEHAVIORS (NOT Bugs)

❌ **Do NOT worry if you see these:**

1. **Initial page load shows ₹0 payouts** → Normal, they accumulate over time
2. **Badge cards initially dim** → Normal, earned on first qualifying event
3. **Timeline colors all green initially** → Normal, depends on weather simulation
4. **Map rings all green initially** → Normal, only red when high rain/low traffic
5. **Weekly premium changes every 25s** → Normal, simulating real-time risk
6. **Toast notifications appear/disappear** → Normal behavior (test expected)
7. **Multiple API calls in quick succession** → Normal (polling + event-triggered)
8. **Stability score is 0 until payouts** → Normal calculation logic

✅ **ACTUAL PROBLEMS to report:**

1. ❌ Toast doesn't appear on auto-claim
2. ❌ Badge doesn't glow after trigger
3. ❌ Dashboard doesn't update after 25s
4. ❌ API calls return 500 errors
5. ❌ Map doesn't load or shows errors
6. ❌ Settings toggle freezes UI
7. ❌ Premium sparkline doesn't animate
8. ❌ Console shows React/component errors

---

## 🔧 TROUBLESHOOTING

### "Cannot fetch /api/pricing/dynamic"
**Solution**: Ensure Express backend running on port 8000
```bash
# In terminal 2:
node server.js
# Should show: "Server running on http://localhost:8000"
```

### "Cannot fetch /predict/loss"
**Solution**: Ensure FastAPI backend running on port 8001
```bash
# In terminal 1:
python api.py
# Should show: "Uvicorn running on http://127.0.0.1:8001"
```

### "Toast doesn't appear"
**Solution**: Check if ToastSystem component rendered in App.jsx
```javascript
// In App.jsx, should have:
import ToastSystem from './components/ToastSystem'
// And in JSX:
<ToastSystem />
```

### "Map not rendering"
**Solution**: React-Leaflet requires CSS. Check:
```bash
npm install leaflet
# Verify leaflet.css imported in SafeMap.jsx
```

### "Premium doesn't update every 25s"
**Solution**: Check AppContext useEffect polling
```javascript
// Should have:
setInterval(() => {
  fetchDynamicPricing()
  checkAndTriggerPayout()
}, 25000)
```

---

## 📸 EXPECTED SCREENSHOTS

### Dashboard (Home)
```
┌─────────────────────────────┐
│  💰 Wallet: ₹XXX             │
│  🎯 Weekly Premium: ₹75.80   │
├─────────────────────────────┤
│ Total Payouts: ₹0            │
│ Protected: ₹0                │
│ Disruptions: 0               │
│ Stability: 0%                │
├─────────────────────────────┤
│ ▄▄▀▀▄▄▄▀▀  (Forecast Chart) │
├─────────────────────────────┤
│ [🌧] Rain Master    LOCKED    │
│ [⚡] Fast Responder LOCKED    │
│ [🛡] Safe Rider     LOCKED    │
│ [🤖] AI Veteran     EARNED ✨  │
└─────────────────────────────┘
```

### Insights (Timeline sample)
```
00:00 🟢 | 01:00 🟢 | 02:00 🟡 | 03:00 🔴 | ...
04:00 🔴 | 05:00 🟢 | 06:00 🟢 | 07:00 🟡 | ...
```

### Protection (Premium Breakdown)
```
┌──────────────────────┐
│ Base           ₹76.50 │
│ Weather Risk   +₹5.20 │
│ Experience Disc -₹6.90 │
├──────────────────────┤
│ Final Weekly   ₹74.80 │
│ Next Deduct:   Sunday │
└──────────────────────┘
```

### Toast Notification
```
╔════════════════════════════╗
║ ✓ Success                 ║
║ Auto-Payout ₹245 Credited ║
╚════════════════════════════╝
```

---

## ✅ FINAL VERIFICATION

Run this command to check all files exist:
```bash
cd /Users/keerthana/Downloads/files-6
ls -la src/pages/{Dashboard,Insights,Protection,SafeMap}.jsx
ls -la src/context/AppContext.jsx
ls -la src/App.jsx
ls -la server.js api.py
```

All 8 files should exist and show file size > 0.

---

## 🎉 SUCCESS CRITERIA

**Your implementation is COMPLETE when:**
- ✅ All 4 tabs navigate smoothly
- ✅ Dashboard shows real-time updates every 25s
- ✅ Auto-claims trigger on rain (> 30mm)
- ✅ Toast notifications appear/dismiss
- ✅ Badges unlock on events
- ✅ Insights page shows 24-hour timeline
- ✅ Protection settings persist
- ✅ SafeMap renders with heatmap rings
- ✅ No console errors
- ✅ All API endpoints respond

**Estimated time to verify**: 5-10 minutes

