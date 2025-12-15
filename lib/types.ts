export interface Opinion {
  id: string;
  content: string;
  created_at: string;
  published_at: string;
  is_active: boolean;
}

export interface Comment {
  id: string;
  opinion_id: string;
  content: string;
  created_at: string;
  session_id: string;
  likes_count?: number;
  user_liked?: boolean;
  replies?: Reply[];
  replies_count?: number;
}

export interface Reply {
  id: string;
  comment_id: string;
  content: string;
  created_at: string;
  session_id: string;
}

export interface Like {
  id: string;
  comment_id: string;
  session_id: string;
  created_at: string;
}
