'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Heart } from 'lucide-react';

type Stage = 'intro' | 'god' | 'man' | 'jesus' | 'invitation' | 'prayer';

// Crown icon for God's sovereignty
const CrownIcon = () => (
  <svg viewBox="0 0 100 80" className="w-12 h-10 mx-auto mb-2">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="50%" stopColor="#ffed4e" />
        <stop offset="100%" stopColor="#d4af37" />
      </linearGradient>
    </defs>
    <path d="M 10 60 L 20 30 L 35 45 L 50 15 L 65 45 L 80 30 L 90 60 Z" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="2" />
    <circle cx="20" cy="30" r="5" fill="#ff4444" stroke="#cc0000" strokeWidth="1" />
    <circle cx="50" cy="15" r="6" fill="#ff4444" stroke="#cc0000" strokeWidth="1" />
    <circle cx="80" cy="30" r="5" fill="#ff4444" stroke="#cc0000" strokeWidth="1" />
    <rect x="10" y="60" width="80" height="12" rx="2" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="2" />
    <circle cx="30" cy="66" r="3" fill="#ff4444" />
    <circle cx="50" cy="66" r="3" fill="#ff4444" />
    <circle cx="70" cy="66" r="3" fill="#ff4444" />
  </svg>
);

// Broken heart icon for sin
const BrokenHeartIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 mx-auto mb-2">
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
    </defs>
    <path d="M 50 85 L 20 55 Q 10 45 10 32 Q 10 20 20 15 Q 30 10 38 18 L 45 25" fill="url(#heartGradient)" stroke="#7f1d1d" strokeWidth="2" />
    <path d="M 50 85 L 80 55 Q 90 45 90 32 Q 90 20 80 15 Q 70 10 62 18 L 55 25" fill="url(#heartGradient)" stroke="#7f1d1d" strokeWidth="2" />
    <path d="M 45 25 L 48 55 L 52 55 L 55 25" fill="none" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
    <path d="M 45 25 L 35 40" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    <path d="M 55 25 L 65 40" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Cross icon for Jesus
const CrossIcon = () => (
  <svg viewBox="0 0 100 120" className="w-16 h-24 mx-auto mb-4">
    <defs>
      <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b4513" />
        <stop offset="50%" stopColor="#a0522d" />
        <stop offset="100%" stopColor="#8b4513" />
      </linearGradient>
      <radialGradient id="glowGradient">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="50" cy="60" rx="45" ry="50" fill="url(#glowGradient)" />
    <rect x="42" y="10" width="16" height="100" rx="2" fill="url(#woodGradient)" stroke="#654321" strokeWidth="2" />
    <rect x="20" y="30" width="60" height="16" rx="2" fill="url(#woodGradient)" stroke="#654321" strokeWidth="2" />
    <circle cx="50" cy="38" r="2" fill="#1f2937" />
    <path d="M 42 80 L 44 85 L 46 80" stroke="#654321" strokeWidth="1" fill="none" />
    <path d="M 54 80 L 56 85 L 58 80" stroke="#654321" strokeWidth="1" fill="none" />
  </svg>
);

// Open door icon for invitation
const OpenDoorIcon = () => (
  <svg viewBox="0 0 100 120" className="w-12 h-20 mx-auto mb-2">
    <defs>
      <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="50%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0" />
        <stop offset="50%" stopColor="#fef3c7" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="25" y="10" width="50" height="100" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="2" />
    <path d="M 75 10 Q 85 15 90 60 Q 85 105 75 110" fill="url(#doorGradient)" stroke="#451a03" strokeWidth="2" />
    <rect x="75" y="10" width="20" height="100" fill="url(#lightGradient)" />
    <circle cx="70" cy="60" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
    <path d="M 30 20 L 70 20 M 30 40 L 70 40 M 30 60 L 70 60 M 30 80 L 70 80 M 30 100 L 70 100" stroke="#451a03" strokeWidth="1" opacity="0.3" />
  </svg>
);

