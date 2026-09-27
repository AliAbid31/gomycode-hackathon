import React, { useState, type FormEvent } from 'react';
import {
  Layers,
  Zap,
  TrendingUp,
  Palette,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { api } from '../../services/api';

interface LoginPageProps {
  onNavigate?: (route: 'login' | 'signup' | 'forgot-password') => void;
  onLoginSuccess?: (user: unknown) => void;
}

export default function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your work email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.auth.login(email.trim(), password);

      // Store token & user
      localStorage.setItem('markai_token', response.data.token);
      localStorage.setItem('markai_user', JSON.stringify(response.data.user));

      if (onLoginSuccess) {
        onLoginSuccess(response.data.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials. You can use a 1-Click Demo card above.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = (type: 'marketing' | 'creative') => {
    setError(null);
    if (type === 'marketing') {
      setEmail('marketing@markai.demo');
      setPassword('Marketing123!');
    } else {
      setEmail('creative@markai.demo');
      setPassword('Creative123!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.08)] border border-slate-100 p-8 sm:p-9 w-full max-w-[430px] text-center transition-all">
        {/* Top Logo Icon */}
        <div className="w-13 h-13 mx-auto rounded-2xl bg-gradient-to-b from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-3.5">
          <Layers className="w-6 h-6 stroke-[2.2]" />
        </div>

        {/* Title with Enterprise Badge */}
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Mark<span className="text-[#0284c7]">Ai</span>
          </h1>
          <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 border border-sky-200/80 rounded-full px-2.5 py-0.5 tracking-wide">
            v2.4 Enterprise
          </span>
        </div>

        {/* Subtitles */}
        <h2 className="text-base font-bold text-slate-800 mt-2">Welcome to MarkAi</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-[300px] mx-auto leading-relaxed">
          The unified AI marketing & creative collaboration workspace
        </p>

        {/* 1-Click Demo Access Box */}
        <div className="bg-[#f0f9ff]/70 border border-sky-100/90 rounded-2xl p-3.5 mt-5 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-800">
              <Zap className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
              <span className="text-[10px] font-bold tracking-wider uppercase">
                1-CLICK INSTANT DEMO ACCESS
              </span>
            </div>
            <span className="text-[11px] font-semibold text-sky-600">Sandbox Ready</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5">
            {/* Marketing Demo Card */}
            <button
              type="button"
              onClick={() => handleFillDemo('marketing')}
              className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-xs hover:border-sky-300 hover:shadow-sm text-left transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                  Marketing Team
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-1">marketing@markai.demo</p>
            </button>

            {/* Creative Demo Card */}
            <button
              type="button"
              onClick={() => handleFillDemo('creative')}
              className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-xs hover:border-sky-300 hover:shadow-sm text-left transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <div className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                  Creative Team
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-1">creative@markai.demo</p>
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 text-left font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-left">
          {/* Work Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                placeholder="••••••••••••"
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
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-sky-600 border-slate-300 focus:ring-sky-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[11px] text-slate-600">Remember me (30d)</span>
            </label>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('forgot-password')}
              className="text-[11px] font-medium text-sky-600 hover:text-sky-700 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] hover:opacity-95 shadow-md shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs tracking-wide cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In to Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Link to Sign Up */}
        <p className="mt-4 text-xs text-slate-500">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('signup')}
            className="font-semibold text-sky-600 hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 mt-6 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-sky-600" />
            <span>SOC2 Type II</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-sky-600" />
            <span>256-bit AES</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-sky-600" />
            <span>Private AI Mesh</span>
          </div>
        </div>

        {/* Cluster Status Line */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-600 mt-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>US-East-1 Production Cluster: Active</span>
        </div>
      </div>
    </div>
  );
}