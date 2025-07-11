import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Heart, 
  Phone, 
  MapPin, 
  Calendar, 
  UserCheck,
  Building,
  Stethoscope,
  Pill,
  UserPlus,
  Shield,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyMsg, setShowVerifyMsg] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState('');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();

  const password = watch('password');
  const selectedRole = watch('role');

  // Role-specific data
  const departments = [
    'Emergency Medicine',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Surgery',
    'Radiology',
    'Oncology',
    'Psychiatry',
    'Dermatology',
    'Ophthalmology',
    'ENT',
    'Gynecology',
    'Urology',
    'Gastroenterology',
    'Pulmonology',
    'Endocrinology',
    'Nephrology',
    'Hematology',
    'General Medicine'
  ];

  const specializations = [
    'Cardiovascular Surgery',
    'Interventional Cardiology',
    'Neurological Surgery',
    'Pediatric Surgery',
    'Orthopedic Surgery',
    'Plastic Surgery',
    'Thoracic Surgery',
    'Vascular Surgery',
    'General Surgery',
    'Emergency Medicine',
    'Internal Medicine',
    'Family Medicine',
    'Pediatrics',
    'Psychiatry',
    'Dermatology',
    'Ophthalmology',
    'ENT',
    'Gynecology',
    'Urology',
    'Radiology',
    'Anesthesiology',
    'Pathology',
    'Oncology',
    'Pulmonology',
    'Endocrinology',
    'Nephrology',
    'Hematology',
    'Gastroenterology',
    'Rheumatology',
    'Infectious Disease'
  ];

  const experienceOptions = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '11-15 years',
    '16-20 years',
    'More than 20 years'
  ];

  const handleRoleSelect = (role) => {
    setValue('role', role);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setAlreadyExists(false);
    try {
      const result = await registerUser(data);
      if (result.success) {
        setShowVerifyMsg(true);
        setVerifyMsg(result.message);
        
        // Check if user needs approval
        if (result.needsApproval) {
          toast.success(result.message || 'Registration successful! Please wait for admin approval.');
        } else if (result.emailSent) {
          toast.success(result.message || 'Registration successful! Please check your email for verification.');
        } else {
          toast.success(result.message || 'Registration successful! Please contact admin for account activation.');
        }
      } else if (result.error && result.error.toLowerCase().includes('already exists')) {
        setAlreadyExists(true);
      } else if (result.error && result.error.toLowerCase().includes('phone number already registered')) {
        toast.error('Phone number already registered. Please use a different phone number.');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'doctor':
        return <Stethoscope className="h-5 w-5" />;
      case 'nurse':
        return <Heart className="h-5 w-5" />;
      case 'receptionist':
        return <UserCheck className="h-5 w-5" />;
      case 'pharmacy':
        return <Pill className="h-5 w-5" />;
      case 'patient':
        return <User className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'doctor':
        return 'Medical professionals who diagnose and treat patients';
      case 'nurse':
        return 'Healthcare professionals providing patient care and support';
      case 'receptionist':
        return 'Front desk staff managing appointments and patient registration';
      case 'pharmacy':
        return 'Pharmacy staff managing medications and prescriptions';
      case 'patient':
        return 'Individuals seeking medical care and health services';
      default:
        return 'Select your role to continue';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-5xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-6 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Heart className="h-12 w-12 text-white relative z-10" />
            </div>
            <span className="text-3xl font-bold font-righteous text-gray-900 ml-3 group-hover:text-primary-600 transition-colors duration-300">
              Prana Hospital
            </span>
          </Link>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Join Our Healthcare Family
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your account to access personalized healthcare services and manage your health journey with us.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Registration Form */}
        {alreadyExists ? (
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center mx-auto flex flex-col items-center justify-center border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Account Already Exists</h2>
            <p className="text-gray-700 mb-6">An account with this email or phone number already exists. Please sign in to your existing account.</p>
            <Link to="/login" className="btn-primary w-full">
              Go to Login
            </Link>
          </div>
        ) : showVerifyMsg ? (
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center mx-auto flex flex-col items-center justify-center border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Registration Successful!</h2>
            <p className="text-gray-700 mb-4">{verifyMsg || 'Please check your email to verify your account.'}</p>
            {verifyMsg && verifyMsg.toLowerCase().includes('admin approval') ? (
              <div className="space-y-4">
                <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                  ⚠️ Your account is pending admin approval. You will be notified once approved.
                </p>
                <Link to="/waiting-approval" className="btn-primary w-full">
                  Go to Waiting Page
                </Link>
              </div>
            ) : (
              <Link to="/login" className="btn-primary w-full">
                Go to Login
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Role Selection */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Role</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {[
                    { value: 'patient', label: 'Patient', icon: User, color: 'bg-blue-50 border-blue-200 text-blue-700' },
                    { value: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'bg-green-50 border-green-200 text-green-700' },
                    { value: 'nurse', label: 'Nurse', icon: Heart, color: 'bg-red-50 border-red-200 text-red-700' },
                    { value: 'receptionist', label: 'Receptionist', icon: UserCheck, color: 'bg-purple-50 border-purple-200 text-purple-700' },
                    { value: 'pharmacy', label: 'Pharmacy', icon: Pill, color: 'bg-orange-50 border-orange-200 text-orange-700' }
                  ].map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleRoleSelect(role.value)}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                        selectedRole === role.value 
                          ? `${role.color} ring-2 ring-primary-500` 
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <role.icon className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{role.label}</span>
                    </button>
                  ))}
                </div>
                {selectedRole && (
                  <p className="mt-4 text-sm text-gray-600 max-w-md mx-auto">
                    {getRoleDescription(selectedRole)}
                  </p>
                )}
                {errors.role && (
                  <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              {/* Hidden role field for form validation */}
              <input
                {...register('role', {
                  required: 'Please select a role'
                })}
                type="hidden"
              />

              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('name', {
                          required: 'Full name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          }
                        })}
                        type="text"
                        autoComplete="name"
                        className="input-field pl-12"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        autoComplete="email"
                        className="input-field pl-12"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9+\-\s()]{10,}$/,
                            message: 'Invalid phone number'
                          }
                        })}
                        type="tel"
                        autoComplete="tel"
                        className="input-field pl-12"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Address Field */}
                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('address')}
                        type="text"
                        className="input-field pl-12"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Role-specific Fields */}
              {selectedRole && selectedRole !== 'patient' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Professional Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Department Field */}
                    <div className="space-y-2">
                      <label htmlFor="department" className="block text-sm font-semibold text-gray-700">
                        Department
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          {...register('department', {
                            required: selectedRole !== 'patient' ? 'Department is required' : false
                          })}
                          className="input-field pl-12"
                        >
                          <option value="">Select department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      {errors.department && (
                        <p className="text-sm text-red-600">{errors.department.message}</p>
                      )}
                    </div>

                    {/* Specialization Field (Doctors only) */}
                    {selectedRole === 'doctor' && (
                      <div className="space-y-2">
                        <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700">
                          Specialization
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <GraduationCap className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            {...register('specialization', {
                              required: 'Specialization is required'
                            })}
                            className="input-field pl-12"
                          >
                            <option value="">Select specialization</option>
                            {specializations.map((spec) => (
                              <option key={spec} value={spec}>{spec}</option>
                            ))}
                          </select>
                        </div>
                        {errors.specialization && (
                          <p className="text-sm text-red-600">{errors.specialization.message}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Experience Field (Doctors only) */}
                    {selectedRole === 'doctor' && (
                      <div className="space-y-2">
                        <label htmlFor="experience" className="block text-sm font-semibold text-gray-700">
                          Years of Experience
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            {...register('experience', {
                              required: 'Experience is required'
                            })}
                            className="input-field pl-12"
                          >
                            <option value="">Select experience</option>
                            {experienceOptions.map((exp) => (
                              <option key={exp} value={exp}>{exp}</option>
                            ))}
                          </select>
                        </div>
                        {errors.experience && (
                          <p className="text-sm text-red-600">{errors.experience.message}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Patient-specific fields */}
              {selectedRole === 'patient' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Health Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('dateOfBirth', {
                            required: 'Date of birth is required'
                          })}
                          type="date"
                          className="input-field pl-12"
                        />
                      </div>
                      {errors.dateOfBirth && (
                        <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">
                        Gender
                      </label>
                      <select
                        {...register('gender', {
                          required: 'Gender is required'
                        })}
                        className="input-field"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-sm text-red-600">{errors.gender.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="bloodGroup" className="block text-sm font-semibold text-gray-700">
                        Blood Group
                      </label>
                      <select
                        {...register('bloodGroup', {
                          required: 'Blood group is required'
                        })}
                        className="input-field"
                      >
                        <option value="">Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                      {errors.bloodGroup && (
                        <p className="text-sm text-red-600">{errors.bloodGroup.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Security
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="input-field pl-12 pr-12"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: value => value === password || 'Passwords do not match'
                        })}
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="input-field pl-12 pr-12"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading || !selectedRole}
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Creating your account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create Account
                    </>
                  )}
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500 font-medium">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
