import { supabase } from './supabase';
import type { Opinion, Comment, Reply } from './types';

export function getNextRotationDay(): { date: Date; dayName: string } {
  const now = new Date();
  const currentDay = now.getDay();
  
  const rotationDays = [2, 5, 0];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let daysUntilNext = 0;
  let nextDay = 0;
  
  for (let i = 0; i < 7; i++) {
    const checkDay = (currentDay + i) % 7;
    if (rotationDays.includes(checkDay)) {
      daysUntilNext = i;
      nextDay = checkDay;
      break;
    }
  }
  
  if (daysUntilNext === 0 && rotationDays.includes(currentDay)) {
    for (let i = 1; i < 7; i++) {
      const checkDay = (currentDay + i) % 7;
      if (rotationDays.includes(checkDay)) {
        daysUntilNext = i;
        nextDay = checkDay;
        break;
      }
    }
  }
  
  const nextDate = new Date(now);
  nextDate.setDate(now.getDate() + daysUntilNext);
  nextDate.setHours(0, 0, 0, 0);
  
  return {
    date: nextDate,
    dayName: dayNames[nextDay]
  };
}

function calculateOpinionIndex(opinions: Opinion[]): number {
  if (opinions.length === 0) return 0;
  
  const oldestOpinion = opinions[opinions.length - 1];
  const startDate = new Date(oldestOpinion.published_at);
  startDate.setHours(0, 0, 0, 0);
  
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  let rotationCount = 0;
  const rotationDays = [2, 5, 0];
  
  let currentDate = new Date(startDate);
  while (currentDate <= now) {
    const dayOfWeek = currentDate.getDay();
    if (rotationDays.includes(dayOfWeek)) {
      rotationCount++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const opinionIndex = Math.max(0, rotationCount - 1) % opinions.length;
  
  return opinionIndex;
}

export async function getCurrentOpinion(): Promise<Opinion | null> {
  const { data: opinions, error } = await supabase
    .from('opinions')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: true });

  if (error) {
    console.error('Error fetching opinions:', error);
    return null;
  }

  if (!opinions || opinions.length === 0) {
    console.log('[getCurrentOpinion] No active opinions found');
    return null;
  }

  const opinionIndex = calculateOpinionIndex(opinions);
  const selectedOpinion = opinions[opinionIndex];
  console.log(`[getCurrentOpinion] Found ${opinions.length} opinions, showing index ${opinionIndex}`);
  console.log(`[getCurrentOpinion] Selected opinion ID: ${selectedOpinion.id}, content preview: ${selectedOpinion.content.substring(0, 50)}...`);
  return selectedOpinion;
}

export async function getPastOpinions(): Promise<Opinion[]> {
  const now = new Date();
  const nowISO = now.toISOString();

  const currentOpinion = await getCurrentOpinion();
  const currentOpinionId = currentOpinion?.id;

  let query = supabase
    .from('opinions')
    .select('*')
    .eq('is_active', true)
    .lt('published_at', nowISO)
    .order('published_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching past opinions:', error);
    return [];
  }

  const pastOpinions = (data || []).filter(
    (opinion) => opinion.id !== currentOpinionId
  );

  console.log(`[getPastOpinions] Found ${pastOpinions.length} past opinions (excluding current)`);
  return pastOpinions;
}

