export function timeAgo(dateStr: string) {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    if (weeks < 52) return `${weeks}w`;
    return `${Math.floor(weeks / 52)}y`;
}

export const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
};

export const getBackgroundColor = (name: string) => {
    const charCode = name.toUpperCase().charCodeAt(0) - 65;
    const index = Math.abs(charCode) % 26;
    const colors = [
        "#ef4444",
        "#f97316",
        "#f59e0b",
        "#eab308",
        "#84cc16",
        "#22c55e",
        "#10b981",
        "#14b8a6",
        "#06b6d4",
        "#0ea5e9",
        "#3b82f6",
        "#6366f1",
        "#a855f7",
        "#ec4899",
        "#f43f5e",
        "#d946ef",
        "#8b5cf6",
        "#a855f7",
        "#ec4899",
        "#f43f5e",
        "#d946ef",
        "#8b5cf6",
        "#a855f7",
        "#ec4899",
        "#f43f5e",
        "#d946ef"
    ];
    return colors[index];
};

export const toPlurals = (count: number, unit: string) => {
    return count === 1 ? unit : `${unit}s`;
}