// Scene illustrations for each stage
// Intro scene - hands reaching toward light
const IntroScene = () => (
  <svg viewBox="0 0 320 200" className="w-full max-w-2xl max-h-32 mx-auto mb-2">
    <defs>
      <radialGradient id="introLight">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
      </radialGradient>
    </defs>
    <circle cx="160" cy="60" r="50" fill="url(#introLight)" />
    <circle cx="160" cy="60" r="45" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />
    <g transform="translate(80,120)" stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="0" r="4" />
      <path d="M 0 0 L 0 -30" />
      <path d="M -8 -10 L 0 -30 L 8 -10" />
      <path d="M 0 0 L -8 10" />
      <path d="M 0 0 L 8 10" />
    </g>
    <g transform="translate(240,120)" stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="0" r="4" />
      <path d="M 0 0 L 0 -30" />
      <path d="M -8 -10 L 0 -30 L 8 -10" />
      <path d="M 0 0 L -8 10" />
      <path d="M 0 0 L 8 10" />
    </g>
    <text x="160" y="180" fontFamily="serif" fontSize="14" fill="#111827" textAnchor="middle">The Gospel Message</text>
  </svg>
);

const GodScene = () => (
  <svg viewBox="0 0 320 180" className="w-full max-w-2xl max-h-32 mx-auto mb-2">
    <g stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 120 L 320 120 L 320 160 L 0 160 Z" />
      <path d="M 0 160 L 320 160" />
    </g>
    <g transform="translate(100,70)" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round">
      <circle cx="20" cy="8" r="6" />
      <path d="M 20 14 L 20 34" />
      <path d="M 12 22 L 28 22" />
      <path d="M 20 34 L 12 48" />
      <path d="M 20 34 L 28 48" />
      <animateTransform attributeName="transform" type="translate" values="100,70; 100,72; 100,70" dur="2s" repeatCount="indefinite" />
    </g>
    <text x="110" y="110" fontFamily="serif" fontSize="14" fill="#111827">Man</text>
    <text x="200" y="110" fontFamily="serif" fontSize="14" fill="#111827">God</text>
    <text x="100" y="155" fontFamily="serif" fontSize="12" fill="#111827" opacity="0.6">Perfect Fellowship</text>
  </svg>
);

const ManScene = () => (
  <svg viewBox="0 0 320 220" className="w-full max-w-2xl max-h-32 mx-auto mb-2">
    <g stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 120 L 110 120 L 140 160 L 0 160 Z" />
      <path d="M 210 120 L 320 120 L 320 160 L 180 160 Z" />
      <path d="M 110 120 L 210 120" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M 0 160 L 320 160" />
    </g>
    <g transform="translate(220,50)" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round">
      <circle cx="20" cy="8" r="6" />
      <path d="M 20 14 L 20 34" />
      <path d="M 12 22 L 28 22" />
      <path d="M 20 34 L 12 48" />
      <path d="M 20 34 L 28 48" />
      <animateTransform attributeName="transform" type="translate" values="220,50; 220,52; 220,50" dur="2s" repeatCount="indefinite" />
    </g>
    <text x="18" y="112" fontFamily="serif" fontSize="14" fill="#111827">God</text>
    <text x="255" y="112" fontFamily="serif" fontSize="14" fill="#111827">Man</text>
    <text x="150" y="152" fontFamily="serif" fontSize="12" fill="#111827">Sin</text>
  </svg>
);

const JesusScene = () => (
  <svg viewBox="0 0 320 220" className="w-full max-w-2xl max-h-32 mx-auto mb-2">
    <g stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 120 L 110 120 L 140 160 L 0 160 Z" />
      <path d="M 210 120 L 320 120 L 320 160 L 180 160 Z" />
      <path d="M 0 160 L 320 160" />
    </g>
    {/* Brown cross bridge connecting God and Man */}
    <g stroke="#8b4513" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 160 60 L 160 210">
        <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M 110 120 L 210 120">
        <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
      </path>
    </g>
    <text x="18" y="112" fontFamily="serif" fontSize="14" fill="#111827">God</text>
    <text x="230" y="112" fontFamily="serif" fontSize="14" fill="#111827">Man</text>
    <text x="138" y="152" fontFamily="serif" fontSize="12" fill="#111827">Christ</text>
  </svg>
);

