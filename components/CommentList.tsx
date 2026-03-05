'use client';

import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/lib/api';
import { Loader2, MessageCircle } from 'lucide-react';
import { timeAgo } from '@/lib/helpers';
import { Avatar } from './ui/Avatar';

export function CommentList({ postId }: { postId: string }) {
  const { data, status } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  });

  if (status === 'pending') {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-5 w-5 animate-spin text-ig-gray" />
      </div>
    );
  }

  if (status === 'error') {
    return <p className="py-4 text-center text-sm text-ig-gray">Failed to load comments.</p>;
  }

  if (data.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-ig-gray">
        <MessageCircle className="h-10 w-10 stroke-1" />
        <p className="text-lg font-semibold text-black">No comments yet.</p>
        <p className="text-sm">Start the conversation.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-ig-border">
      {data.items.map((comment) => (
        <li key={comment.id} className="flex gap-3 px-4 py-3">
          <Avatar authorName={comment.author} />
          <div className="min-w-0 flex-1">
            <p className="text-sm">
              <span className="mr-1 font-semibold">{comment.author}</span>
              <span className="break-words text-gray-800">{comment.text}</span>
            </p>
            <time className="mt-0.5 block text-[11px] text-ig-gray">
              {timeAgo(comment.createdAt)}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}
