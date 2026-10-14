import z, { keyof, success } from "zod";
import { categories } from "./categories";

const postSchema = z.object({
    title: z
        .string({ error: "Введите название" })
        .trim()
        .min(1, "Введите название")
        .max(150, "Название должно быть не длинее 150 символов."),
    content: z
        .string({ error: "Введите содержание" })
        .trim()
        .min(1, "Введите содержание")
        .max(20_000, "Содержание должно быть не длинее 20 000 символов."),
    date: z.iso.date("Выберите корректную календарную дату."),
    cover_url: z
        .string({ error: "Введите ссылку на обложку." })
        .trim()
        .min(1, "Введите ссылку на обложку.")
        .max(2048, "Ссылка не должна быть длинее 2048 символов.")
        .pipe(
            z.url({
                protocol: /^https?$/,
                error: "Введите абсолютный HTTP(S) URL.",
            }),
        ),
    category: z.enum(categories, "Выберите категорию из списка."),
});

export type PostFields = z.infer<typeof postSchema>;

export type FormState = {
    message: string;
    errors?: Partial<Record<keyof PostFields, string>>;
};

export const initialFormState: FormState = { message: "" };

export function validatePost(formDate: FormData) {
    const parsed = postSchema.safeParse(Object.fromEntries(formDate));

    // Если всё успешно
    if (parsed.success) {
        return { success: true as const, data: parsed.data };
    }

    // Если есть ошибки
    const errors: FormState["errors"] = {};

    // Формируем объект с ошибками
    for (const [field, messages] of Object.entries(z.flattenError(parsed.error).fieldErrors)) {
        if (messages?.length) {
            errors[field as keyof PostFields] = messages[0];
        }
    }

    return {
        success: false as const,
        state: {message: "Исправьте поля.", errors}
    }
}
