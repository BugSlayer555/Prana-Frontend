import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Star,
  CheckCircle,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  const stats = [
    { number: '50+', label: 'Years of Excellence', icon: Award },
    { number: '100+', label: 'Expert Doctors', icon: UserCheck },
    { number: '10K+', label: 'Happy Patients', icon: Heart },
    { number: '24/7', label: 'Emergency Care', icon: Clock }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Every decision we make is focused on providing the best possible care for our patients.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'We maintain the highest standards of safety and hygiene in all our facilities.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team of healthcare professionals is highly qualified and experienced.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We continuously adopt the latest medical technologies and treatment methods.'
    }
  ];

  const achievements = [
    'JCI Accredited Hospital',
    'ISO 9001:2015 Certified',
    'Best Hospital Award 2023',
    'Patient Safety Excellence',
    'Digital Health Innovation Award',
    'Community Service Recognition'
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">Prana Healthcare</span>
            </h1>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over 50 years, Prana Hospital has been at the forefront of healthcare excellence, 
              providing compassionate care and innovative medical solutions to our community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                To provide exceptional healthcare services that improve the quality of life for our patients 
                and their families through compassionate care, medical excellence, and innovative technology.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                We are committed to treating each patient with dignity, respect, and personalized attention, 
                ensuring the highest standards of medical care in a safe and comfortable environment.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                To be the leading healthcare institution recognized for excellence in patient care, 
                medical innovation, and community health improvement.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                We strive to create a healthier community by providing accessible, affordable, 
                and high-quality healthcare services to all individuals regardless of their background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide everything we do and shape our culture of care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-base opacity-90">
              Recognition of our commitment to excellence in healthcare
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who lead our hospital towards excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
              <p className="text-primary-600 font-medium mb-2">Chief Medical Officer</p>
              <p className="text-gray-600 text-sm">
                Leading our medical team with over 20 years of experience in healthcare management.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-16 w-16 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Chen</h3>
              <p className="text-primary-600 font-medium mb-2">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                Driving our vision and strategic initiatives to provide exceptional patient care.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-16 w-16 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Emily Davis</h3>
              <p className="text-primary-600 font-medium mb-2">Chief Nursing Officer</p>
              <p className="text-gray-600 text-sm">
                Ensuring the highest standards of nursing care and patient safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-sm text-gray-600">
              We're here to help and answer any questions you might have.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">
                123 Healthcare Avenue<br />
                Medical District, City<br />
                State 12345
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">
                Emergency: (555) 123-4567<br />
                General: (555) 987-6543<br />
                Fax: (555) 456-7890
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">
                info@praanhospital.com<br />
                emergency@praanhospital.com<br />
                support@praanhospital.com
              </p>
            </div>
          </div>
        </div>
      </section>

            <Footer />
    </div>
  );
};

export default AboutUsPage; 