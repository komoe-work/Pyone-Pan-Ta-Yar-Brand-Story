/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { HeartCrack, Moon, Sparkles } from "lucide-react";

export default function ReaderPain() {
  const cards = [
    {
      title: "ပင်ပန်းနေတဲ့ စိတ်",
      description: "အပြင်ဘက်မှာ ရယ်ပြနေရပေမယ့် ရင်ထဲမှာတော့ အလွန်ပင်ပန်းနွမ်းနယ်နေရတဲ့ နေ့ရက်တွေအတွက်။",
      icon: HeartCrack,
      color: "text-rust-500 bg-rust-400/10",
    },
    {
      title: "အိပ်မပျော်တဲ့ ည",
      description: "တာဝန်တွေ၊ စိုးရိမ်ပူပန်မှုတွေနဲ့အတူ ကုတင်ပေါ်မှာ တစ်ယောက်တည်း တိတ်တိတ်လေး လေးလံနေရတဲ့ ညတွေအတွက်။",
      icon: Moon,
      color: "text-forest-500 bg-forest-500/10",
    },
    {
      title: "စိတ်ခွန်အားလိုအပ်တဲ့နေ့",
      description: "ဘဝရဲ့ ခရီးစဉ်ကို ဆက်လျှောက်ဖို့အတွက် သေးငယ်ပေမယ့် လေးနက်တဲ့ လမ်းပြအလင်းရောင် ရှာဖွေနေတဲ့နေ့တွေအတွက်။",
      icon: Sparkles,
      color: "text-amber-600 bg-amber-500/10",
    },
  ];

  return (
    <section id="reader-pain" className="py-24 bg-cream-50 relative z-10 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Core title and emotional text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6 mb-16"
        >
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-forest-900 font-burmese leading-tight">
            “တချို့နေ့တွေမှာ စိတ်က အရမ်းလေးနေတတ်တယ်”
          </h2>
          <div className="w-16 h-1 bg-rust-500 mx-auto rounded-full" />
          
          <div className="text-sm sm:text-base text-forest-800 leading-loose font-burmese space-y-4 max-w-2xl mx-auto">
            <p>
              အပြင်ဘက်မှာ ရယ်ပြနေပေမယ့် အတွင်းစိတ်မှာ ပင်ပန်းနေတဲ့နေ့တွေ ရှိပါတယ်။ ပြောပြစရာမရှိဘဲ တိတ်တိတ်လေး နာကျင်နေရတဲ့ညတွေ ရှိပါတယ်။ ဘဝကို ဆက်လျှောက်ဖို့ စိတ်ခွန်အားလေးတစ်ခု လိုအပ်နေတဲ့အချိန်တွေ ရှိပါတယ်။
            </p>
            <p className="text-rust-500 font-medium italic mt-2">
              အဲဒီလိုအချိန်မှာ စာအုပ်တစ်အုပ်က သင့်ဘေးနားမှာ တိတ်တိတ်လေး ရှိပေးနိုင်ပါတယ်။
            </p>
          </div>
        </motion.div>

        {/* 3 Emotional Sensory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-cream-100/50 border border-cream-200 rounded-2xl p-8 hover:shadow-xl hover:bg-cream-100 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color} mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-forest-900 mb-3 font-burmese">
                    {card.title}
                  </h3>
                  <p className="text-sm text-forest-600 leading-relaxed font-burmese">
                    {card.description}
                  </p>
                </div>
                
                {/* Visual elegant separator bar */}
                <div className="w-8 h-1 bg-cream-300 mt-6 rounded" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
