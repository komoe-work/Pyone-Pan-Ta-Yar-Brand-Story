/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Music, Volume2, Play, Pause, Compass, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4); // volume scale [0, 1]
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const chimeIntervalRef = useRef<number | null>(null);

  // Pentatonic scale of A (A, B, C#, E, F#)
  const CHIME_PITCHES = [220, 246.94, 277.18, 329.63, 369.99, 440, 493.88, 554.37, 659.25, 739.99, 880];

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopAllAudio();
    };
  }, []);

  // Update master volume when state changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playChime = (freq: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !masterGainRef.current) return;

    try {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      // set base frequency
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // subtle natural frequency slide / vibrato
      osc.frequency.exponentialRampToValueAtTime(
        freq + (Math.random() * 6 - 3),
        ctx.currentTime + 1.8
      );

      // soft chime attack and exponential decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

      osc.connect(gainNode);
      gainNode.connect(masterGainRef.current);
      osc.start();
      osc.stop(ctx.currentTime + 2.4);
    } catch (e) {
      console.warn("Chime generation failed", e);
    }
  };

  const startAllAudio = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      // 1. Create master volume node
      masterGainRef.current = ctx.createGain();
      masterGainRef.current.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      masterGainRef.current.connect(ctx.destination);

      // 2. Synthesize heavy slow atmospheric backing drone (Grounding pad)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 fundamental frequency

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110.3, ctx.currentTime); // detuned by 0.3Hz for subtle phasing/chorus effect

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 3.0); // smooth 3s fade-in

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(masterGainRef.current);

      osc1.start();
      osc2.start();

      droneOscRef.current = osc1; // Storing one reference for basic stop triggering
      droneGainRef.current = gainNode;

      // 3. Keep references to close both oscillators cleanly
      const stopDronePair = () => {
        try {
          osc1.stop();
          osc2.stop();
        } catch (e) {}
      };

      // 4. Setup periodic crystal chimes play loops
      chimeIntervalRef.current = window.setInterval(() => {
        if (Math.random() > 0.35) {
          const randomIndex = Math.floor(Math.random() * CHIME_PITCHES.length);
          const chimeFreq = CHIME_PITCHES[randomIndex];
          playChime(chimeFreq);
        }
      }, 1500);

      setIsPlaying(true);
    } catch (err) {
      console.error("Failed starting synthesizer context", err);
    }
  };

  const stopAllAudio = () => {
    if (chimeIntervalRef.current) {
      clearInterval(chimeIntervalRef.current);
      chimeIntervalRef.current = null;
    }

    if (droneGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      droneGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2); // smooth fade-out
    }

    setTimeout(() => {
      if (droneOscRef.current) {
        try {
          droneOscRef.current.stop();
        } catch (e) {}
        droneOscRef.current = null;
      }
    }, 1300);

    setIsPlaying(false);
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopAllAudio();
    } else {
      startAllAudio();
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Volume slider displayed next to button when active */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 80 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 overflow-hidden bg-cream-100 border border-cream-200 px-2 py-1 rounded-full text-forest-800"
          >
            <Volume2 className="w-3.5 h-3.5 flex-shrink-0 text-rust-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-12 h-1 bg-cream-300 rounded-lg appearance-none cursor-pointer accent-rust-500 py-0"
              title="အသံအတိုးအကျယ်ကို ညှိပါ"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        id="zen-audio-btn"
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-forest-800 transition-all duration-300 shadow-sm border ${
          isPlaying
            ? "bg-rust-400/20 border-rust-400 text-rust-600 font-bold"
            : "bg-cream-100 hover:bg-cream-200 border-cream-300 active:scale-95"
        }`}
        aria-label="Toggle Zen Ambient Sound Synthesizer"
      >
        <span className="flex h-2 w-2 relative">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-rust-400 ${
              isPlaying ? "opacity-75" : "opacity-0"
            }`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isPlaying ? "bg-rust-500" : "bg-forest-500"
            }`}
          ></span>
        </span>
        
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 animate-pulse" />
            <span id="audio-status-text">Zen Audio ဖွင့်ထားဆဲ</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5" />
            <span id="audio-status-text">Zen Audio ဖွင့်ရန်</span>
          </>
        )}
      </button>

      {/* Elegant minimalist tooltip for helper context */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-12 right-0 bg-forest-800 text-cream-50 text-[11px] p-2.5 rounded-lg shadow-xl w-60 z-50 leading-normal font-burmese border border-forest-900"
          >
            <p className="flex items-center gap-1 font-bold text-rust-400 mb-1">
              <Compass className="w-3 h-3 text-rust-400" /> သဘာဝအခြေခံ စိတ်အပန်းဖြေတေး
            </p>
            ပြုံးပန်းတရာ စာဖတ်ခန်းတွင် ပိုမိုအာရုံစူးစိုက်နိုင်စေရန် စိတ်ငြိမ်းချမ်းစေမည့် သဘာဝအသံလှိုင်းကို Procedural Web Synthesizer ဖြင့် စုစည်းဖန်တီးပေးထားပါသည်။
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
