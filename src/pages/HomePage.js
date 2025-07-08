import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Heart, Users, Clock, Award, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import heroImage from '../assets/img/Image1.jpg';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold font-playfair text-gray-900 leading-tight">
                Modern Healthcare Management
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We are a dedicated healthcare team committed to providing exceptional patient care and 
                innovative medical solutions. Our hospital management system streamlines operations, 
                enhances patient experience, and improves healthcare delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-full"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="#about"
                  className="inline-flex items-center justify-center gap-2 text-lg px-8 py-4 border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white rounded-full transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8 shadow-xl">
                  <img 
                    src={heroImage} 
                    alt="Modern Healthcare Management" 
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="text-center mt-6 text-primary-700 font-medium text-lg">
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive hospital management system offers cutting-edge features 
              designed to enhance efficiency and improve patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-primary-500" />,
                title: "Secure & Reliable",
                description: "Advanced security measures to protect patient data and ensure HIPAA compliance."
              },
              {
                icon: <Heart className="h-12 w-12 text-primary-500" />,
                title: "Patient-Centered Care",
                description: "Streamlined workflows that prioritize patient experience and satisfaction."
              },
              {
                icon: <Users className="h-12 w-12 text-primary-500" />,
                title: "Team Collaboration",
                description: "Enhanced communication tools for seamless coordination between medical staff."
              },
              {
                icon: <Clock className="h-12 w-12 text-primary-500" />,
                title: "Real-time Updates",
                description: "Instant notifications and updates to keep everyone informed and coordinated."
              },
              {
                icon: <Award className="h-12 w-12 text-primary-500" />,
                title: "Quality Assurance",
                description: "Built-in quality controls and reporting tools to maintain high standards."
              },
              {
                icon: <Users className="h-12 w-12 text-primary-500" />,
                title: "User-Friendly Interface",
                description: "Intuitive design that requires minimal training for staff adoption."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive hospital management features to streamline your healthcare operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Patient Management",
                description: "Complete patient registration, medical records, and history tracking.",
                color: "bg-blue-500"
              },
              {
                title: "Doctor Management",
                description: "Manage doctor profiles, specializations, and schedules efficiently.",
                color: "bg-green-500"
              },
              {
                title: "Appointment Scheduling",
                description: "Smart scheduling system with automated reminders and notifications.",
                color: "bg-purple-500"
              },
              {
                title: "Billing & Insurance",
                description: "Integrated billing system with insurance claim processing.",
                color: "bg-orange-500"
              },
              {
                title: "Inventory Management",
                description: "Track medical supplies, equipment, and pharmaceutical inventory.",
                color: "bg-red-500"
              },
              {
                title: "Staff Management",
                description: "Comprehensive staff scheduling and performance tracking.",
                color: "bg-indigo-500"
              },
              {
                title: "Reports & Analytics",
                description: "Detailed insights and reports for informed decision making.",
                color: "bg-pink-500"
              },
              {
                title: "Emergency Services",
                description: "Quick access tools for emergency situations and protocols.",
                color: "bg-teal-500"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className={`w-12 h-12 ${service.color} rounded-lg mb-4 flex items-center justify-center`}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Healthcare Management?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of healthcare providers who trust our system for their daily operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-500 hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-8 rounded-full transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions? We're here to help you get started with our hospital management system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Phone className="h-12 w-12 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@pranahospital.com</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">123 Healthcare Ave, Medical City, MC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
