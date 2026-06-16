/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Coffee, Lightbulb, Sun, BookOpen } from "lucide-react";

export default function BrandMeaning() {
  const meanings = [
    {
      title: "အနားယူရာနေရာ",
      subtitle: "ပင်ပန်းနေတဲ့ စိတ်အတွက် အနားယူရာနေရာတစ်ခုပါ။",
      description: "စာမျက်နှာတစ်ခုချင်းစီက သင့်ကို လောကရဲ့ ရှုပ်ထွေးလှတဲ့ အသံတွေကနေ ခဏတာ ကာကွယ်ပေးထားမယ့် ဘေးကင်းရာဥယျာဉ်လေးတစ်ခု။",
      icon: Coffee,
      color: "text-forest-800 bg-cream-200 border-cream-300",
    },
    {
      title: "မီးအိမ်လေးတစ်လုံး",
      subtitle: "လမ်းပျောက်နေတဲ့ နှလုံးသားအတွက် မီးအိမ်လေးတစ်လုံးပါ။",
      description: "အမှောင်ကျနေတဲ့ ညရက်တွေမှာ ရှေ့ဆက်ရမယ့်လမ်းကို မှုန်ဝါးမသွားစေဘဲ သင့်ရင်ထဲကို နွေးထွေးတဲ့ အလင်းမီးအိမ် စာလုံးလေးတွေနဲ့ ထွန်းညှိပေးပါမယ်။",
      icon: Lightbulb,
      color: "text-rust-500 bg-rust-400/15 border-rust-200",
    },
    {
      title: "စိတ်ခွန်အားလေးတစ်ခု",
      subtitle: "ဘဝကို ဆက်လျှောက်ဖို့ လိုအပ်တဲ့ စိတ်ခွန်အားလေးတစ်ခုပါ။",
      description: "လှမ်းနေတဲ့ ခြေလှမ်းတွေ မောပန်းသွားတဲ့အခါ ကိုယ့်ကိုယ်ကို ပြန်လည်ယုံကြည်မှုရစေပြီး ရင်ထဲမှာ မျှော်လင့်ချက်တွေ ထပ်မံစိမ်းလန်းစိုပြေစေမည့် အင်အား။",
      icon: Sun,
      color: "text-amber-600 bg-amber-500/15 border-amber-200",
    },
  ];

  return (
    <section id="books" className="py-24 bg-cream-100/60 border-t border-cream-200 relative z-10 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core title of Meaning */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-rust-500 font-semibold text-xs uppercase tracking-widest font-sans">
            <BookOpen className="w-3.5 h-3.5" /> Book Philosophy
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-forest-900 font-burmese leading-snug">
            “ပြုံးပန်းတရာအတွက် စာအုပ်ဆိုတာ <br className="hidden sm:inline" /> စက္ကူပေါ်က စာလုံးများသာ မဟုတ်ပါဘူး။”
          </h2>
          <div className="w-24 h-1 bg-rust-500 mx-auto rounded-full mt-2" />
        </div>

        {/* 3 Visual Meaning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {meanings.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-cream-50 border border-cream-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${m.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-serif font-bold text-xl text-forest-900 mb-2 font-burmese">
                    {m.title}
                  </h3>
                  
                  <p className="text-rust-500 font-semibold text-sm mb-4 font-burmese">
                    {m.subtitle}
                  </p>
                  
                  <p className="text-forest-600 text-xs sm:text-sm leading-relaxed font-burmese">
                    {m.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-cream-200/40 text-[11px] text-forest-400 tracking-wider font-burmese">
                  ပြုံးပန်းတရာ စာပေကုထုံး
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
