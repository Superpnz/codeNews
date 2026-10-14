"use server";

import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { FormState, validatePost } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function refreshPostPage(id?: string) {
    revalidatePath("/");
    revalidatePath("/admin");
    if (id) revalidatePath(`/posts/${id}`);
}

export async function createPost(_previousState: FormState, formData: FormData) {
    await requireAdmin();

    // Валидация данных формы
    const validation = validatePost(formData);

    // Проверка валидации
    if (!validation.success) return validation.state;

    // Добавления поста в БД
    const supabase = await createClient();
    const { error } = await supabase.from("posts").insert(validation.data);

    if (error) {
        return {
            message: `Supabase не сохранил запись: ${error.message}`,
        };
    }

    refreshPostPage();
    redirect("/admin?status=created");
}

export async function updatePost(id: string, _previousState: FormState, formData: FormData) {
    await requireAdmin();

    // Валидация данных формы
    const validation = validatePost(formData);

    // Проверка валидации
    if (!validation.success) return validation.state;

    // Добавления поста в БД
    const supabase = await createClient();
    const { error, data } = await supabase.from("posts").update(validation.data).eq("id", id).select("id").maybeSingle();

    if (error) {
        return {
            message: `Supabase не изменил запись: ${error.message}`,
        };
    }

    if (!data) return { message: "Запись для редактирования не найдена." };

    refreshPostPage(id);
    redirect("/admin?status=updated");
}

export async function deletePost(id: string, _previousState: FormState): Promise<FormState> {
    await requireAdmin();

    const supabase = await createClient();
    const { error, data } = await supabase.from("posts").delete().eq("id", id).select("id").maybeSingle();

    if (error) {
        return {
            message: `Supabase не удалил запись: ${error.message}`
        };
    }

    if (!data) return { message: "Запись уже удалена или не найдена." };

    refreshPostPage(id);
    redirect("/admin?status=deleted");
}
