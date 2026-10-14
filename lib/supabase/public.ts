import { createClient } from "@supabase/supabase-js";

export function getSupabasePublicClient() {
    // Получаем ключи
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    // Проверка
    if (!url || !publishableKey) {
        throw new Error("Добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY в .env.local.");
    }

    return createClient(url, publishableKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        }
    })
}
