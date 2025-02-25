export function calculateDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = endDate.toLowerCase() === "present" ? new Date() : new Date(endDate);
    const durationInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(durationInMonths / 12);
    const months = durationInMonths % 12;
    return `${years} years and ${months} months`;
}
