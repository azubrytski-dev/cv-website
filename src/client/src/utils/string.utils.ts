const MONTHS: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

function parseDateValue(value: string): Date | null {
    const normalized = value.trim().toLowerCase();

    if (normalized === 'present') {
        return new Date();
    }

    const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
        const [, year, month, day] = isoMatch;
        return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    }

    const monthYearMatch = normalized.match(/^([a-z]+)\s+(\d{4})$/);
    if (monthYearMatch) {
        const [, monthName, year] = monthYearMatch;
        const monthIndex = MONTHS[monthName];

        if (monthIndex !== undefined) {
            return new Date(Date.UTC(Number(year), monthIndex, 1));
        }
    }

    const fallback = new Date(value);
    return Number.isNaN(fallback.getTime()) ? null : fallback;
}

export function calculateDuration(startDate: string, endDate: string): string {
    const start = parseDateValue(startDate);
    const end = parseDateValue(endDate);

    if (!start || !end) {
        return '';
    }

    const durationInMonths =
        (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
        (end.getUTCMonth() - start.getUTCMonth());
    const years = Math.floor(durationInMonths / 12);
    const months = durationInMonths % 12;

    const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

    return [yearStr, monthStr].filter(Boolean).join(' and ');
}
