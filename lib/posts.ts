import { Post } from "@/types/blog";
import { getSupabasePublicClient } from "./supabase/public";

export async function getPosts(): Promise<Post[]> {
    const supabase = getSupabasePublicClient();
    const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, cover_url, date, category")
        .order("date", { ascending: false })
        .returns<Post[]>();

    if (error) {
        throw new Error(`Не удалось загрузить посты: ${error.message}`);
    }

    return data;
}

export async function getPostById(id: string): Promise<Post | null> {
    const supabase = getSupabasePublicClient();
    const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, cover_url, date, category")
        .eq("id", id)
        .maybeSingle<Post>();

    if (error) {
        throw new Error(`Не удалось загрузить пост: ${error.message}`);
    }

    return data;
}