export async function getComments(
  opinionId: string,
  sortBy: 'newest' | 'popular' | 'random' = 'newest',
  sessionId?: string
): Promise<Comment[]> {
  let query = supabase
    .from('comments')
    .select('*')
    .eq('opinion_id', opinionId);

  if (sortBy === 'newest') {
    query = query.order('created_at', { ascending: false });
  } else if (sortBy === 'popular') {
    query = query.order('created_at', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  const commentsWithLikes = await Promise.all(
    (data || []).map(async (comment) => {
      const { count: likesCount } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('comment_id', comment.id);

      const { count: repliesCount } = await supabase
        .from('replies')
        .select('*', { count: 'exact', head: true })
        .eq('comment_id', comment.id);

      let userLiked = false;
      if (sessionId) {
        const { data: userLike } = await supabase
          .from('likes')
          .select('id')
          .eq('comment_id', comment.id)
          .eq('session_id', sessionId)
          .single();
        userLiked = !!userLike;
      }

      return {
        ...comment,
        likes_count: likesCount || 0,
        user_liked: userLiked,
        replies_count: repliesCount || 0,
      };
    })
  );

  if (sortBy === 'popular') {
    commentsWithLikes.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
  } else if (sortBy === 'random') {
    for (let i = commentsWithLikes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [commentsWithLikes[i], commentsWithLikes[j]] = [commentsWithLikes[j], commentsWithLikes[i]];
    }
  }

  return commentsWithLikes;
}

export async function submitComment(
  opinionId: string,
  content: string,
  sessionId: string
): Promise<{ success: boolean; error?: string }> {
  if (content.length > 500) {
    return { success: false, error: 'Comment exceeds 500 characters' };
  }

  if (content.trim().length === 0) {
    return { success: false, error: 'Comment cannot be empty' };
  }

  // Check if Supabase is configured
  if (!supabase) {
    console.error('Supabase client is not configured');
    return { success: false, error: 'Database connection not configured. Please check your environment variables.' };
  }

  const currentOpinion = await getCurrentOpinion();
  if (!currentOpinion) {
    return { success: false, error: 'No active opinion available' };
  }

  const { data: existingComments, error: checkError } = await supabase
    .from('comments')
    .select('id, created_at')
    .eq('session_id', sessionId)
    .eq('opinion_id', currentOpinion.id)
    .limit(1);

  if (checkError) {
    console.error('Error checking existing comments:', checkError);
    return { success: false, error: `Database error: ${checkError.message}` };
  }

  if (existingComments && existingComments.length > 0) {
    return { success: false, error: 'You can only share one reflection per opinion round' };
  }

  if (opinionId !== currentOpinion.id) {
    return { success: false, error: 'You can only comment on the current active opinion' };
  }

  const { error, data } = await supabase
    .from('comments')
    .insert({
      opinion_id: opinionId,
      content: content.trim(),
      session_id: sessionId,
    })
    .select();

  if (error) {
    console.error('Error submitting comment:', error);
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    return { success: false, error: error.message || 'Failed to submit comment. Please check your connection and try again.' };
  }

  if (!data || data.length === 0) {
    console.error('No data returned from insert');
    return { success: false, error: 'Failed to submit comment. No data returned.' };
  }

  return { success: true };
}

export async function toggleLike(
  commentId: string,
  sessionId: string
): Promise<{ success: boolean; liked: boolean; error?: string }> {
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('comment_id', commentId)
    .eq('session_id', sessionId)
    .single();

  if (existingLike) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('id', existingLike.id);

    if (error) {
      console.error('Error unliking:', error);
      return { success: false, liked: false, error: 'Failed to unlike' };
    }

    return { success: true, liked: false };
  } else {
    const { error } = await supabase
      .from('likes')
      .insert({
        comment_id: commentId,
        session_id: sessionId,
      });

    if (error) {
      console.error('Error liking:', error);
      return { success: false, liked: false, error: 'Failed to like' };
    }

    return { success: true, liked: true };
  }
}

export async function submitOpinion(
  content: string
): Promise<{ success: boolean; error?: string }> {
  if (content.length > 1000) {
    return { success: false, error: 'Opinion exceeds 1000 characters' };
  }

  if (content.trim().length === 0) {
    return { success: false, error: 'Opinion cannot be empty' };
  }

  const { error } = await supabase
    .from('opinions')
    .insert({
      content: content.trim(),
      published_at: new Date().toISOString(),
      is_active: false,
    });

  if (error) {
    console.error('Error submitting opinion:', error);
    return { success: false, error: 'Failed to submit opinion' };
  }

  return { success: true };
}

export async function getReplies(commentId: string): Promise<Reply[]> {
  const { data, error } = await supabase
    .from('replies')
    .select('*')
    .eq('comment_id', commentId)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching replies:', error);
    return [];
  }
  
  return data || [];
}

export async function getReplyCountForRound(
  sessionId: string,
  opinionId: string
): Promise<number> {
  const currentOpinion = await getCurrentOpinion();
  if (!currentOpinion || currentOpinion.id !== opinionId) return 0;
  
  const { count } = await supabase
    .from('replies')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('opinion_id', opinionId);
  
  return count || 0;
}

export async function submitReply(
  commentId: string,
  content: string,
  sessionId: string,
  opinionId: string
): Promise<{ success: boolean; error?: string }> {
  if (content.length > 500) {
    return { success: false, error: 'Reply exceeds 500 characters' };
  }

  if (content.trim().length === 0) {
    return { success: false, error: 'Reply cannot be empty' };
  }

  const currentOpinion = await getCurrentOpinion();
  if (!currentOpinion) {
    return { success: false, error: 'No active opinion available' };
  }

  if (opinionId !== currentOpinion.id) {
    return { success: false, error: 'You can only reply to comments in the current active opinion' };
  }

  const { data: roundComments } = await supabase
    .from('comments')
    .select('id')
    .eq('session_id', sessionId)
    .eq('opinion_id', opinionId)
    .limit(1);

  if (!roundComments || roundComments.length === 0) {
    return { success: false, error: 'You must share a reflection in this round before you can reply' };
  }

  const replyCount = await getReplyCountForRound(sessionId, opinionId);
  if (replyCount >= 3) {
    return { success: false, error: 'You have reached the limit of 3 replies for this round' };
  }

  const { data: comment } = await supabase
    .from('comments')
    .select('opinion_id')
    .eq('id', commentId)
    .single();

  if (!comment || comment.opinion_id !== opinionId) {
    return { success: false, error: 'Invalid comment for this opinion' };
  }

  const { error } = await supabase
    .from('replies')
    .insert({
      comment_id: commentId,
      content: content.trim(),
      session_id: sessionId,
      opinion_id: opinionId,
    });

  if (error) {
    console.error('Error submitting reply:', error);
    return { success: false, error: 'Failed to submit reply' };
  }

  return { success: true };
}
