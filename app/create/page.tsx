import { CreatePostForm } from '@/components/CreatePostForm';

export default function CreatePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Create new post</h1>
      <CreatePostForm />
    </div>
  );
}
