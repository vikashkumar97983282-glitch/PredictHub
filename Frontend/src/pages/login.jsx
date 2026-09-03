import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Brain,
} from "lucide-react";
import { requestJson, storeAuth } from "../lib/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ============================================
  // HANDLE LOGIN
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      // ==========================================
      // FASTAPI LOGIN API
      // ==========================================
      const data = await requestJson("/login/", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      storeAuth(data, rememberMe);

      // Redirect after successful login
      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(err.message || "Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">

      {/* ==========================================
          BACKGROUND DECORATION
      =========================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

      </div>

      {/* ==========================================
          LOGIN CONTAINER
      =========================================== */}
      <div className="relative w-full max-w-md">

        {/* ========================================
            LOGO
        ========================================= */}
        <div className="flex flex-col items-center mb-8">

          <div
            className="
              flex items-center justify-center
              h-14 w-14
              rounded-2xl
              bg-blue-600
              shadow-lg shadow-blue-600/30
              mb-4
            "
          >
            <Brain className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Predict<span className="text-blue-500">Hub</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to your account
          </p>

        </div>

        {/* ========================================
            LOGIN CARD
        ========================================= */}
        <div
          className="
            rounded-2xl
            border border-slate-800
            bg-slate-900/90
            p-6 sm:p-8
            shadow-2xl
            backdrop-blur
          "
        >

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ====================================
                ERROR MESSAGE
            ===================================== */}
            {error && (
              <div
                className="
                  rounded-lg
                  border border-red-500/30
                  bg-red-500/10
                  px-4 py-3
                  text-sm
                  text-red-400
                "
              >
                {error}
              </div>
            )}

            {/* ====================================
                EMAIL
            ===================================== */}
            <div>

              <label
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  className="
                    absolute
                    left-3
                    top-1/2
                    h-5 w-5
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border border-slate-700
                    bg-slate-950
                    py-3
                    pl-11
                    pr-4
                    text-white
                    placeholder-slate-500
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

              </div>

            </div>

            {/* ====================================
                PASSWORD
            ===================================== */}
            <div>

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="
                    text-sm
                    font-medium
                    text-slate-300
                  "
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="
                    text-sm
                    text-blue-500
                    hover:text-blue-400
                  "
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <Lock
                  className="
                    absolute
                    left-3
                    top-1/2
                    h-5 w-5
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border border-slate-700
                    bg-slate-950
                    py-3
                    pl-11
                    pr-12
                    text-white
                    placeholder-slate-500
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  disabled={loading}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    hover:text-slate-300
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>

            </div>

            {/* ====================================
                REMEMBER ME
            ===================================== */}
            <div className="flex items-center">

              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                "
              >

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  disabled={loading}
                  className="
                    h-4 w-4
                    rounded
                    border-slate-700
                    bg-slate-950
                    text-blue-600
                    focus:ring-blue-500
                  "
                />

                <span className="text-sm text-slate-400">
                  Remember me
                </span>

              </label>

            </div>

            {/* ====================================
                LOGIN BUTTON
            ===================================== */}
            <button
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-3
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition
                hover:bg-blue-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                <>
                  <span
                    className="
                      h-5 w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />

                  Sign In
                </>
              )}

            </button>

          </form>

          {/* ========================================
              DIVIDER
          ========================================= */}
          <div className="my-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-800" />

            <span className="text-xs text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-800" />

          </div>

          {/* ========================================
              REGISTER
          ========================================= */}
          <p className="text-center text-sm text-slate-400">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                font-semibold
                text-blue-500
                hover:text-blue-400
              "
            >
              Create account
            </Link>

          </p>

        </div>

        {/* ========================================
            FOOTER
        ========================================= */}
        <p className="mt-6 text-center text-xs text-slate-600">
          © 2026 PredictHub. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default Login;

