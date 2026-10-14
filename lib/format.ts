export function excerpt(content: string) {
    let compact = content.replace(/\s+/g, " ").trim();

    if (compact.length > 160) {
        compact = compact.slice(0, 160).trimEnd() + "...";
    }

    return compact;
}

function parseDateOnly(value: string) {
    const date = new Date(`${value}T00:00:00.000Z`);

    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
        throw new TypeError(`Некорректная дата: ${value}`);
    }

    return date;
}

export function formatDate(value: string, locale = "ru-RU"): string {
    const date = parseDateOnly(value);

    const formatter = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });

    const formattedDate: string = formatter.format(date);

    return formattedDate;
}

export function localToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
