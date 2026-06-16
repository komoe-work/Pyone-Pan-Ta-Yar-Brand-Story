/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Leaf, Menu, X, Clock, Compass, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AudioController from "./components/AudioController";
import ReaderPain from "./components/ReaderPain";
import BrandStory from "./components/BrandStory";
import BrandMeaning from "./components/BrandMeaning";
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
          <nav className="hidden md:flex items-center gap-8 font-medium text-xs sm:text-sm">
            <a href="#hero" className="text-forest-800 hover:text-rust-500 transition-colors">Home</a>
            <a href="#brand-story" className="text-forest-800 hover:text-rust-500 transition-colors">Brand Story</a>
            <a href="#books" className="text-forest-800 hover:text-rust-500 transition-colors">Books</a>
            <a href="#contact" className="text-forest-800 hover:text-rust-500 transition-colors">Contact</a>
          </nav>

          {/* Navigation widgets side */}
          <div className="flex items-center gap-3">
            {/* Integrated Synthesizer ambient controller */}
            <AudioController />

            {/* Mobile menu hamburger button */}
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
              className="md:hidden bg-cream-100 border-b border-cream-200 px-6 py-4 space-y-3 text-xs sm:text-sm text-left font-medium"
            >
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-forest-800 hover:text-rust-500 transition-colors"
              >
                Home
              </a>
              <a
                href="#brand-story"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-forest-800 hover:text-rust-500 transition-colors"
              >
                Brand Story
              </a>
              <a
                href="#books"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-forest-800 hover:text-rust-500 transition-colors"
              >
                Books
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-forest-800 hover:text-rust-500 transition-colors"
              >
                Contact
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
              className="inline-flex items-center gap-1.5 bg-rust-400/10 text-rust-500 border border-rust-400/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-6 uppercase font-sans"
            >
              📖 ပြုံးပန်းတရာ (Pyone Pan Ta Yar)
            </motion.span>

            {/* Core catchy brand statement */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-forest-900 leading-snug sm:leading-tight mb-8 font-burmese"
            >
              “ပင်ပန်းနေတဲ့ စိတ်တွေအတွက် <br className="hidden sm:inline" />
              <span className="text-rust-500 italic font-semibold font-burmese block sm:inline mt-2 sm:mt-0">
                ငြိမ်းချမ်းရာ
              </span> စာမျက်နှာများ”
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base sm:text-lg md:text-xl text-forest-800 max-w-2xl mx-auto leading-relaxed mb-10 font-burmese"
            >
              “စာအုပ်တစ်အုပ်က လူတစ်ယောက်ရဲ့ ညတစ်ညကို ပိုပေါ့ပါးစေနိုင်တယ်။ စာမျက်နှာတစ်ရွက်က ပင်ပန်းနေတဲ့ နှလုံးသားတစ်ခုကို တိတ်တိတ်လေး အားဖြည့်ပေးနိုင်တယ်။”
            </motion.p>

            {/* Direct action triggers */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 font-burmese"
            >
              <a
                href="#books"
                className="w-full sm:w-auto bg-forest-500 hover:bg-forest-800 text-cream-50 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <Compass className="w-4 h-4 text-cream-100" /> သင့်စိတ်အတွက် စာအုပ်တစ်အုပ် ရှာဖွေပါ
              </a>
              <a
                href="#brand-story"
                className="w-full sm:w-auto bg-cream-100 hover:bg-cream-200 border border-cream-300 text-forest-800 font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <Clock className="w-4 h-4 text-rust-500" /> Brand Story ဖတ်ရှုရန်
              </a>
            </motion.div>
          </div>
        </section>

        {/* Attention Pain Section */}
        <ReaderPain />

        {/* Short Brand Story Section */}
        <BrandStory />

        {/* Brand Meaning Section */}
        <BrandMeaning />

        {/* Motivational Quote healing board drawer */}
        <HealingCompass />

        {/* Final CTA Section */}
        <section id="final-cta" className="py-24 bg-cream-50 relative z-10 font-sans border-t border-cream-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            
            {/* Soft decorative leaf accent */}
            <div className="w-12 h-12 rounded-full bg-forest-500/10 flex items-center justify-center text-forest-800 mx-auto mb-6">
              <Leaf className="w-6 h-6 text-forest-600" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-forest-900 leading-snug mb-6 font-burmese"
            >
              “သင့်စိတ်အတွက် စာမျက်နှာတစ်ရွက်ကို ဒီနေ့ စတင်ဖွင့်လှစ်ပါ”
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-base sm:text-lg text-forest-800 max-w-2xl mx-auto leading-relaxed mb-10 font-burmese"
            >
              “ပင်ပန်းနေတဲ့ စိတ်အတွက် ငြိမ်းချမ်းမှုလေးတစ်ခု လိုအပ်နေပါက ပြုံးပန်းတရာရဲ့ စာမျက်နှာများက သင့်ဘေးနားမှာ တိတ်တိတ်လေး ရှိပေးပါမယ်။”
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 font-burmese"
            >
              <a
                href="#books"
                className="w-full sm:w-auto bg-forest-500 hover:bg-forest-800 text-cream-50 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <Compass className="w-4 h-4 text-cream-100" /> စာအုပ်များ ကြည့်ရှုရန်
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto bg-cream-100 hover:bg-cream-200 border border-cream-300 text-forest-800 font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-rust-500" /> ဆက်သွယ်ရန်
              </a>
            </motion.div>
          </div>
        </section>

        {/* Newsletter subscribe sign up and footer banner */}
        <NewsletterForm />

      </main>
    </div>
  );
}
