import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CREATIVE_ASSETS } from './creativeAssets';
import {
  Search,
  ChevronDown,
  Clock,
  Upload,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Box,
  RotateCw,
  Check,
  Maximize2
} from 'lucide-react';

export const MyTasksPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'awaiting' | 'revision'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickSubmit = () => {
    showToast('Quick Submission drawer opened. Drag files to queue immediate render passes.', 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Weekly Target */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            PRODUCTION QUEUE • Sprint 12 Cycles
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Production Tasks
            </h1>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              3 Active Jobs
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Weekly Target
              </div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">
                4 / 5 Delivered
              </div>
            </div>
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#0284c7]"
                  strokeDasharray="80, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={handleQuickSubmit}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Quick Submission</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Tabs & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-100 text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Tasks <span className="ml-1 text-slate-400">3</span>
          </button>
          <button
            onClick={() => setActiveTab('in_progress')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'in_progress'
                ? 'bg-slate-100 text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Progress <span className="ml-1 text-slate-400">2</span>
          </button>
          <button
            onClick={() => setActiveTab('awaiting')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'awaiting'
                ? 'bg-slate-100 text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Awaiting Review <span className="ml-1 text-slate-400">0</span>
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'revision'
                ? 'bg-slate-100 text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Needs Revision <span className="ml-1 text-rose-600 font-bold">1</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 flex-1 max-w-md justify-end">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, campaigns..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 border border-slate-200/80 outline-none focus:border-[#0284c7]"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 cursor-pointer">
            <span className="text-[11px] text-slate-400 font-bold">PRIORITY:</span>
            <span>All Priorities</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 3. Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tasks List (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Task 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200/60">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Urgent
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  URBANA Casbah Pulse 2025
                </span>
              </div>

              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-md">
                <Clock className="w-3 h-3" />
                <span>Today, 6:00 PM</span>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Casbah Parka 3D Turntable Animation
              </h2>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-100 shadow-2xs group">
              <img
                src={CREATIVE_ASSETS.casbahParka}
                alt="Casbah Parka"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex items-center justify-between text-[11px] text-white font-medium">
                <div className="flex items-center gap-2">
                  <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded font-mono">
                    9:16 Vertical Reel (1080x1920)
                  </span>
                  <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded font-mono">
                    16:9 4K Master
                  </span>
                </div>
                <div className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded font-mono flex items-center gap-1 text-cyan-400">
                  <Cpu className="w-3 h-3" />
                  <span>Octane GPU</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-cyan-600 inline-block animate-pulse" />
                  Production State: Compositing Passes
                </span>
                <span className="font-bold text-cyan-700">75%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full w-3/4" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Linked Brief:</span>
                <button
                  onClick={() => navigateTo('/creative/briefs')}
                  className="font-bold text-[#0284c7] hover:underline cursor-pointer"
                >
                  AI Studio Brief #042 - Berber Techwear
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigateTo('/creative/reviews')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Open Task Workspace
                </button>
                <button
                  onClick={() => navigateTo('/creative/reviews')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Render</span>
                </button>
              </div>
            </div>
          </div>

          {/* Task 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
                  <Box className="w-3.5 h-3.5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Revision Requested
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  URBANA Cycle 02 Feedback
                </span>
              </div>

              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>Due in 2 Days</span>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Casbah Oversized Hoodie 3D Render
              </h2>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold flex items-center justify-center">
                    SJ
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    Sarah Jenkins (Marketing Lead)
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400">1h ago</span>
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed pl-8">
                "Need stronger rim lighting to showcase the embroidery texture on the hood. The current angle flattens the Berber typography crest."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Round 2 Iteration • 2 Attachments attached</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigateTo('/creative/reviews')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  View Feedback
                </button>
                <button
                  onClick={() => navigateTo('/creative/reviews')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-xs cursor-pointer"
                >
                  Submit Revision
                </button>
              </div>
            </div>
          </div>

          {/* Task 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200/60">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Normal Priority
                </span>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  URBANA Capsule Launch
                </span>
              </div>

              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                <span>Nov 24, 2025</span>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Desert Techwear Capsule Teaser 3D Rig
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-2.5">
                <Box className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    RIG ARCHITECTURE
                  </div>
                  <div className="text-xs font-semibold text-slate-900 mt-0.5">
                    Cinema 4D Skeletal Cloth Bind
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    ASPECT RATIO
                  </div>
                  <div className="text-xs font-semibold text-slate-900 mt-0.5">
                    1:1 Square Feed + 4:5 Portrait
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Linked Brief:</span>
                <button
                  onClick={() => navigateTo('/creative/briefs')}
                  className="font-bold text-[#0284c7] hover:underline cursor-pointer"
                >
                  AI Studio Brief #038 - Capsule Teaser
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigateTo('/creative/tasks')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Open Task Workspace
                </button>
                <button
                  onClick={() => navigateTo('/creative/tasks')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload Draft</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Studio GPU Farm */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Studio GPU Farm
                </h3>
              </div>
              <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200/70 px-2 py-0.5 rounded-full">
                Active Node 04
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    Assigned Cloud Engine
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">
                    2x NVIDIA RTX 4090 24GB
                  </div>
                </div>
                <Cpu className="w-4 h-4 text-cyan-600" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">VRAM Allocation</span>
                  <span className="font-bold text-slate-800">36.4 / 48.0 GB (76%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0284c7] rounded-full w-3/4" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Your background render for <strong className="text-slate-700">Casbah Parka 3D</strong> is queuing frame passes smoothly.
            </p>
          </div>

          {/* Assignment Policy */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
              <span>Assignment Policy</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Production assignments are managed by Marketing Leads and Studio Directors. Creatives hold full authorship over deliverables, progress updates, and revision submissions.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Logged as Alex Rivera (3D Artist)</span>
            </div>
          </div>

          {/* Deliverable Spec Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Deliverable Spec Checklist
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Deliver MP4 H.265 / ProRes 422HQ masters for video.
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Ensure color space conforms to ACEScg or sRGB Linear.
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Export transparent alpha render passes for packshots.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};