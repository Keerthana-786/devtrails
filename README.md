# PayNest Insurance - Complete Demo Application

A comprehensive insurance management system with ML-powered risk assessment, dynamic premium calculation, claims processing, and flood-safe routing for delivery personnel.

## 🎯 Demo Features Showcase

This application demonstrates a complete insurance ecosystem with the following key features:

### 1. **Registration Process**
- Multi-step user onboarding with personal and professional information
- Vehicle type and experience-based risk assessment
- Plan selection (Basic, Premium, Enterprise)
- ML-powered risk profiling and dynamic premium calculation

### 2. **Insurance Policy Management**
- Real-time policy overview with coverage details
- Dynamic premium calculation based on weather conditions and risk factors
- Plan upgrade/downgrade options
- Coverage limits and benefits display

### 3. **Dynamic Premium Calculation**
- ML model integration for risk assessment
- Real-time weather data integration (rainfall, AQI, temperature)
- Risk factor analysis (traffic disruption, flood history, visibility)
- Personalized premium adjustments based on user profile

### 4. **Claims Management**
- Claim submission with fraud detection
- Automatic approval for small claims
- Claim status tracking (Processing, Approved, Rejected)
- Integration with payout processing system

## 🚀 Quick Start

### Prerequisites
- Node.js 20.20.1 or higher
- Python 3.12 or higher
- npm or yarn package manager

### Installation & Setup

1. **Clone and install dependencies:**
```bash
cd /Users/keerthana/Downloads/files-6
npm install
```

2. **Start the ML backend:**
```bash
python train_models.py
python api.py
```

3. **Start the main backend server:**
```bash
node server.js
```

4. **Start the frontend:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Application Structure

### Frontend (React + Vite)
- **AuthScreens.jsx** - OTP-based authentication
- **RegistrationPage.jsx** - Multi-step user registration with risk assessment
- **Dashboard.jsx** - Main dashboard with earnings and weather alerts
- **PolicyPage.jsx** - Insurance policy management and claims
- **LoanPage.jsx** - Loan eligibility checking and application
- **SafeMap.jsx** - GPS location tracking and flood-safe routing
- **AppContext.jsx** - Global state management

### Backend (Express.js)
- **server.js** - Main API server with authentication, payouts, loans, and claims
- JWT-based authentication
- Weather API integration
- ML model proxy endpoints

### ML Layer (FastAPI)
- **api.py** - ML prediction endpoints
- **train_models.py** - Model training scripts
- Models: Risk assessment, fraud detection, loan eligibility, loss prediction

## 🎬 Demo Video Script

### Scene 1: Registration Process (0:00 - 1:30)
1. Open the app and navigate to registration
2. Fill personal information (name, email, phone)
3. Enter professional details (vehicle type, experience)
4. Select insurance plan (Basic/Premium/Enterprise)
5. View risk assessment and accept terms
6. Complete registration and login

### Scene 2: Dashboard Overview (1:30 - 2:30)
1. Show main dashboard with user balance and earnings
2. Display current weather conditions
3. Show active insurance plan and coverage
4. Demonstrate logout functionality

### Scene 3: Policy Management (2:30 - 4:00)
1. Navigate to Policy page
2. Show policy overview with coverage details
3. Demonstrate dynamic premium calculation
4. Display risk factors and current premium
5. Show plan management options

### Scene 4: Claims Management (4:00 - 5:30)
1. Submit a new claim with details
2. Show claim processing status
3. Display claims history
4. Demonstrate automatic approval for small claims

### Scene 5: Map & Routing (5:30 - 7:00)
1. Open SafeMap page
2. Show GPS location detection
3. Demonstrate flood-safe route planning
4. Display risk zones and safe paths
5. Test route functionality

### Scene 6: Loan Management (7:00 - 8:30)
1. Navigate to Loan page
2. Check loan eligibility with ML assessment
3. Show loan application process
4. Display loan terms and approval status

## 🔧 Technical Architecture

### ML Models
- **Risk Assessment**: Predicts insurance risk based on weather and user data
- **Fraud Detection**: Identifies potentially fraudulent claims
- **Loan Eligibility**: Assesses creditworthiness for loan applications
- **Loss Prediction**: Estimates potential insurance losses

### APIs
- **Weather Integration**: Open-Meteo API for real-time weather data
- **GPS Location**: Browser geolocation API
- **Routing**: Custom flood-safe pathfinding algorithm
- **Authentication**: JWT-based secure authentication

### Data Flow
1. User registers → Risk assessment → Premium calculation
2. Weather monitoring → Automatic alerts → Payout triggers
3. Claim submission → Fraud check → Approval/processing
4. Route planning → Risk zone avoidance → Safe path display

## 📊 Key Metrics & Features

- **Real-time Risk Assessment**: ML models update premiums based on current conditions
- **Fraud Prevention**: Automated claim verification with ML fraud detection
- **Weather Integration**: Live weather data affects premiums and payouts
- **GPS Tracking**: Location-based services for route optimization
- **Dynamic Pricing**: Premiums adjust based on risk factors and weather conditions

## 🎯 Demo Highlights

1. **Complete User Journey**: From registration to claims processing
2. **ML Integration**: Real ML models for risk assessment and fraud detection
3. **Real-time Data**: Live weather integration and GPS location
4. **Interactive UI**: Modern React interface with smooth navigation
5. **Comprehensive Backend**: Full API ecosystem with authentication and data management

## 📝 Development Notes

- The application includes both real API calls and demo fallbacks
- ML models are trained on synthetic insurance data
- Weather data is fetched from Open-Meteo API
- GPS location uses browser geolocation API
- All sensitive operations include fraud detection

## 🔗 Links

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **ML API**: http://localhost:8001
- **Weather API**: https://open-meteo.com

---

**Demo Duration**: ~8-10 minutes
**Technology Stack**: React, Express.js, FastAPI, scikit-learn, Leaflet
**Key Features**: ML-powered insurance, dynamic pricing, claims management, flood-safe routing
