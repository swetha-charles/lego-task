import React, {useRef} from 'react';
import styles from './LoginForm.module.css'

export default function LoginForm({submitLogin}) {
    const usernameEl = useRef(null);
    const passwordEl = useRef(null);

    function handleClick() {
        submitLogin({
            username: usernameEl.current.value,
            password: passwordEl.current.value,
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <label className={styles.loginLabel}>
                <input
                    ref={usernameEl}
                    type="text"
                    placeholder="Username"
                    className={styles.formInput}
                />
            </label>
            <label>
                <input
                    ref={passwordEl}
                    type="password"
                    placeholder="Password"
                    className={styles.formInput}
                />
            </label>
            <button
                type="button"
                onClick={() => handleClick()}
                className={styles.loginButton}
            >
                Login
            </button>
        </div>
    );
}
