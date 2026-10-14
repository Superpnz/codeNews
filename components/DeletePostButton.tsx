"use client"
import { deletePost } from "@/app/admin/actions";
import { initialFormState } from "@/lib/validation";
import { useActionState } from "react";

type DeletePostButtonProps = {
    id: string;
    title: string;
};

const DeletePostButton = ({ id, title }: DeletePostButtonProps) => {
    const action = deletePost.bind(null, id);
    const [state, formAction, pending] = useActionState(
        action,
        initialFormState
    );
    return (
        <form
            action={formAction}
            className="delete-form"
            onSubmit={(event) => {
                if (!window.confirm(`Удалить запись «${title}»?`)) {
                    event.preventDefault();
                }
            }}
        >
            <button className="button button--danger" type="submit" disabled={pending}>
                {pending ? "Удаляем..." : "Удалить"} <span className="sr-only">запись «{title}»</span>
            </button>
            {state.message && (
                <span className="delete-form__error" role="alert">
                    {state.message}
                </span>
            )}
        </form>
    );
};

export default DeletePostButton;
