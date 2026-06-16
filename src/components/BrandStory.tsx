/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen, Compass, Heart, Sunrise } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="brand-story" className="py-24 bg-cream-100/60 border-y border-cream-200 relative z-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-rust-500 font-semibold text-xs tracking-widest uppercase mb-2 font-sans">
            <BookOpen className="w-3.5 h-3.5" /> Our Journey
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-forest-900 mb-4 font-burmese">
            ပြုံးပန်းတရာရဲ့ စာပေခရီးစဉ်
          </h2>
          <div className="w-24 h-1 bg-rust-500 mx-auto rounded-full"></div>
        </div>

        {/* Narrative Box with highly polished magazine style */}
        <div className="bg-cream-50 p-6 sm:p-12 rounded-3xl border border-cream-200 shadow-xl relative overflow-hidden text-left">
          {/* Subtle elegant watermarks */}
          <div className="absolute top-0 right-0 p-8 text-cream-200/40 pointer-events-none select-none hidden md:block">
            <Sunrise className="w-48 h-48 -mr-16 -mt-16" />
          </div>

          <div className="prose prose-forest text-forest-800 leading-loose text-sm sm:text-base font-burmese space-y-8 relative z-10">
            
            {/* Step 1: 1985 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-l-2 border-rust-400 pl-6 space-y-3"
            >
              <div className="flex items-center gap-2 text-rust-500 font-serif font-bold tracking-wide text-lg">
                <span>၁၉၈၅</span>
                <span className="text-xs text-forest-500 font-normal">ကလေးဘဝရဲ့ ရောင်စုံအငှားဆိုင်လေး</span>
              </div>
              <p>
                ပြုံးပန်းတရာရဲ့ စာပေခရီးစဉ်ဟာ ၁၉၈၅ ခုနှစ် နွေရာသီ ကျောင်းပိတ်ရက်တွေက စတင်ခဲ့ပါတယ်။
              </p>
              <p className="text-forest-600 text-xs sm:text-sm">
                အဲဒီအချိန်က ရပ်ကွက်ထဲက စာအုပ်အငှားဆိုင်လေးဟာ ကျွန်မတို့ကလေးဘဝရဲ့ အချစ်ဆုံးနေရာလေးပါ။ သူငယ်ချင်းတွေစုပြီး ရုပ်စုံကာတွန်းစာအုပ်တွေကို လုဖတ်ကြ၊ ဇာတ်ကောင်တွေနဲ့အတူ ရယ်မောကြ၊ စိတ်ကူးယဉ်ကမ္ဘာထဲကို ခဏတာ ခရီးသွားကြခဲ့ပါတယ်။
              </p>
            </motion.div>

            {/* Step 2: 2000 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-l-2 border-forest-500 pl-6 space-y-3"
            >
              <div className="flex items-center gap-2 text-forest-700 font-serif font-bold tracking-wide text-lg">
                <span>၂၀၀၀</span>
                <span className="text-xs text-rust-400 font-normal">စူးစမ်းမှုနဲ့ နက်ရှိုင်းလာတဲ့ အရသာ</span>
              </div>
              <p>
                အချိန်တွေ ရွေ့လျားလာပြီး ၂၀၀၀ ပြည့်နှစ်ဝန်းကျင်ကို ရောက်တဲ့အခါ စာဖတ်ခြင်းရဲ့ အရသာဟာ ပိုနက်ရှိုင်းလာခဲ့ပါတယ်။
              </p>
              <p className="text-forest-600 text-xs sm:text-sm">
                မှုခင်းသတင်းဂျာနယ်တွေ၊ ဆန်းကြယ်တဲ့ ဂမ္ဘီရစာမျက်နှာတွေ၊ လောကရဲ့ ပဟေဠိတွေကို စူးစမ်းရင်း စာအုပ်ဆိုတာ ပျော်ရွှင်မှုသာမက တွေးခေါ်မှု၊ ရှာဖွေမှု၊ နားလည်မှုလည်း ဖြစ်နိုင်တယ်ဆိုတာ သိလာခဲ့ပါတယ်။
              </p>
            </motion.div>

            {/* Step 3: Present / Transformation */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-l-2 border-rust-500 pl-6 space-y-4"
            >
              <div className="flex items-center gap-2 text-rust-600 font-serif font-bold tracking-wide text-lg">
                <span>ယနေ့ခေတ်</span>
                <span className="text-xs text-forest-500 font-normal">အတွင်းစိတ်ကို အဝင်းပေးမယ့် အလင်းရောင်</span>
              </div>
              <p className="font-semibold text-forest-900">
                နှစ်တွေကြာလာတဲ့အခါ ကျွန်မတို့ နားလည်လာတာတစ်ခု ရှိပါတယ်။
              </p>
              <p>
                ယနေ့ခေတ်မှာ လူတွေဟာ အပြင်ဘက်မှာ ရယ်ပြနေရပေမယ့် အတွင်းစိတ်မှာ ပင်ပန်းနေကြတယ်။ တာဝန်တွေ၊ စိုးရိမ်မှုတွေ၊ ဆုံးရှုံးမှုတွေ၊ မသေချာမှုတွေကြားမှာ တချို့ညတွေက အိပ်မပျော်အောင် လေးလံနေတတ်တယ်။
              </p>
              <div className="p-4 bg-cream-100 rounded-xl italic text-rust-600 text-xs sm:text-sm leading-relaxed border-l-4 border-rust-400">
                "အဲဒီလိုအချိန်မှာ စာအုပ်တစ်အုပ်က မိတ်ဆွေတစ်ယောက်လို အနားမှာ ရှိပေးနိုင်ပါတယ်။ စကားလုံးတစ်ကြောင်းက အသက်ရှူသံကို ပိုနူးညံ့စေနိုင်ပါတယ်။ စာမျက်နှာတစ်ခုက စိတ်ထဲက အမှောင်ကို မီးလေးတစ်ပွင့် ထွန်းပေးနိုင်ပါတယ်။"
              </div>
              <p>
                ဒါကြောင့် ပြုံးပန်းတရာဟာ စိတ်အေးချမ်းမှု၊ Mindfulness၊ Spiritual Healing နဲ့ စိတ်ခွန်အားဖြည့်စာပေများကို အဓိကထားပြီး စာဖတ်သူတွေအတွက် ငြိမ်းချမ်းတဲ့ စာမျက်နှာများကို မျှဝေသွားချင်ပါတယ်။
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
