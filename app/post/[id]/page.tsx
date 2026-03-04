import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Heart } from 'lucide-react';
import { getPost } from '@/lib/api';
import { CommentList } from '@/components/CommentList';
import { Avatar } from '@/components/ui/Avatar';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let post;
  try {
    post = await getPost(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-0 py-0 sm:px-4 sm:py-6">
      {/* Back link */}
      <Link
        href="/"
        className="mb-4 hidden items-center gap-1 text-sm text-ig-gray transition-colors hover:text-black sm:flex"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to feed
      </Link>

      <div className="flex flex-col bg-white sm:rounded-sm sm:border sm:border-ig-border lg:flex-row">
        {/* Image */}
        <div className="relative flex flex-shrink-0 items-center justify-center bg-black lg:w-3/5">
          <div className="relative aspect-square min-h-[320px] w-full lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <Image
              src={post.imageUrl}
              alt={post.caption || `Post by ${post.author}`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          {/* Mobile back button */}
          <Link
            href="/"
            className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur-sm lg:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Sidebar: author, caption, comments */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Author header */}
          <div className="flex items-center gap-3 border-b border-ig-border px-4 py-3">
            <Avatar authorName={post.author} />
            <span className="text-sm font-semibold">{post.author}</span>
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="border-b border-ig-border px-4 py-3">
              <p className="text-sm">
                <span className="mr-1 font-semibold">{post.author}</span>
                <span className="text-gray-800">{post.caption}</span>
              </p>
              <time className="mt-2 block text-[11px] text-ig-gray">
                {formatDate(post.createdAt)}
              </time>
            </div>
          )}

          {/* Comments — scrollable on large screens */}
          <div className="flex-1 overflow-y-auto">
            <CommentList postId={post.id} />
          </div>

          {/* Likes footer */}
          <div className="flex items-center gap-2 border-t border-ig-border px-4 py-3">
            <Heart className="h-5 w-5" />
            <span className="text-sm font-semibold">{post.likes.toLocaleString()} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
