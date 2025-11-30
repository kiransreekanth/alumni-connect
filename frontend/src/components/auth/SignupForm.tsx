// File: frontend/src/components/auth/SignupForm.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap, Loader2, Building2 } from 'lucide-react';

type UserRole = 'student' | 'alumni' | 'faculty';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
    collegeName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles: { value: UserRole; label: string; icon: any; description: string }[] = [
    { 
      value: 'student', 
      label: 'Student', 
      icon: GraduationCap,
      description: 'Currently enrolled in college'
    },
    { 
      value: 'alumni', 
      label: 'Alumni', 
      icon: User,
      description: 'Graduated from college'
    },
    { 
      value: 'faculty', 
      label: 'Faculty', 
      icon: Building2,
      description: 'Academic staff member'
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    } else if (!formData.email.endsWith('.edu') && !formData.email.includes('college')) {
      newErrors.email = 'Please use your institutional email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = 'College name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const authService = (await import('@/services/authService')).default;
      const response = await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role as 'student' | 'alumni' | 'faculty',
        collegeName: formData.collegeName,
      });
      
      if (response.success) {
        alert(response.message || 'Registration successful! Waiting for admin approval.');
        // Clear form
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
          collegeName: '',
        });
      }
    } catch (error: any) {
      setErrors({
        email: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Join your alumni network
        </h2>
        <p className="text-sm text-slate-600">
          Create an account to connect with your college community
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.fullName ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
            }`}
            placeholder="John Doe"
          />
        </div>
        {errors.fullName && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.fullName}
          </motion.p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Institutional Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
            }`}
            placeholder="john.doe@college.edu"
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.email}
          </motion.p>
        )}
        <p className="mt-1 text-xs text-slate-500">
          Use your official college email for verification
        </p>
      </div>

      {/* College Name */}
      <div>
        <label htmlFor="collegeName" className="block text-sm font-medium text-slate-700 mb-2">
          College/University Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building2 className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.collegeName ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
            }`}
            placeholder="Stanford University"
          />
        </div>
        {errors.collegeName && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.collegeName}
          </motion.p>
        )}
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          I am a
        </label>
        <div className="grid grid-cols-3 gap-2">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.value}
                type="button"
                onClick={() => handleRoleSelect(role.value)}
                className={`relative p-3 border-2 rounded-lg transition-all ${
                  formData.role === role.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon
                    className={`h-6 w-6 mb-1 ${
                      formData.role === role.value ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      formData.role === role.value ? 'text-blue-700' : 'text-slate-700'
                    }`}
                  >
                    {role.label}
                  </span>
                </div>
                {formData.role === role.value && (
                  <motion.div
                    layoutId="roleIndicator"
                    className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        {errors.role && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600"
          >
            {errors.role}
          </motion.p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`block w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.password ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
            }`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            )}
          </button>
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.password}
          </motion.p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`block w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'
            }`}
            placeholder="Re-enter your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            ) : (
              <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.confirmPassword}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Creating account...
          </span>
        ) : (
          'Create Account'
        )}
      </motion.button>

      <p className="text-xs text-center text-slate-600">
        By signing up, you confirm that your institutional email will be verified by your college admin before gaining access.
      </p>
    </form>
  );
}