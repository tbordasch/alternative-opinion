'use client';

import { useState, useEffect } from 'react';
import { getComments, toggleLike, getReplies } from '@/lib/db';
import { getSessionId } from '@/lib/supabase';
import type { Opinion, Comment, Reply } from '@/lib/types';

interface ArchiveOpinionCardProps {
  opinion: Opinion;
  initialComments: Comment[];
}

export default function ArchiveOpinionCard({
  opinion,
  initialComments,
}: ArchiveOpinionCardProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'random'>('newest');
  const [showComments, setShowComments] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});

  useEffect(() => {
    setMounted(true);
    if (showComments) {
      loadComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, showComments, opinion.id]);

  async function loadComments() {
    const sessionId = getSessionId();
    const updatedComments = await getComments(opinion.id, sortBy, sessionId);
    setComments(updatedComments);
  }

  async function handleLike(commentId: string) {
    const result = await toggleLike(commentId, getSessionId());
    if (result.success) {
      await loadComments();
    }
  }

  async function handleCommentClick(commentId: string) {
    if (openCommentId === commentId) {
      setOpenCommentId(null);
      return;
    }
    
    setOpenCommentId(commentId);
    
    // Load replies if not already loaded
    if (!replies[commentId]) {
      const commentReplies = await getReplies(commentId);
      setReplies(prev => ({ ...prev, [commentId]: commentReplies }));
    }
  }

  return (
    <article className="bg-white dark:bg-[#253447] rounded-lg p-8 sm:p-10 md:p-12 border border-[#5C3A21]/10 dark:border-white/10 animate-fade-in shadow-sm dark:shadow-none transition-colors duration-200">
      {/* Opinion Date */}
      <div className="mb-6 sm:mb-8 text-xs sm:text-sm text-[#5C3A21]/70 dark:text-white/70 font-light">
        {new Date(opinion.published_at).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </div>

      {/* Opinion Content */}
      <div className="opinion-text text-[#5C3A21] dark:text-white mb-8 sm:mb-10">
        <div
          className="whitespace-pre-line break-words"
          dangerouslySetInnerHTML={{
            __html: opinion.content.replace(/\n/g, '<br />'),
          }}
        />
      </div>

      {/* Comments Toggle */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-sm sm:text-base text-[#8DA070] dark:text-[#5B9BD5] hover:text-[#8B4513] dark:hover:text-[#4a7ba8] transition-colors font-light mb-6 sm:mb-8"
      >
        {showComments ? 'Hide reflections' : `Show reflections (${comments.length})`}
      </button>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-gray-200 dark:border-white/10 animate-fade-in">
          <div className="mb-5 sm:mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 font-light ${
                sortBy === 'newest'
                  ? 'bg-[#8DA070] dark:bg-[#5B9BD5] text-white shadow-sm dark:shadow-none'
                  : 'bg-gray-100 dark:bg-[#1a2332] text-[#5C3A21] dark:text-white/70 hover:bg-[#8DA070]/10 dark:hover:bg-[#5B9BD5]/20'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 font-light ${
                sortBy === 'popular'
                  ? 'bg-[#8B4513] dark:bg-[#5B9BD5] text-white shadow-sm dark:shadow-none'
                  : 'bg-gray-100 dark:bg-[#1a2332] text-[#5C3A21] dark:text-white/70 hover:bg-[#8B4513]/10 dark:hover:bg-[#5B9BD5]/20'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setSortBy('random')}
              className={`text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 font-light ${
                sortBy === 'random'
                  ? 'bg-[#8B4513] dark:bg-[#5B9BD5] text-white shadow-sm dark:shadow-none'
                  : 'bg-gray-100 dark:bg-[#1a2332] text-[#5C3A21] dark:text-white/70 hover:bg-[#8B4513]/10 dark:hover:bg-[#5B9BD5]/20'
              }`}
            >
              Random
            </button>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
            {comments.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-[#5C3A21]/50 dark:text-white/50 text-xs sm:text-sm font-light">
                  No comments on this opinion.
                </p>
              </div>
            ) : (
              <>
                {comments.map((comment, index) => {
                  const isOpen = openCommentId === comment.id;
                  const commentReplies = replies[comment.id] || [];
                  
                  return (
                  <div
                    key={comment.id}
                    className={`group relative flex flex-col mb-3 sm:mb-4 break-inside-avoid ${
                      mounted ? 'animate-slide-up' : ''
                    }`}
                    style={mounted ? {
                      animationDelay: `${index * 0.03}s`,
                      animationFillMode: 'both',
                    } : {}}
                  >
                    <div className="bg-gray-50 dark:bg-[#1a2332] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden hover:border-[#8DA070] dark:hover:border-[#5B9BD5] transition-all duration-200 flex flex-col shadow-sm dark:shadow-none">
                      {/* Clickable comment content */}
                      <div
                        onClick={() => handleCommentClick(comment.id)}
                        className="text-left p-4 sm:p-5 flex flex-col cursor-pointer hover:bg-[#5C3A21]/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <p className="text-xs sm:text-sm text-[#5C3A21] dark:text-white/90 mb-3 sm:mb-4 whitespace-pre-line leading-relaxed font-light break-words">
                      {comment.content}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pt-2 sm:pt-3 border-t border-[#5C3A21]/10 dark:border-white/10">
                      <span className="text-xs text-[#5C3A21]/70 dark:text-white/70 font-light">
                        {new Date(comment.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(comment.id);
                            }}
                        className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full transition-all duration-200 text-xs font-light self-start sm:self-auto ${
                          comment.user_liked
                            ? 'bg-[#8DA070]/10 dark:bg-[#5B9BD5]/20 text-[#8DA070] dark:text-[#5B9BD5] border border-[#8DA070] dark:border-[#5B9BD5]'
                            : 'bg-white dark:bg-[#253447] border border-[#5C3A21]/10 dark:border-white/20 text-[#5C3A21]/70 dark:text-white/70 hover:bg-[#8DA070]/5 dark:hover:bg-[#5B9BD5]/10'
                        }`}
                      >
                        <span className="text-sm">{comment.user_liked ? '❤️' : '🤍'}</span>
                        <span>{comment.likes_count || 0}</span>
                      </button>
                    </div>
                      </div>

                      {/* Replies section - expandable */}
                      {isOpen && commentReplies.length > 0 && (
                        <div className="border-t border-[#5C3A21]/10 dark:border-white/10 bg-[#5C3A21]/5 dark:bg-white/5">
                          <div className="p-3 sm:p-4 space-y-3">
                            {commentReplies.map((reply) => (
                              <div key={reply.id} className="pl-3 sm:pl-4 border-l-2 border-[#8DA070]/30 dark:border-[#5B9BD5]/30">
                                <p className="text-xs sm:text-sm text-[#5C3A21] dark:text-white/90 mb-1 whitespace-pre-line leading-relaxed font-light break-words">
                                  {reply.content}
                                </p>
                                <span className="text-[10px] sm:text-xs text-[#5C3A21]/60 dark:text-white/60 font-light">
                                  {new Date(reply.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                  </div>
                ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
