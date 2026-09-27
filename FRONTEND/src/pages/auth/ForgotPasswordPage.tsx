import React, { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Layers, Mail } from 'lucide-react';
import { api } from '../../services/api';

interface ForgotPasswordPageProps {
	onNavigate?: (route: 'login') => void;
}

export default function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
	const [email, setEmail] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		if (!email.trim()) {
			setError('Please enter your work email.');
			return;
		}

		setIsLoading(true);
		try {
			await api.auth.forgotPassword(email.trim());
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unable to request a password reset.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 flex items-center justify-center p-4 font-sans">
			<div className="bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(8,112,184,0.08)] p-8 w-full max-w-[430px]">
				<div className="w-13 h-13 mx-auto rounded-2xl bg-gradient-to-b from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
					<Layers className="w-6 h-6" />
				</div>
				<h1 className="text-2xl font-black text-slate-900 text-center mt-4">Reset your password</h1>
				<p className="text-xs text-slate-500 text-center mt-2 leading-relaxed">
					Enter your work email and we will send a secure reset link.
				</p>

				{error && <div className="mt-5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600">{error}</div>}
				{success && <div className="mt-5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">If the email exists, a reset link has been sent.</div>}

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<label className="block text-xs font-semibold text-slate-700">
						Work Email
						<div className="relative mt-1.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100">
							<Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
							<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@company.com" className="w-full bg-transparent pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none" />
						</div>
					</label>
					<button type="submit" disabled={isLoading || success} className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center gap-2 text-xs disabled:opacity-70">
						{isLoading ? 'Sending reset link...' : 'Send reset link'}
						{!isLoading && <ArrowRight className="w-3.5 h-3.5" />}
					</button>
				</form>

				<button type="button" onClick={() => onNavigate?.('login')} className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:underline">
					<ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
				</button>
			</div>
		</div>
	);
}
