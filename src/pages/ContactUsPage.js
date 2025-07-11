import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  User,
  Calendar,
  CheckCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        '123 Healthcare Avenue',
        'Medical District, City',
        'State 12345'
      ],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        'Emergency: (555) 123-4567',
        'General: (555) 987-6543',
        'Fax: (555) 456-7890'
      ],
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@praanhospital.com',
        'emergency@praanhospital.com',
        'support@praanhospital.com'
      ],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      details: [
        'Monday - Friday: 8:00 AM - 8:00 PM',
        'Saturday: 9:00 AM - 6:00 PM',
        'Sunday: 9:00 AM - 4:00 PM',
        'Emergency: 24/7'
      ],
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const departments = [
    { name: 'Emergency Department', phone: '(555) 123-4567' },
    { name: 'Cardiology', phone: '(555) 123-4568' },
    { name: 'Neurology', phone: '(555) 123-4569' },
    { name: 'Pediatrics', phone: '(555) 123-4570' },
    { name: 'Surgery', phone: '(555) 123-4571' },
    { name: 'Radiology', phone: '(555) 123-4572' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Get in <span className="text-primary-600">Touch</span>
            </h1>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to help and answer any questions you might have. 
              Reach out to us and we'll respond as soon as we can.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">123 Healthcare Avenue, Medical District</p>
                </div>
              </div>

              {/* Department Contacts */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Department Contacts</h3>
                <div className="space-y-3">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                      <span className="font-medium text-gray-900">{dept.name}</span>
                      <span className="text-primary-600 font-mono text-sm">{dept.phone}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Information */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-3">Emergency Information</h3>
                <div className="space-y-2 text-red-800">
                  <p className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Emergency: (555) 123-4567</span>
                  </p>
                  <p className="text-sm">
                    For life-threatening emergencies, call 911 immediately or visit our emergency department.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-600">
              Find answers to common questions about our services and facilities.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I schedule an appointment?
              </h3>
              <p className="text-gray-600">
                You can schedule an appointment by calling our main line at (555) 987-6543, 
                visiting our website, or using our patient portal.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What insurance plans do you accept?
              </h3>
              <p className="text-gray-600">
                We accept most major insurance plans. Please contact our billing department 
                at (555) 456-7890 to verify your specific coverage.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are your visiting hours?
              </h3>
              <p className="text-gray-600">
                General visiting hours are 10:00 AM to 8:00 PM daily. 
                Special arrangements can be made for family members.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I request my medical records?
              </h3>
              <p className="text-gray-600">
                You can request your medical records by filling out a release form 
                at our medical records department or contacting us at (555) 789-0123.
              </p>
            </div>
          </div>
        </div>
      </section>

            <Footer />
    </div>
  );
};

export default ContactUsPage; 