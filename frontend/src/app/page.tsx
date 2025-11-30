// File: frontend/src/app/page.tsx
// This is the main landing/home page with login and signup

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Update the import path if the file is located elsewhere, for example:
import LoginForm from '../components/auth/LoginForm';
// Or, if using TypeScript path aliases, ensure your tsconfig.json has the correct "paths" mapping for '@'
import SignupForm from '@/components/auth/SignupForm';
import { GraduationCap, Users, Briefcase, MessageSquare, Shield, Globe } from 'lucide-react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const features = [
    {
      icon: Users,
      title: 'Connect with Alumni',
      description: 'Build meaningful professional relationships with graduates from your institution'
    },
    {
      icon: Briefcase,
      title: 'Job Opportunities',
      description: 'Access exclusive job postings and referrals from alumni in leading companies'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Discussion',
      description: 'Engage in college-specific forums and chat with verified members'
    },
    {
      icon: Shield,
      title: 'Verified Community',
      description: 'Secure, closed-loop network exclusively for your college community'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                Alumni Connect
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-2 text-sm text-slate-600"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Trusted by universities worldwide</span>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Welcome to your
                <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  professional community
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Connect with alumni, discover opportunities, and build your professional network within your college ecosystem.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex items-center space-x-8 pt-4 border-t border-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div>
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-slate-600">Active Alumni</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-slate-600">Companies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-slate-600">Colleges</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Auth Forms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Tab Switcher */}
              <div className="bg-slate-50 border-b border-slate-200 p-1 flex">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
                    isLogin
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
                    !isLogin
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Join Now
                </button>
              </div>

              {/* Form Container */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LoginForm />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SignupForm />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Terms */}
            <motion.p 
              className="text-center text-xs text-slate-500 mt-4 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              By continuing, you agree to Alumni Connect's{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-slate-600">
              © 2025 Alumni Connect. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}