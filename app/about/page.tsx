import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  noStore();

  return (
    <main className="min-h-screen bg-white dark:bg-[#1a2332] transition-colors duration-200 pb-8 sm:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <Link
            href="/"
            className="inline-block mb-6 sm:mb-8 text-xs sm:text-sm text-[#5C3A21] dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5] transition-colors font-light"
          >
            ← Back to homepage
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
            About this
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
              What is Alternative Opinion?
            </h2>
            <div className="space-y-4 text-[#5C3A21]/80 dark:text-white/80 font-light leading-relaxed">
              <p className="text-sm sm:text-base">
                Alternative Opinion is a student project that shares opinions and perspectives 
                meant to make you think. We believe that meaningful thinking begins when we step outside our comfort zones and 
                consider viewpoints that differ from our own.
              </p>
              <p className="text-sm sm:text-base">
                The opinions we share are chosen to get you thinking about topics that matter—things that affect 
                how we live, how we relate to each other, and how we see the world.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
              How it works
            </h2>
            <div className="space-y-4 text-[#5C3A21]/80 dark:text-white/80 font-light leading-relaxed">
              <p className="text-sm sm:text-base">
                New opinions appear on <strong className="text-[#5C3A21] dark:text-white font-medium">Tuesday, Friday, and Sunday</strong>. 
                Each opinion stays active for a few days, giving you time to read, reflect, and share your thoughts.
              </p>
              <div className="bg-[#8DA070]/10 dark:bg-[#5B9BD5]/20 border border-[#8DA070]/30 dark:border-[#5B9BD5]/30 rounded-lg p-4 sm:p-5 space-y-3">
                <p className="text-sm sm:text-base font-medium text-[#5C3A21] dark:text-white">
                  Participation limits per opinion round:
                </p>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8DA070] dark:text-[#5B9BD5] mt-1">•</span>
                    <span><strong className="text-[#5C3A21] dark:text-white font-medium">1 reflection</strong> per round</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8DA070] dark:text-[#5B9BD5] mt-1">•</span>
                    <span><strong className="text-[#5C3A21] dark:text-white font-medium">3 replies</strong> per round (can be distributed across 1-3 comments)</span>
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-[#5C3A21]/70 dark:text-white/70 pt-2 border-t border-[#8DA070]/20 dark:border-[#5B9BD5]/20">
                  These limitations encourage thoughtful, constructive engagement rather than quick reactions. 
                  You can engage with others&apos; thoughts through likes, and all past opinions are preserved in our archive 
                  for continued reflection.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-light text-[#5C3A21] dark:text-white mb-4 sm:mb-6">
              Our values
            </h2>
            <div className="space-y-4 text-[#5C3A21]/80 dark:text-white/80 font-light leading-relaxed">
              <p className="text-sm sm:text-base">
                We value <strong className="text-[#5C3A21] dark:text-white font-medium">thoughtful discourse</strong>, 
                <strong className="text-[#5C3A21] dark:text-white font-medium"> respectful dialogue</strong>, and 
                <strong className="text-[#5C3A21] dark:text-white font-medium"> open-mindedness</strong>. 
                This is a space for reflection, not debate.
              </p>
              <p className="text-sm sm:text-base">
                We encourage you to share your genuine thoughts and engage with others&apos; perspectives 
                with curiosity and respect.
              </p>
            </div>
          </section>

          <section className="pt-6 sm:pt-8 border-t border-[#5C3A21]/10 dark:border-white/10">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href="/submit"
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#8DA070] hover:bg-[#7a8f5f] text-white text-sm sm:text-base font-light transition-colors text-center"
              >
                Submit an Opinion
              </Link>
              <Link
                href="/archive"
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#8B4513] hover:bg-[#6B3410] text-white text-sm sm:text-base font-light transition-colors text-center"
              >
                Browse Archive
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

