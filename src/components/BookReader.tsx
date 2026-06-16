/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ComponentType } from "react";
import { Book } from "../types";
import { booksData } from "../data";
import {
  Heart,
  Cloud,
  BookOpen,
  DoorOpen,
  Lightbulb,
  X,
  ArrowLeft,
  ArrowRight,
  BookMarked
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Heart,
  Cloud,
  BookOpen,
  DoorOpen,
  Lightbulb,
};

// Help convert western numbers to Burmese numerals (e.g. 1 -> ၁, 2 -> ၂)
function numberToBurmese(num: number): string {
  const burmeseNumbers = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
  return num
    .toString()
    .split("")
    .map((digit) => {
      const parsed = parseInt(digit, 10);
      return isNaN(parsed) ? digit : burmeseNumbers[parsed];
    })
    .join("");
}

export default function BookReader() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);

  // Play a quick, soothing crystal chime sound to make reading interactive
  const triggerSoothingSound = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // soft attack & long pleasant exponential decay
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.4);
    } catch (e) {
      // Browsers safely block autoplay restrictions, no-op
    }
  };

  const handleOpenBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentPageIdx(0);
    triggerSoothingSound(330); // Note E4
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
    triggerSoothingSound(220); // Note A3
  };

  const handleNextPage = () => {
    if (selectedBook && currentPageIdx < selectedBook.pages.length - 1) {
      setCurrentPageIdx((prev) => prev + 1);
      triggerSoothingSound(392); // Note G4
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      setCurrentPageIdx((prev) => prev - 1);
      triggerSoothingSound(294); // Note D4
    }
  };

  return (
    <section id="library" className="py-24 bg-cream-100/60 border-t border-cream-200 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-rust-500 font-semibold text-xs tracking-widest uppercase mb-2">
            <BookMarked className="w-3.5 h-3.5 animate-pulse" /> Healing Through Pages
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-forest-900 mb-4 font-burmese">
            ကျွန်မတို့၏ စာပေကုထုံးများ
          </h2>
          <div className="w-24 h-1 bg-rust-500 mx-auto rounded-full"></div>
          <p className="text-sm sm:text-base text-forest-500 mt-4 leading-relaxed font-burmese">
            စာအုပ်များကို ရွေးချယ်ပြီး \"နမူနာဖတ်ရှုရန်\" ကိုနှိပ်ကာ ပင်ပန်းနွမ်းနယ်နေတဲ့ စိတ်နှလုံးသားကို ညင်သာစွာကုစားပေးမယ့် စာမျက်နှာအချို့ကို စမ်းသပ်ခံစား ဖတ်ရှုကြည့်နိုင်ပါတယ်။
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksData.map((book) => {
            const IconComponent = iconMap[book.iconName] || BookOpen;

            return (
              <div
                key={book.id}
                className="bg-cream-50 border border-cream-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div className="p-8 flex flex-col items-center">
                  {/* Styled Book binder/spine with smooth hover scale */}
                  <div className={`aspect-[4/5] w-36 mb-6 ${book.coverBg} rounded-r-xl rounded-l flex flex-col justify-between p-4 text-cream-50 shadow-md transform group-hover:scale-105 transition-transform duration-300 page-flip-container border-l-4 border-black/20 book-spine-clip`}>
                    <span className="text-[10px] tracking-widest opacity-80 uppercase text-center block font-burmese">
                      {book.author}
                    </span>
                    <div className="my-auto flex flex-col items-center gap-2">
                      <IconComponent className="w-8 h-8 text-cream-100" />
                      <span className="font-serif font-bold text-[11px] leading-snug px-1 text-center font-burmese">
                        {book.title}
                      </span>
                    </div>
                    <span className="text-[9px] text-center tracking-wider opacity-60 font-burmese">
                      ပြုံးပန်းတရာ
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-forest-900 text-center mb-3 font-burmese">
                    {book.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-forest-500 text-center leading-relaxed font-burmese">
                    {book.brief}
                  </p>
                </div>

                <div className="px-8 pb-8 mt-auto">
                  <button
                    onClick={() => handleOpenBook(book)}
                    className="w-full py-3 bg-cream-100 hover:bg-rust-500 border border-cream-300 hover:border-rust-500 hover:text-white rounded-xl text-xs sm:text-sm font-bold text-forest-800 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-burmese"
                  >
                    <BookOpen className="w-4 h-4" /> နမူနာဖတ်ရှုရန်
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reader Modal Backdrop Overlay */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 bg-forest-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="bg-cream-50 w-full max-w-4xl h-[78vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-cream-300"
            >
              {/* Top Banner Control Panel */}
              <div className="bg-cream-100 border-b border-cream-300 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-10 rounded shadow-sm ${selectedBook.coverBg} text-cream-50 flex items-center justify-center text-[10px] font-bold`}>
                    📚
                  </div>
                  <div>
                    <h4 className="font-bold text-forest-900 text-sm sm:text-base font-burmese leading-snug">
                      {selectedBook.title}
                    </h4>
                    <span className="text-xs text-forest-500 block font-burmese">
                      ပြုံးပန်းတရာ စာအုပ်စင်မှ အခမဲ့နမူနာဖတ်ရှုခြင်း
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCloseBook}
                  className="w-8 h-8 rounded-full bg-cream-200 hover:bg-rust-500 hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  title="စာဖတ်ခန်းကို ပိတ်ပါ"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Reading Content Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-12 relative bg-cream-50 font-serif">
                <div className="max-w-xl mx-auto">
                  <div className="text-center text-xs text-rust-500 uppercase tracking-widest mb-8 border-b border-cream-200 pb-2 font-burmese">
                    — စာမျက်နှာ {numberToBurmese(currentPageIdx + 1)} / {numberToBurmese(selectedBook.pages.length)} —
                  </div>

                  {/* Text Animation on page change */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPageIdx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.22 }}
                      className="text-forest-800 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap font-serif min-h-[180px] font-burmese"
                    >
                      {selectedBook.pages[currentPageIdx]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Navigation controls */}
              <div className="bg-cream-100 border-t border-cream-300 px-6 py-4 flex items-center justify-between text-sm">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPageIdx === 0}
                  className="flex items-center gap-1 px-4 py-2 bg-cream-200 hover:bg-cream-300 disabled:bg-cream-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-forest-800 font-bold transition-all cursor-pointer font-burmese text-xs sm:text-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> ယခင်စာမျက်နှာ
                </button>
                <div className="text-[11px] font-semibold text-forest-500 uppercase tracking-wider hidden sm:block font-burmese">
                  ပြုံးပန်းတရာ စာပေတိုက်
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPageIdx === selectedBook.pages.length - 1}
                  className="flex items-center gap-1 px-4 py-2 bg-cream-200 hover:bg-cream-300 disabled:bg-cream-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-forest-800 font-bold transition-all cursor-pointer font-burmese text-xs sm:text-sm"
                >
                  နောက်တစ်မျက်နှာ <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
