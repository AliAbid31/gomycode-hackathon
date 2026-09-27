import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CREATIVE_ASSETS } from './creativeAssets';
import {
  Upload,
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  RotateCw,
  Box,
  MessageSquare,
  History,
  SlidersHorizontal,
  ArrowUpRight,
  MapPin,
  X
} from 'lucide-react';

export const CreativeDashboardPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('URBANA — Casbah Parka 3D Turntable Animation');
  const [uploadNote, setUploadNote] = useState('');

  const handleOpenUpload = (title: string) => {
    setModalTitle(title);
    setUploadNote('');
    setShowUploadModal(true);
  };

  const handleConfirmUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUploadModal(false);
    showToast(`Asset package submitted for review: ${modalTitle}`, 'success');
  };

  return (
    <div className="space-y-7 pb-10">
      {/* 1. Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome back, Alex 👋
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100/90 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Active on 2 URBANA tasks
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-3xl leading-relaxed">
            Spring release countdown is on. Your 3D turntable renders are slated for primary deployment across flagship paid channels.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleOpenUpload('URBANA — Casbah Parka 3D Turntable')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Work for Review</span>
          </button>
          <button
            onClick={() => navigateTo('/creative/tasks')}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Filter Tasks"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        {/* Assigned */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Assigned
            </span>
            <RotateCw className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-slate-900">3</div>
            <div className="text-xs text-slate-500 font-medium">Active tasks</div>
          </div>
        </div>

        {/* Due This Week */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Due This Week
            </span>
            <span className="text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60 px-1.5 py-0.5 rounded">
              Urgent
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-slate-900">1</div>
            <div className="text-xs font-semibold text-rose-600">Due today, 6:00 PM</div>
          </div>
        </div>

        {/* Under Review */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Under Review
            </span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-slate-900">1</div>
            <div className="text-xs text-slate-500 font-medium">Marketing review</div>
          </div>
        </div>

        {/* Revisions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Revisions
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-slate-900">1</div>
            <div className="text-xs text-slate-500 font-medium">From Sarah J.</div>
          </div>
        </div>

        {/* Passed */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Passed
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-slate-900">14</div>
            <div className="text-xs text-slate-500 font-medium">Assets to Hub</div>
          </div>
        </div>
      </div>

      {/* 3. Active Workstreams (Kanban Snapshot) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Active Workstreams</h2>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200/60 px-2 py-0.5 rounded-full">
              Kanban Snapshot
            </span>
          </div>
          <button
            onClick={() => navigateTo('/creative/tasks')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs cursor-pointer transition-colors"
          >
            Filter by Sprint
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Casbah Parka 3D Turntable */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                  <Clock className="w-3 h-3 text-rose-500" />
                  Due Today 6:00 PM
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  Brief Approved
                </span>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-100 group">
                <img
                  src={CREATIVE_ASSETS.casbahParka}
                  alt="Casbah Parka 3D Turntable"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium">
                    <RotateCw className="w-3 h-3 animate-spin text-cyan-400" />
                    <span>Turntable 120fps Preview</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Sprint 12 • 3D Motion
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                  URBANA — Casbah Parka 3D Turntable Animation
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  4K ProRes 422 & 1080x1920 MP4 for Flagship E-Commerce and Meta Video placement.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium text-[11px]">Render Execution</span>
                  <span className="font-bold text-purple-700 text-xs">80%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0284c7] to-sky-500 rounded-full w-4/5" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleOpenUpload('URBANA — Casbah Parka 3D Turntable Animation')}
                className="flex-1 py-2 px-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
              <button
                onClick={() => navigateTo('/creative/briefs')}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Brief</span>
              </button>
            </div>
          </div>

          {/* Card 2: Berber Geometry Kinetic Typography */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
                  <Clock className="w-3 h-3 text-sky-500" />
                  Submitted 3h ago
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                  In Review
                </span>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-100 group">
                <img
                  src={CREATIVE_ASSETS.kineticTypography}
                  alt="Berber Geometry Kinetic Typography"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                    v2.4 Final Cut
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Sprint 12 • Dynamic Typography
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                  URBANA — Berber Geometry Kinetic Typography
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Editorial social teaser sequence with dynamic pacing. Reviewer: Marcus Cole (Growth Lead).
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                  MC
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    Evaluating sound sync & aspect variants
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Expected feedback turnaround: ~2 hours
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => navigateTo('/creative/reviews')}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>View Notes</span>
              </button>
              <button
                onClick={() => navigateTo('/creative/reviews')}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>Versions (3)</span>
              </button>
            </div>
          </div>

          {/* Card 3: Casbah Hooded Vest Macro Fabric */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  Revision Requested
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  v1.2 Flagged
                </span>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-100 group">
                <img
                  src={CREATIVE_ASSETS.macroFabric}
                  alt="Casbah Hooded Vest Macro Fabric"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2">
                  <span className="bg-amber-600/90 text-white text-[10px] px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />
                    1 Markup pin
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Sprint 12 • Macro Textures
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                  Casbah Hooded Vest Macro Fabric
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Still 8K render package for packaging inserts and billboard digital display.
                </p>
              </div>

              <div className="bg-[#FFFBEB] border border-amber-200/80 rounded-xl p-3 text-xs">
                <div className="text-[11px] font-bold text-amber-900">
                  Sarah Jenkins (Creative Director)
                </div>
                <div className="text-amber-800 text-[11px] italic mt-0.5 leading-relaxed">
                  "Adjust fabric tension on zipper seam; normal maps look slightly stretched near collar fold."
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => navigateTo('/creative/reviews')}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Box className="w-3.5 h-3.5 text-slate-500" />
                <span>Open in 3D Hub</span>
              </button>
              <button
                onClick={() => navigateTo('/creative/reviews')}
                className="flex-1 py-2 px-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Re-upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Middle Section: Creative Briefs & Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Creative Briefs</h3>
                <p className="text-[11px] text-slate-500">Marketing approved & production ready</p>
              </div>
              <button
                onClick={() => navigateTo('/creative/briefs')}
                className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              <div
                onClick={() => navigateTo('/creative/briefs')}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      URBANA 2025 Lookbook Motion
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Approved by Sarah Jenkins • 4 Deliverables
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => navigateTo('/creative/briefs')}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Spring Minimalist CGI Set
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Approved by Marcus Cole • 6 Stills
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => navigateTo('/creative/briefs')}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <RotateCw className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      TikTok Motion Typography Cuts
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Approved by Sarah Jenkins • 3 Sequences
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Production Velocity Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Weekly Production Velocity</h3>
                <p className="text-[11px] text-slate-500">Renders and final cuts delivered this sprint</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#0284c7]" />
                  3D Stills
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
                  Motion Loops
                </span>
              </div>
            </div>

            <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2">
              {[
                { day: 'Mon', h1: '40%', h2: '25%' },
                { day: 'Tue', h1: '60%', h2: '45%' },
                { day: 'Wed', h1: '85%', h2: '65%' },
                { day: 'Thu', h1: '75%', h2: '90%' },
                { day: 'Fri', h1: '95%', h2: '70%' },
                { day: 'Sat', h1: '15%', h2: '10%' },
                { day: 'Sun', h1: '10%', h2: '15%' }
              ].map((bar) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1 h-24">
                    <div
                      style={{ height: bar.h1 }}
                      className="w-2.5 bg-[#0284c7] rounded-t-sm transition-all"
                    />
                    <div
                      style={{ height: bar.h2 }}
                      className="w-2.5 bg-cyan-400 rounded-t-sm transition-all"
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-600 font-medium">
              Sprint Velocity: <strong className="text-slate-900">+18%</strong> vs last cycle
            </span>
            <span className="font-bold text-[#0284c7]">
              14 of 18 Target Outputs completed
            </span>
          </div>
        </div>
      </div>

      {/* 5. Recently Approved Work Shelf */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recently Approved Work Shelf</h2>
            <p className="text-xs text-slate-500">Live in brand Asset Hub for omnichannel campaigns</p>
          </div>
          <button
            onClick={() => navigateTo('/creative/completed')}
            className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Asset Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden group">
            <div className="relative aspect-square bg-slate-900 overflow-hidden">
              <img
                src={CREATIVE_ASSETS.aeroSneaker}
                alt="Aero Sneaker 3D Exploded"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                  ✓ Approved
                </span>
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                Aero Sneaker 3D Exploded
              </h4>
              <div className="text-[11px] text-slate-400 mt-0.5">Asset #3094 • 4K PNG</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden group">
            <div className="relative aspect-square bg-slate-900 overflow-hidden">
              <img
                src={CREATIVE_ASSETS.kineticTypography}
                alt="Kinetic Brand Reel Teaser"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                  ✓ Approved
                </span>
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                Kinetic Brand Reel Teaser
              </h4>
              <div className="text-[11px] text-slate-400 mt-0.5">Asset #3068 • ProRes 4444</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden group">
            <div className="relative aspect-square bg-slate-900 overflow-hidden">
              <img
                src={CREATIVE_ASSETS.flaskHero}
                alt="Flask 3D Product Hero 01"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                  ✓ Approved
                </span>
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                Flask 3D Product Hero 01
              </h4>
              <div className="text-[11px] text-slate-400 mt-0.5">Asset #3082 • 8K EXR & TIFF</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden group">
            <div className="relative aspect-square bg-slate-900 overflow-hidden">
              <img
                src={CREATIVE_ASSETS.silkDrape}
                alt="Procedural Silk Drape Sim"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                  ✓ Approved
                </span>
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                Procedural Silk Drape Sim
              </h4>
              <div className="text-[11px] text-slate-400 mt-0.5">Asset #3079 • Alembic & MP4</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#0284c7]" />
                <h3 className="text-base font-bold text-slate-900">Submit Work for Review</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmUpload} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deliverable Task
                </label>
                <input
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deliverable File Package (.MP4, .EXR, .ZIP)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <Upload className="w-6 h-6 text-[#0284c7] mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-slate-800">
                    Casbah_Parka_3D_Master_Render_v1.0.mp4
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">248.5 MB • 4K ProRes 422HQ</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes for Marketing Lead & Brand Director
                </label>
                <textarea
                  rows={3}
                  value={uploadNote}
                  onChange={(e) => setUploadNote(e.target.value)}
                  placeholder="e.g. Finished turntable execution with ACEScg color space and clean alpha channels."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] cursor-pointer shadow-xs"
                >
                  Submit Revision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};