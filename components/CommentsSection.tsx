'use client';

import { useState, useEffect } from 'react';
import { getComments, submitComment, toggleLike, getReplies, submitReply, getReplyCountForRound } from '@/lib/db';
import { getSessionId, supabase } from '@/lib/supabase';
import type { Comment, Reply } from '@/lib/types';

interface CommentsSectionProps {
  opinionId: string;
  initialComments: Comment[];
}

export default function CommentsSection({
  opinionId,
  initialComments,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'random'>('newest');
  const [hasCommented, setHasCommented] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [isSubmittingReply, setIsSubmittingReply] = useState<Record<string, boolean>>({});
  const [replyErrors, setReplyErrors] = useState<Record<string, string | null>>({});
  const [replyCount, setReplyCount] = useState<number>(0);
  const [canReply, setCanReply] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkIfCommentedToday();
    loadComments();
    checkReplyLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, opinionId]);

  async function checkReplyLimit() {
    const sessionId = getSessionId();
    const count = await getReplyCountForRound(sessionId, opinionId);
    setReplyCount(count);
    
    // Check if user can reply (must have commented in this round)
    const { data: roundComments } = await supabase
      .from('comments')
      .select('id')
      .eq('session_id', sessionId)
      .eq('opinion_id', opinionId)
      .limit(1);
    
    setCanReply(!!(roundComments && roundComments.length > 0 && count < 3));
  }

  async function checkIfCommentedToday() {
    const sessionId = getSessionId();
    
    // Check if user commented in this round (current opinion)
    const { data: roundComments } = await supabase
      .from('comments')
      .select('id')
      .eq('session_id', sessionId)
      .eq('opinion_id', opinionId)
      .limit(1);
    
    setHasCommented(!!(roundComments && roundComments.length > 0));
  }

  async function loadComments() {
    const sessionId = getSessionId();
    const updatedComments = await getComments(opinionId, sortBy, sessionId);
    setComments(updatedComments);
  }

  function shuffleComments() {
    // Shuffle the current comments array
    const shuffled = [...comments];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setComments(shuffled);
  }

  async function handleRandomClick() {
    if (sortBy !== 'random') {
      // First time clicking random - load comments with random sort
      setSortBy('random');
      const sessionId = getSessionId();
      const updatedComments = await getComments(opinionId, 'random', sessionId);
      setComments(updatedComments);
    } else {
      // Already in random mode - just shuffle the current comments
      shuffleComments();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (commentText.trim().length === 0) {
      setError('Please enter a comment.');
      return;
    }

    if (commentText.length > 500) {
      setError('Comment must not exceed 500 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitComment(opinionId, commentText, getSessionId());

      if (result.success) {
        setCommentText('');
        setSuccess(true);
        setHasCommented(true);
        setShowForm(false);
        await loadComments();
        await checkReplyLimit(); // Update reply permissions
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Failed to submit comment.');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('An error occurred while submitting your reflection. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

  async function handleReplySubmit(e: React.FormEvent, commentId: string) {
    e.preventDefault();
    const replyText = replyTexts[commentId] || '';
    
    setReplyErrors(prev => ({ ...prev, [commentId]: null }));
    setIsSubmittingReply(prev => ({ ...prev, [commentId]: true }));

    if (replyText.trim().length === 0) {
      setReplyErrors(prev => ({ ...prev, [commentId]: 'Please enter a reply.' }));
      setIsSubmittingReply(prev => ({ ...prev, [commentId]: false }));
      return;
    }

    if (replyText.length > 500) {
      setReplyErrors(prev => ({ ...prev, [commentId]: 'Reply must not exceed 500 characters.' }));
      setIsSubmittingReply(prev => ({ ...prev, [commentId]: false }));
      return;
    }

    const result = await submitReply(commentId, replyText, getSessionId(), opinionId);

    if (result.success) {
      setReplyTexts(prev => ({ ...prev, [commentId]: '' }));
      await checkReplyLimit();
      // Reload replies for this comment
      const commentReplies = await getReplies(commentId);
      setReplies(prev => ({ ...prev, [commentId]: commentReplies }));
    } else {
      setReplyErrors(prev => ({ ...prev, [commentId]: result.error || 'Failed to submit reply.' }));
    }

    setIsSubmittingReply(prev => ({ ...prev, [commentId]: false }));
  }

  const charactersLeft = 500 - commentText.length;

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div>
          <h2 className="text-sm sm:text-base font-light text-[#5C3A21] dark:text-white mb-1">
            Reflections
          </h2>
          <p className="text-xs text-[#5C3A21]/70 dark:text-white/70 font-light">
            {comments.length} {comments.length === 1 ? 'thought' : 'thoughts'} shared
          </p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-0.5 sm:gap-1 bg-white dark:bg-[#253447] rounded-full p-0.5 sm:p-1 border border-[#5C3A21]/20 dark:border-white/20 shadow-sm dark:shadow-none transition-colors duration-200">
            <button
              onClick={() => setSortBy('newest')}
              className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-200 font-light min-w-[45px] sm:min-w-0 ${
                sortBy === 'newest'
                  ? 'bg-[#8DA070] dark:bg-[#5B9BD5] text-white shadow-sm dark:shadow-none'
                  : 'text-[#5C3A21] dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5]'
              }`}
            >
              New
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-200 font-light min-w-[45px] sm:min-w-0 ${
                sortBy === 'popular'
                  ? 'bg-[#8B4513] dark:bg-[#5B9BD5] text-white shadow-sm dark:shadow-none'
                  : 'text-[#5C3A21] dark:text-white/70 hover:text-[#8DA070] dark:hover:text-[#5B9BD5]'
              }`}
            >
              Liked
            </button>
          </div>
          <button
            onClick={handleRandomClick}
            className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-200 font-light min-w-[45px] sm:min-w-0 bg-white dark:bg-[#253447] border border-[#5C3A21]/20 dark:border-white/20 shadow-sm dark:shadow-none ${
              sortBy === 'random'
                ? 'bg-[#8B4513] dark:bg-[#5B9BD5] text-white shadow-sm dark:shadow-none'
                : 'text-[#3d2815] dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#5B9BD5]'
            }`}
          >
            Random
          </button>
        </div>
      </div>

      {!hasCommented ? (
        <div className="mb-3 flex-shrink-0">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-2 sm:py-3 px-4 sm:px-6 border-2 border-dashed border-[#8DA070] dark:border-[#A8D5BA] rounded-lg hover:border-[#8B4513] dark:hover:border-[#C97D60] hover:bg-[#8DA070]/5 dark:hover:bg-[#A8D5BA]/10 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs sm:text-sm text-[#5C3A21] dark:text-white/70 group-hover:text-[#8B4513] dark:group-hover:text-[#C97D60] font-light">
                  + Add your reflection
                </span>
              </div>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="border-2 border-[#5C3A21]/20 dark:border-white/20 rounded-lg p-3 sm:p-4 bg-white dark:bg-[#253447] shadow-sm dark:shadow-none transition-colors duration-200">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What does this make you think about?"
                className="w-full px-0 py-2 bg-transparent text-[#5C3A21] dark:text-white placeholder-[#5C3A21]/40 dark:placeholder-white/40 focus:outline-none resize-none transition-all font-light text-sm leading-relaxed break-words"
                rows={2}
                maxLength={500}
                autoFocus
              />
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <span
                  className={`text-xs font-light ${
                    charactersLeft < 50
                      ? 'text-[#8B4513] dark:text-[#C97D60]'
                      : 'text-[#5C3A21]/70 dark:text-white/70'
                  }`}
                >
                  {charactersLeft}
                </span>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setCommentText('');
                      setError(null);
                    }}
                    className="px-3 sm:px-4 py-1.5 text-xs text-[#5C3A21] dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#C97D60] font-light transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || commentText.trim().length === 0}
                    className="px-3 sm:px-4 py-1.5 bg-[#8B4513] dark:bg-[#5B9BD5] text-white rounded-full hover:bg-[#6B3410] dark:hover:bg-[#4a7ba8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-xs font-light font-medium"
                  >
                    {isSubmitting ? 'Sharing...' : 'Share'}
                  </button>
                </div>
              </div>
              {error && (
                <p className="mt-2 text-xs text-[#8B4513] dark:text-[#C97D60] font-light break-words">
                  {error}
                </p>
              )}
              {success && (
                <p className="mt-2 text-xs text-[#8DA070] dark:text-[#A8D5BA] font-light">
                  Your reflection has been shared
                </p>
              )}
            </form>
          )}
        </div>
      ) : (
        <div className="mb-3 p-3 bg-[#8DA070]/10 dark:bg-[#5B9BD5]/20 border border-[#8DA070]/30 dark:border-[#5B9BD5]/30 rounded-lg flex-shrink-0 transition-colors duration-200">
          <p className="text-xs text-[#5C3A21] dark:text-white/70 font-light text-center">
            ✓ You&apos;ve shared your reflection in this round
          </p>
        </div>
      )}

      {comments.length === 0 ? (
        <div className="text-center py-4 sm:py-6">
          <div className="inline-block p-2 sm:p-3 rounded-full bg-white dark:bg-[#253447] border border-gray-300 dark:border-white/20 mb-3 shadow-sm dark:shadow-none transition-colors duration-200">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#8DA070] dark:text-[#5B9BD5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-xs sm:text-sm text-[#5C3A21] dark:text-white font-light">
            No reflections yet
          </p>
          <p className="text-xs text-[#5C3A21]/70 dark:text-white/70 font-light mt-1">
            Be the first to share your thoughts
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
          {comments.map((comment, index) => {
            const isOpen = openCommentId === comment.id;
            const commentReplies = replies[comment.id] || [];
            const replyText = replyTexts[comment.id] || '';
            const isSubmitting = isSubmittingReply[comment.id] || false;
            const replyError = replyErrors[comment.id];
            const charactersLeft = 500 - replyText.length;
            
            return (
            <div
              key={comment.id}
              className={`group relative flex flex-col mb-3 sm:mb-4 break-inside-avoid ${mounted ? 'animate-slide-up' : ''}`}
              style={mounted ? {
                animationDelay: `${index * 0.04}s`,
                animationFillMode: 'both',
              } : {}}
            >
              <div               className="bg-white dark:bg-[#253447] border border-[#5C3A21]/10 dark:border-white/10 rounded-lg overflow-hidden hover:border-[#8DA070] dark:hover:border-[#5B9BD5] hover:shadow-sm dark:hover:shadow-none transition-all duration-200 flex flex-col shadow-sm dark:shadow-none">
                <div
                  onClick={() => handleCommentClick(comment.id)}
                  className="text-left p-3 sm:p-4 flex flex-col cursor-pointer hover:bg-[#5C3A21]/5 dark:hover:bg-white/5 transition-colors"
                >
                  <p className="text-xs sm:text-sm text-[#5C3A21] dark:text-white/90 mb-2 sm:mb-3 whitespace-pre-line leading-relaxed font-light break-words">
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
                          : 'bg-gray-50 dark:bg-[#1a2332] text-[#5C3A21]/70 dark:text-white/70 border border-[#5C3A21]/10 dark:border-white/20 hover:bg-[#8DA070]/5 dark:hover:bg-[#5B9BD5]/10'
                      }`}
                    >
                      <span className="text-sm">{comment.user_liked ? '❤️' : '🤍'}</span>
                      <span>{comment.likes_count || 0}</span>
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-[#5C3A21]/10 dark:border-white/10 bg-[#5C3A21]/5 dark:bg-white/5">
                    {commentReplies.length > 0 && (
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
                    )}

                    {canReply ? (
                      <form 
                        onSubmit={(e) => handleReplySubmit(e, comment.id)}
                        className="p-3 sm:p-4 border-t border-[#5C3A21]/10 dark:border-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyTexts(prev => ({ ...prev, [comment.id]: e.target.value }))}
                          placeholder="Write a reply..."
                          className="w-full px-0 py-2 bg-transparent text-[#5C3A21] dark:text-white placeholder-[#5C3A21]/40 dark:placeholder-white/40 focus:outline-none resize-none transition-all font-light text-xs sm:text-sm leading-relaxed break-words"
                          rows={2}
                          maxLength={500}
                          autoFocus
                        />
                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                          <span
                            className={`text-[10px] sm:text-xs font-light ${
                              charactersLeft < 50
                                ? 'text-[#8B4513] dark:text-[#C97D60]'
                                : 'text-[#5C3A21]/70 dark:text-white/70'
                            }`}
                          >
                            {charactersLeft} • {3 - replyCount} replies left
                          </span>
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenCommentId(null);
                                setReplyTexts(prev => ({ ...prev, [comment.id]: '' }));
                                setReplyErrors(prev => ({ ...prev, [comment.id]: null }));
                              }}
                              className="px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs text-[#5C3A21] dark:text-white/70 hover:text-[#8B4513] dark:hover:text-[#C97D60] font-light transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting || replyText.trim().length === 0}
                              className="px-3 sm:px-4 py-1.5 bg-[#8B4513] dark:bg-[#5B9BD5] text-white rounded-full hover:bg-[#6B3410] dark:hover:bg-[#4a7ba8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-[10px] sm:text-xs font-light"
                            >
                              {isSubmitting ? 'Sending...' : 'Reply'}
                            </button>
                          </div>
                        </div>
                        {replyError && (
                          <p className="mt-2 text-[10px] sm:text-xs text-[#8B4513] dark:text-[#C97D60] font-light break-words">
                            {replyError}
                          </p>
                        )}
                      </form>
                    ) : (
                      <div className="p-3 sm:p-4 border-t border-[#5C3A21]/10 dark:border-white/10">
                        <p className="text-[10px] sm:text-xs text-[#5C3A21]/70 dark:text-white/70 font-light text-center">
                          {!hasCommented 
                            ? 'Share a reflection in this round to reply'
                            : replyCount >= 3 
                            ? 'You have reached the limit of 3 replies for this round'
                            : 'Unable to reply'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
