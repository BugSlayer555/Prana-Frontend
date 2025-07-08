# Hospital Management System

A comprehensive React-based Hospital Management System with a modern design and full backend functionality.

## Features

### Frontend (React)
- **Modern UI Design**: Clean, responsive design using Tailwind CSS
- **Authentication**: Login/Register with JWT tokens
- **Dashboard**: Overview with statistics and quick actions
- **Patient Management**: Complete CRUD operations for patient records
- **Doctor Management**: Manage doctor profiles and schedules
- **Appointment Scheduling**: Book and manage appointments
- **Billing System**: Generate and track invoices
- **Inventory Management**: Track medical supplies and equipment
- **Staff Management**: Employee records and scheduling
- **Reports & Analytics**: System insights and reports
- **Settings**: System configuration

### Backend (Node.js/Express)
- **RESTful API**: Clean API structure
- **Authentication**: JWT-based authentication
- **Database**: MongoDB (or mock data for demo)
- **Security**: Password hashing with bcrypt
- **Validation**: Input validation with express-validator

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Lucide React (Icons)
- React Hook Form
- React Hot Toast
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (optional)
- JWT Authentication
- bcryptjs
- express-validator

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- MongoDB (optional - the system can run with mock data)

### Setup Instructions

1. **Clone/Navigate to the project directory**
   ```bash
   cd C:\Users\adity\Desktop\Hospital-Management\react-hospital-management
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Variables (Optional)**
   Create a `.env` file in the server directory:
   ```
   NODE_ENV=development
   JWT_SECRET=your-secret-key-here
   MONGODB_URI=mongodb://localhost:27017/hospital-management
   PORT=5000
   ```

5. **Start the Backend Server**
   ```bash
   cd server
   npm start
   # Or for development with auto-restart:
   npm run dev
   ```

6. **Start the Frontend (in a new terminal)**
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Demo Credentials

For testing purposes, you can use these demo accounts:

- **Admin**: admin@hospital.com / admin123
- **Doctor**: doctor@hospital.com / doctor123
- **Nurse**: nurse@hospital.com / nurse123

## Project Structure

```
react-hospital-management/
├── public/
├── src/
│   ├── components/
│   │   ├── DashboardLayout.js
│   │   └── Navbar.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── Dashboard.js
│   │   ├── PatientManagement.js
│   │   └── ... (other pages)
│   ├── App.js
│   ├── index.js
│   └── index.css
├── server/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── patients.js
│   │   └── ... (other routes)
│   ├── server.js
│   └── package.json
├── package.json
├── tailwind.config.js
└── README.md
```

## Key Features Implemented

### 1. Authentication System
- User registration with role-based access
- JWT token-based authentication
- Protected routes
- User profile management

### 2. Dashboard
- Real-time statistics
- Recent activities
- Quick actions
- Department status overview

### 3. Patient Management
- Complete patient records
- Search and filter functionality
- Patient details modal
- Blood group tracking

### 4. Modern UI Components
- Responsive design
- Modern card layouts
- Interactive elements
- Loading states
- Form validation

## Planned Features (For Future Development)

1. **Advanced Appointment System**
   - Calendar integration
   - Automated reminders
   - Recurring appointments

2. **Enhanced Billing**
   - Insurance integration
   - Payment processing
   - Financial reporting

3. **Advanced Inventory**
   - Barcode scanning
   - Automated reordering
   - Supplier management

4. **Communication System**
   - Internal messaging
   - Patient notifications
   - Email integration

5. **Advanced Analytics**
   - Custom reports
   - Data visualization
   - Performance metrics

## Development

### Running in Development Mode

1. Backend:
   ```bash
   cd server
   npm run dev
   ```

2. Frontend:
   ```bash
   npm start
   ```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a complete hospital management system converted from your original HTML/CSS design to a modern React application with full backend functionality. The system includes all essential features needed for hospital operations and can be easily extended with additional features as needed.
