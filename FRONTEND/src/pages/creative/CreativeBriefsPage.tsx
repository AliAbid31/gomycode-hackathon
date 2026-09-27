import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CREATIVE_ASSETS } from './creativeAssets';
import {
  Search,
  Shield,
  FileCode,
  ArrowUpRight,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  CheckCircle2,
  X,
  Layers,
  Maximize2
} from 'lucide-react';

interface BriefCardData {
  id: string;
  brand: string;
  statusBadge: string;
  statusType: 'ready' | 'locked';
  title: string;
  campaign: string;
  previewImage: string;
  aspectBadge: string;
  approvedBy: string;
  approvedByRole: string;
  specs: string;
  palette: Array<{ name: string; color: string; isText?: boolean }>;
  deliverables: string[];
  promptGuidance: string;
}

export const CreativeBriefsPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalBrief, setActiveModalBrief] = useState<BriefCardData | null>(null);

  const briefs: BriefCardData[] = [
    {
      id: 'brief-01',
      brand: 'URBANA CO.',
      statusBadge: 'Approved & Production Ready',
      statusType: 'ready',
      title: 'Casbah Pulse: 3D Turntable & Fabric Simulation',
      campaign: 'Campaign: Casbah Pulse Winter 2025',
      previewImage: CREATIVE_ASSETS.casbahParka,
      aspectBadge: '9:16 Vertical Video (60fps)',
      approvedBy: 'Sarah Jenkins',
      approvedByRole: 'Marketing Admin',
      specs: '1080x1920 • MP4 / ProRes 422',
      palette: [
        { name: 'Saharan Sand', color: '#D4B08C' },
        { name: 'Med Slate', color: '#475569' },
        { name: '+ Geometric', color: '#CBD5E1', isText: true }
      ],
      deliverables: [
        'Master 4K 360-turntable render in ProRes 422 HQ',
        '9:16 60fps vertical reel cut with 120px safe-zone padding',
        'Multi-pass OpenEXR beauty, normal, roughness, and cryptomatte passes'
      ],
      promptGuidance: 'High-altitude desert illumination, 5600K key light with 18% cool cyan rim bounce. Emphasize dense water-repellent weave texture.'
    },
    {
      id: 'brief-02',
      brand: 'URBANA CO.',
      statusBadge: 'Approved & Locked',
      statusType: 'locked',
      title: 'Streetwear Lookbook Carousel Specs',
      campaign: 'Campaign: Casbah Pulse Winter 2025',
      previewImage: CREATIVE_ASSETS.streetwearModel,
      aspectBadge: '4:5 Portrait (10 Slides)',
      approvedBy: 'Sarah Jenkins',
      approvedByRole: 'Marketing Admin',
      specs: '1080x1350 • sRGB Clean Web JPG',
      palette: [
        { name: 'Med Slate', color: '#475569' },
        { name: 'Clay Amber', color: '#B45309' },
        { name: '+ Heavy Grain', color: '#CBD5E1', isText: true }
      ],
      deliverables: [
        '10-slide high-resolution carousel assets for Instagram & TikTok photo mode',
        'Consistent 35mm film grain overlay conforming to URBANA token #Grain-40',
        'Export sRGB profile with zero color clipping in dark shadow thresholds'
      ],
      promptGuidance: 'Atmospheric twilight in ancient limestone alleyways. Contrast traditional architectural geometry with modern oversized techwear silhouettes.'
    },
    {
      id: 'brief-03',
      brand: 'URBANA CO.',
      statusBadge: 'Approved & Locked',
      statusType: 'locked',
      title: 'Cyber-Nomad Reel Visual Direction',
      campaign: 'Campaign: Casbah Pulse Winter 2025',
      previewImage: CREATIVE_ASSETS.desertNomad,
      aspectBadge: '9:16 Short-Form Dynamic',
      approvedBy: 'Sarah Jenkins',
      approvedByRole: 'Marketing Admin',
      specs: '1080x1920 • 30/60fps • 30s Max',
      palette: [
        { name: 'Cyan Flare', color: '#06B6D4' },
        { name: 'Sand', color: '#D97706' },
        { name: '+ Trap Synth Beat', color: '#CBD5E1', isText: true }
      ],
      deliverables: [
        'Short-form vertical video cut optimized for TikTok, Reels & YouTube Shorts',
        'Kinetic title overlays synchronized to transient 140BPM drum beats',
        'Clean split stem audio mix with normalized -14 LUFS loudness'
      ],
      promptGuidance: 'Cinematic hyper-real sandstorm atmosphere, lens flare on metallic brass buckle accents, seamless procedural camera rotation around hero protagonist.'
    }
  ];

  const filteredBriefs = briefs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Breadcrumb & Title Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 inline-block" />
              AI STUDIO PIPELINE
            </span>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-xs font-semibold text-slate-500">Creative Briefs Vault</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Approved Creative Briefs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Read-only, finalized creative specifications synchronized directly from Marketing's AI Campaign Architect. Assets in this vault are locked for production fidelity.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
            <Shield className="w-4 h-4 text-cyan-700" />
            <span>14 Briefs Active</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">All Verified</span>
          </div>

          <button
            onClick={() => navigateTo('/creative/reviews')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <FileCode className="w-4 h-4" />
            <span>Version Audit Log</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search approved briefs, target SKUs, or key..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200/70 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
          <span className="text-slate-400 text-[11px] font-bold">BRAND:</span>
          <span className="inline-flex items-center gap-1.5 text-slate-900">
            <span className="w-2 h-2 rounded-full bg-cyan-600 inline-block" />
            URBANA
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
          <span className="text-slate-400 text-[11px] font-bold">CAMPAIGN:</span>
          <span className="text-slate-900">Casbah Pulse Winter 2025</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span>Formats: All</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* 3. 3 Creative Brief Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBriefs.map((brief, index) => (
          <div
            key={brief.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                  {brief.brand}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    brief.statusType === 'ready'
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/70'
                      : 'text-emerald-700 bg-emerald-50/70 border border-emerald-200/60'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {brief.statusBadge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug">
                  {brief.title}
                </h3>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {brief.campaign}
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-100 shadow-2xs">
                <img
                  src={brief.previewImage}
                  alt={brief.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-white/95 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                    <Maximize2 className="w-3 h-3 text-cyan-400" />
                    {brief.aspectBadge}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px] font-medium">Approved By</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold flex items-center justify-center">
                      SJ
                    </div>
                    <span className="font-bold text-slate-800 text-xs">
                      {brief.approvedBy} ({brief.approvedByRole})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px] font-medium">Specs</span>
                  <span className="font-mono text-xs font-semibold text-slate-700">
                    {brief.specs}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-slate-400 text-[11px] font-medium block mb-1.5">
                    Brand Guardrails & Palette
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {brief.palette.map((p, pIndex) => (
                      <span
                        key={pIndex}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-slate-50 border border-slate-200/80 text-slate-700"
                      >
                        {!p.isText && (
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                            style={{ backgroundColor: p.color }}
                          />
                        )}
                        <span>{p.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveModalBrief(brief)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  index === 0
                    ? 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-xs'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/80'
                }`}
              >
                <span>Inspect Full Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bottom Continuous Studio Ingestion Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-cyan-700" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Continuous Studio Ingestion
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed max-w-3xl">
              MarkAi automatically validates prompt tokens, aspect ratios, and color grading parameters against URBANA's design token dictionary before granting production-ready clearance.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-[11px] font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <span>ENGINE: GPT-4O VISION + CLAUDE 3.5</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
        </div>
      </div>

      {/* Inspect Brief Modal */}
      {activeModalBrief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                  {activeModalBrief.brand} • {activeModalBrief.campaign}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {activeModalBrief.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalBrief(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-100">
                <img
                  src={activeModalBrief.previewImage}
                  alt={activeModalBrief.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  Prompt Engineering & Direction
                </h4>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-700 leading-relaxed font-mono">
                  {activeModalBrief.promptGuidance}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#0284c7]" />
                  Production Deliverables Checklist
                </h4>
                <div className="space-y-1.5">
                  {activeModalBrief.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-900"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  Approved by <strong className="text-slate-800">{activeModalBrief.approvedBy}</strong>
                </div>
                <button
                  onClick={() => {
                    setActiveModalBrief(null);
                    navigateTo('/creative/tasks');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] cursor-pointer"
                >
                  Go to Production Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};