'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Post } from '@/types';
import { Avatar } from './ui/Avatar';
import { useState } from 'react';
import { toPlurals } from '@/lib/helpers';
import { useUserStore } from '@/store/useUserStore';

export function PostCard({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const getDateWithFormat = useUserStore((state) => state.getDateWithFormat);

  const calculateLikes = () => {
    return post.likes + (isLiked ? 1 : 0);
  };

  return (
    <article className="rounded-lg border border-ig-border bg-white transition duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar authorName={post.author} />
        <span className="text-sm font-semibold">{post.author}</span>
      </div>

      {/* Image */}
      <Link href={`/post/${post.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={post.imageUrl}
            alt={post.caption || `Post by ${post.author}`}
            fill
            className="object-cover transition-opacity hover:opacity-95"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Actions + info */}
      <div className="space-y-1 px-4 py-3">
        <div className="flex items-center gap-1 text-ig-gray">
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-ig-red stroke-ig-red' : ''} `} onClick={handleLike} />
          <span className="text-sm font-semibold text-black">
            {calculateLikes()} {toPlurals(calculateLikes(), 'like')}
          </span>
        </div>

        {post.caption && (
          <p className="text-sm leading-snug">
            <span className="mr-1 font-semibold">{post.author}</span>
            <span className="text-gray-800">{post.caption}</span>
          </p>
        )}

        <Link
          href={`/post/${post.id}`}
          className="block text-xs text-ig-gray transition-colors hover:text-gray-600 py-4"
        >
          View comments
        </Link>

        <time className="block text-[10px] uppercase tracking-wide text-ig-gray">
          {getDateWithFormat(post.createdAt)}
        </time>
      </div>
    </article>
  );
}
