import React, { useState } from "react";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ============================================================
  // Handle input
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  // ============================================================
  // Submit form
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // ----------------------------------------------------------
    // Validation
    // ----------------------------------------------------------

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setErrorMessage(
        "Password and confirm password do not match."
      );
      return;
    }

    // ----------------------------------------------------------
    // API request
    // ----------------------------------------------------------

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/create_user`,
        formData
      );

      setSuccessMessage(
        response.data.message || "User created successfully."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error("Create user error:", error);

      if (error.response?.data?.detail) {
        setErrorMessage(error.response.data.detail);
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "Unable to create user. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* ======================================================
          Header
      ======================================================= */}

      <div className="mx-auto max-w-4xl">

        <div className="mb-6 flex items-center gap-3">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-lg border border-gray-200
              bg-white text-gray-600
              transition hover:bg-gray-100
            "
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create User
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new user account for PredictHub.
            </p>
          </div>

        </div>

        {/* ====================================================
            Card
        ===================================================== */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* --------------------------------------------------
              Card Header
          --------------------------------------------------- */}

          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="
                flex h-11 w-11 items-center justify-center
                rounded-xl bg-blue-50 text-blue-600
              ">
                <UserPlus size={22} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  User Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter the details of the new user.
                </p>
              </div>

            </div>
          </div>

          {/* ==================================================
              Form
          =================================================== */}

          <form
            onSubmit={handleSubmit}
            className="p-6"
          >

            {/* ------------------------------------------------
                Success Message
            ------------------------------------------------- */}

            {successMessage && (
              <div className="
                mb-6 flex items-start gap-3
                rounded-xl border border-green-200
                bg-green-50 p-4 text-green-700
              ">
                <CheckCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-medium">
                    Success
                  </p>

                  <p className="mt-1 text-sm">
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            {/* ------------------------------------------------
                Error Message
            ------------------------------------------------- */}

            {errorMessage && (
              <div className="
                mb-6 flex items-start gap-3
                rounded-xl border border-red-200
                bg-red-50 p-4 text-red-700
              ">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-medium">
                    Error
                  </p>

                  <p className="mt-1 text-sm">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            {/* ------------------------------------------------
                Name + Email
            ------------------------------------------------- */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    autoComplete="name"
                    className="
                      h-11 w-full rounded-lg
                      border border-gray-300
                      bg-white pl-10 pr-4
                      text-sm text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                </div>
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    autoComplete="email"
                    className="
                      h-11 w-full rounded-lg
                      border border-gray-300
                      bg-white pl-10 pr-4
                      text-sm text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                </div>
              </div>

            </div>

            {/* ------------------------------------------------
                Password + Confirm Password
            ------------------------------------------------- */}

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Password */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    autoComplete="new-password"
                    className="
                      h-11 w-full rounded-lg
                      border border-gray-300
                      bg-white
                      pl-10 pr-11
                      text-sm text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2
                      text-gray-400
                      transition
                      hover:text-gray-600
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Minimum 8 characters.
                </p>
              </div>

              {/* Confirm Password */}

              <div>
                <label
                  htmlFor="confirm_password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      formData.confirm_password
                    }
                    onChange={handleChange}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    className="
                      h-11 w-full rounded-lg
                      border border-gray-300
                      bg-white
                      pl-10 pr-11
                      text-sm text-gray-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2
                      text-gray-400
                      transition
                      hover:text-gray-600
                    "
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

            </div>

            {/* ------------------------------------------------
                Role
            ------------------------------------------------- */}

            <div className="mt-5">

              <label
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Account Role
              </label>

              <div className="
                flex h-11 items-center
                rounded-lg border border-gray-200
                bg-gray-50 px-4
              ">

                <span className="
                  rounded-full bg-blue-100
                  px-3 py-1 text-xs font-semibold
                  text-blue-700
                ">
                  USER
                </span>

                <span className="ml-3 text-sm text-gray-500">
                  Normal PredictHub user
                </span>

              </div>

            </div>

            {/* =================================================
                Buttons
            ================================================== */}

            <div className="
              mt-8 flex flex-col-reverse
              gap-3 border-t border-gray-200
              pt-6 sm:flex-row sm:justify-end
            ">

              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="
                  h-11 rounded-lg
                  border border-gray-300
                  bg-white px-5
                  text-sm font-medium
                  text-gray-700
                  transition
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  flex h-11 items-center
                  justify-center gap-2
                  rounded-lg
                  bg-blue-600 px-6
                  text-sm font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />

                    Create User
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateUser;