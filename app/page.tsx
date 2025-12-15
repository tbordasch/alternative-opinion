import { getCurrentOpinion, getComments } from '@/lib/db';
import CommentsSection from '@/components/CommentsSection';
import { unstable_noStore as noStore } from 'next/cache';
import OrganicBackground from '@/components/OrganicBackground';

// Disable caching - always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  noStore(); // Ensure no caching
  const currentOpinion = await getCurrentOpinion();
  const comments = currentOpinion ? await getComments(currentOpinion.id, 'newest') : [];

  return (
    <main className="min-h-screen bg-white dark:bg-[#1a2332] transition-colors duration-200">
      {/* Mobile: Stacked layout, Desktop: Split view */}
      <div className="min-h-screen flex flex-col md:flex-row md:h-screen">
        {/* Opinion Section - Top on mobile, Right on desktop */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col bg-white dark:bg-[#1a2332] relative transition-colors duration-200 order-1 md:order-2 min-h-[50vh] md:min-h-0 md:h-full md:overflow-y-auto md:scrollbar-hide">
          <OrganicBackground />
          {currentOpinion ? (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative z-10">
              <article className="max-w-3xl w-full">
                <div className="opinion-text text-[#5C3A21] dark:text-white text-center">
                  <div
                    className="whitespace-pre-line break-words"
                    dangerouslySetInnerHTML={{
                      __html: currentOpinion.content.replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              </article>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative z-10">
              <article className="max-w-3xl w-full">
                <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 text-center font-light">
                  No opinion available yet. Please add an opinion to the database.
                </p>
              </article>
            </div>
          )}
        </div>

        {/* Comments Section - Bottom on mobile, Left on desktop */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col border-t md:border-t-0 md:border-r border-[#5C3A21]/10 dark:border-white/10 bg-white dark:bg-[#1a2332] transition-colors duration-200 order-2 md:order-1 md:h-full md:overflow-y-auto md:scrollbar-hide">
          {currentOpinion ? (
            <div className="flex-1 p-4 sm:p-6 md:p-8">
              <CommentsSection
                opinionId={currentOpinion.id}
                initialComments={comments}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
              <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 text-center font-light">
                No opinion available yet. Please add an opinion to the database.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
