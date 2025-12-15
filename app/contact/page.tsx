import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  noStore();

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
            Contact
          </h1>
          <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 font-light">
            Reach out if you have questions or feedback
          </p>
        </div>

        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          <section>
            <h2 className="text-xl sm:text-2xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
              Questions or feedback?
            </h2>
            <div className="space-y-4 text-[#5C3A21]/80 dark:text-white/80 font-light leading-relaxed">
              <p className="text-sm sm:text-base">
                Got questions about the platform? Feedback on an opinion? Suggestions? 
                Send us a message.
              </p>
              <p className="text-sm sm:text-base">
                We&apos;re a small team, so it might take a few days to get back to you.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
              Ways to reach us
            </h2>
            <div className="space-y-6">
              <div className="p-4 sm:p-6 bg-[#8DA070]/5 dark:bg-[#5B9BD5]/10 border border-[#8DA070]/20 dark:border-[#5B9BD5]/30 rounded-lg">
                <h3 className="text-base sm:text-lg font-light text-[#5C3A21] dark:text-white mb-2 sm:mb-3">
                  General inquiries
                </h3>
                <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 font-light">
                  Questions, feedback, or suggestions
                </p>
                <a
                  href="mailto:hello@alternativeopinion.com"
                  className="inline-block mt-3 sm:mt-4 text-sm sm:text-base text-[#8DA070] dark:text-[#5B9BD5] hover:text-[#7a8f5f] dark:hover:text-[#4a7ba8] font-light transition-colors break-all"
                >
                  hello@alternativeopinion.com
                </a>
              </div>

              <div className="p-4 sm:p-6 bg-[#8B4513]/5 dark:bg-[#5B9BD5]/10 border border-[#8B4513]/20 dark:border-[#5B9BD5]/30 rounded-lg">
                <h3 className="text-base sm:text-lg font-light text-[#5C3A21] dark:text-white mb-2 sm:mb-3">
                  Opinion submissions
                </h3>
                <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 font-light mb-3 sm:mb-4">
                  Want to submit an opinion? Use our submission form.
                </p>
                <Link
                  href="/submit"
                  className="inline-block text-sm sm:text-base text-[#8B4513] dark:text-[#5B9BD5] hover:text-[#6B3410] dark:hover:text-[#4a7ba8] font-light transition-colors"
                >
                  Submit an Opinion →
                </Link>
              </div>
            </div>
          </section>

          <section className="pt-6 sm:pt-8 border-t border-[#5C3A21]/10 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
              Community guidelines
            </h2>
            <div className="space-y-4 text-[#5C3A21]/80 dark:text-white/80 font-light leading-relaxed text-sm sm:text-base">
              <p>
                When contacting us, please be respectful and provide context for your questions or feedback.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

