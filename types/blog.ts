import { CategoryType } from "@/lib/categories";

export type Post = {
    id: string;
    title: string;
    content: string;
    date: string;
    cover_url: string;
    category: CategoryType;
}