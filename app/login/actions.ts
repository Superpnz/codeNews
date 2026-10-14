"use server";

import { getAdminId } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { FormState } from "@/lib/validation";
import { redirect } from "next/navigation";
import z from "zod";

const credentialSchema = z.object({
    email: z.string().trim().min(1),
    password: z.string().min(1),
});

export async function login(_previousState: FormState, formDate: FormData): Promise<FormState> {
    const parsed = credentialSchema.safeParse(Object.fromEntries(formDate));

    if (!parsed.success) {
        return { message: "Введите email и пароль." };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

    if (error || !data.user) {
        return { message: "Не удалось войти. Проверьте email и пароль." };
    }

    if (data.user.id !== getAdminId()) {
        await supabase.auth.signOut();
        return { message: "У этой учётной записи нет доступа к админ панели." };
    }

    redirect("/admin");
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}
