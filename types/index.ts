export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  author: string;
  likes: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface PaginatedPosts {
  items: Post[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface CommentsResponse {
  postId: string;
  items: Comment[];
}
