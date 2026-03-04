'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/api';
import { PostCard } from './PostCard';
import { Loader2 } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

export function PostFeed() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const postPerRow = useUserStore((state) => state.postPerRow);

  const gridColsClass = () => {
    switch (postPerRow) {
      case 3:
        return 'lg:grid-cols-3';
      case 4:
        return 'lg:grid-cols-4';
      case 5:
        return 'lg:grid-cols-5';
      case 6:
        return 'lg:grid-cols-6';
      default:
        return 'lg:grid-cols-3';
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    maxPages: 10, 
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getPosts(pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (status === 'pending') {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-ig-gray" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="py-20 text-center text-ig-gray">
        <p className="text-lg font-semibold">Failed to load posts</p>
        <p className="mt-1 text-sm">Please try again later.</p>
      </div>
    );
  }

  const allPosts = data.pages.flatMap((p) => p.items);

  if (allPosts.length === 0) {
    return (
      <div className="py-20 text-center text-ig-gray">
        <p className="text-lg font-semibold">No posts yet</p>
        <p className="mt-1 text-sm">Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Feed: single column on mobile, 3-col grid on md+ */}
      <div className={`grid grid-cols-1 gap-px bg-ig-border sm:grid-cols-2 sm:gap-6 sm:bg-transparent ${gridColsClass()}`}>
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {isFetchingNextPage ? (
          <Loader2 className="h-6 w-6 animate-spin text-ig-gray" />
        ) : hasNextPage ? (
          <span className="text-xs text-ig-gray">Scroll to load more</span>
        ) : (
          allPosts.length > 0 && (
            <span className="text-xs text-ig-gray">You&apos;re all caught up</span>
          )
        )}
      </div>
    </div>
  );
}
