import z from "zod";

const adminIdSchema = z.uuid(`Не задан корректный UUID в SUPABASE_ADMIN_ID. Заполните .env.local по примеру .env.example.`);

export function getAdminId() {
    const adminId = process.env.SUPABASE_ADMIN_ID;
    
    return adminIdSchema.parse(adminId);
}