const InvitationScene = () => (
  <svg viewBox="0 0 320 220" className="w-full max-w-2xl max-h-32 mx-auto mb-2">
    <g stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 120 L 110 120 L 140 160 L 0 160 Z" />
      <path d="M 210 120 L 320 120 L 320 160 L 180 160 Z" />
      <path d="M 0 160 L 320 160" />
      <path d="M 110 120 L 210 120" strokeDasharray="6 6">
        <animate attributeName="stroke-dashoffset" from="0" to="12" dur="1.5s" repeatCount="indefinite" />
      </path>
    </g>
    <g stroke="#8b4513" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 160 60 L 160 210">
        <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M 110 120 L 210 120">
        <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
      </path>
    </g>
    <g transform="translate(208,58)" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round">
      <circle cx="20" cy="8" r="6" />
      <path d="M 20 14 L 20 34" />
      <path d="M 12 22 L 28 22" />
      <path d="M 20 34 L 12 48" />
      <path d="M 20 34 L 28 48" />
      <animateTransform attributeName="transform" type="translate" values="208,58; 208,60; 208,58" dur="2s" repeatCount="indefinite" />
    </g>
    <text x="18" y="112" fontFamily="serif" fontSize="14" fill="#111827">God</text>
    <text x="230" y="112" fontFamily="serif" fontSize="14" fill="#111827">Man</text>
    <text x="150" y="152" fontFamily="serif" fontSize="12" fill="#111827">Sin</text>
  </svg>
);

const PrayerScene = () => (
  <svg viewBox="0 0 320 220" className="w-full max-w-2xl max-h-32 mx-auto mb-2">
    <g stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 120 L 110 120 L 140 160 L 0 160 Z" />
      <path d="M 210 120 L 320 120 L 320 160 L 180 160 Z" />
      <path d="M 0 160 L 320 160" />
    </g>
    <g stroke="#8b4513" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 160 60 L 160 210">
        <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M 110 120 L 210 120">
        <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
      </path>
    </g>
    <g transform="translate(60,58)" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round">
      <circle cx="20" cy="8" r="6" />
      <path d="M 20 14 L 20 34" />
      <path d="M 12 22 L 28 22" />
      <path d="M 20 34 L 12 48" />
      <path d="M 20 34 L 28 48" />
      <animateTransform attributeName="transform" type="translate" values="60,58; 60,60; 60,58" dur="2s" repeatCount="indefinite" />
    </g>
    <text x="18" y="112" fontFamily="serif" fontSize="14" fill="#111827">God</text>
    <text x="230" y="112" fontFamily="serif" fontSize="14" fill="#111827">Man</text>
    <text x="138" y="152" fontFamily="serif" fontSize="12" fill="#111827">Christ</text>
  </svg>
);

// Presenter photo avatar
const PreacherAvatar = () => (
  <img
    src="/images/Spurgeon.png"
    alt="Spurgeon"
    className="mx-auto mb-6 w-32 h-auto"
  />
);

