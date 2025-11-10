import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(num: number, locale: string = "en") {
    try {
        return num.toLocaleString(locale === "th" ? "th-TH" : "en-US");
    } catch (error) {
        // Fallback to basic number formatting
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export function formatPrice(
    price: number,
    type: "sale" | "rent",
    locale: string = "en",
) {
    const formatted = formatNumber(price, locale);
    const thb = locale === "th" ? "บาท" : "THB";
    const suffix =
        type === "rent" ? (locale === "th" ? "/เดือน" : "/month") : "";
    return `${formatted} ${thb}${suffix}`;
}

export function formatDate(dateString: string, locale: string = "en") {
    const date = new Date(dateString);
    try {
        return new Intl.DateTimeFormat(
            locale === "th" ? "th-TH" : "en-US",
        ).format(date);
    } catch (error) {
        // Fallback to basic date formatting if Intl.DateFormat is not available
        const options = {
            year: "numeric" as const,
            month: "short" as const,
            day: "numeric" as const,
        };
        return date.toLocaleDateString(
            locale === "th" ? "th-TH" : "en-US",
            options,
        );
    }
}
