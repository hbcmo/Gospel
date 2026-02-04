'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Heart } from 'lucide-react';

type Stage = 'intro' | 'god' | 'man' | 'jesus' | 'invitation' | 'prayer';

// Crown icon for God's sovereignty
const CrownIcon = () => (
  <svg viewBox="0 0 100 80" className="w-20 h-16 mx-auto mb-4">
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
  <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto mb-4">
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
  <svg viewBox="0 0 100 120" className="w-16 h-24 mx-auto mb-4">
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

// Detailed realistic caricature preacher avatar
// Caricature-style presenter with exaggerated proportions
const PreacherAvatar = () => (
  <svg viewBox="0 0 180 240" className="w-36 h-48 mx-auto mb-6">
    {/* Short modern hairstyle */}
    <path d="M 50 35 Q 45 20 65 18 Q 90 15 115 18 Q 135 20 130 35 Q 128 50 125 55 L 55 55 Q 52 50 50 35 Z" fill="#3b2820" stroke="#2a1810" strokeWidth="1.5" />
    <path d="M 65 25 Q 70 20 75 22" stroke="#4a3830" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M 105 25 Q 110 20 115 22" stroke="#4a3830" strokeWidth="1" fill="none" opacity="0.5" />
    {/* Large caricature head */}
    <ellipse cx="90" cy="75" rx="42" ry="48" fill="#d4a574" stroke="#b8925f" strokeWidth="2" />
    {/* Simple ears */}
    <ellipse cx="48" cy="75" rx="8" ry="14" fill="#c89560" />
    <ellipse cx="132" cy="75" rx="8" ry="14" fill="#c89560" />
    {/* Expressive eyebrows */}
    <path d="M 62 62 Q 70 58 78 60" stroke="#2a1810" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M 102 60 Q 110 58 118 62" stroke="#2a1810" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Large eyes */}
    <ellipse cx="70" cy="72" rx="9" ry="11" fill="white" />
    <ellipse cx="110" cy="72" rx="9" ry="11" fill="white" />
    <circle cx="71" cy="73" r="5" fill="#2a1810" />
    <circle cx="111" cy="73" r="5" fill="#2a1810" />
    <circle cx="72" cy="71" r="2" fill="white" />
    <circle cx="112" cy="71" r="2" fill="white" />
    {/* Nose */}
    <path d="M 90 75 L 90 88" stroke="#b8925f" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="87" cy="90" rx="2.5" ry="3" fill="#a8825f" />
    <ellipse cx="93" cy="90" rx="2.5" ry="3" fill="#a8825f" />
    {/* Big smile */}
    <path d="M 70 98 Q 90 108 110 98" stroke="#8b5a3c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 75 100 Q 90 106 105 100" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
    {/* Neck */}
    <rect x="80" y="118" width="20" height="12" fill="#d4a574" />
    {/* Blue polo shirt */}
    <path d="M 65 130 L 60 240 L 120 240 L 115 130 Z" fill="#4a90e2" stroke="#3470b8" strokeWidth="2" />
    {/* V-neck collar */}
    <path d="M 80 130 L 85 138 L 90 133 L 95 138 L 100 130" fill="white" stroke="#d0d0d0" strokeWidth="1" />
    {/* Small arms */}
    <path d="M 65 135 Q 45 160 40 200" stroke="#d4a574" strokeWidth="12" strokeLinecap="round" />
    <path d="M 115 135 Q 135 160 140 200" stroke="#d4a574" strokeWidth="12" strokeLinecap="round" />
    {/* Hands */}
    <ellipse cx="38" cy="205" rx="7" ry="9" fill="#d4a574" />
    <ellipse cx="142" cy="205" rx="7" ry="9" fill="#d4a574" />
  </svg>
);


export default function GospelGame() {
  const [stage, setStage] = useState<Stage>('intro');
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Play soft background music if enabled
    if (audioEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked by browser
        console.log('Audio autoplay prevented');
      });
    } else if (!audioEnabled && audioRef.current) {
      audioRef.current.pause();
    }
  }, [audioEnabled]);

  const nextStage = () => {
    const stages: Stage[] = ['intro', 'god', 'man', 'jesus', 'invitation', 'prayer'];
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 text-gray-900">
      {/* Background audio - soft instrumental hymn music */}
      <audio ref={audioRef} loop>
        <source src="/audio/background.mp3" type="audio/mpeg" />
        {/* Fallback - silent audio to prevent errors if file not found */}
        <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" type="audio/wav" />
      </audio>
      
      {/* Audio toggle button */}
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm font-serif">
            <span className={stage === 'intro' || stage === 'god' ? 'text-amber-800 font-bold' : 'text-gray-500'}>Who is God</span>
            <span className={stage === 'man' ? 'text-amber-800 font-bold' : 'text-gray-500'}>Who is Man</span>
            <span className={stage === 'jesus' ? 'text-amber-800 font-bold' : 'text-gray-500'}>Who is Jesus</span>
            <span className={stage === 'invitation' || stage === 'prayer' ? 'text-amber-800 font-bold' : 'text-gray-500'}>Invitation</span>
          </div>
          <div className="w-full h-2 bg-amber-200 rounded-sm overflow-hidden border border-amber-300">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-amber-800 transition-all duration-500"
              style={{ 
                width: stage === 'intro' ? '0%' : 
                       stage === 'god' ? '25%' : 
                       stage === 'man' ? '50%' : 
                       stage === 'jesus' ? '75%' : '100%' 
              }}
            />
          </div>
        </div>

        {/* Intro Stage */}
        {stage === 'intro' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="max-w-3xl mx-auto bg-white border-4 border-amber-900 shadow-2xl p-12 rounded-sm">
              <div className="border-2 border-amber-700 p-8">
                <PreacherAvatar />
                <h1 className="text-4xl font-serif font-bold mb-6 text-amber-950">Hey there, friend</h1>
                <p className="text-lg text-gray-700 mb-6 font-serif leading-relaxed">
                  I'm Marcus, and I'm passionate about sharing something that genuinely changes lives—the message of salvation and what it means to follow Jesus.
                </p>
                <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 font-serif leading-relaxed">
                  Over the next few minutes, I want to walk you through four essential truths that have the power to transform how you see yourself, God, and your future. Sound good?
                </p>
                <button
                  onClick={nextStage}
                  className="px-10 py-4 bg-amber-900 text-amber-50 font-serif text-lg hover:bg-amber-800 transition-all shadow-lg flex items-center gap-2 mx-auto border-2 border-amber-950"
                >
                  Yes, Let's Begin <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 1: Who is God */}
        {stage === 'god' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl mx-auto bg-white border-4 border-amber-900 shadow-2xl p-10 rounded-sm">
              <div className="border-2 border-amber-700 p-8 space-y-6">
                <PreacherAvatar />
                <CrownIcon />
                <h2 className="text-4xl font-serif font-bold mb-6 text-center text-amber-950">Who is God?</h2>
                <div className="w-24 h-1 bg-amber-800 mx-auto mb-6"></div>

                <p className="text-lg leading-relaxed font-serif text-gray-800 italic">
                  "My friend, God is the eternal Creator of all things—infinitely holy, perfectly just, and completely sovereign over all creation."
                </p>
                
                <div className="border-l-4 border-amber-800 pl-6 py-2 bg-amber-50">
                  <p className="italic text-gray-700 font-serif">
                    "Holy, holy, holy is the Lord God Almighty, who was and is and is to come!"
                  </p>
                  <p className="text-sm text-amber-800 mt-2 font-serif">— Revelation 4:8</p>
                </div>

                <p className="text-lg leading-relaxed font-serif text-gray-700">
                  He's perfect in every way—His love is infinite, His justice is perfect, and His presence fills all of creation. And here's the key: He created you on purpose and wants to know you personally.
                </p>

                {/* Learn More Section */}
                <div className="border-t-2 border-amber-300 pt-6 mt-6">
                  <button
                    onClick={() => toggleSection('god-more')}
                    className="text-amber-900 hover:text-amber-700 font-serif font-semibold flex items-center gap-2 mx-auto"
                  >
                    {expandedSections['god-more'] ? '− Less Detail' : '+ Learn More'} about God's attributes
                  </button>
                  {expandedSections['god-more'] && (
                    <div className="mt-4 space-y-4 text-gray-700 animate-fade-in font-serif bg-amber-50 p-6 border border-amber-200">
                      <div>
                        <p className="mb-2"><strong className="text-amber-900">All-Powerful:</strong> Nothing is beyond God's ability.</p>
                        <div className="border-l-4 border-amber-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"Lift up your eyes on high and see: who created these? He who brings out their host by number, calling them all by name; by the greatness of his might and because he is strong in power, not one is missing."</p>
                          <p className="text-amber-800 mt-1">— Isaiah 40:26</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-amber-900">All-Knowing:</strong> He knows every detail of your past, present, and future.</p>
                        <div className="border-l-4 border-amber-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"You know when I sit down and when I rise up; you discern my thoughts from afar. You search out my path and my lying down and are acquainted with all my ways."</p>
                          <p className="text-amber-800 mt-1">— Psalm 139:2-3</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-amber-900">Everywhere:</strong> God is present everywhere at every moment.</p>
                        <div className="border-l-4 border-amber-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"Can a man hide himself in secret places so that I cannot see him? declares the Lord. Do I not fill heaven and earth? declares the Lord."</p>
                          <p className="text-amber-800 mt-1">— Jeremiah 23:24</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-amber-900">Eternal:</strong> He has no beginning and will have no end.</p>
                        <div className="border-l-4 border-amber-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"Before the mountains were brought forth, or ever you had formed the earth and the world, from everlasting to everlasting you are God."</p>
                          <p className="text-amber-800 mt-1">— Psalm 90:2</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-amber-900">Unchanging:</strong> God's character and promises remain constant forever.</p>
                        <div className="border-l-4 border-amber-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"For I the Lord do not change; therefore you, O children of Jacob, are not consumed."</p>
                          <p className="text-amber-800 mt-1">— Malachi 3:6</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={nextStage}
                    className="px-10 py-4 bg-amber-900 text-amber-50 font-serif text-lg hover:bg-amber-800 transition-all shadow-lg flex items-center gap-2 border-2 border-amber-950"
                  >
                    Continue <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: Who is Man */}
        {stage === 'man' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl mx-auto bg-white border-4 border-amber-900 shadow-2xl p-10 rounded-sm">
              <div className="border-2 border-amber-700 p-8 space-y-6">
                <PreacherAvatar />
                <BrokenHeartIcon />
                <h2 className="text-4xl font-serif font-bold mb-6 text-center text-amber-950">Who is Man?</h2>
                <div className="w-24 h-1 bg-amber-800 mx-auto mb-6"></div>

                <p className="text-lg leading-relaxed font-serif text-gray-800 italic">
                  "Now, every person is created in God's image—but we have all rebelled against our Creator through sin."
                </p>
                
                <div className="border-l-4 border-red-800 pl-6 py-2 bg-red-50">
                  <p className="italic text-gray-700 font-serif">
                    "All have sinned and fall short of the glory of God."
                  </p>
                  <p className="text-sm text-red-800 mt-2 font-serif">— Romans 3:23</p>
                </div>

                <p className="text-lg leading-relaxed font-serif text-gray-700">
                  Sin isn't just a list of bad things we do—it's a broken condition in all of us. We're born wanting to do things our way instead of God's way. We ignore what we know is true about Him, worship things that don't matter, and pursue our own goals instead of His.
                </p>

                <div className="bg-red-50 border-2 border-red-200 p-6">
                  <p className="text-lg leading-relaxed font-serif text-gray-800">
                    Because God is perfectly just, He can't ignore sin. And the consequence is severe: <strong className="text-red-900">eternal separation from God</strong>. We can't fix this ourselves—good works don't erase sin, religion doesn't help, and self-improvement falls short. We're spiritually dead without God's help.
                  </p>
                </div>

                <div className="border-l-4 border-red-800 pl-6 py-2 bg-red-50">
                  <p className="italic text-gray-700 font-serif">
                    "The wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord."
                  </p>
                  <p className="text-sm text-red-800 mt-2 font-serif">— Romans 6:23</p>
                </div>

                {/* Learn More Section */}
                <div className="border-t-2 border-amber-300 pt-6 mt-6">
                  <button
                    onClick={() => toggleSection('man-more')}
                    className="text-amber-900 hover:text-amber-700 font-serif font-semibold flex items-center gap-2 mx-auto"
                  >
                    {expandedSections['man-more'] ? '− Less Detail' : '+ Learn More'} about sin and its consequences
                  </button>
                  {expandedSections['man-more'] && (
                    <div className="mt-4 space-y-4 text-gray-700 animate-fade-in font-serif bg-amber-50 p-6 border border-amber-200">
                      <div>
                        <p className="mb-2"><strong className="text-red-900">We're Born Into It:</strong> Sin isn't just what we do—it's a broken condition we inherit.</p>
                        <div className="border-l-4 border-red-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"Therefore, just as sin came into the world through one man, and death through sin, and so death spread to all men because all sinned."</p>
                          <p className="text-red-800 mt-1">— Romans 5:12</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-red-900">It Affects Everything:</strong> Sin touches our thoughts, desires, and actions. We can't fix ourselves.</p>
                        <div className="border-l-4 border-red-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"The heart is deceitful above all things, and desperately sick; who can understand it?"</p>
                          <p className="text-red-800 mt-1">— Jeremiah 17:9</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-red-900">No DIY Fix:</strong> Good deeds don't cancel out sin. God's standard is perfection.</p>
                        <div className="border-l-4 border-red-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"We have all become like one who is unclean, and all our righteous deeds are like a polluted garment."</p>
                          <p className="text-red-800 mt-1">— Isaiah 64:6</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-red-900">The Consequence:</strong> Sin separates us from God, and separation from God means spiritual death.</p>
                        <div className="border-l-4 border-red-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord."</p>
                          <p className="text-red-800 mt-1">— Romans 6:23</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={nextStage}
                    className="px-10 py-4 bg-amber-900 text-amber-50 font-serif text-lg hover:bg-amber-800 transition-all shadow-lg flex items-center gap-2 border-2 border-amber-950"
                  >
                    Continue <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Who is Jesus */}
        {stage === 'jesus' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl mx-auto bg-white border-4 border-amber-900 shadow-2xl p-10 rounded-sm">
              <div className="border-2 border-amber-700 p-8 space-y-6">
                <PreacherAvatar />
                <CrossIcon />
                <h2 className="text-4xl font-serif font-bold mb-6 text-center text-amber-950">Who is Jesus?</h2>
                <div className="w-24 h-1 bg-amber-800 mx-auto mb-6"></div>

                <p className="text-lg leading-relaxed font-serif text-gray-800 italic">
                  "And now for the life-changing part: Jesus is God in human form. He lived perfectly, paid the price for our sin, and rose from the dead—all for us."
                </p>
                
                <div className="border-l-4 border-blue-800 pl-6 py-2 bg-blue-50">
                  <p className="italic text-gray-700 font-serif">
                    "For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God."
                  </p>
                  <p className="text-sm text-blue-800 mt-2 font-serif">— 2 Corinthians 5:21</p>
                </div>

                <p className="text-lg leading-relaxed font-serif text-gray-700">
                  Jesus came to fix what we broke. He lived the perfect life we couldn't live. At the cross, He took God's judgment against all of our sin—past, present, and future. He died in our place. And three days later, He defeated death by rising again, proving that His sacrifice actually worked.
                </p>

                <div className="bg-blue-50 border-2 border-blue-200 p-6">
                  <p className="text-lg leading-relaxed font-serif text-gray-800">
                    <strong className="text-blue-900">This is substitutionary atonement</strong>—in simple terms, Jesus substituted Himself for you. His perfection gets credited to your account; your sin was placed on Him at the cross. It's the greatest exchange that's ever happened.
                  </p>
                </div>

                <div className="border-l-4 border-blue-800 pl-6 py-2 bg-blue-50">
                  <p className="italic text-gray-700 font-serif">
                    "He himself bore our sins in his body on the tree, that we might die to sin and live to righteousness."
                  </p>
                  <p className="text-sm text-blue-800 mt-2 font-serif">— 1 Peter 2:24</p>
                </div>

                {/* Learn More Section */}
                <div className="border-t-2 border-amber-300 pt-6 mt-6">
                  <button
                    onClick={() => toggleSection('jesus-more')}
                    className="text-amber-900 hover:text-amber-700 font-serif font-semibold flex items-center gap-2 mx-auto"
                  >
                    {expandedSections['jesus-more'] ? '− Less Detail' : '+ Learn More'} about Jesus and salvation
                  </button>
                  {expandedSections['jesus-more'] && (
                    <div className="mt-4 space-y-4 text-gray-700 animate-fade-in font-serif bg-amber-50 p-6 border border-amber-200">
                      <div>
                        <p className="mb-2"><strong className="text-blue-900">Perfect Life:</strong> Jesus lived without sin and fulfilled everything God requires.</p>
                        <div className="border-l-4 border-blue-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God."</p>
                          <p className="text-blue-800 mt-1">— 2 Corinthians 5:21</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-blue-900">The Payment:</strong> On the cross, He took the penalty we deserved—God's full judgment against sin.</p>
                        <div className="border-l-4 border-blue-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"God put forward [Jesus] as a propitiation by his blood, to be received by faith. This was to show God's righteousness, because in his divine forbearance he had passed over former sins."</p>
                          <p className="text-blue-800 mt-1">— Romans 3:25</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-blue-900">Defeated Death:</strong> Three days later, He rose from the dead, proving He has power over sin and death.</p>
                        <div className="border-l-4 border-blue-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"When the perishable puts on the imperishable, and the mortal puts on immortality, then shall come to pass the saying that is written: 'Death is swallowed up in victory.' 'O death, where is your victory? O death, where is your sting?' The sting of death is sin, and the power of sin is the law. But thanks be to God, who gives us the victory through our Lord Jesus Christ."</p>
                          <p className="text-blue-800 mt-1">— 1 Corinthians 15:54-57</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-blue-900">The Trade:</strong> His perfection gets credited to us; our sin was placed on Him. It's an incredible exchange.</p>
                        <div className="border-l-4 border-blue-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God."</p>
                          <p className="text-blue-800 mt-1">— 2 Corinthians 5:21</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={nextStage}
                    className="px-10 py-4 bg-amber-900 text-amber-50 font-serif text-lg hover:bg-amber-800 transition-all shadow-lg flex items-center gap-2 border-2 border-amber-950"
                  >
                    Continue <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 4: Invitation */}
        {stage === 'invitation' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl mx-auto bg-white border-4 border-amber-900 shadow-2xl p-10 rounded-sm">
              <div className="border-2 border-amber-700 p-8 space-y-6">
                <PreacherAvatar />
                <OpenDoorIcon />
                <h2 className="text-4xl font-serif font-bold mb-6 text-center text-amber-950">Will You Receive Christ?</h2>
                <div className="w-24 h-1 bg-amber-800 mx-auto mb-6"></div>

                <p className="text-lg leading-relaxed font-serif text-gray-800 italic">
                  "God offers salvation as a free gift to all who repent and believe in Jesus Christ. The question now, my friend, is this: Will you receive Him?"
                </p>
                
                <div className="border-l-4 border-green-800 pl-6 py-2 bg-green-50">
                  <p className="italic text-gray-700 font-serif">
                    "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved."
                  </p>
                  <p className="text-sm text-green-800 mt-2 font-serif">— Romans 10:9</p>
                </div>

                <div className="bg-green-50 border-2 border-green-200 p-6 space-y-4 font-serif">
                  <p className="text-lg text-gray-800"><strong className="text-green-900">Repent:</strong> Turn away from your sin—change your mind about it and turn toward Jesus.</p>
                  <p className="text-lg text-gray-800"><strong className="text-green-900">Believe:</strong> Trust Jesus completely. He's your only way to God.</p>
                  <p className="text-lg text-gray-800"><strong className="text-green-900">Receive:</strong> Accept the gift. Ask Jesus to be your Savior and Lord.</p>
                </div>

                <p className="text-lg leading-relaxed font-serif text-gray-700">
                  This isn't a casual decision. It means giving control of your life to Jesus, accepting Him as your boss, and following Him going forward. But it's also the best thing you could ever do—it means complete forgiveness, a totally new life, and eternal friendship with God.
                </p>

                <div className="border-l-4 border-green-800 pl-6 py-2 bg-green-50">
                  <p className="italic text-gray-700 font-serif">
                    "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God."
                  </p>
                  <p className="text-sm text-green-800 mt-2 font-serif">— Ephesians 2:8</p>
                </div>

                {/* Learn More Section */}
                <div className="border-t-2 border-amber-300 pt-6 mt-6">
                  <button
                    onClick={() => toggleSection('invitation-more')}
                    className="text-amber-900 hover:text-amber-700 font-serif font-semibold flex items-center gap-2 mx-auto"
                  >
                    {expandedSections['invitation-more'] ? '− Less Detail' : '+ Learn More'} about saving faith
                  </button>
                  {expandedSections['invitation-more'] && (
                    <div className="mt-4 space-y-4 text-gray-700 animate-fade-in font-serif bg-amber-50 p-6 border border-amber-200">
                      <div>
                        <p className="mb-2"><strong className="text-green-900">Real Faith:</strong> It's not just agreeing with facts—it's trusting Jesus with your whole life.</p>
                        <div className="border-l-4 border-green-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"You believe that God is one; you do well. Even the demons believe—and shudder!"</p>
                          <p className="text-green-800 mt-1">— James 2:19</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-green-900">God Gives the Gift:</strong> You can't manufacture faith on your own. God draws people to Himself.</p>
                        <div className="border-l-4 border-green-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"No one can come to me unless the Father who sent me draws him. And I will raise him up on the last day."</p>
                          <p className="text-green-800 mt-1">— John 6:44</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-green-900">Security:</strong> When you truly believe, God commits to completing His work in you forever.</p>
                        <div className="border-l-4 border-green-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ."</p>
                          <p className="text-green-800 mt-1">— Philippians 1:6</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-green-900">Transformation:</strong> Salvation isn't just about forgiveness—it's about becoming someone new.</p>
                        <div className="border-l-4 border-green-600 pl-4 py-2 bg-white italic text-sm">
                          <p>"Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come."</p>
                          <p className="text-green-800 mt-1">— 2 Corinthians 5:17</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 mt-8">
                  <button
                    onClick={nextStage}
                    className="px-10 py-4 bg-green-900 text-green-50 font-serif text-lg hover:bg-green-800 transition-all shadow-lg flex items-center justify-center gap-2 border-2 border-green-950"
                  >
                    Yes, I Want to Receive Christ <Heart />
                  </button>
                  <button
                    onClick={() => setStage('intro')}
                    className="px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-serif transition-all border-2 border-amber-300"
                  >
                    I Need More Time to Consider
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 5: Prayer */}
        {stage === 'prayer' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl mx-auto bg-white border-4 border-amber-900 shadow-2xl p-10 rounded-sm">
              <div className="border-2 border-amber-700 p-8 space-y-6">
                <PreacherAvatar />
                <h2 className="text-4xl font-serif font-bold mb-6 text-center text-amber-950">Prayer of Salvation</h2>
                <div className="w-24 h-1 bg-amber-800 mx-auto mb-6"></div>

                <p className="text-lg font-serif text-gray-700 leading-relaxed italic">
                  "If you're ready to take this step and commit your life to Jesus, you can pray right now. Prayer doesn't save you—only Christ saves—but it's how you express your faith and surrender to Him."
                </p>

                <div className="bg-amber-50 border-2 border-amber-800 p-8 space-y-4">
                  <p className="text-lg italic leading-relaxed font-serif text-gray-800">
                    "Lord Jesus, I admit that I'm a sinner and can't save myself. I believe You're God's Son, that You died on the cross for my sins, and that You rose from the dead. I'm turning from my sin and putting my trust in You alone. I surrender my life to You. Be my Savior and be my Lord. In Jesus' name, Amen."
                  </p>
                </div>

                <div className="bg-green-50 border-2 border-green-700 p-6 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-green-900">What Happens Next?</h3>
                  <div className="space-y-3 font-serif text-gray-800">
                    <p><strong className="text-green-900">1. Find a Bible-believing church:</strong> You need fellowship with other believers.</p>
                    <p><strong className="text-green-900">2. Read the Bible daily:</strong> Start with the Gospel of John to learn more about Jesus.</p>
                    <p><strong className="text-green-900">3. Pray regularly:</strong> Talk to God throughout your day.</p>
                    <p><strong className="text-green-900">4. Be baptized:</strong> This is an outward sign of your inward faith.</p>
                    <p><strong className="text-green-900">5. Share your faith:</strong> Tell others about what Christ has done for you.</p>
                  </div>
                </div>

                <div className="border-l-4 border-amber-800 pl-6 py-2 bg-amber-50">
                  <p className="italic text-gray-700 font-serif">
                    "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come."
                  </p>
                  <p className="text-sm text-amber-800 mt-2 font-serif">— 2 Corinthians 5:17</p>
                </div>

                <p className="text-center text-xl font-serif font-bold text-amber-950 pt-4">
                  Welcome to the family of God!
                </p>

                <button
                  onClick={() => setStage('intro')}
                  className="w-full px-6 py-3 bg-amber-900 text-amber-50 font-serif hover:bg-amber-800 transition-all border-2 border-amber-950"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
