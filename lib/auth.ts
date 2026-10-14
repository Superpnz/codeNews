import { redirect } from "next/navigation";
import { getAdminId } from "./supabase/config";
import { createClient } from "./supabase/server";

// Состояние авторизованного пользователя
export async function getAuthState() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;

    return {
        isSignedId: Boolean(userId),
        isAdmin: userId === getAdminId(),
        userId,
    };
}

// Проверка на админа
export async function requireAdmin() {
    const auth = await getAuthState();
    if (!auth.isAdmin) {
        redirect(auth.isSignedId ? "/login?reason=access-denied" : "/login");
    }

    return auth.userId as string;
}
