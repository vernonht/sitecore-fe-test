import type { Post, PaginatedPosts, CommentsResponse } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const authHeaders = {
  'x-api-key': API_KEY,
};

export async function getPosts(cursor?: string, limit = 9): Promise<PaginatedPosts> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set('cursor', cursor);
  const res = await fetch(`${API_BASE}/posts?${params}`, {
    headers: authHeaders,
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    headers: authHeaders,
  });
  if (res.status === 404) throw new Error('Post not found');
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export async function getComments(postId: string): Promise<CommentsResponse> {
  const res = await fetch(`${API_BASE}/comments/${postId}`, {
    headers: authHeaders,
  });
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export async function createPost(formData: FormData): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: authHeaders,
    body: formData,
  });

  if (res.status === 413) {
    throw new Error('Image is too large. Maximum size is 1 MB.');
  }
  if (res.status === 415) {
    throw new Error('Unsupported image format. Please use JPG, PNG, or WebP.');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { message?: string }).message || 'Failed to create post');
  }
  return res.json();
}
