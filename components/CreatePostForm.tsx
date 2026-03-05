'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/lib/api';
import { ImagePlus, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react';

const MAX_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function CreatePostForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [author, setAuthor] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const { mutate, status, error, reset } = useMutation({
    mutationFn: (fd: FormData) => createPost(fd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  function validateAndSetFile(f: File) {
    setFileError(null);
    reset();

    if (!ACCEPTED_TYPES.includes(f.type)) {
      setFileError('Only JPG, PNG, and WebP images are allowed.');
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      const sizeMB = (f.size / (1024 * 1024)).toFixed(2);
      setFileError(
        `Image is too large (${sizeMB} MB). Maximum size is 1 MB. Please compress or resize the image.`,
      );
      return;
    }

    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) validateAndSetFile(f);
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSetFile(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearFile() {
    setFile(null);
    setPreview(null);
    setFileError(null);
    reset();
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    const fd = new FormData();
    fd.append('image', file);
    fd.append('caption', caption);
    fd.append('author', author);

    mutate(fd);
  }

  const isPending = status === 'pending';
  const isSuccess = status === 'success';

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" strokeWidth={1.5} />
        <h2 className="text-2xl font-semibold">Post shared!</h2>
        <p className="text-ig-gray">Your photo has been published.</p>
        <div className="mt-2 flex gap-3">
          <button
            onClick={() => {
              setPreview(null);
              setFile(null);
              setCaption('');
              setAuthor('');
              reset();
            }}
            className="rounded-lg border border-ig-border px-6 py-2 text-sm font-semibold transition-colors hover:bg-gray-50"
          >
            Share another
          </button>
          <button
            onClick={() => router.push('/')}
            className="rounded-lg bg-ig-blue px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-ig-blue-hover"
          >
            View feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image drop zone */}
      <div>
        <label className="mb-2 block text-sm font-semibold">Photo</label>
        {preview ? (
          <div className="relative overflow-hidden rounded-lg bg-gray-100">
            <div className="relative aspect-square max-h-[480px]">
              <Image src={preview} alt="Preview" fill className="object-contain" />
            </div>
            <button
              type="button"
              onClick={clearFile}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
            {file && (
              <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </div>
            )}
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed py-16 transition-colors ${
              isDragging
                ? 'border-ig-blue bg-blue-50'
                : 'border-ig-border hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <ImagePlus className="h-10 w-10 text-ig-gray" strokeWidth={1.5} />
            <div className="text-center">
              <p className="text-sm font-semibold">
                Drag & drop or <span className="text-ig-blue">choose a photo</span>
              </p>
              <p className="mt-1 text-xs text-ig-gray">JPG, PNG, WebP — max 1 MB</p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload image"
        />

        {fileError && (
          <div className="mt-2 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{fileError}</span>
          </div>
        )}
      </div>

      {/* Author */}
      <div>
        <label htmlFor="author" className="mb-2 block text-sm font-semibold">
          Your name <span className="text-ig-red">*</span>
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. Jane Doe"
          minLength={2}
          maxLength={40}
          required
          className="w-full rounded-lg border border-ig-border px-4 py-2.5 text-sm transition-colors focus:border-gray-400 focus:outline-none"
        />
        <p className="mt-1 text-xs text-ig-gray">{author.length}/40</p>
      </div>

      {/* Caption */}
      <div>
        <label htmlFor="caption" className="mb-2 block text-sm font-semibold">
          Caption
        </label>
        <textarea
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          maxLength={2200}
          rows={3}
          className="w-full resize-none rounded-lg border border-ig-border px-4 py-2.5 text-sm transition-colors focus:border-gray-400 focus:outline-none"
        />
        <p className="mt-1 text-xs text-ig-gray">{caption.length}/2,200</p>
      </div>

      {/* API error */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{(error as Error).message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!file || !author.trim() || isPending || !!fileError}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-ig-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-ig-blue-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sharing…
          </>
        ) : (
          'Share'
        )}
      </button>
    </form>
  );
}
