import css from "./Error.module.scss";

type ErrorProps = {
    title: string;
    message: string;
    onConfirm?: () => void;
};

export default function Error({ title, message, onConfirm }: ErrorProps) {
    return (
        <div className={css.error}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.message}>{message}</p>
            {onConfirm && (
                <div className={css.actions}>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={css.button}
                    >
                        Okay
                    </button>
                </div>
            )}
        </div>
    );
}