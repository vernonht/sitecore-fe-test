import { getBackgroundColor, getInitials } from "@/lib/helpers";

export function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full`} style={{ backgroundColor: getBackgroundColor(authorName) }}>
      <span className="text-xs font-bold text-white">{getInitials(authorName)}</span>
    </div>
  );
}
