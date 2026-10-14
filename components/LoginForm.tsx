"use client"

import { login } from "@/app/login/actions";
import { initialFormState } from "@/lib/validation";
import { useActionState } from "react";

export function LoginForm() {
    const [state, action, pending] = useActionState(login, initialFormState);

    return (
        <form action={action} className="post-form" noValidate>
            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" autoComplete="username" required />
            </div>
            <div className="form-field">
                <label htmlFor="password">Пароль</label>
                <input type="password" name="password" id="password" autoComplete="current-password" required />
            </div>
            {state.message && (
                <p className="form-message" role="alert">
                    {state.message}
                </p>
            )}
            <button className="button" disabled={pending} type="submit">
                {pending ? "Входим..." : "Войти"}
            </button>
        </form>
    );
}
