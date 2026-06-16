/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Leaf, Menu, X, ArrowRight, BookOpen, Clock, Heart, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AudioController from "./components/AudioController";
import Timeline from "./components/Timeline";
import BookReader from "./components/BookReader";
import HealingCompass from "./components/HealingCompass";
import NewsletterForm from "./components/NewsletterForm";

interface BackgroundParticle {
  id: number;
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [particles, setParticles] = useState<BackgroundParticle[]>([]);

  // Generate background warm particles on mount safely
  useEffect(() => {
    const list: BackgroundParticle[] = [];
    for (let i = 0; i < 12; i++) {
      list.push({
        id: i,
        size: Math.random() * 80 + 30,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 12 + 10,
      });
    }
    setParticles(list);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-cream-50 font-sans text-forest-800 selection:bg-rust-400 selection:text-white relative overflow-x-hidden min-h-screen">
      
      {/* Soft Ambient Cinematic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rust-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-forest-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-rust-500/5 rounded-full blur-3xl" />
        
        {/* Rendered Particles */}
        <div className="absolute inset-0 opacity-60">
          {particles.map((p) => (
            <div
              key={p.id}
              className="ambient-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-cream-200 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-forest-500 flex items-center justify-center text-cream-50 shadow-md group-hover:bg-rust-500 transition-colors duration-300">
              <Leaf className="w-5 h-5 text-cream-50" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-forest-900 group-hover:text-rust-500 transition-colors duration-300 font-burmese leading-tight">
                ပြုံးပန်းတရာ
              </span>
              <span className="text-[10px] text-forest-500 tracking-wider">
                Spiritual & Mindfulness
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium font-burmese text-xs sm:text-sm">
            <a href="#hero" className="text-forest-800 hover:text-rust-500 transition-colors">ပင်မစာမျက်နှာ</a>
            <a href="#journey" className="text-forest-800 hover:text-rust-500 transition-colors">ဖြတ်သန်းခဲ့သည့်ခရီး</a>
            <a href="#philosophy" className="text-forest-800 hover:text-rust-500 transition-colors">ခံယူချက်</a>
            <a href="#library" className="text-forest-800 hover:text-rust-500 transition-colors">စာပေကုထုံးများ</a>
            <a href="#mindfulness" className="text-forest-800 hover:text-rust-500 transition-colors">နှလုံးသားအတွက် လေပြေ</a>
          </nav>

          {/* Navigation widgets side */}
          <div className="flex items-center gap-3">
            {/* Integrated Synthesizer ambient controller */}
            <AudioController />

            {/* Mobile design hamburger button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-forest-800 hover:text-rust-500 transition-colors cursor-pointer"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown display */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream-100 border-b border-cream-200 px-6 py-4 space-y-3 font-burmese text-xs sm:text-sm text-left"
            >
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-medium text-forest-800 hover:text-rust-500 transition-colors"
              >
                ပင်မစာမျက်နှာ
              </a>
              <a
                href="#journey"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-medium text-forest-800 hover:text-rust-500 transition-colors"
              >
                ဖြတ်သန်းခဲ့သည့်ခရီး
              </a>
              <a
                href="#philosophy"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-medium text-forest-800 hover:text-rust-500 transition-colors"
              >
                ခံယူချက်
              </a>
              <a
                href="#library"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-medium text-forest-800 hover:text-rust-500 transition-colors"
              >
                စာပေကုထုံးများ
              </a>
              <a
                href="#mindfulness"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-medium text-forest-800 hover:text-rust-500 transition-colors"
              >
                နှလုံးသားအတွက် လေပြေ
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container Content */}
      <main className="relative z-10 w-full overflow-hidden">
        
        {/* Hero Section */}
        <section id="hero" className="relative pt-16 pb-24 md:py-32 flex items-center justify-center min-h-[82vh]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            
            {/* Elegant upper subheader tag */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 bg-rust-400/10 text-rust-500 border border-rust-400/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-6 uppercase font-burmese"
            >
              📖 စိတ်ပိုင်းဆိုင်ရာ အေးချမ်းမှုစာပေ (Mindfulness Publishing)
            </motion.span>

            {/* Core catchy brand statement */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-forest-900 leading-snug sm:leading-tight mb-8 font-burmese"
            >
              ပြုံးပန်းတရာ — <br className="hidden sm:inline" />
              <span className="text-rust-500 italic font-semibold font-burmese block sm:inline mt-2 sm:mt-0">
                စာအုပ်တစ်အုပ်
              </span> က စိတ်တစ်ခုကို ငြိမ်းချမ်းစေနိုင်တယ်။
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base sm:text-lg md:text-xl text-forest-800 max-w-2xl mx-auto leading-relaxed mb-10 font-burmese"
            >
              စာအုပ်တစ်အုပ်က လူတစ်ယောက်ရဲ့ ညတစ်ညကို ပိုပေါ့ပါးစေနိုင်သလို၊ စာမျက်နှာတစ်ရွက်ကလည်း ပင်ပန်းနေတဲ့ နှလုံးသားတစ်ခုကို ပြန်လည်အားဖြည့်ပေးနိုင်ပါတယ်။
            </motion.p>

            {/* Direct action triggers */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 font-burmese"
            >
              <a
                href="#library"
                className="w-full sm:w-auto bg-forest-500 hover:bg-forest-800 text-cream-50 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-cream-100" /> စာပေကုထုံးများကို ဖတ်ရှုရန်
              </a>
              <a
                href="#journey"
                className="w-full sm:w-auto bg-cream-100 hover:bg-cream-200 border border-cream-300 text-forest-800 font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <Clock className="w-4 h-4 text-rust-500" /> ကျွန်မတို့ရဲ့ ဖြတ်သန်းမှုဇာတ်လမ်း
              </a>
            </motion.div>
          </div>
        </section>

        {/* Timelines segment */}
        <Timeline />

        {/* Brand Philosophy Presentation */}
        <section id="philosophy" className="py-24 relative z-10 font-sans">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-forest-800 text-cream-50 rounded-3xl p-8 sm:p-14 border border-forest-900 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute right-0 bottom-0 opacity-5 text-[220px] font-serif select-none pointer-events-none translate-x-12 translate-y-24">
                "
              </div>
              
              <div className="max-w-3xl">
                <span className="text-rust-400 font-semibold tracking-wider text-xs sm:text-sm uppercase block mb-4 font-burmese flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rust-400 animate-pulse animate-duration-[3000ms]" /> စာဖတ်သူတို့အတွက် အမှန်တကယ် ပိုင်ဆိုင်စေချင်တဲ့ ရင်တွင်းခံစားမှု
                </span>
                
                <h2 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-white mb-8 leading-snug font-burmese">
                  ယနေ့ခေတ်လူသားတွေဟာ အပြင်ဘက်မှာ ပြုံးပြနေပေမယ့်... အတွင်းစိတ်မှာ အလွန်ပူလောင် ပင်ပန်းနေတတ်ကြပါတယ်။
                </h2>

                <div className="space-y-6 text-cream-200 text-sm sm:text-base leading-relaxed font-burmese">
                  <p>
                    တာဝန်တွေ၊ စိုးရိမ်မှုတွေ၊ ဆုံးရှုံးမှုတွေနဲ့ မသေချာမှုတွေကြားမှာ တချို့ညတွေက အိပ်မပျော်နိုင်လောက်အောင် လေးလံလွန်းနေတတ်တယ်။ တချို့သော နှလုံးသားတွေကလည်း ထုတ်ဖော်မပြောပြဘဲနဲ့ တိတ်တိတ်လေး ဆိတ်ဆိတ်ငြိမ်သက်စွာ နာကျင်နေတတ်ကြပါတယ်။
                  </p>
                  <p className="border-l-4 border-rust-500 pl-6 italic font-medium text-cream-100 font-burmese py-1 bg-forest-900/10 rounded-r-lg">
                    "အဲဒီလိုအချိန်မျိုးမှာ စာအုပ်တစ်အုပ်က မိတ်ဆွေကောင်းတစ်ယောက်လို သင့်အနားမှာ ရှိပေးနိုင်ပါတယ်။ စကားလုံးတစ်ကြောင်းက သင့်ရဲ့အသက်ရှူသံကို ပိုမိုနူးညံ့စေသလို၊ စာမျက်နှာတစ်ခုကလည်း သင့်စိတ်ထဲကအမှောင်ကို အလင်းပေးမယ့် မီးအိမ်လေးတစ်လုံး ဖြစ်စေနိုင်ပါတယ်။"
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center border-t border-forest-500/40 pt-8">
                  <div>
                    <span className="block text-2xl md:text-3xl font-serif text-rust-400 font-bold mb-1">၁၀၀%</span>
                    <span className="text-[11px] text-cream-300 font-burmese">စိတ်ငြိမ်းချမ်းမှု</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-serif text-rust-400 font-bold mb-1">၅+</span>
                    <span className="text-[11px] text-cream-300 font-burmese">အဓိက စာအုပ်များ</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-serif text-rust-400 font-bold mb-1">၁၉၈၅</span>
                    <span className="text-[11px] text-cream-300 font-burmese">သမိုင်းခရီးအစ</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-serif text-rust-400 font-bold mb-1">၁၀,၀၀၀+</span>
                    <span className="text-[11px] text-cream-300 font-burmese">နွေးထွေးသော စာဖတ်သူများ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Book Spine Shelf catalog display */}
        <BookReader />

        {/* Motivational Quote healing board drawer */}
        <HealingCompass />

        {/* Newsletter subscribe sign up and footer banner */}
        <NewsletterForm />

      </main>
    </div>
  );
}
