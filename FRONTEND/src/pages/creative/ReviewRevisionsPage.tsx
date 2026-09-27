import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CREATIVE_ASSETS } from './creativeAssets';
import {
  Play,
  Pause,
  Upload,
  Send,
  CheckCircle2,
  Eye,
  MapPin,
  ArrowRight,
  Download,
  Check,
  SplitSquareVertical,
  Activity
} from 'lucide-react';

export const ReviewRevisionsPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'needs_revision' | 'under_review' | 'approved'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [notifySlack, setNotifySlack] = useState(true);
  const [autoArchive, setAutoArchive] = useState(true);
  const [revisionNotes, setRevisionNotes] = useState(
    'Addressed rim lighting by increasing key backlight by 20% and repositioned camera framing to preserve 140px vertical clearance for zipper puller on 9:16 mobile crop.'
  );

  const handleSubmitRevision = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Revision v2.0 successfully submitted to Sarah Jenkins for approval.', 'success');
  };

  return (
    <div className="space-y-6 pb-14">
      {/* 1. Header & Title Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            SPRINT 12 DELIVERABLES • Real-time Feedback Pipeline
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Review & Revisions Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Collaborate directly with Brand & Marketing Directors. Review precision visual pins, iterate render states, and submit production-ready revisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Items <span className="ml-1 px-1.5 py-0.2 bg-black/20 rounded-full text-[10px]">4</span>
          </button>
          <button
            onClick={() => setActiveTab('needs_revision')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'needs_revision'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100'
            }`}
          >
            Needs Revision <span className="ml-1 text-[11px] font-bold">1</span>
          </button>
          <button
            onClick={() => setActiveTab('under_review')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'under_review'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'bg-sky-50 text-sky-800 border border-sky-200/80 hover:bg-sky-100'
            }`}
          >
            Under Review <span className="ml-1 text-[11px] font-bold">1</span>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'approved'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100'
            }`}
          >
            Approved <span className="ml-1 text-[11px] font-bold">2</span>
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Revision Detail & Proofing (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Revision Requested
                </span>
                <span className="text-[10px] font-mono font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md">
                  Version 2.0 In Progress
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPins(!showPins)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Compare v1</span>
                </button>
                <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
                  •••
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Casbah Hooded Vest Macro Fabric 3D
              </h2>
              <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-700">URBANA</span>
                <span className="text-slate-300">/</span>
                <span>Casbah Pulse 2025 Campaign</span>
                <span className="text-slate-300">/</span>
                <span className="font-mono text-slate-600">Asset ID: #URB-3D-9482</span>
              </div>
            </div>

            {/* Sarah Jenkins Feedback Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center">
                    SJ
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Sarah Jenkins</span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded">
                        Reviewer
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Marketing Lead & Brand Director • Today, 2:15 PM
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  2 Feedback Pins Placed
                </span>
              </div>

              <blockquote className="text-xs text-slate-700 italic leading-relaxed border-l-2 border-amber-400 pl-3">
                "The fabric drape is impressive, but we need <strong className="text-slate-900 font-semibold">15% stronger rim lighting</strong> on the Berber chest embroidery to pop against dark mobile screens. Please also ensure the <strong className="text-slate-900 font-semibold">9:16 vertical crop doesn't clip the zipper puller</strong>."
              </blockquote>

              <div className="pt-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Suggested Adjustments:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white border border-slate-200 text-slate-700 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    Rim Key Intensity: +15-20%
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white border border-slate-200 text-slate-700 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Safe-zone Y-pad: 120px minimum
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white border border-slate-200 text-slate-700 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Micro-weave Gloss: 0.38
                  </span>
                </div>
              </div>
            </div>

            {/* Spatial Proofing & Comparative Frame */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                      <SplitSquareVertical className="w-4 h-4 text-[#0284c7]" />
                  <h3 className="text-xs font-bold text-slate-900">
                    Spatial Proofing & Comparative Frame (v1.0)
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                    Feedback Pin #1: Lighting
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
                    Feedback Pin #2: Aspect Framing
                  </span>
                </div>
              </div>

              {/* Video with Pins */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md group">
                <img
                  src={CREATIVE_ASSETS.macroFabric}
                  alt="Spatial Proofing Frame"
                  className="w-full h-full object-cover"
                />

                {showPins && (
                  <div className="absolute top-[28%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative group/pin">
                      <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-lg ring-4 ring-amber-500/30 animate-bounce cursor-pointer">
                        1
                      </div>
                      <div className="absolute left-8 top-0 w-64 bg-slate-900/95 backdrop-blur-md text-white p-2.5 rounded-xl border border-amber-500/40 shadow-xl text-left pointer-events-none transition-all">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Pin 1: Chest Embroidery
                        </div>
                        <div className="text-xs font-medium mt-0.5 leading-snug">
                          Need +15% rim glow highlight on the gold weave edge.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {showPins && (
                  <div className="absolute bottom-[30%] left-[38%] -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative group/pin">
                      <div className="w-7 h-7 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center shadow-lg ring-4 ring-cyan-500/30 cursor-pointer">
                        2
                      </div>
                      <div className="absolute left-8 top-0 w-64 bg-slate-900/95 backdrop-blur-md text-white p-2.5 rounded-xl border border-cyan-500/40 shadow-xl text-left pointer-events-none transition-all">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                          Pin 2: Puller Safe-Zone
                        </div>
                        <div className="text-xs font-medium mt-0.5 leading-snug">
                          Zipper tab is currently cut off when masked to 1080x1920.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center gap-1.5 font-semibold cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>Play Spin</span>
                    </button>
                    <button
                      onClick={() => showToast('Switched to split side-by-side mode (v1.0 vs v2.0)', 'info')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-xs font-semibold cursor-pointer"
                    >
                      Side-by-Side Compare
                    </button>
                  </div>

                  <div className="font-mono text-[11px] text-white/80">
                    FPS: 60.00 <span className="mx-1">•</span> Frame: 142/350
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverable Re-upload & Patch Notes */}
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900">
                  Deliverable Re-upload & Patch Notes
                </h3>
                <span className="text-[10px] font-mono text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">
                  Accepts .MP4, .MOV, .EXR, .PNG (Max 4GB)
                </span>
              </div>

              <div className="border-2 border-dashed border-slate-200 hover:border-[#0284c7] rounded-2xl p-6 text-center bg-slate-50/60 hover:bg-sky-50/60 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center mx-auto mb-2 shadow-2xs">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Click to replace deliverable or drop revision file here
                </div>
                <p className="text-[11px] text-slate-400 mt-1 max-w-md mx-auto">
                  Your upload will automatically generate an AI-assisted side-by-side color delta report for Sarah Jenkins.
                </p>

                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-900">
                    Casbah_Vest_Fabric_Macro_v2.0_RimBoost.mp4
                  </span>
                  <span className="text-slate-400">184.2 MB</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Revision Notes for Marketing Lead
                  </label>
                  <span className="text-[10px] text-slate-400">Markdown supported</span>
                </div>
                <textarea
                  rows={3}
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-[#0284c7]/20 focus:border-[#0284c7] leading-relaxed"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={notifySlack}
                      onChange={(e) => setNotifySlack(e.target.checked)}
                      className="rounded text-[#0284c7] focus:ring-[#0284c7]"
                    />
                    <span>Notify Sarah via Slack</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoArchive}
                      onChange={(e) => setAutoArchive(e.target.checked)}
                      className="rounded text-[#0284c7] focus:ring-[#0284c7]"
                    />
                    <span>Auto-archive v1.0</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Draft patch notes saved to workspace.', 'info')}
                    className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    Save Draft
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitRevision}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Revision to Marketing</span>
                </button>
              </div>
            </div>
          </div>

          {/* Luminance & Contrast Delta Audit */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-600" />
                <h3 className="text-xs font-bold text-slate-900">
                  Luminance & Contrast Delta Audit (v1 vs v2 Preview)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                AI Automated Check: Passed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Rim Edge Luminance
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-xl font-extrabold text-slate-900">+18.4%</div>
                  <div className="text-[11px] font-semibold text-emerald-600">Goal: +15%</div>
                </div>
                <div className="h-4 flex items-end gap-1 pt-1">
                  {[20, 35, 45, 60, 75, 85, 95].map((v, i) => (
                    <div
                      key={i}
                      style={{ height: `${v}%` }}
                      className="flex-1 bg-cyan-600 rounded-t-xs"
                    />
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Mobile 9:16 Padding
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-xl font-extrabold text-slate-900">144 px</div>
                  <div className="text-[11px] font-semibold text-emerald-600">Safe (&gt;120px)</div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-emerald-500 rounded-full w-4/5" />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Color Fidelity Index
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-xl font-extrabold text-slate-900">99.2%</div>
                  <div className="text-[11px] font-semibold text-slate-500">P3 Target</div>
                </div>
                <div className="h-4 flex items-end gap-1 pt-1">
                  {[90, 92, 94, 96, 98, 99, 100].map((v, i) => (
                    <div
                      key={i}
                      style={{ height: `${v}%` }}
                      className="flex-1 bg-[#0284c7] rounded-t-xs"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Version Audit Trail */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Version Audit Trail
              </h3>
              <span className="font-mono text-[10px] text-slate-400">Task #9482</span>
            </div>

            <div className="relative pl-5 border-l-2 border-slate-200 space-y-4">
              <div className="relative">
                <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">v2.0 In Revision</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Addressing rim highlights & 9:16 safe cropping per Marketing feedback.
                </p>
                <div className="text-[10px] text-slate-400 mt-1">Assigned to Alex Rivera • Now</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-sky-500 ring-4 ring-sky-100" />
                <div className="text-xs font-bold text-slate-900">Revision Flagged</div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Sarah Jenkins marked 2 visual pins requesting rim lighting adjustment.
                </p>
                <div className="text-[10px] text-slate-400 mt-1">Today, 2:15 PM</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-300 ring-4 ring-slate-100" />
                <div className="text-xs font-bold text-slate-900">v1.0 Initial Render Submitted</div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  Initial 4K 360-turntable render package uploaded (2.1 GB).
                </p>
                <button
                  type="button"
                  onClick={() => showToast('Downloading v1 Archive package...', 'info')}
                  className="text-[11px] font-semibold text-[#0284c7] hover:underline mt-1 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download v1 Archive</span>
                </button>
              </div>
            </div>
          </div>

          {/* Queue & Peer Reviews */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Queue & Peer Reviews
              </h3>
              <span className="text-xs font-semibold text-slate-400">3 items</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Casbah Parka 3D Turntable</span>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    Under Review
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">Asset ID: #URB-3D-9481 • Nov 17</div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span>Reviewer: Sarah Jenkins</span>
                  <span>v1.0 (Waiting 3h)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Berber Geometry Kinetic Typography</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Approved
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">Asset ID: #URB-MO-8910 • Nov 16</div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span>Approved by Marcus Liu</span>
                  <span className="font-semibold text-slate-700">v2.0 Locked</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Casbah Desert Sand FX Particle Grid</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Approved
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">Asset ID: #URB-FX-7122 • Nov 15</div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                  <span>Approved by Sarah Jenkins</span>
                  <span className="font-semibold text-slate-700">v1.2 Locked</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/creative/completed')}
              className="w-full py-2 rounded-xl text-xs font-semibold text-[#0284c7] bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Go to Completed Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Velocity Card */}
          <div className="bg-gradient-to-br from-indigo-50/70 to-purple-50/50 rounded-2xl border border-indigo-100 p-5 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              Sprint 12 Studio Velocity
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">2.4</span>
              <span className="text-sm font-bold text-slate-700">hrs</span>
              <span className="text-xs text-slate-500">Avg Marketing SLA Turnaround</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
              Your feedback turnaround is currently pacing <strong className="text-slate-900 font-semibold">34% faster</strong> than Sprint 11 benchmark. Revisions submitted before 4:00 PM are reviewed same-day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};