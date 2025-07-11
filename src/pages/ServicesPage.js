import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Brain, 
  Baby, 
  Scissors,
  Eye,
  Pill,
  Shield,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServicesPage = () => {
  const services = [
    {
      icon: Activity,
      title: 'Emergency Care',
      description: '24/7 emergency medical services with state-of-the-art equipment and experienced trauma teams.',
      features: ['Trauma Care', 'Critical Care', 'Emergency Surgery', 'Ambulance Services'],
      color: 'bg-red-100 text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Stethoscope,
      title: 'Cardiology',
      description: 'Comprehensive cardiac care including diagnosis, treatment, and prevention of heart diseases.',
      features: ['Echocardiography', 'Cardiac Surgery', 'Heart Transplant', 'Cardiac Rehabilitation'],
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Advanced neurological care for disorders of the brain, spine, and nervous system.',
      features: ['Stroke Treatment', 'Brain Surgery', 'Neurological Testing', 'Rehabilitation'],
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Baby,
      title: 'Pediatrics',
      description: 'Specialized medical care for infants, children, and adolescents in a child-friendly environment.',
      features: ['Well-child Visits', 'Vaccinations', 'Pediatric Surgery', 'Child Psychology'],
      color: 'bg-pink-100 text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Scissors,
      title: 'Surgery',
      description: 'Advanced surgical procedures using minimally invasive techniques and robotic surgery.',
      features: ['General Surgery', 'Orthopedic Surgery', 'Plastic Surgery', 'Robotic Surgery'],
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'Comprehensive eye care including diagnosis, treatment, and surgery for vision problems.',
      features: ['Eye Exams', 'Cataract Surgery', 'Laser Treatment', 'Glaucoma Care'],
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Pill,
      title: 'Pharmacy Services',
      description: 'Full-service pharmacy providing medications, consultations, and health screenings.',
      features: ['Prescription Filling', 'Medication Reviews', 'Health Screenings', 'Vaccinations'],
      color: 'bg-indigo-100 text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: Shield,
      title: 'Preventive Care',
      description: 'Comprehensive preventive healthcare services to maintain and improve your health.',
      features: ['Health Screenings', 'Vaccinations', 'Nutrition Counseling', 'Fitness Programs'],
      color: 'bg-teal-100 text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  const specialties = [
    {
      name: 'Oncology',
      description: 'Comprehensive cancer care with the latest treatment options',
      icon: Shield
    },
    {
      name: 'Orthopedics',
      description: 'Treatment for bone, joint, and muscle conditions',
      icon: Activity
    },
    {
      name: 'Dermatology',
      description: 'Skin care and treatment for various skin conditions',
      icon: Eye
    },
    {
      name: 'Psychiatry',
      description: 'Mental health care and psychological support',
      icon: Brain
    },
    {
      name: 'Radiology',
      description: 'Advanced imaging and diagnostic services',
      icon: Shield
    },
    {
      name: 'Urology',
      description: 'Treatment for urinary and reproductive system conditions',
      icon: Stethoscope
    }
  ];

  const stats = [
    { number: '50+', label: 'Medical Specialties', icon: Award },
    { number: '100+', label: 'Expert Doctors', icon: Users },
    { number: '24/7', label: 'Emergency Care', icon: Clock },
    { number: '95%', label: 'Patient Satisfaction', icon: Heart }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary-600">Services</span>
            </h1>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare services delivered with compassion, expertise, and the latest medical technology.
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

      {/* Main Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of medical services to meet all your healthcare needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`${service.bgColor} rounded-lg p-6 hover:shadow-lg transition-shadow`}>
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mb-4`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Medical Specialties</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Our team of specialists provides expert care in various medical fields.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <specialty.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{specialty.name}</h3>
                <p className="text-gray-600 text-sm">{specialty.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Prana Hospital?</h2>
            <p className="text-base opacity-90">
              Experience healthcare excellence with our commitment to quality and patient care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Care</h3>
              <p className="text-sm opacity-90">
                Board-certified physicians with years of experience in their specialties.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Technology</h3>
              <p className="text-sm opacity-90">
                State-of-the-art medical equipment and cutting-edge treatment options.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Patient-Centered</h3>
              <p className="text-sm opacity-90">
                Personalized care plans tailored to each patient's unique needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-sm opacity-90">
                Round-the-clock emergency care and support when you need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-sm text-gray-600 mb-8">
            Schedule an appointment or contact us to learn more about our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              to="/login"
              className="bg-white text-primary-600 border border-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
            >
              Patient Portal
            </Link>
          </div>
        </div>
      </section>

            <Footer />
    </div>
  );
};

export default ServicesPage; 