export default function Page() {
  const [stage, setStage] = useState<Stage>('intro');
  const [stagePage, setStagePage] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const nextStage = () => {
    const stages: Stage[] = ['intro', 'god', 'man', 'jesus', 'invitation', 'prayer'];
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
      setStagePage(0);
    }
  };

  const nextPage = () => {
    const maxPages: Record<Stage, number> = {
      'intro': 1,
      'god': 2,
      'man': 2,
      'jesus': 2,
      'invitation': 2,
      'prayer': 2
    };
    if (stagePage < maxPages[stage] - 1) {
      setStagePage(stagePage + 1);
    }
  };

  const prevPage = () => {
    if (stagePage > 0) {
      setStagePage(stagePage - 1);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  useEffect(() => {
    if (audioEnabled && audioRef.current) {
      audioRef.current.volume = 0.05;
    } else if (!audioEnabled && audioRef.current) {
      audioRef.current.pause();
    }
  }, [audioEnabled]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioEnabled) {
        audioRef.current.pause();
        setAudioEnabled(false);
      } else {
        audioRef.current.play().catch(() => {
          // Audio play failed
        });
        setAudioEnabled(true);
      }
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 text-gray-900 flex flex-col">
      <audio ref={audioRef} loop>
        <source src="/audio/jeremusic70-amazing-grace-instrumental-145357.mp3" type="audio/mpeg" />
        <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" type="audio/wav" />
      </audio>
      
      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 p-3 bg-amber-800 text-amber-50 rounded-full shadow-lg hover:bg-amber-700 transition-all"
        title={audioEnabled ? "Mute background music" : "Play background music"}
      >
        {audioEnabled ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>

      <div className="h-full flex flex-col items-center justify-center px-4">
        {stage === 'intro' && (
          <div className="flex flex-col items-center gap-8">
            <PreacherAvatar />
            <button
              onClick={nextStage}
              className="px-8 py-4 bg-amber-900 text-amber-50 font-serif text-lg hover:bg-amber-800 transition-all shadow-lg border-2 border-amber-950"
            >
              Start
            </button>
          </div>
        )}

        {stage === 'god' && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="relative">
              <GodScene />
            </div>
            <span className="text-2xl font-serif font-bold text-amber-950">God</span>
            <div className="flex gap-4">
              {stagePage > 0 && (
                <button onClick={prevPage} className="px-6 py-2 bg-amber-200 hover:bg-amber-300 text-amber-900 font-serif border-2 border-amber-300">
                  ← Back
                </button>
              )}
              {stagePage < 1 && (
                <button onClick={nextPage} className="px-6 py-2 bg-amber-900 hover:bg-amber-800 text-amber-50 font-serif border-2 border-amber-950">
                  Next →
                </button>
              )}
              {stagePage === 1 && (
                <button onClick={nextStage} className="px-6 py-2 bg-amber-900 hover:bg-amber-800 text-amber-50 font-serif border-2 border-amber-950">
                  Continue →
                </button>
              )}
            </div>
          </div>
        )}

        {stage === 'man' && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="relative">
              <ManScene />
            </div>
            <span className="text-2xl font-serif font-bold text-red-900">Man</span>
            <div className="flex gap-4">
              {stagePage > 0 && (
                <button onClick={prevPage} className="px-6 py-2 bg-red-200 hover:bg-red-300 text-red-900 font-serif border-2 border-red-300">
                  ← Back
                </button>
              )}
              {stagePage < 1 && (
                <button onClick={nextPage} className="px-6 py-2 bg-red-900 hover:bg-red-800 text-red-50 font-serif border-2 border-red-950">
                  Next →
                </button>
              )}
              {stagePage === 1 && (
                <button onClick={nextStage} className="px-6 py-2 bg-red-900 hover:bg-red-800 text-red-50 font-serif border-2 border-red-950">
                  Continue →
                </button>
              )}
            </div>
          </div>
        )}

        {stage === 'jesus' && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="relative">
              <JesusScene />
            </div>
            <span className="text-2xl font-serif font-bold text-blue-900">Jesus</span>
            <div className="flex gap-4">
              {stagePage > 0 && (
                <button onClick={prevPage} className="px-6 py-2 bg-blue-200 hover:bg-blue-300 text-blue-900 font-serif border-2 border-blue-300">
                  ← Back
                </button>
              )}
              {stagePage < 1 && (
                <button onClick={nextPage} className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-blue-50 font-serif border-2 border-blue-950">
                  Next →
                </button>
              )}
              {stagePage === 1 && (
                <button onClick={nextStage} className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-blue-50 font-serif border-2 border-blue-950">
                  Continue →
                </button>
              )}
            </div>
          </div>
        )}

        {stage === 'invitation' && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="relative">
              <InvitationScene />
            </div>
            <span className="text-2xl font-serif font-bold text-green-900">Invitation</span>
            <div className="flex gap-4">
              {stagePage > 0 && (
                <button onClick={prevPage} className="px-6 py-2 bg-green-200 hover:bg-green-300 text-green-900 font-serif border-2 border-green-300">
                  ← Back
                </button>
              )}
              {stagePage < 1 && (
                <button onClick={nextPage} className="px-6 py-2 bg-green-900 hover:bg-green-800 text-green-50 font-serif border-2 border-green-950">
                  Next →
                </button>
              )}
              {stagePage === 1 && (
                <button onClick={nextStage} className="px-6 py-2 bg-green-900 hover:bg-green-800 text-green-50 font-serif border-2 border-green-950">
                  Let's Pray
                </button>
              )}
            </div>
          </div>
        )}

        {stage === 'prayer' && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="relative">
              <PrayerScene />
            </div>
            <span className="text-2xl font-serif font-bold text-amber-900">Prayer</span>
            <div className="flex gap-4">
              {stagePage > 0 && (
                <button onClick={prevPage} className="px-6 py-2 bg-amber-200 hover:bg-amber-300 text-amber-900 font-serif border-2 border-amber-300">
                  ← Back
                </button>
              )}
              {stagePage < 1 && (
                <button onClick={nextPage} className="px-6 py-2 bg-amber-900 hover:bg-amber-800 text-amber-50 font-serif border-2 border-amber-950">
                  Next →
                </button>
              )}
              {stagePage === 1 && (
                <button onClick={() => setStage('intro')} className="px-6 py-2 bg-amber-900 hover:bg-amber-800 text-amber-50 font-serif border-2 border-amber-950">
                  Start Over
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
