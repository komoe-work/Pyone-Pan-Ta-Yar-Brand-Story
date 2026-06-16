/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { timelineData } from "../data";
import { Calendar, History, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Timeline() {
  const [activeEra, setActiveEra] = useState<string>("1985");
  const data = timelineData[activeEra];

  return (
    <section id="journey" class="py-24 bg-cream-100/60 border-y border-cream-200 relative z-10 font-burmese">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-rust-500 font-semibold text-xs tracking-widest uppercase mb-2">
            <History className="w-3.5 h-3.5" /> Our 40-Year Heritage
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-forest-900 mb-4">
            ပြုံးပန်းတရာရဲ့ စာပေခရီးစဉ်
          </h2>
          <div className="w-24 h-1 bg-rust-500 mx-auto rounded-full"></div>
          <p className="text-sm sm:text-base text-forest-500 mt-4 leading-relaxed">
            ၁၉၈၅ ခုနှစ် ကာတွန်းစာအုပ်လေးတွေရဲ့ ရယ်သံကနေ ယနေ့ခေတ် စိတ်ဝိညာဉ်နှလုံးသားကုထုံးများဆီသို့ လျှောက်လှမ်းခဲ့တဲ့ ၄၀ နှစ်နီးပါး သက်တမ်းရှိ သာယာလှပတဲ့ သမိုင်းမှတ်တိုင်များ။
          </p>
        </div>

        {/* Year Selector Toggle */}
        <div className="flex justify-center gap-2 sm:gap-4 max-w-md mx-auto mb-12 bg-cream-200 p-2 rounded-full border border-cream-300 shadow-inner">
          {Object.keys(timelineData).map((eraKey) => (
            <button
              key={eraKey}
              onClick={() => setActiveEra(eraKey)}
              className={`relative flex-1 py-3 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 cursor-pointer ${
                activeEra === eraKey
                  ? "text-cream-50"
                  : "text-forest-500 hover:text-forest-800"
              }`}
            >
              {activeEra === eraKey && (
                <motion.div
                  layoutId="activeEraBackground"
                  className="absolute inset-0 bg-forest-500 rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5 hidden sm:inline" />
                {timelineData[eraKey].year} ခုနှစ်
              </span>
            </button>
          ))}
        </div>

        {/* Showcase Display Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEra}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-cream-50 p-6 sm:p-10 rounded-2xl border border-cream-200 shadow-lg min-h-[420px]"
          >
            {/* Left Visual Area */}
            <div className="lg:col-span-5 relative">
              <div id="timeline-card-div" className="aspect-video lg:aspect-square w-full rounded-xl overflow-hidden border-8 border-cream-100 shadow-md">
                <img
                  src={data.image}
                  alt={`${data.year} Era Visualization`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-rust-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"></div>
            </div>

            {/* Right Textual Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs sm:text-sm font-semibold text-rust-500 uppercase tracking-widest mb-2 block">
                {data.subtitle}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900 mb-6 leading-tight">
                {data.heading}
              </h3>
              <div className="text-sm sm:text-base text-forest-800 leading-relaxed space-y-4">
                {data.paragraphs.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
