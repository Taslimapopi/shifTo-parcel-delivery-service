# 🚚 ShifTo — Parcel Delivery Management System

**ShifTo** is a full-stack parcel delivery platform with role-based dashboards for Users, Admins, and Riders, featuring automated pricing, OTP-secured delivery, and district-wise warehouse mapping across all 64 districts of Bangladesh.

🔗 **Live Site:** [https://shifto-3eedb.web.app](https://shifto-3eedb.web.app)

---

## ✨ Features

- **Role-Based Dashboard & Workflow** — Separate dashboards for Users, Admins, and Riders with dedicated controls covering booking, agent assignment, and OTP-secured delivery confirmation.

- **Automated Pricing & Parcel Management** — Dynamic pricing engine calculates charges instantly based on parcel type, weight, and destination, giving users transparent cost breakdowns at booking.

- **District-Wise Warehouse Map** — React Leaflet-powered interactive map displaying warehouse locations filtered by district across all 64 districts of Bangladesh.

---

## 💰 Pricing Structure

| Parcel Type | Weight | Within City | Outside City/District |
|---|---|---|---|
| Document | Any | ৳60 | ৳80 |
| Non-Document | Up to 3kg | ৳110 | ৳150 |
| Non-Document | >3kg | +৳40/kg | +৳40/kg + ৳40 extra |

---

## 👥 Roles

| Role | Responsibilities |
|---|---|
| **User** | Book parcels, pay charges, track status, review service |
| **Admin** | Assign agents, manage routing, oversee warehouses, monitor operations |
| **Rider** | Collect/deliver parcels, update status, OTP confirmation, warehouse handoff |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Map | React Leaflet |
| Auth & Hosting | Firebase |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB
- Firebase project setup

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/shifto.git

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Variables

Create a `.env` file in the server directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the client directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_API_BASE_URL=http://localhost:5000
```

### Run Locally

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm run dev
```

---



## 📄 License

This project is for educational and portfolio purposes.
