export function calculateDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = endDate.toLowerCase() === "present" ? new Date() : new Date(endDate);

    const durationInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(durationInMonths / 12);
    const months = durationInMonths % 12;

    const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

    return [yearStr, monthStr].filter(Boolean).join(' and ');
}
