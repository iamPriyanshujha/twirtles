import React, { useState, useRef } from 'react';
import { Sparkles, Trophy, Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, HeartPulse, Sparkle, Flame, Instagram, Linkedin, ExternalLink, MessageCircle, Heart, Send, Bookmark, Play, Pause, Music, Volume2, VolumeX, Share2, Plus, Check, Grid, Tv, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ChipPacket from './ChipPacket';

interface ChompsHighlightsProps {
  onShopClick?: () => void;
  addToCart?: (product: any) => void;
}

export default function ChompsHighlights({ onShopClick, addToCart }: ChompsHighlightsProps) {
  // Instagram Reels State Management
  const [reels, setReels] = useState([
    {
      id: 'reel-1',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-popcorn-falling-on-a-yellow-background-preview.mp4',
      instagramUrl: 'https://www.instagram.com/reel/DT5Sls3kopx/',
      embedUrl: 'https://www.instagram.com/reel/DT5Sls3kopx/embed/',
      tag: '🟢 BRAND STORY LAUNCH',
      partner: 'markinm',
      bgColor: 'from-[#1C0D0A] via-[#2F1511] to-black',
      likes: 1420,
      commentsCount: 45,
      hasLiked: false,
      hasSaved: false,
      caption: 'Twirtles is finally LIVE! Watch our journey from a small snacking experiment to the ultimate crunch superpuff revolution! 🍿✨ #Twirtles #Snacks #Superfood',
      musicName: 'Original Audio - twirtles_',
      shares: 289,
      isMuted: true,
      comments: [
        { id: 1, user: 'rohit_sharma', text: 'Where can I get these in Mumbai? Incredible looks! 🔥' },
        { id: 2, user: 'fit_india_mom', text: 'My kids absolutely love the peri-peri makhana. Healthy and zero oil guilt!' },
        { id: 3, user: 'snack_expert', text: 'Baked superpuffs is exactly what the Indian market needed 🙌' }
      ]
    },
    {
      id: 'reel-2',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-crunchy-potato-chips-falling-preview.mp4',
      instagramUrl: 'https://www.instagram.com/reel/DYY20guSsVF/',
      embedUrl: 'https://www.instagram.com/reel/DYY20guSsVF/embed/',
      tag: '🔥 SNACK CRUNCH VIBE',
      partner: 'fit_india',
      bgColor: 'from-[#3A140F] via-[#240C0A] to-[#0D0504]',
      likes: 3281,
      commentsCount: 92,
      hasLiked: false,
      hasSaved: false,
      caption: 'The ultimate slow-mo crispy makhana puff action! 🍿 Give your dietitian the day off, these are 100% certified gold stars. Choice of healthy moms! ✨❤️ #Superfood #PuffyGoodness',
      musicName: 'Cosmic Snacking Beats - Lofi Gym',
      shares: 512,
      isMuted: true,
      comments: [
        { id: 1, user: 'dietitian_ananya', text: 'I actually recommend this to my clients! Great nutritional stats 🌿' },
        { id: 2, user: 'runner_aman', text: 'Superb post-run recovery snack! The protein rating is top notch' },
        { id: 3, user: 'crunchy_bites', text: 'That crunch sound can wake up my neighborhood haha 😍' }
      ]
    },
    {
      id: 'reel-3',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-spices-on-chips-preview.mp4',
      instagramUrl: 'https://www.instagram.com/reel/DSAYinNkiiJ/',
      embedUrl: 'https://www.instagram.com/reel/DSAYinNkiiJ/embed/',
      tag: '🌟 REEL POPULAR PICK',
      partner: 'markinm',
      bgColor: 'from-[#1A0C0E] via-[#2F151B] to-black',
      likes: 2450,
      commentsCount: 74,
      hasLiked: false,
      hasSaved: false,
      caption: 'The ultimate superfood snacks: Twirtles are 100% baked, made with pure makhana, grains, and zero seed oil. No compromise, pure fuel! 🛒🌟 #Twirtles #Superpuff #NoSeedOil',
      musicName: 'Pure High Energy Beats - Sound Studio',
      shares: 215,
      isMuted: true,
      comments: [
        { id: 1, user: 'kabir_fitness', text: 'Finally clean ingredients list on a packet in India! 🇮🇳' },
        { id: 2, user: 'gourmet_traveler', text: 'Does it have MSG? No? Perfect, putting an order right away!' },
        { id: 3, user: 'ragi_lover_99', text: 'Ragi and quinoa mix is high-end gourmet magic! ✨' }
      ]
    }
  ]);

  const [clickedPlayStates, setClickedPlayStates] = useState<Record<string, boolean>>({
    'reel-1': true,
    'reel-2': true,
    'reel-3': true,
  });

  const [viewMode, setViewMode] = useState<'demo' | 'embed'>('embed');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customEmbedUrl, setCustomEmbedUrl] = useState<string | null>(null);

  const [activeCommentsReel, setActiveCommentsReel] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [activeReelIdx, setActiveReelIdx] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // New Custom Playback States for HTML5 mode as requested
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({
    'reel-1': false,
    'reel-2': false,
    'reel-3': false,
  });
  const [currentTimes, setCurrentTimes] = useState<Record<string, number>>({
    'reel-1': 0,
    'reel-2': 0,
    'reel-3': 0,
  });
  const [durations, setDurations] = useState<Record<string, number>>({
    'reel-1': 0,
    'reel-2': 0,
    'reel-3': 0,
  });

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Helper to format timestamps organically (e.g. 0:05)
  const formatTime = (secs: number) => {
    if (isNaN(secs) || !isFinite(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Direct handshakes for Play/Pause button and viewport clicks
  const togglePlayPause = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      // Pause all other videos to maintain pristine workspace acoustics
      Object.keys(videoRefs.current).forEach(key => {
        if (key !== id && videoRefs.current[key]) {
          videoRefs.current[key]?.pause();
          setPlayingStates(prev => ({ ...prev, [key]: false }));
        }
      });

      video.play().then(() => {
        setPlayingStates(prev => ({ ...prev, [id]: true }));
        setClickedPlayStates(prev => ({ ...prev, [id]: true }));
      }).catch(err => {
        console.error("Video play failed:", err);
      });
    } else {
      video.pause();
      setPlayingStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleTimeUpdate = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      setCurrentTimes(prev => ({ ...prev, [id]: video.currentTime }));
    }
  };

  const handleLoadedMetadata = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      setDurations(prev => ({ ...prev, [id]: video.duration || 0 }));
    }
  };

  const handleSeek = (id: string, value: number) => {
    const video = videoRefs.current[id];
    if (video) {
      video.currentTime = value;
      setCurrentTimes(prev => ({ ...prev, [id]: value }));
    }
  };

  // Helper to show custom micro-toast feedback
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Toggle Reels Mute State Helper
  const toggleReelMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReels(prev => prev.map(r => {
      if (r.id === id) {
        const nextMuted = !r.isMuted;
        const video = videoRefs.current[id];
        if (video) video.muted = nextMuted;
        return { ...r, isMuted: nextMuted };
      }
      return r;
    }));
  };

  // Toggle Like State dynamically
  const toggleReelLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReels(prev => prev.map(r => {
      if (r.id === id) {
        const liked = !r.hasLiked;
        return {
          ...r,
          hasLiked: liked,
          likes: liked ? r.likes + 1 : r.likes - 1
        };
      }
      return r;
    }));
  };

  // Toggle Save State dynamically
  const toggleReelSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReels(prev => prev.map(r => {
      if (r.id === id) {
        const saved = !r.hasSaved;
        if (saved) {
          triggerToast("Reel saved to your Instagram collection! 📂");
        } else {
          triggerToast("Removed from collections.");
        }
        return { ...r, hasSaved: saved };
      }
      return r;
    }));
  };

  // Add Comment dynamically in local memory
  const handleAddComment = (reelId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        return {
          ...r,
          commentsCount: r.commentsCount + 1,
          comments: [
            ...r.comments,
            {
              id: Date.now(),
              user: 'twirtles_fan',
              text: newCommentText.trim()
            }
          ]
        };
      }
      return r;
    }));

    setNewCommentText('');
    triggerToast("Your comment has been posted! 💬");
  };

  // Share action trigger
  const handleShareReel = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const origin = window.location.origin;
    navigator.clipboard.writeText(`${origin}/#reels/${id}`);
    triggerToast("Direct Reel Link copied to clipboard! 🔗✈️");
  };

  // Custom live Instagram Reel preview processor
  const handleLoadCustomReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;

    let shortcode = customUrlInput.trim();
    if (shortcode.includes('instagram.com')) {
      const match = shortcode.match(/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
      if (match && match[1]) {
        shortcode = match[1];
      }
    }

    if (shortcode && shortcode.length > 2) {
      const newEmbed = `https://www.instagram.com/reel/${shortcode}/embed/`;
      setCustomEmbedUrl(newEmbed);
      setReels(prev => prev.map(r => r.id === 'reel-1' ? {
        ...r,
        instagramUrl: `https://www.instagram.com/reel/${shortcode}/`,
        embedUrl: newEmbed
      } : r));
      triggerToast("Custom Instagram Reel loaded for preview! 🎬🎉");
    } else {
      triggerToast("Please enter a valid Instagram Reel link or Post shortcode.");
    }
  };

  // Testimonials section details mimicking the screenshot precisely
  const reviewsList = [
    {
      stars: 5,
      title: "🔥 INCREDIBLE FLAVOR WITH NO ACCIDENTS!",
      quote: "Baked to perfect crunch, loaded with protein, and absolute bliss. The peri-peri ragi chips are insanely tasty!",
      author: "RAMAN N."
    },
    {
      stars: 5,
      title: "💪 BEST WORKOUT PARTNER EVER!",
      quote: "No palm oil, no artificial junk, and fortified with essential vitamins. Twirtles snacks are regular in my grocery bag now.",
      author: "PRIYA K."
    },
    {
      stars: 5,
      title: "😋 MY KIDS CAN'T GET ENOUGH!",
      quote: "Healthy, light, crispy superpuffs. Truly India's premier high nutrition snack brand for our family tables.",
      author: "ANKIT S."
    }
  ];

  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // New states for the interactive Instagram profile and media grid
  const [instaActiveTab, setInstaActiveTab] = useState<'posts' | 'press' | 'tagged'>('posts');
  const [selectedInstaPost, setSelectedInstaPost] = useState<any | null>(null);
  const [instaLikedStates, setInstaLikedStates] = useState<Record<string, boolean>>({
    'post-1': false,
    'post-2': false,
    'post-3': false,
    'post-4': false,
    'post-5': false,
    'post-6': false,
  });
  const [instaComments, setInstaComments] = useState<Record<string, Array<{ id: number; user: string; text: string }>>>({
    'post-1': [
      { id: 1, user: 'harsh_snack', text: 'Awesome to see healthy Indian startups getting mainstream TV coverage! 🇮🇳🔥' },
      { id: 2, user: 'fit_manpreet', text: 'Congratulations Samarth! Twirtles is the next big thing in snacks.' },
      { id: 3, user: 'ananya_foodie', text: 'Protein chip market is ready for a non-fried baked player. Ordering today!' }
    ],
    'post-2': [
      { id: 1, user: 'gagan_preet', text: 'So proud of this moment. Standing ovation was fully deserved! 👍' },
      { id: 2, user: 'nitin_choudhary', text: 'The presentation was absolute class. Keep rising!' },
      { id: 3, user: 'smriti_singh', text: 'Wholesome vision backed by state-of-the-art research. Inspiring stuff!' }
    ],
    'post-3': [
      { id: 1, user: 'snack_queen', text: 'Chocolate drizzle popped makhana is a gamechanger!' },
      { id: 2, user: 'crunchy_lover', text: 'Look at those gorgeous packages! Clean branding ❤️' }
    ],
    'post-4': [
      { id: 1, user: 'shreya_fit', text: 'Finally a snack that fits my macros perfectly! 10g protein!' },
      { id: 2, user: 'gym_freak_rohit', text: 'Post workout carb/protein ratio here is incredible.' }
    ],
    'post-5': [
      { id: 1, user: 'curious_mind', text: 'Ah, so that is how they get them so light! Popping machines are super cool!' }
    ],
    'post-6': [
      { id: 1, user: 'mumbai_bytes', text: 'My combo shipping box arrived yesterday too! Insanely delicious!' }
    ]
  });
  const [instaCommentInput, setInstaCommentInput] = useState('');

  const handleAddInstaComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!instaCommentInput.trim()) return;

    setInstaComments(prev => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        {
          id: Date.now(),
          user: 'twirtles_fan',
          text: instaCommentInput.trim()
        }
      ]
    }));

    setInstaCommentInput('');
    triggerToast("Comment added to Instagram post preview! 💬");
  };

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col w-full text-chomps-black font-sans bg-[#FAF7F2]">
      
      {/* 1. SCROLLING MARQUEE MIDDLE BANNER (Red/Brown bar from screenshot) */}
      <div className="bg-chomps-red py-2.5 text-center overflow-hidden border-t-4 border-b-4 border-chomps-black select-none">
        <div className="inline-flex gap-8 items-center text-xs text-white font-sans font-black tracking-widest uppercase animate-pulse">
          <span>🎯 FREE SHIPPING ON ORDERS OVER ₹499 </span>
          <span className="text-chomps-yellow">•</span>
          <span> 💯 100% HEALTHY & BAKED </span>
          <span className="text-chomps-yellow">•</span>
          <span> 💥 INDIA'S NO.1 NUTRITION CHIPS </span>
          <span className="text-chomps-yellow">•</span>
          <span> 🧬 FORTIFIED WITH ESSENTIAL ZINC & VITAMINS </span>
        </div>
      </div>

      {/* 4. REVIEWS SECTION WITH MARQUEE LOGO TICKER UNDERNEATH (From screenshot verbatim) */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-chomps-black relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* Giant Custom Testimonials Headline Slider ticker */}
          <div className="w-full bg-chomps-cream border-t-2 border-b-2 border-chomps-black py-2.5 mb-10 overflow-hidden select-none">
            <p className="text-chomps-red font-display text-2xl uppercase tracking-widest font-black animate-pulse flex justify-around w-full gap-5">
              <span>REVIEWS ★ REVIEWS ★ REVIEWS ★ REVIEWS</span>
              <span className="hidden md:inline">★ REVIEWS ★ REVIEWS ★ REVIEWS</span>
            </p>
          </div>

          {/* Testimonial slider Card with red solid borders mimicking the screenshot */}
          <div className="w-full max-w-2xl bg-white border-4 border-chomps-red p-8 md:p-12 relative shadow-[8px_8px_0px_0px_rgba(84,49,36,0.15)] flex flex-col items-center rounded-none text-center">
            
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-chomps-yellow fill-chomps-yellow" strokeWidth={1} />
              ))}
            </div>

            <h3 className="font-display font-black text-2xl md:text-3.5xl text-chomps-black uppercase leading-none tracking-wide mb-4">
              "{reviewsList[activeReviewIdx].title}"
            </h3>

            <p className="font-sans font-bold text-gray-700 text-sm md:text-base leading-relaxed uppercase mb-6 max-w-lg">
              {reviewsList[activeReviewIdx].quote}
            </p>

            <span className="bg-chomps-yellow text-chomps-black border border-chomps-black px-4 py-1.5 font-display text-sm font-black tracking-widest uppercase">
              {reviewsList[activeReviewIdx].author}
            </span>

            {/* In-card Navigation toggle controls */}
            <div className="flex items-center gap-3 mt-8">
              <button
                id="review-prev-toggle"
                onClick={prevReview}
                className="p-2 bg-chomps-black hover:bg-chomps-red text-white transition-colors cursor-pointer rounded-none border border-chomps-black"
                title="Scroll Prev Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-gray-500">
                <span>{activeReviewIdx + 1}</span>
                <span>/</span>
                <span>{reviewsList.length}</span>
              </div>

              <button
                id="review-next-toggle"
                onClick={nextReview}
                className="p-2 bg-chomps-black hover:bg-chomps-red text-white transition-colors cursor-pointer rounded-none border border-chomps-black"
                title="Scroll Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. TWIRTLES INSTAGRAM REELS SECTION (Replaces the previous Daily Chomp blog section) */}
      <section className="bg-chomps-cream/35 py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-chomps-black text-center relative">
        {/* Floating Custom Toast Alerts for Reels Interactivity */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#8d5438] text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-mono tracking-widest uppercase z-50 rounded-none inline-flex items-center gap-2"
            >
              <Sparkle className="w-4 h-4 text-chomps-yellow animate-spin animate-infinite" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <span className="text-[#8d5438] font-display text-base font-black tracking-widest uppercase mb-2">
            🎬 LIVE INSTAGRAM REELS
          </span>
          <h2 className="font-display font-black text-5xl sm:text-6xl text-chomps-black uppercase tracking-widest leading-none mb-4">
            Trending Embeds on @twirtles_
          </h2>
          <p className="font-sans font-black text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl uppercase mb-8">
            Explore our community stories & healthy crunch drops! Interact directly with our real live reels below.
          </p>



          {/* REAL INSTAGRAM LIVE EMBED CARD GRID */}
          <div className={`${isMobile ? 'w-full max-w-sm mx-auto' : 'grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl'} justify-center items-stretch text-left transition-all duration-300`}>
            
            {(isMobile ? [reels[activeReelIdx]] : reels).map((r) => {
              const activeEmbedLink = r.id === 'reel-1' && customEmbedUrl ? customEmbedUrl : r.embedUrl;
              return (
                <div 
                  id={`instagram-reel-box-${r.id}`}
                  key={r.id} 
                  className="border-4 border-black bg-white rounded-lg shadow-[8px_8px_0px_0px_rgba(141,84,56,0.25)] p-4 flex flex-col justify-start items-center group relative overflow-hidden transition-all duration-300 gap-3"
                >
                  {/* Top Independent tag banner with black border as shown in screenshot */}
                  <div className="w-full bg-[#FAF7F2] py-2.5 px-3 border-2 border-black flex items-center justify-between font-mono text-[11px] font-black tracking-widest text-[#351D14] uppercase select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="flex items-center gap-1">★ REEL {r.tag.replace(/[^A-Za-z0-9 ]/g, '').trim()}</span>
                    <Instagram className="w-4 h-4 text-pink-600 animate-pulse" />
                  </div>

                  {/* Nested secondary frame box grouping Profile, Video Body, and Footer to exactly match screenshot structure */}
                  <div className="w-full border-2 border-black bg-stone-50 rounded-lg p-2.5 flex flex-col gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    
                    {/* Profile Header Block */}
                    <div className="w-full flex items-center justify-between gap-2 select-none text-left bg-white p-2 border-2 border-black rounded-lg">
                      <div className="flex items-center gap-2">
                        {/* Overlapping circular avatars */}
                        <div className="relative w-9 h-9 flex-shrink-0">
                          {/* Main twirtles brand avatar */}
                          <div className="absolute top-0 left-0 w-7 h-7 rounded-full bg-[#8d5438] border border-black flex items-center justify-center overflow-hidden z-10 shadow-sm">
                            <span className="font-display font-black text-[10px] text-[#FAF7F2] tracking-tighter">TW</span>
                          </div>
                          {/* Overlapping recipient/collaborator avatar */}
                          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#FFF200] border-2 border-black flex items-center justify-center overflow-hidden z-20 shadow-xs">
                            <span className="font-mono text-[8px] text-black font-black uppercase">{r.partner.slice(0, 2)}</span>
                          </div>
                        </div>

                        <div className="flex flex-col leading-tight">
                          <span className="font-sans font-black text-[11px] sm:text-xs text-[#351D14] hover:underline cursor-pointer block truncate max-w-[85px] sm:max-w-none">
                            twirtles_ <span className="text-gray-400 font-medium text-[9px]">and</span> {r.partner}
                          </span>
                          <span className="font-mono text-[8.5px] text-gray-400 font-black uppercase tracking-wider block">
                            Original audio
                          </span>
                        </div>
                      </div>

                      <a 
                        href="https://www.instagram.com/twirtles_" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-chomps-yellow hover:bg-[#FFF200] text-black text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-1.5 border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[1.5px] active:translate-y-[2px] transition-all rounded-none flex-shrink-0"
                      >
                        VIEW PROFILE
                      </a>
                    </div>
                    
                    {/* Aspect Ratio Video Frame area (Spacious 470px as requested "like before") */}
                    <div className="w-full h-[470px] relative rounded-md overflow-hidden bg-black border-2 border-black flex flex-col items-center justify-center">
                      
                      {!clickedPlayStates[r.id] ? (
                        /* Custom Covered Preview Overlay when the card is not clicked yet */
                        <div 
                          onClick={() => {
                            setClickedPlayStates(prev => ({ ...prev, [r.id]: true }));
                            // Autoplay fast direct stream if we are in demo mode
                            if (viewMode === 'demo') {
                              setTimeout(() => {
                                const video = videoRefs.current[r.id];
                                if (video) {
                                  video.play().then(() => {
                                    setPlayingStates(prev => ({ ...prev, [r.id]: true }));
                                  }).catch(err => {
                                    console.error("Initiated play failed:", err);
                                  });
                                }
                              }, 50);
                            }
                          }}
                          className="absolute inset-0 cursor-pointer group/overlay overflow-hidden flex flex-col justify-between"
                          title={viewMode === 'demo' ? "Play Live on Website" : "Watch Instagram Reel"}
                        >
                          {/* ATMOSPHERIC BACKGROUND SPECIALLY DESIGNED FOR EACH THEMATIC REEL */}
                          <div className={`absolute inset-0 bg-gradient-to-b ${r.bgColor} transition-transform duration-700`}>
                            
                            {/* 1. REEL 1 DESIGN: Atmospheric Storm & Bicycle Delivery */}
                            {r.id === 'reel-1' && (
                              <>
                                {/* Dramatic lightning bolt path SVGs */}
                                <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                  <defs>
                                    <linearGradient id="lightning-glow-1" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#ff4500" stopOpacity="0.9"/>
                                      <stop offset="100%" stopColor="#ffa500" stopOpacity="0.2"/>
                                    </linearGradient>
                                  </defs>
                                  <path 
                                    d="M 120,0 L 95,80 L 135,70 L 75,170 L 105,160 L 45,290" 
                                    fill="none" 
                                    stroke="url(#lightning-glow-1)" 
                                    strokeWidth="3.5" 
                                    className="animate-pulse"
                                    style={{ filter: 'drop-shadow(0px 0px 8px #ff4544)' }} 
                                  />
                                  <path 
                                    d="M 230,0 L 245,60 L 220,50 L 265,130 L 240,120 L 275,230" 
                                    fill="none" 
                                    stroke="url(#lightning-glow-1)" 
                                    strokeWidth="2.5" 
                                    className="animate-pulse delay-500"
                                    style={{ filter: 'drop-shadow(0px 0px 5px #ff4544)' }} 
                                  />
                                </svg>

                                {/* Subtle ambient light pulses */}
                                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none animate-pulse duration-4000" />
                                
                                {/* WIRTLES title in sky */}
                                <div className="absolute inset-x-0 top-16 flex flex-col justify-center items-center opacity-30 select-none pointer-events-none">
                                  <span className="font-display font-black text-4xl uppercase tracking-widest text-[#FCDEDF] antialiased">
                                    WIRTLES
                                  </span>
                                  <span className="font-mono text-[9px] font-black tracking-widest text-white uppercase mt-1">LAUNCH STORY</span>
                                </div>

                                {/* Bicycle Delivery Rider silhouette vector */}
                                <div className="absolute inset-x-0 bottom-0 flex justify-center items-end h-40 pointer-events-none select-none">
                                  <svg className="w-full h-24 text-orange-950/40" viewBox="0 0 200 100" fill="currentColor">
                                    <line x1="0" y1="85" x2="200" y2="85" stroke="#3A140F" strokeWidth="2.5" />
                                    <rect x="42" y="28" width="26" height="26" rx="1.5" fill="#54231E" stroke="#8d5438" strokeWidth="1.5" />
                                    <text x="55" y="44" fill="#FAF7F2" fontSize="5.5" fontWeight="black" textAnchor="middle" letterSpacing="0.2">TWIRTLES</text>
                                    <circle cx="88" cy="20" r="5" fill="#1C0D0A" />
                                    <path d="M 88,25 L 91,48 L 78,62" stroke="#1C0D0A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M 88,28 L 106,38 L 109,52" stroke="#1C0D0A" strokeWidth="3" strokeLinecap="round" />
                                    <circle cx="62" cy="72" r="13" fill="none" stroke="#221110" strokeWidth="2" />
                                    <circle cx="116" cy="72" r="13" fill="none" stroke="#221110" strokeWidth="2" />
                                    <path d="M 62,72 L 84,72 L 96,50 L 62,72 M 84,72 L 91,52 M 96,50 L 116,72" fill="none" stroke="#3A140F" strokeWidth="2" />
                                  </svg>
                                </div>
                              </>
                            )}

                            {/* 2. REEL 2 DESIGN: Snack Munch Red/Orange Glowing Crunch */}
                            {r.id === 'reel-2' && (
                              <>
                                {/* Sparkling particles background */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.15)_0%,transparent_70%)] animate-pulse" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 select-none pointer-events-none">
                                  <Flame className="w-48 h-48 text-[#FFF200]" strokeWidth={1} />
                                </div>

                                {/* Crunch Waves */}
                                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="130" cy="200" r="80" fill="none" stroke="#FF4500" strokeWidth="1" strokeDasharray="5,5" className="animate-spin-slow" />
                                  <circle cx="130" cy="200" r="110" fill="none" stroke="#FFF200" strokeWidth="1.5" strokeDasharray="3,6" />
                                </svg>

                                {/* Title in sky */}
                                <div className="absolute inset-x-0 top-16 flex flex-col justify-center items-center opacity-40 select-none pointer-events-none">
                                  <span className="font-display font-black text-4xl uppercase tracking-widest text-[#FFF200] antialiased">
                                    CRUNCH VIBE
                                  </span>
                                  <span className="font-mono text-[9px] font-black tracking-widest text-white uppercase mt-1">THE ULTIMATE POPPED PUFF</span>
                                </div>

                                {/* Food overlay visual representation */}
                                <div className="absolute inset-x-0 bottom-6 flex justify-center items-center pointer-events-none select-none">
                                  <div className="relative w-36 h-36 flex items-center justify-center">
                                    {/* Center makhana pack silhouette */}
                                    <div className="w-14 h-20 bg-chomps-yellow/80 border-2 border-black rounded-sm shadow-md rotate-[-6deg] flex flex-col items-center justify-center p-1">
                                      <span className="font-display font-black text-[7px] text-black">TWIRTLES</span>
                                      <div className="w-8 h-8 rounded-full bg-chomps-red/30 border border-black my-1 flex items-center justify-center">
                                        <Flame className="w-4.5 h-4.5 text-chomps-red" />
                                      </div>
                                      <span className="font-mono font-bold text-[5px] text-black">PERI-PERI</span>
                                    </div>
                                    {/* Popped snack bursts */}
                                    <div className="absolute top-2 right-4 w-5 h-5 rounded-full bg-[#FAF7F2] border border-black shadow-xs flex items-center justify-center animate-bounce">
                                      <span className="font-mono text-[7px] font-black text-black">🔥</span>
                                    </div>
                                    <div className="absolute bottom-6 left-2 w-7 h-7 rounded-full bg-chomps-red border border-black shadow-xs flex items-center justify-center animate-pulse">
                                      <span className="font-mono text-[9px] text-white font-black">100%</span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* 3. REEL 3 DESIGN: Popular Pick Green/Gold Star Clean Fuel */}
                            {r.id === 'reel-3' && (
                              <>
                                {/* Sparkling premium celestial background */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,130,0.1)_0%,transparent_60%)]" />
                                
                                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                                  {/* Golden orbits */}
                                  <ellipse cx="130" cy="190" rx="120" ry="50" fill="none" stroke="#FFF200" strokeWidth="1" className="rotate-[-12deg]" />
                                  <ellipse cx="130" cy="190" rx="90" ry="35" fill="none" stroke="#00FF82" strokeWidth="1" className="rotate-[15deg] animate-pulse" />
                                </svg>

                                {/* Stars details */}
                                <div className="absolute top-1/4 right-1/4 animate-ping text-chomps-yellow">★</div>
                                <div className="absolute top-1/3 left-1/5 animate-pulse text-[#00FF82] text-xs">★</div>
                                <div className="absolute bottom-1/4 right-1/3 text-white text-sm">★</div>

                                {/* Title in sky */}
                                <div className="absolute inset-x-0 top-16 flex flex-col justify-center items-center opacity-40 select-none pointer-events-none">
                                  <span className="font-display font-black text-4xl uppercase tracking-widest text-[#00FF82] antialiased">
                                    DAILY FUEL
                                  </span>
                                  <span className="font-mono text-[9px] font-black tracking-widest text-white uppercase mt-1">NO SEED OIL • 100% BAKED</span>
                                </div>

                                {/* Healthy graphics representation */}
                                <div className="absolute inset-x-0 bottom-6 flex justify-center items-center pointer-events-none select-none">
                                  <div className="relative w-36 h-36 flex items-center justify-center">
                                    {/* Center superfood bowl and bag packaging silhouette */}
                                    <div className="w-16 h-16 rounded-full bg-[#0D1510] border-2 border-[#00FF82]/40 shadow-lg flex items-center justify-center animate-pulse">
                                      <div className="w-12 h-12 rounded-full border border-[#FFF200] flex flex-col items-center justify-center">
                                        <Star className="w-5 h-5 text-chomps-yellow fill-chomps-yellow" />
                                        <span className="font-mono text-[6px] text-white font-bold uppercase tracking-tighter">GOLD STAR</span>
                                      </div>
                                    </div>
                                    {/* Healthy checks */}
                                    <div className="absolute top-3 left-4 w-6 h-6 rounded-full bg-[#00FF82] border-2 border-black shadow-xs flex items-center justify-center">
                                      <ShieldCheck className="w-3.5 h-3.5 text-black" />
                                    </div>
                                    <div className="absolute bottom-4 right-1 w-8 h-8 rounded-full bg-white border border-black shadow-xs flex flex-col items-center justify-center">
                                      <span className="font-mono text-[7px] text-black font-extrabold tracking-tighter">ZERO</span>
                                      <span className="font-mono text-[5px] text-chomps-red font-black leading-none uppercase">OIL</span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Dimmer overlay card mask */}
                            <div className="absolute inset-0 bg-black/40 group-hover/overlay:bg-black/30 transition-all duration-300" />
                          </div>

                          {/* Play Button Icon and Watch dynamic title wrapper */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 select-none">
                            <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white/20 group-hover/overlay:bg-white/35 group-hover/overlay:scale-110 rounded-full flex items-center justify-center border border-white/60 transition-all duration-300 shadow-lg text-white">
                              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white translate-x-0.5 animate-pulse" />
                            </div>
                            <span className="font-display font-black text-xs uppercase tracking-widest text-[#FAF7F2] font-sans font-black drop-shadow-md">
                              {viewMode === 'demo' ? "Play Live on Website" : "Watch on Instagram"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Live Player Mode: Instantly boots standard local-MP4 direct streaming or the Instagram Embed iframe */
                        <div className="w-full h-full relative flex flex-col items-center justify-center bg-black group/player">
                          
                          {viewMode === 'demo' ? (
                            /* High-Performance HTML5 Direct Video player with full custom controls layer */
                            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                              <video 
                                ref={(el) => { videoRefs.current[r.id] = el; }}
                                src={r.videoUrl} 
                                className="w-full h-full object-cover cursor-pointer"
                                loop 
                                autoPlay
                                muted={r.isMuted}
                                playsInline
                                onPlay={() => setPlayingStates(prev => ({ ...prev, [r.id]: true }))}
                                onPause={() => setPlayingStates(prev => ({ ...prev, [r.id]: false }))}
                                onTimeUpdate={() => handleTimeUpdate(r.id)}
                                onLoadedMetadata={() => handleLoadedMetadata(r.id)}
                                onClick={() => togglePlayPause(r.id)}
                              />

                              {/* Center Hover Play/Pause Overlay Indicator Button */}
                              <div 
                                onClick={() => togglePlayPause(r.id)}
                                className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
                                  playingStates[r.id] ? 'opacity-0 hover:opacity-100 bg-black/10' : 'opacity-100 bg-black/20'
                                }`}
                              >
                                <div className="w-16 h-16 rounded-full bg-black/60 border border-white/40 flex items-center justify-center text-white scale-100 hover:scale-105 active:scale-95 transition-all shadow-xl">
                                  {playingStates[r.id] ? (
                                    <Pause className="w-6 h-6 fill-white text-white" />
                                  ) : (
                                    <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                                  )}
                                </div>
                              </div>

                              {/* Custom Twirtles Premium Neubrutalist Seek & Controls Bar */}
                              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 pt-10 pb-4 flex flex-col gap-2.5 z-10 font-mono text-white select-none">
                                
                                {/* Progress Slider Timeline */}
                                <div className="flex items-center gap-2 w-full">
                                  <input 
                                    type="range"
                                    min={0}
                                    max={durations[r.id] || 100}
                                    step="0.01"
                                    value={currentTimes[r.id] || 0}
                                    onChange={(e) => handleSeek(r.id, parseFloat(e.target.value))}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/20 accent-chomps-red hover:bg-white/30 transition-colors focus:outline-none"
                                    title="Seek Position"
                                  />
                                </div>

                                {/* Custom Bottom Status Row */}
                                <div className="flex items-center justify-between w-full text-xs">
                                  <div className="flex items-center gap-3">
                                    {/* Primary Play/Pause Clicker */}
                                    <button
                                      type="button"
                                      onClick={(e) => togglePlayPause(r.id, e)}
                                      className="text-white hover:text-chomps-red hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
                                      title={playingStates[r.id] ? "Pause Video" : "Play Video"}
                                    >
                                      {playingStates[r.id] ? (
                                        <Pause className="w-4 h-4 fill-white text-white" />
                                      ) : (
                                        <Play className="w-4 h-4 fill-white text-white" />
                                      )}
                                    </button>

                                    {/* Readable Time Counter */}
                                    <span className="font-mono text-[10px] tracking-widest text-[#FAF7F2]/80 uppercase">
                                      {formatTime(currentTimes[r.id] || 0)} / {formatTime(durations[r.id] || 0)}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    {/* Mute and Unmute Sound Controller */}
                                    <button
                                      type="button"
                                      onClick={(e) => toggleReelMute(r.id, e)}
                                      className="text-white hover:text-chomps-yellow hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
                                      title={r.isMuted ? "Unmute Sound" : "Mute Sound"}
                                    >
                                      {r.isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                                    </button>

                                    {/* Close and Reset Frame Button */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const video = videoRefs.current[r.id];
                                        if (video) video.pause();
                                        setPlayingStates(prev => ({ ...prev, [r.id]: false }));
                                        setClickedPlayStates(prev => ({ ...prev, [r.id]: false }));
                                      }}
                                      className="text-[9px] font-black uppercase tracking-wider bg-[#FAF7F2] hover:bg-chomps-red text-black hover:text-white px-2 py-1 border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer focus:outline-none"
                                      title="Reset to Preview Cover"
                                    >
                                      × Reset Cover
                                    </button>
                                  </div>
                                </div>

                              </div>
                            </div>
                          ) : (
                            /* Live Standard Iframe sandbox widget wrapper */
                            <div className="w-full h-full relative overflow-hidden rounded-md bg-black flex items-center justify-center">
                              <iframe 
                                src={activeEmbedLink}
                                className="absolute border-none animate-fade-in"
                                style={
                                  r.id === 'reel-1' ? {
                                    width: '326px',
                                    height: '560px',
                                    top: '-185px',
                                    left: '50%',
                                    marginLeft: '-163px',
                                    transform: 'scale(1.68)',
                                    transformOrigin: 'top center',
                                    pointerEvents: 'auto',
                                    clipPath: 'inset(0px 0px 65px 0px)',
                                  } : {
                                    width: '326px',
                                    height: '560px',
                                    top: '-55px',
                                    left: '50%',
                                    marginLeft: '-163px',
                                    transform: 'scale(1.28)',
                                    transformOrigin: 'top center',
                                    pointerEvents: 'auto',
                                  }
                                }
                                scrolling="no"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                title={`@twirtles_ Instagram Reel Embed ${r.id}`}
                              />

                              {/* Standard Embed View */}
                            </div>
                          )}

                        </div>
                      )}
                    </div>

                    {/* Integrated Bottom Link footer area inside nested card block strictly matching screenshot */}
                    <div className="w-full bg-white p-2.5 border-2 border-black rounded-lg flex items-center justify-between text-left select-none leading-none shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                      <a 
                        href={r.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8d5438] hover:text-chomps-red font-sans font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>View more on Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5 stroke-[3]" />
                      </a>
                      
                      <button
                        id={`share-instareel-${r.id}`}
                        onClick={(e) => handleShareReel(r.id, e)}
                        className="p-1.5 bg-stone-50 hover:bg-[#FAF7F2] text-black border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[1.5px] transition-all cursor-pointer rounded-none"
                        title="Share / Copy Link"
                      >
                        <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Dynamic mobile slide navigation controls for Reels */}
          {isMobile && (
            <div className="flex items-center justify-center gap-4 mt-8 select-none animate-fade-in">
              <button
                id="reels-carousel-prev"
                onClick={() => setActiveReelIdx((prev) => (prev - 1 + reels.length) % reels.length)}
                className="p-3 bg-chomps-black hover:bg-chomps-red text-white transition-all cursor-pointer rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5"
                title="Previous Reel"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2.5">
                {reels.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReelIdx(idx)}
                    className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-all ${
                      activeReelIdx === idx ? 'bg-[#8d5438] scale-110 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-zinc-100'
                    }`}
                    title={`Go to Reel ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                id="reels-carousel-next"
                onClick={() => setActiveReelIdx((prev) => (prev + 1) % reels.length)}
                className="p-3 bg-chomps-black hover:bg-chomps-red text-white transition-all cursor-pointer rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5"
                title="Next Reel"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}



          {/* INSTAGRAM LIGHTBOX DETAILED MODAL */}
          <AnimatePresence>
            {selectedInstaPost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedInstaPost(null)}
                className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 sm:p-6 z-50 backdrop-blur-xs select-none"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.93, y: 15 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-4xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:grid md:grid-cols-12 rounded-none overflow-hidden max-h-[92vh] sm:max-h-[85vh] relative"
                >
                  {/* CLOSE MODAL BUTTON OVERLAY */}
                  <button
                    onClick={() => setSelectedInstaPost(null)}
                    className="absolute top-3 right-3 z-30 bg-white text-black hover:bg-chomps-red hover:text-white border-2 border-black w-8 h-8 rounded-full flex items-center justify-center font-mono font-black text-base shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all cursor-pointer"
                    title="Close Post Preview"
                  >
                    ×
                  </button>

                  {/* LEFT PORTION: LARGE POST CONTAINER (COVERS 7 COLS) */}
                  <div className="md:col-span-7 aspect-square sm:aspect-auto md:h-full bg-stone-100 border-b-2 md:border-b-0 md:border-r-2 border-black relative">
                    {selectedInstaPost.imageType === 'news' && (
                      <div className="absolute inset-0 bg-[#090C15] flex flex-col justify-between">
                        {/* CNBC live banners */}
                        <div className="w-full bg-red-600 px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-mono text-white text-left font-black tracking-widest uppercase flex justify-between items-center z-10 leading-none select-none">
                          <span>LIVE NEWS BROADCAST • CNBC INSIGHT</span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            REC 1080P
                          </span>
                        </div>
                        
                        {/* Split streams layout */}
                        <div className="flex-1 w-full grid grid-cols-2 relative p-3 gap-3 bg-[#090C15] items-center">
                          {/* Anchor box */}
                          <div className="border border-slate-700 bg-slate-800/40 rounded h-32 sm:h-44 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent)] animate-pulse" />
                            <div className="relative w-14 h-14 rounded-full border border-sky-400 bg-slate-700 flex items-center justify-center">
                              <svg className="w-9 h-9 text-sky-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                            <span className="font-mono text-[8px] text-sky-400 mt-2.5 uppercase tracking-widest bg-sky-950/80 px-2.5 py-0.5 border border-sky-800/40">Anchor Desk</span>
                          </div>

                          {/* Founder Samarth wearing turban */}
                          <div className="border border-[#8D5438] bg-[#3D1A16]/20 rounded h-32 sm:h-44 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15),transparent)] animate-pulse" />
                            
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#8d5438] bg-stone-100 flex items-center justify-center overflow-hidden shadow-lg">
                              <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
                                <circle cx="50" cy="55" r="23" fill="#ECD3BE" />
                                <path d="M29 55 C29 78, 71 78, 71 55" fill="none" stroke="#231F20" strokeWidth="6" strokeLinecap="round" />
                                <path d="M38 58 Q43 62 50 58 Q57 62 62 58" fill="none" stroke="#231F20" strokeWidth="4" strokeLinecap="round" />
                                <circle cx="50" cy="62" r="5" fill="#231F20" />
                                <circle cx="42" cy="51" r="2.5" fill="#231F20" />
                                <circle cx="58" cy="51" r="2.5" fill="#231F20" />
                                <path d="M45 61 Q50 64 55 61" fill="none" stroke="#8d5438" strokeWidth="2" strokeLinecap="round" />
                                
                                <path d="M28 42 C16 28, 48 10, 50 40 Z" fill="#8d5438" opacity="0.95" />
                                <path d="M72 42 C84 28, 52 10, 50 40 Z" fill="#703f27" opacity="0.95" />
                                <path d="M30 42 C30 18, 70 18, 70 42 C70 42, 50 30, 30 42" fill="#3D1A16" />
                                <path d="M36 34 Q50 20 64 34" fill="none" stroke="#FAF7F2" strokeWidth="2.5" opacity="0.8" />
                                <circle cx="50" cy="24" r="3" fill="#FFF200" stroke="#000" strokeWidth="0.5" />
                              </svg>
                            </div>
                            <span className="font-mono text-[8.5px] text-[#FFC107] mt-2 sm:mt-2.5 uppercase font-black bg-amber-950/80 px-2 py-0.5 border border-[#8D5438]">SAMARTH (FOUNDER)</span>
                          </div>
                        </div>

                        {/* Caption plate */}
                        <div className="w-full bg-[#131722] py-2.5 sm:py-3.5 px-4 text-center border-t border-slate-800">
                          <span className="font-sans font-black text-[#FAF7F2] text-xs sm:text-sm tracking-wide uppercase">
                            Twirtles Enters Protein Chip Market With Samarth
                          </span>
                        </div>

                        {/* Bottom yellow ticker */}
                        <div className="w-full bg-[#FFF200] border-t-2 border-black py-1.5 px-3 overflow-hidden flex items-center justify-between text-[8px] sm:text-[9.5px] font-mono font-black text-black select-none uppercase">
                          <span>REGIONAL EXPANSION FOCUS LIVE</span>
                          <span className="animate-pulse">▼ +100% BAKED PROTEIN 🚀</span>
                        </div>
                      </div>
                    )}

                    {selectedInstaPost.imageType === 'stage' && (
                      <div className="absolute inset-0 bg-[#0c0512] flex flex-col justify-between">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(141,84,56,0.35),transparent_70%)] pointer-events-none" />
                        
                        <div className="w-[80%] mx-auto mt-6 sm:mt-10 aspect-video bg-white rounded-md border-2 border-slate-700 shadow-md flex flex-col items-center justify-center p-3 relative bg-gradient-to-tr from-slate-50 to-white z-10">
                          <h3 className="font-display font-black text-[18px] sm:text-[23px] text-pink-500 uppercase tracking-widest leading-none block">
                            THANK YOU!
                          </h3>
                          <div className="w-16 h-1 bg-zinc-900 mt-2" />
                          <span className="font-mono text-[7px] sm:text-[8px] text-zinc-400 mt-1 uppercase tracking-widest block font-bold">Twirtles Launching Ceremony</span>
                        </div>

                        <div className="relative w-full flex-1 flex flex-col justify-end items-center gap-2">
                          <div className="w-full h-4 bg-zinc-900 mt-auto border-t border-zinc-800" />
                          
                          <div className="absolute bottom-4 flex items-end justify-center gap-6">
                            {/* Figure 1 */}
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 rounded-full border border-black bg-stone-100 overflow-hidden flex items-center justify-center shadow-md">
                                <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
                                  <circle cx="50" cy="55" r="23" fill="#ECD3BE" />
                                  <path d="M29 55 C29 78, 71 78, 71 55" fill="none" stroke="#231F20" strokeWidth="6" />
                                  <path d="M30 42 C16 28, 48 10, 50 40 Z" fill="#DC2626" />
                                  <path d="M72 42 C84 28, 52 10, 50 40 Z" fill="#991B1B" />
                                  <circle cx="50" cy="24" r="3" fill="#FFF200" />
                                </svg>
                              </div>
                              <span className="font-mono text-[7px] text-zinc-400 mt-1 bg-black/80 px-2 py-0.5">Samarth</span>
                            </div>
                            
                            {/* Figure 2 */}
                            <div className="flex flex-col items-center">
                              <div className="w-9 h-9 rounded-full border border-black bg-stone-200 overflow-hidden flex items-center justify-center shadow-md">
                                <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
                                  <circle cx="50" cy="55" r="23" fill="#DFB7A4" />
                                  <path d="M25 55 C25 75, 75 75, 75 55" fill="none" stroke="#000" strokeWidth="4" />
                                </svg>
                              </div>
                              <span className="font-mono text-[7px] text-zinc-400 mt-1 bg-black/80 px-2 py-0.5">Co-Presenter</span>
                            </div>
                          </div>
                        </div>

                        <div className="w-full bg-[#1d1029] py-2 sm:py-3 px-4 text-center border-t border-zinc-900">
                          <span className="font-mono text-[#F43F5E] text-[8.5px] sm:text-[10px] font-black tracking-widest uppercase">
                            ★ VIP STAGE PRESENTATION CELEBRATION SUMMIT ★
                          </span>
                        </div>
                      </div>
                    )}

                    {selectedInstaPost.imageType !== 'news' && selectedInstaPost.imageType !== 'stage' && (
                      <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-tr from-slate-100 to-indigo-50">
                        {/* Fallback mockup loader render */}
                        <div className="text-center">
                          <Instagram className="w-14 h-14 text-slate-400 animate-pulse mx-auto mb-3" />
                          <span className="font-sans font-black uppercase text-xs sm:text-sm tracking-widest text-[#8d5438]">
                            {selectedInstaPost.title}
                          </span>
                          <span className="block font-mono text-[9px] text-gray-400 mt-1 uppercase">Instagram Graphics Layer</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RIGHT PORTION: DETAILS, CAPTION, LIVE COMMENTS (5 COLS) */}
                  <div className="md:col-span-5 flex flex-col justify-between bg-white h-[45vh] md:h-full text-left text-[#351D14]">
                    {/* Header Row */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-stone-50/50">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full border border-black bg-stone-100 flex items-center justify-center p-0.5">
                          <Instagram className="w-4 h-4 text-chomps-red" />
                        </div>
                        <div>
                          <span className="font-sans font-black text-xs block hover:underline cursor-pointer">{`twirtles_`}</span>
                          <span className="font-mono text-[9px] text-emerald-600 font-bold uppercase tracking-wider block">Official Snack Partner</span>
                        </div>
                      </div>
                      
                      <a
                        href="https://www.instagram.com/twirtles_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0095f6] hover:text-[#1877f2] font-sans font-black text-[10px] sm:text-[11px] uppercase tracking-wider"
                      >
                        Follow
                      </a>
                    </div>

                    {/* Scrollable Caption & Live comments */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-xs sm:text-sm">
                      {/* Caption box */}
                      <div className="pb-3 border-b border-gray-100 flex gap-2.5 items-start">
                        <div className="w-6.5 h-6.5 rounded-full bg-stone-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-black">T</div>
                        <div>
                          <strong className="font-sans font-black text-xs mr-2">{`twirtles_`}</strong>
                          <span className="text-gray-700 leading-relaxed font-sans">{selectedInstaPost.caption}</span>
                          <span className="block font-mono text-[8.5px] text-gray-400 mt-1 uppercase">{selectedInstaPost.date}</span>
                        </div>
                      </div>

                      {/* Display dynamically added comments */}
                      <div className="flex flex-col gap-3.5">
                        {((instaComments[selectedInstaPost.id]) || []).map((comm: any) => (
                          <div key={comm.id} className="flex gap-2.5 items-start">
                            <div className="w-6.5 h-6.5 rounded-full bg-chomps-yellow/20 flex-shrink-0 flex items-center justify-center text-[10px] font-mono font-black border border-black text-[#5c3725] uppercase">
                              {comm.user.slice(0, 2)}
                            </div>
                            <div>
                              <strong className="font-sans font-black text-xs mr-2">{comm.user}</strong>
                              <span className="text-gray-600 font-sans">{comm.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Area: Controls, Likes, Interactive comment fields */}
                    <div className="border-t border-gray-200 bg-stone-50 p-4">
                      <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const pId = selectedInstaPost.id;
                              setInstaLikedStates(prev => ({
                                ...prev,
                                [pId]: !prev[pId]
                              }));
                            }}
                            className="hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                            title="Like Post"
                          >
                            <Heart className={`w-[22px] h-[22px] ${instaLikedStates[selectedInstaPost.id] ? 'text-red-500 fill-red-500' : 'text-black stroke-[2.5]'}`} />
                          </button>

                          <button
                            onClick={() => {
                              const commentBox = document.getElementById(`insta-comment-input-field`);
                              if (commentBox) commentBox.focus();
                            }}
                            className="hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                            title="Focus Comments"
                          >
                            <MessageCircle className="w-[22px] h-[22px] text-black stroke-[2.5]" />
                          </button>
                        </div>
                        
                        <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          Instagram Post Preview
                        </span>
                      </div>

                      <div className="font-sans font-black text-xs sm:text-sm text-black pb-2">
                        {selectedInstaPost.likes + (instaLikedStates[selectedInstaPost.id] ? 1 : 0)} likes
                      </div>

                      {/* Comment adding Form */}
                      <form
                        onSubmit={(e) => handleAddInstaComment(selectedInstaPost.id, e)}
                        className="flex gap-2"
                      >
                        <input
                          id="insta-comment-input-field"
                          type="text"
                          placeholder="Add a comment on this post..."
                          value={instaCommentInput}
                          onChange={(e) => setInstaCommentInput(e.target.value)}
                          className="flex-1 bg-white border border-gray-300 rounded px-2.5 py-1.5 font-sans text-xs focus:ring-1 focus:ring-[#8d5438] outline-none"
                        />
                        <button
                          type="submit"
                          className="bg-chomps-black text-white hover:bg-[#8d5438] hover:text-white border border-black font-mono font-black text-[10px] uppercase px-3.5 py-1 transition-all"
                        >
                          Post
                        </button>
                      </form>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Presence Quick Links - Instagram and LinkedIn */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-2xl mx-auto px-4 select-none">
            {/* Instagram Link Button */}
            <a
              id="follow-instagram-official-btn"
              href="https://www.instagram.com/twirtles_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#8d5438] hover:bg-[#723F27] text-white py-4 px-8 font-display font-black text-[13px] sm:text-sm md:text-base uppercase tracking-widest transition-all rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 cursor-pointer"
            >
              <Instagram className="w-5.5 h-5.5 shrink-0" />
              <span>FOLLOW US ON INSTAGRAM</span>
            </a>

            {/* LinkedIn Link Button */}
            <a
              id="follow-linkedin-official-btn"
              href="https://www.linkedin.com/company/twirtles"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#8d5438] hover:bg-[#723F27] text-white py-4 px-8 font-display font-black text-[13px] sm:text-sm md:text-base uppercase tracking-widest transition-all rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 cursor-pointer"
            >
              <Linkedin className="w-5.5 h-5.5 shrink-0" />
              <span>FOLLOW US ON LINKEDIN</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

// Simple fallback component for helper check icon
function HelpCircleOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
