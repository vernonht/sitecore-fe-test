'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusSquare, Camera, Settings } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-ig-border bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Camera className="h-6 w-6" strokeWidth={1.5} />
          <span className="hidden text-xl font-semibold tracking-tight sm:block">
            Mini instagram
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`rounded-lg p-2 transition-colors ${pathname === '/' ? 'text-black' : 'text-gray-400 hover:text-black'
              }`}
            title="Home"
          >
            <Home className="h-6 w-6" strokeWidth={pathname === '/' ? 2.5 : 1.5} />
          </Link>
          <Link
            href="/create"
            className={`rounded-lg p-2 transition-colors ${pathname === '/create' ? 'text-black' : 'text-gray-400 hover:text-black'
              }`}
            title="Create post"
          >
            <PlusSquare className="h-6 w-6" strokeWidth={pathname === '/create' ? 2.5 : 1.5} />
          </Link>
          <Link
            href="/settings"
            className={`rounded-lg p-2 transition-colors ${pathname === '/settings' ? 'text-black' : 'text-gray-400 hover:text-black'
              }`}
            title="Settings"
          >
            <Settings className="h-6 w-6" strokeWidth={pathname === '/settings' ? 2.5 : 1.5} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
