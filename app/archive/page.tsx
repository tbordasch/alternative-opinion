import { getPastOpinions, getComments } from '@/lib/db';
import Link from 'next/link';
import ArchiveOpinionCard from '@/components/ArchiveOpinionCard';
import { unstable_noStore as noStore } from 'next/cache';

// Disable caching - always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArchivePage() {
  noStore(); // Ensure no caching
  const opinions = await getPastOpinions();

  return (
    <main className="min-h-screen bg-white dark:bg-[#1a2332] transition-colors duration-200">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
        {/* Archive Header */}
        <header className="mb-10 sm:mb-12 md:mb-16 pb-8 sm:pb-10 text-center">
          <Link
            href="/"
            className="inline-block mb-6 sm:mb-8 text-xs sm:text-sm text-[#5C3A21] dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5] transition-colors font-light"
          >
            ← Back to homepage
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#5C3A21] dark:text-white mb-3 sm:mb-4">
            Archive
          </h1>
          <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 font-light">
            Past opinions and reflections
          </p>
        </header>

        {/* Opinions List */}
        {opinions.length === 0 ? (
          <div className="bg-white dark:bg-[#253447] rounded-lg p-10 sm:p-12 md:p-16 border border-gray-200 dark:border-white/10">
            <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 text-center font-light">
              No opinions in the archive yet.
            </p>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-12 md:space-y-16">
            {opinions.map(async (opinion) => {
              const comments = await getComments(opinion.id, 'newest');
              return (
                <ArchiveOpinionCard
                  key={opinion.id}
                  opinion={opinion}
                  initialComments={comments}
                />
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
