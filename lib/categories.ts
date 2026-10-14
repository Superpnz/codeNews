export const categoryLabels = {
    development: "Разработка",
    design: "Дизайн",
    news: "Новости",
    career: "Карьера",
    security: "Безопасность",
} as const;

export type CategoryType = keyof typeof categoryLabels;

export const categories = Object.keys(categoryLabels) as CategoryType[];