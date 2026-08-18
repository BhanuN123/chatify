import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/auth/AuthLayout";
import AuthField from "../components/auth/AuthField";
import { LoaderIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-ink-primary">Create your account</h2>
        <p className="mt-1.5 text-[13.5px] text-ink-tertiary">Start messaging in under a minute.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          label="Full name"
          icon={UserIcon}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Jane Doe"
          autoComplete="name"
        />

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
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />

        <button className="btn-primary mt-2 w-full" type="submit" disabled={isSigningUp}>
          {isSigningUp ? <LoaderIcon className="size-4.5 animate-spin" /> : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-ink-tertiary">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-accent hover:text-accent-hover">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
export default SignUpPage;
