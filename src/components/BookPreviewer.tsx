/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { booksData } from "../data";
import { Book as BookType } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, ChevronLeft, ChevronRight, X, Heart, Sparkles, Feather } from "lucide-react";

export default function BookPreviewer() {
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const openBook = (book: BookType) => {
    setSelectedBook(book);
    setCurrentPage(0);
  };

  const closeBook = () => {
    setSelectedBook(null);
  };

  const nextPage = () => {
    if (selectedBook && currentPage < selectedBook.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="mt-20 font-sans">
      {/* Decorative Literary Accent Divider */}
      <div className="flex items-center justify-center gap-2 mb-12">
        <div className="h-px w-16 bg-cream-300" />
        <Feather className="w-5 h-5 text-rust-400" />
        <div className="h-px w-16 bg-cream-300" />
      </div>

      {/* Subtitle / Intro to the Catalog */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-forest-900 font-burmese">
          ပြုံးပန်းတရာ၏ ကုထုံးစာအုပ်စင်
        </h3>
        <p className="text-sm text-forest-600 font-burmese leading-relaxed">
          စိတ်အပန်းပြေစေရန်၊ နားလည်မှုရရှိရန်နှင့် ရင်တွင်းအေးချမ်းမှုအတွက် ရွေးချယ်ထုတ်ဝေထားသော စာပေအဆီအနှစ်များ ဖြစ်ပါသည်။ (စာအုပ်ဖတ်ရှုရန် ကတ်များကို နှိပ်ပါ)
        </p>
      </div>

      {/* Aesthetic grid of healing books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
        {booksData.map((book) => {
          return (
            <motion.div
              key={book.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => openBook(book)}
              className="bg-cream-50 border border-cream-200 rounded-2xl p-6 shadow-sm hover:shadow-xl cursor-pointer text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden group h-[280px]"
            >
              {/* Highlight cover accents */}
              <div className={`absolute top-0 inset-x-0 h-2.5 ${book.coverBg}`} />

              <div className="space-y-4 pt-2">
                <span className="inline-flex text-[10px] uppercase tracking-wider text-rust-500 font-extrabold flex items-center gap-1">
                  <Feather className="w-3 h-3" /> Healing Edition
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg text-forest-900 group-hover:text-rust-500 transition-colors font-burmese leading-snug">
                  {book.title}
                </h4>
                <p className="text-xs text-forest-500 font-burmese">
                  ရေးသူ — {book.author}
                </p>
                <p className="text-xs text-forest-600 line-clamp-4 leading-relaxed font-burmese">
                  {book.brief}
                </p>
              </div>

              {/* Read button feedback */}
              <div className="flex items-center justify-between pt-4 border-t border-cream-200/50">
                <span className="text-[11px] font-bold text-forest-400 group-hover:text-rust-500 transition-colors uppercase font-burmese">
                  ဖတ်ရှုရန်
                </span>
                <BookOpen className="w-4 h-4 text-forest-400 group-hover:text-rust-500 transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full screen / Focused Sensory Book Reader Overlay */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-forest-955/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={closeBook}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-cream-50 border-2 border-cream-200 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-between max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside cover bar */}
              <div className={`p-6 text-cream-50 flex items-center justify-between ${selectedBook.coverBg}`}>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <Feather className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <h5 className="font-serif font-bold text-sm sm:text-base leading-none font-burmese text-white">
                      {selectedBook.title}
                    </h5>
                    <p className="text-[10px] text-cream-200 font-burmese mt-1">
                      {selectedBook.author} နှလုံးသားဝတ္ထု
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeBook}
                  className="p-1.5 rounded-full hover:bg-white/10 text-cream-100 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close book reading view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Book Sheet Content Frame */}
              <div className="p-8 sm:p-12 overflow-y-auto flex-1 flex flex-col justify-center items-center bg-cream-50 relative">
                {/* Visual leaf details watermark on diary sheet */}
                <div className="absolute inset-0 pointer-events-none select-none opacity-40 flex items-center justify-center">
                  <Feather className="w-64 h-64 text-cream-200" />
                </div>

                <div className="max-w-xl mx-auto w-full text-center relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-6"
                    >
                      <p className="text-base sm:text-lg text-forest-900 leading-loose font-burmese text-left whitespace-pre-line select-text">
                        {selectedBook.pages[currentPage]}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Page turn and status controls footer */}
              <div className="px-8 py-6 border-t border-cream-200 flex items-center justify-between bg-cream-100/50">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`p-2.5 rounded-full border border-cream-300 flex items-center justify-center transition-all ${
                    currentPage === 0
                      ? "opacity-30 cursor-not-allowed"
                      : "bg-cream-100 hover:bg-cream-200 text-forest-800"
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-xs font-bold text-forest-500 font-burmese">
                  စာမျက်နှာ {currentPage + 1} / {selectedBook.pages.length}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === selectedBook.pages.length - 1}
                  className={`p-2.5 rounded-full border border-cream-300 flex items-center justify-center transition-all ${
                    currentPage === selectedBook.pages.length - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "bg-cream-100 hover:bg-cream-200 text-forest-800"
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
