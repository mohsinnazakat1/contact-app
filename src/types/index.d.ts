export { global };

declare global {
    interface Window {
        android: any; // 👈️ turn off type checking
        webkit: any; // 👈️ turn off type checking
    }
};

type pageDataProps = {
    id: Number | null,
    platform: String,
    price: String,
    bulletPoints: String[],
    subscriptionId: String,
    subtitle: String,
    title: String,
    interval: String,
    googleBasePlanId: String,
};
type device = {
    platform: String | null,
    subscriptionType: String | null,
}

type languages = {
    en: String,
    de: string,
    es: string,
}

export type {
    pageDataProps, device, languages,
};