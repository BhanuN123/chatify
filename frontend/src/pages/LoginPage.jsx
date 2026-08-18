import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import AuthField from "../components/auth/AuthField";
import { LoaderIcon, LockIcon, MailIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-ink-primary">Welcome back</h2>
        <p className="mt-1.5 text-[13.5px] text-ink-tertiary">Log in to continue your conversations.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          label="Email"
          icon={MailIcon}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <AuthField
          label="Password"
          icon={LockIcon}
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <button className="btn-primary mt-2 w-full" type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? <LoaderIcon className="size-4.5 animate-spin" /> : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-ink-tertiary">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-accent hover:text-accent-hover">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
export default LoginPage;
