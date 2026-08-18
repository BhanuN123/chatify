import AuthBrandPanel from "./AuthBrandPanel";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-bg-canvas">
      <AuthBrandPanel />

      <div className="flex w-full flex-1 items-center justify-center px-6 py-10 md:w-1/2">
        <div className="w-full max-w-sm animate-riseIn">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
