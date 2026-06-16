/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Mail, Globe, MapPin, CheckCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NewsletterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Play synthesized happy chime on success
  const playHappyChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      // Happy major chord notes sequentially: C5 -> E5 -> G5
      const playFreq = (freq: number, delay: number, dur: number) => {
        const oscNode = ctx.createOscillator();
        const gain = ctx.createGain();

        oscNode.type = "sine";
        oscNode.frequency.setValueAtTime(freq, ctx.currentTime + delay);

        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + delay + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);

        oscNode.connect(gain);
        gain.connect(ctx.destination);
        oscNode.start(ctx.currentTime + delay);
        oscNode.stop(ctx.currentTime + delay + dur);
      };

      playFreq(523.25, 0.0, 0.4); // C5
      playFreq(659.25, 0.1, 0.4); // E5
      playFreq(783.99, 0.2, 0.6); // G5
    } catch (e) {
      // standard audio block bypass
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      playHappyChime();
      setName("");
      setEmail("");
    }, 800);
  };

  return (
    <section className="py-24 bg-forest-900 text-cream-50 relative z-10 overflow-hidden border-t border-forest-800 font-sans">
      {/* Decors */}
      <div className="absolute left-10 top-1/4 w-72 h-72 bg-rust-400/10 rounded-full blur-3xl" />
      <div className="absolute right-10 bottom-1/4 w-72 h-72 bg-forest-500/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Brand pitch and information block */}
          <div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-6 font-burmese leading-snug">
              ပြုံးပန်းတရာနဲ့ အတူတူ လျှောက်လှမ်းစို့
            </h2>
            <p className="text-cream-200 text-sm sm:text-base leading-relaxed mb-8 font-burmese">
              ကျွန်မတို့ ထုတ်ဝေလိုက်တဲ့ စာအုပ်သစ်တွေ၊ စိတ်ပိုင်းဆိုင်ရာ ဖြေလျှော့မှုဆိုင်ရာ ဆောင်းပါးတွေနဲ့ အထူးထုတ်ပိုးမှု လက်ဆောင်တွေကို အပတ်စဉ် လက်ခံရရှိလိုပါက သင့်အီးမေးလ်လေးကို ချန်လှပ်ထားခဲ့နိုင်ပါတယ်။
            </p>

            <div className="space-y-4 font-burmese">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-rust-400 text-lg">
                  <Mail className="w-5 h-5 text-rust-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-cream-300">ဆက်သွယ်ရန် အီးမေးလ်</h4>
                  <p className="text-sm">contact@pyonepantar.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-rust-400 text-lg">
                  <Globe className="w-5 h-5 text-rust-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-cream-300">ဝဘ်ဆိုက်လိပ်စာ</h4>
                  <p className="text-sm">www.pyonepantayar.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form wrapper */}
          <div className="bg-forest-800 p-8 sm:p-10 rounded-2xl border border-forest-500/20 shadow-2xl">
            <h3 className="font-bold text-lg sm:text-xl text-white mb-6 font-burmese">
              စာပေကမ္ဘာထဲသို့ ဝင်ရောက်ပါ
            </h3>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="subscribe-form"
                  onSubmit={handleFormSubmit}
                  className="space-y-4 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label className="block text-xs font-semibold uppercase text-cream-300 mb-2 font-burmese">
                      သင့်အမည်
                    </label>
                    <input
                      type="text"
                      placeholder="အမည် ဖြည့်ပါ"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-forest-900 border border-forest-500/40 rounded-xl px-4 py-3 text-white placeholder-forest-500/60 focus:outline-none focus:border-rust-400 transition-colors text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-cream-300 mb-2 font-burmese">
                      အီးမေးလ်လိပ်စာ
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-forest-900 border border-forest-500/40 rounded-xl px-4 py-3 text-white placeholder-forest-500/60 focus:outline-none focus:border-rust-400 transition-colors text-sm font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rust-500 hover:bg-rust-600 disabled:opacity-50 disabled:cursor-not-allowed text-cream-50 font-bold py-3.5 rounded-xl shadow-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer font-burmese text-sm"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">စာရင်းသွင်းနေပါသည်...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-cream-100" />
                        သတင်းလွှာ အခမဲ့ စာရင်းသွင်းမည်
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  className="text-center p-6 bg-forest-900/40 border border-rust-500/30 rounded-xl space-y-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle className="w-10 h-10 text-rust-400 mx-auto animate-bounce" />
                  <p className="text-sm sm:text-base text-cream-100 font-bold font-burmese leading-relaxed">
                    ကျေးဇူးတင်ပါတယ်။ သင့်ကို သတင်းလွှာများ အီးမေးလ်မှတစ်ဆင့် စတင်ပေးပို့ပေးပါမည်။
                  </p>
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="text-xs text-rust-400 hover:text-rust-300 underline mt-2 font-burmese cursor-pointer"
                  >
                    တခြားတစ်ယောက် စာရင်းသွင်းရန်
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer info details */}
        <div className="border-t border-forest-500/20 mt-20 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-cream-300 gap-4">
          <p>© 2026 ပြုံးပန်းတရာ စာပေတိုက်။ All rights reserved. Designed for Readers.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-rust-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-rust-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  );
}
