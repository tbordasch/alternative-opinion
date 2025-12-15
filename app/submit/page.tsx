'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubmitPage() {
  const [opinionText, setOpinionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (opinionText.trim().length === 0) {
      setError('Please enter an opinion.');
      setIsSubmitting(false);
      return;
    }

    if (opinionText.length > 1000) {
      setError('Opinion must not exceed 1000 characters.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/submit-opinion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: opinionText }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setOpinionText('');
      } else {
        setError(result.error || 'Failed to submit opinion. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit opinion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#1a2332] transition-colors duration-200 pb-8 sm:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="text-center">
            <div className="mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#8DA070]/10 dark:bg-[#5B9BD5]/20 border-2 border-[#8DA070] dark:border-[#5B9BD5] flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#8DA070] dark:text-[#5B9BD5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#5C3A21] dark:text-white mb-3 sm:mb-4">
                Thank you!
              </h1>
              <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 font-light mb-6 sm:mb-8 max-w-md mx-auto">
                Your opinion has been submitted. We&apos;ll review it and consider it for publication.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#8DA070] dark:bg-[#5B9BD5] hover:bg-[#7a8f5f] dark:hover:bg-[#4a7ba8] text-white text-sm sm:text-base font-light transition-colors text-center"
              >
                Back to Home
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white dark:bg-[#253447] border border-[#5C3A21]/20 dark:border-white/20 hover:bg-[#5C3A21]/5 dark:hover:bg-white/5 text-[#5C3A21] dark:text-white text-sm sm:text-base font-light transition-colors"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#1a2332] transition-colors duration-200 pb-8 sm:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="mb-12 sm:mb-16">
          <Link
            href="/"
            className="inline-block mb-6 sm:mb-8 text-xs sm:text-sm text-[#5C3A21] dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5] transition-colors font-light"
          >
            ← Back to homepage
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
            Submit Opinion
          </h1>
          <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 font-light mb-4 sm:mb-6">
            Share your perspective
          </p>
          <p className="text-sm sm:text-base text-[#5C3A21]/80 dark:text-white/80 font-light leading-relaxed">
            Submit an opinion about something—perhaps controversial or thought-provoking—that could be published on this website. We welcome perspectives that encourage reflection and meaningful dialogue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label htmlFor="opinion" className="block text-sm sm:text-base text-[#5C3A21] dark:text-white font-light mb-3 sm:mb-4">
              Your opinion
            </label>
            <textarea
              id="opinion"
              value={opinionText}
              onChange={(e) => setOpinionText(e.target.value)}
              placeholder="Write your opinion here..."
              className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#5C3A21]/20 dark:border-white/20 rounded-lg bg-white dark:bg-[#253447] text-[#5C3A21] dark:text-white placeholder-[#5C3A21]/40 dark:placeholder-white/40 focus:outline-none focus:border-[#8DA070] dark:focus:border-[#5B9BD5] resize-none transition-all font-light text-sm sm:text-base leading-relaxed"
              rows={8}
              maxLength={1000}
            />
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xs text-[#5C3A21]/50 dark:text-white/50 font-light">
                All submissions are reviewed before publication
              </p>
              <span className={`text-xs font-light ${
                1000 - opinionText.length < 100
                  ? 'text-[#8B4513] dark:text-[#C97D60]'
                  : 'text-[#5C3A21]/50 dark:text-white/50'
              }`}>
                {1000 - opinionText.length} characters left
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 sm:p-4 bg-[#8B4513]/10 dark:bg-[#C97D60]/20 border border-[#8B4513]/30 dark:border-[#C97D60]/30 rounded-lg">
              <p className="text-xs sm:text-sm text-[#8B4513] dark:text-[#C97D60] font-light">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={isSubmitting || opinionText.trim().length === 0}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#8B4513] dark:bg-[#5B9BD5] hover:bg-[#6B3410] dark:hover:bg-[#4a7ba8] text-white text-sm sm:text-base font-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Opinion'}
            </button>
            <Link
              href="/"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white dark:bg-[#253447] border border-[#5C3A21]/20 dark:border-white/20 hover:bg-[#5C3A21]/5 dark:hover:bg-white/5 text-[#5C3A21] dark:text-white text-sm sm:text-base font-light transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>

        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#5C3A21]/10 dark:border-white/10">
          <h2 className="text-lg sm:text-xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
            Submission Guidelines
          </h2>
          <ul className="space-y-3 text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 font-light leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#8DA070] mt-1">•</span>
              <span>Keep it respectful and constructive</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8DA070] mt-1">•</span>
              <span>Maximum 1000 characters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8DA070] mt-1">•</span>
              <span>We may edit submissions for clarity or length</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

