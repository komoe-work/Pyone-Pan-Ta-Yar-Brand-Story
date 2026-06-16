/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { healingQuotes } from "../data";
import { Compass, Sparkles, Sprout } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function HealingCompass() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const triggerSoothingSound = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.4);
    } catch (e) {
      // standard autoplay browser guard
    }
  };

  const drawNewQuote = () => {
    setIsRolling(true);
    triggerSoothingSound(440); // Sound Note A4

    setTimeout(() => {
      let nextIndex = currentQuoteIndex;
      // Guarantee picking a fresh one unless only 1 quote exists
      if (healingQuotes.length > 1) {
        while (nextIndex === currentQuoteIndex) {
          nextIndex = Math.floor(Math.random() * healingQuotes.length);
        }
      }
      setCurrentQuoteIndex(nextIndex);
      setIsRolling(false);
    }, 380);
  };

  const currentQuote = healingQuotes[currentQuoteIndex];

  return (
    <section id="mindfulness" className="py-24 bg-cream-50 relative z-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="inline-flex items-center gap-1 text-rust-500 font-semibold text-xs uppercase tracking-widest mb-2 font-sans">
          <Sprout className="w-3.5 h-3.5" /> Daily Healing Compass
        </span>
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-forest-900 mb-6 font-burmese">
          နှလုံးသားအတွက် လေပြေ
        </h2>
        <div className="w-24 h-1 bg-rust-500 mx-auto rounded-full mb-8"></div>
        <p className="text-sm sm:text-base text-forest-800 max-w-2xl mx-auto leading-relaxed mb-12 font-burmese">
          သင်ယနေ့ရင်ဆိုင်နေရတဲ့ ပင်ပန်းမှုတွေကို သက်သာစေဖို့ ပြုံးပန်းတရာက သင့်အတွက် အောက်ပါနေ့စဉ်ကတ်လေးများကို ပြင်ဆင်ထားပါတယ်။ အောက်ကခလုတ်ကိုနှိပ်ပြီး \"သင့်နှလုံးသားအတွက် ကုစားပေးမယ့် စာစု\" ကို ဆွဲယူဖတ်ရှုလိုက်ပါ။
        </p>

        {/* Dynamic Card Area */}
        <div className="relative max-w-lg mx-auto bg-cream-100 border border-cream-200 rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
          
          {/* Compass Icon indicator */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-rust-500 text-cream-50 flex items-center justify-center shadow-lg">
            <Compass className="w-6 h-6 animate-spin-slow text-cream-100" />
          </div>

          <div className="min-h-[160px] flex flex-col justify-center items-center mb-8">
            <AnimatePresence mode="wait">
              {!isRolling ? (
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  className="space-y-4"
                >
                  <p className="text-base sm:text-lg md:text-xl font-serif text-forest-900 leading-relaxed italic font-burmese text-center">
                    "{currentQuote.text}"
                  </p>
                  <span className="block text-xs font-semibold text-rust-500 uppercase tracking-widest font-burmese">
                    — {currentQuote.source}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="rolling-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <Sparkles className="w-8 h-8 text-rust-500 animate-bounce" />
                  <span className="text-xs text-forest-500 tracking-widest font-burmese font-bold">
                    နှလုံးသားအတွက် လေညင်းရှာဖွေနေပါသည်...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Trigger Button */}
          <button
            onClick={drawNewQuote}
            disabled={isRolling}
            className="group relative cursor-pointer overflow-hidden bg-rust-500 hover:bg-rust-600 text-cream-50 font-bold px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-xs sm:text-sm shadow-md font-burmese"
          >
            {/* Soft pulsing ring backdrop effect */}
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            <Sparkles className="w-4 h-4 text-cream-100 animate-pulse" /> 
            ကံစမ်းကတ်ဆွဲရန်
          </button>
        </div>

      </div>
    </section>
  );
}
