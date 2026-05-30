import LoginForm from "@/components/Login/LoginForm";

import css from "./Login.module.scss";

export default function LoginPage() {
    return (
        <div className={css.page}>
            <div className={css.container}>
                <LoginForm />
            </div>
        </div>
    );
}
