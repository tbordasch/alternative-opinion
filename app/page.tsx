import { getCurrentOpinion, getComments } from '@/lib/db';
import CommentsSection from '@/components/CommentsSection';
import { unstable_noStore as noStore } from 'next/cache';
import OrganicBackground from '@/components/OrganicBackground';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  noStore();
  const currentOpinion = await getCurrentOpinion();
  const comments = currentOpinion ? await getComments(currentOpinion.id, 'newest') : [];

  return (
    <main className="h-full w-full flex flex-col bg-white dark:bg-[#1a2332] transition-colors duration-200 md:h-[calc(100vh-6rem)]">
      <div className="flex-1 min-h-0 flex flex-col md:flex-row h-full">
        <div className="w-full md:w-2/5 flex flex-col border-t md:border-t-0 md:border-r border-[#5C3A21]/10 dark:border-white/10 bg-white dark:bg-[#1a2332] transition-colors duration-200 overflow-y-auto scrollbar-hide md:scrollbar-hide order-2 md:order-1">
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

        <div className="w-full md:w-3/5 flex flex-col bg-white dark:bg-[#1a2332] relative transition-colors duration-200 overflow-y-auto scrollbar-hide md:scrollbar-hide order-1 md:order-2">
          <OrganicBackground />
          {currentOpinion ? (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative z-10 min-h-[50vh] md:min-h-0">
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
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative z-10 min-h-[50vh] md:min-h-0">
              <article className="max-w-3xl w-full">
                <p className="text-sm sm:text-base text-[#5C3A21]/70 dark:text-white/70 text-center font-light">
                  No opinion available yet. Please add an opinion to the database.
                </p>
              </article>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
