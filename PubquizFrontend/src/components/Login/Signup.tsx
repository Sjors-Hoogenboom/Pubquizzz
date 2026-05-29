import SignupForm from "@/components/Login/SignupForm";

import css from "./Login.module.scss";

export default function SignupPage() {
    return (
        <div className={css.page}>
            <div className={css.container}>
                <SignupForm />
            </div>
        </div>
    );
}