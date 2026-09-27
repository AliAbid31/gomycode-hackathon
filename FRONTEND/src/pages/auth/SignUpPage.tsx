import React, { useState, type FormEvent } from 'react';
import {
  Layers,
  User,
  Mail,
  Building2,
  Lock,
  RotateCw,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/api';

interface SignUpPageProps {
  onNavigate?: (route: 'login' | 'signup') => void;
}

export default function SignUpPage({ onNavigate }: SignUpPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your work email.');
      return;
    }
    if (!workspaceName.trim()) {
      setError('Please enter your company or workspace name.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters with numbers & symbols.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    try {
      await api.auth.register(fullName.trim(), email.trim(), password);
      setSuccess(true);
      window.setTimeout(() => onNavigate?.('login'), 1400);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create your workspace.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.08)] border border-slate-100 p-8 sm:p-9 w-full max-w-[430px] text-center transition-all">
        {/* Top Logo Icon */}
        <div className="w-13 h-13 mx-auto rounded-2xl bg-gradient-to-b from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-3.5">
          <Layers className="w-6 h-6 stroke-[2.2]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Create your Mark<span className="text-[#0284c7]">Ai</span> workspace
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-[320px] mx-auto leading-relaxed">
          Start orchestrating your autonomous AI marketing fleets in minutes.
        </p>

        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={() => alert('Google authentication simulation: In demo mode, sign in with email.')}
          className="w-full mt-5 py-2.5 px-4 bg-white border border-slate-200/90 rounded-xl flex items-center justify-center gap-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/80" />
          </div>
          <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            OR SIGN UP WITH EMAIL
          </span>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 text-left font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 text-left font-medium">
            Workspace registered successfully! Redirecting to Sign In...
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative rounded-xl bg-slate-50/80 border border-slate-200/90 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 focus-within:bg-white transition-all">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-transparent pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Work Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Work Email
            </label>
            <div className="relative rounded-xl bg-slate-50/80 border border-slate-200/90 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 focus-within:bg-white transition-all">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-transparent pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Company / Workspace Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company / Workspace Name
            </label>
            <div className="relative rounded-xl bg-slate-50/80 border border-slate-200/90 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 focus-within:bg-white transition-all">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Building2 className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g. Urbana Apparel"
                className="w-full bg-transparent pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative rounded-xl bg-slate-50/80 border border-slate-200/90 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 focus-within:bg-white transition-all">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              At least 8 characters with numbers & symbols
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm Password
            </label>
            <div className="relative rounded-xl bg-slate-50/80 border border-slate-200/90 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 focus-within:bg-white transition-all">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <RotateCw className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded text-sky-600 border-slate-300 focus:ring-sky-500 focus:ring-offset-0 cursor-pointer"
            />
            <label htmlFor="agreeTerms" className="text-[11px] text-slate-600 leading-tight cursor-pointer">
              I agree to the{' '}
              <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-600 hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Primary CTA Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] hover:opacity-95 shadow-md shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs tracking-wide cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Link back to Sign In */}
        <p className="mt-4 text-xs text-slate-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('login')}
            className="font-semibold text-sky-600 hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}