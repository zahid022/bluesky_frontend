function timeAgo(timestamp: string): string {
    const now = new Date();
    const postTime = new Date(timestamp);

    const diffInSeconds = Math.floor((now.getTime() - postTime.getTime()) / 1000); 

    if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days}d`;
    }
}

export default timeAgo