import moment from "moment";

export function formatCreatedAt(createdAt: number) {
    const now = moment();
    const createdMoment = moment(createdAt);
    const diffSeconds = now.diff(createdMoment, 'seconds');

    if (diffSeconds < 60) {
        return `created ${diffSeconds} sec ago`;
    } else if (diffSeconds < 3600) {
        const diffMinutes = Math.floor(diffSeconds / 60);
        return `created ${diffMinutes} min ago`;
    } else if (diffSeconds < 86400) {
        const diffHours = Math.floor(diffSeconds / 3600);
        return `created ${diffHours} hour ago`;
    } else if (diffSeconds < 604800) {
        const diffDays = Math.floor(diffSeconds / 86400);
        return `created ${diffDays} day ago`;
    } else if (diffSeconds < 2592000) { // 30 days
        const diffWeeks = Math.floor(diffSeconds / 604800);
        return `created ${diffWeeks} week ago`;
    } else if (diffSeconds < 31536000) { // 365 days
        const diffMonths = Math.floor(diffSeconds / 2592000);
        return `created ${diffMonths} month ago`;
    } else {
        const diffYears = Math.floor(diffSeconds / 31536000);
        return `created ${diffYears} year ago`;
    }
}