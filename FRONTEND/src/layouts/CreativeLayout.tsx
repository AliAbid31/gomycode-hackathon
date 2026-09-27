import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ListTodo,
  FileText,
  RotateCcw,
  CheckCircle2,
  ArrowRightLeft,
  LogOut,
  Bell,
} from 'lucide-react';

interface CreativeLayoutProps {
  children: React.ReactNode;
}

export const CreativeLayout: React.FC<CreativeLayoutProps> = ({ children }) => {
  const { currentRoute, navigateTo, currentUser, loginAs, logout } = useApp();
  const navItems = [
    { label: 'Dashboard', route: '/creative/dashboard', icon: LayoutDashboard },
    { label: 'My Tasks', route: '/creative/tasks', icon: ListTodo },
    { label: 'Creative Briefs', route: '/creative/briefs', icon: FileText },
    { label: 'Review & Revisions', route: '/creative/reviews', icon: RotateCcw },
    { label: 'Completed Work', route: '/creative/completed', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-800 antialiased">
      <aside className="w-60 bg-white border-r border-slate-200/80 flex flex-col shrink-0 sticky top-0 h-screen select-none z-20">
        <div className="p-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">Creative Studio</div>
          </div>
          <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">v2.4</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ label, route, icon: Icon }) => {
            const active = currentRoute === route;
            return (
              <button key={route} type="button" onClick={() => navigateTo(route)} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${active ? 'bg-[#0284c7] text-white shadow-sm shadow-sky-600/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-100 space-y-2">
          <button type="button" onClick={() => loginAs('marketing')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100">
            <ArrowRightLeft className="w-3.5 h-3.5" /> Switch to Marketing
          </button>
          <button type="button" onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50">
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div>
            <div className="text-xs font-bold text-slate-900">Creative Operations</div>
            <div className="text-[10px] text-slate-400">URBANA production workspace</div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl"><Bell className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900">{currentUser?.name || 'Alex Rivera'}</div>
                <div className="text-[10px] text-sky-600 font-semibold">Creative Team</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black">AR</div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};
