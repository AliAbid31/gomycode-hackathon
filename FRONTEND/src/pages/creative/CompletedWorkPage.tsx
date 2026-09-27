import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CREATIVE_ASSETS } from './creativeAssets';
import {
  Search,
  Calendar,
  ChevronDown,
  Download,
  CheckCircle2,
  ArrowRight,
  Archive,
  TrendingUp,
  ShieldCheck,
  HardDrive,
  Award
} from 'lucide-react';

export const CompletedWorkPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | '3d' | 'motion' | 'stills'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownload = (pkgName: string) => {
    showToast(`Preparing cryptographically signed archive for download: ${pkgName}`, 'success');
  };

  return (
    <div className="space-y-6 pb-14">
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            CREATIVE ARCHIVE // ALEX RIVERA • URBANA Studio Vault
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Completed & Approved Work
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            14 Assets Approved • 100% Quality Rating • All production master files packaged & cryptographically signed
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4 text-xs font-semibold">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Sign-off Time</div>
              <div className="font-bold text-slate-900 text-xs mt-0.5">18.4 hrs</div>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Hub Sync Rate</div>
              <div className="font-bold text-[#0284c7] text-xs mt-0.5">100% Synced</div>
            </div>
          </div>

          <button
            onClick={() => showToast('Batch archiving 14 approved master packages to cold storage vault.', 'info')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Archive className="w-4 h-4" />
            <span>Batch Archive</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search approved..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 border border-slate-200/80 outline-none focus:border-[#0284c7]"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <span className="text-slate-400 text-[11px] font-bold">Brand:</span>
            <span>URBANA (All Capsules)</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Oct 1 – Nov 30, 2024</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-slate-100 text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All (14)
          </button>
          <button
            onClick={() => setActiveFilter('3d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === '3d'
                ? 'bg-slate-100 text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3D Renders (10)
          </button>
          <button
            onClick={() => setActiveFilter('motion')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'motion'
                ? 'bg-slate-100 text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Motion (4)
          </button>
          <button
            onClick={() => setActiveFilter('stills')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'stills'
                ? 'bg-slate-100 text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stills (4)
          </button>
        </div>
      </div>

      {/* 3. Completed Work Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-100 shadow-2xs group">
              <img
                src={CREATIVE_ASSETS.casbahParka}
                alt="Casbah Parka 3D Turntable"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between text-[11px] font-semibold">
                <span className="bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded font-mono">
                  3D Turntable Master
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 bg-emerald-500/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-full font-bold text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Live in Production
                  </span>
                  <span className="bg-black/60 backdrop-blur-xs text-white/90 px-2 py-0.5 rounded font-mono text-[10px]">
                    Asset Hub #URB-4091
                  </span>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-2.5 flex items-center justify-between text-[11px] text-white/90 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Synced to Asset Hub & Live on Instagram
                </span>
                <span className="font-mono text-white/70">00:15 Loop</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>URBANA Technical Outerwear</span>
                <span className="text-[#0284c7]">Sprint 11 Final</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Casbah Parka 3D Turntable Render
              </h3>

              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                  SJ
                </div>
                <div className="text-xs text-slate-700">
                  Approved by <strong className="text-slate-900">Sarah Jenkins (Marketing VP)</strong>{' '}
                  <span className="text-slate-400 text-[11px]">
                    Nov 15, 2024 at 10:42 UTC • 1st Review Approval
                  </span>{' '}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline ml-0.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Master Codec</div>
                  <div className="font-mono text-slate-800 font-semibold text-xs mt-0.5">
                    ProRes 422 HQ
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">3840x2160 • 60fps</div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Distribution Cut</div>
                  <div className="font-mono text-slate-800 font-semibold text-xs mt-0.5">
                    9:16 Social Reel
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">H.265 • 1080x1920</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Opening 3D viewport canvas for Casbah Parka...', 'info')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-xs cursor-pointer"
              >
                View Full Asset
              </button>
              <button
                onClick={() => handleDownload('Casbah_Parka_3D_Master_Package_1.8GB.zip')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Package</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};