import {
    acceptInvite,
    AuthError,
    getUser,
    handleAuthCallback,
    login,
    logout,
    MissingIdentityError,
    requestPasswordRecovery,
    signup,
    updateUser,
} from "@netlify/identity";

const dialog = document.querySelector("[data-auth-dialog]");

if (dialog) {
    const views = [...dialog.querySelectorAll("[data-auth-view]")];
    const message = dialog.querySelector("[data-auth-message]");
    const accountLabels = document.querySelectorAll("[data-auth-button-label]");
    let inviteToken = null;

    const setMessage = (text = "", type = "success") => {
        message.textContent = text;
        message.dataset.type = type;
        message.hidden = !text;
    };

    const showView = (name) => {
        views.forEach((view) => {
            view.hidden = view.dataset.authView !== name;
        });
        setMessage();
    };

    const openDialog = (view = "login") => {
        showView(view);
        if (!dialog.open) dialog.showModal();
    };

    const setLoading = (form, loading) => {
        const button = form.querySelector("[type='submit']");
        form.setAttribute("aria-busy", String(loading));
        button.disabled = loading;
        button.dataset.label ||= button.textContent;
        button.textContent = loading ? "Please wait…" : button.dataset.label;
    };

    const errorMessage = (error) => {
        if (error instanceof MissingIdentityError) return "Account services are temporarily unavailable.";
        if (!(error instanceof AuthError)) return "Something went wrong. Please try again.";
        if (error.status === 401) return "The email or password is incorrect.";
        if (error.status === 403) return "This account action is not currently allowed.";
        if (error.status === 404) return "We couldn’t find an account with that email.";
        if (error.status === 422) return "Please check your details and try again.";
        return error.message;
    };

    const updateAccount = (user) => {
        accountLabels.forEach((label) => {
            label.textContent = user ? "My account" : "Account";
        });
        if (!user) return;

        const name = user.userMetadata?.full_name || user.name || "Customer";
        dialog.querySelector("[data-auth-name]").textContent = name;
        dialog.querySelector("[data-auth-email]").textContent = user.email || "Email unavailable";
        dialog.querySelector("[data-auth-avatar]").textContent = name.trim().charAt(0).toUpperCase() || "A";
    };

    document.querySelectorAll("[data-auth-open]").forEach((button) => {
        button.addEventListener("click", async () => {
            const user = await getUser();
            updateAccount(user);
            openDialog(user ? "account" : "login");
        });
    });

    dialog.querySelector("[data-auth-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });

    dialog.querySelectorAll("[data-auth-switch]").forEach((button) => {
        button.addEventListener("click", () => showView(button.dataset.authSwitch));
    });

    dialog.querySelector("[data-auth-form='login']").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setLoading(form, true);
        setMessage();
        try {
            const user = await login(data.get("email"), data.get("password"));
            updateAccount(user);
            showView("account");
            setMessage("You’re signed in.");
            form.reset();
        } catch (error) {
            setMessage(errorMessage(error), "error");
        } finally {
            setLoading(form, false);
        }
    });

    dialog.querySelector("[data-auth-form='signup']").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setLoading(form, true);
        setMessage();
        try {
            const user = await signup(data.get("email"), data.get("password"), { full_name: data.get("name") });
            form.reset();
            if (user.confirmedAt) {
                updateAccount(user);
                showView("account");
                setMessage("Your account is ready and you’re signed in.");
            } else {
                showView("login");
                setMessage("Check your email to confirm your account.");
            }
        } catch (error) {
            setMessage(errorMessage(error), "error");
        } finally {
            setLoading(form, false);
        }
    });

    dialog.querySelector("[data-auth-form='recovery']").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setLoading(form, true);
        setMessage();
        try {
            await requestPasswordRecovery(data.get("email"));
            form.reset();
            setMessage("Check your email for a password reset link.");
        } catch (error) {
            setMessage(errorMessage(error), "error");
        } finally {
            setLoading(form, false);
        }
    });

    dialog.querySelector("[data-auth-form='new-password']").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const password = new FormData(form).get("password");
        setLoading(form, true);
        setMessage();
        try {
            const user = inviteToken ? await acceptInvite(inviteToken, password) : await updateUser({ password });
            inviteToken = null;
            updateAccount(user);
            showView("account");
            setMessage("Your password has been saved.");
            form.reset();
        } catch (error) {
            setMessage(errorMessage(error), "error");
        } finally {
            setLoading(form, false);
        }
    });

    dialog.querySelector("[data-auth-logout]").addEventListener("click", async () => {
        const button = dialog.querySelector("[data-auth-logout]");
        button.disabled = true;
        try {
            await logout();
            updateAccount(null);
            showView("login");
            setMessage("You’ve been signed out.");
        } catch (error) {
            setMessage(errorMessage(error), "error");
        } finally {
            button.disabled = false;
        }
    });

    const initializeAuth = async () => {
        try {
            const result = await handleAuthCallback();
            if (result) {
                if (result.type === "recovery") {
                    dialog.querySelector("[data-auth-password-title]").textContent = "Choose a new password";
                    openDialog("new-password");
                    return;
                }
                if (result.type === "invite") {
                    inviteToken = result.token;
                    dialog.querySelector("[data-auth-password-title]").textContent = "Finish setting up your account";
                    openDialog("new-password");
                    return;
                }
                if (result.user) {
                    updateAccount(result.user);
                    openDialog("account");
                    setMessage(result.type === "confirmation" ? "Email confirmed. Your account is ready." : "You’re signed in.");
                } else {
                    openDialog("login");
                }
                return;
            }
        } catch (error) {
            openDialog("login");
            setMessage(errorMessage(error), "error");
        }

        updateAccount(await getUser());
    };

    initializeAuth();
}
