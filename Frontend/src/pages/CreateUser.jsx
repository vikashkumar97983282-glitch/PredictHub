import { useState } from "react";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  CalendarDays,
  MapPin,
  Globe2,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { requestJson, storeAuth } from "../lib/api";
import Commet from "react-loading-indicators/Commet";
import predictHubImage from "../assets/predicthub-img.png";

function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    nationality: "",
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
      !formData.age ||
      !formData.address ||
      !formData.nationality ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (Number(formData.age) < 13 || Number(formData.age) > 120) {
      setErrorMessage("Age must be between 13 and 120.");
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

      const data = await requestJson("/user/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      storeAuth(data);
      setSuccessMessage(data.message || "Registration successful.");
      navigate("/");
    } catch (error) {
      console.error("Create user error:", error);

      setErrorMessage(error.message || "Unable to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6">

      {/* ======================================================
          Header
      ======================================================= */}

      <div className="mx-auto w-full max-w-3xl">

        <div className="mb-3 flex justify-center">
          <img
            src={predictHubImage}
            alt="PredictHub"
            className="h-24 w-auto object-contain sm:h-28"
          />
        </div>

        

        {/* ====================================================
            Card
        ===================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/20 backdrop-blur">

          {/* --------------------------------------------------
              Card Header
          --------------------------------------------------- */}

          <div className="border-b border-slate-800 px-6 py-5">
            <div className="flex flex-col items-center gap-3 text-center">

              <div className="
                flex h-11 w-11 items-center justify-center
                rounded-xl bg-blue-500/10 text-blue-400
              ">
                <UserPlus size={22} />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  Register User
                </h2>

                <p className="text-sm text-slate-400">
                  Create a new user account for PredictHub.
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
                rounded-xl border border-green-500/30
                bg-green-500/10 p-4 text-green-300
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
                rounded-xl border border-red-500/30
                bg-red-500/10 p-4 text-red-300
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
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-slate-500
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
                      border border-slate-700
                      bg-slate-950 pl-10 pr-4
                      text-sm text-white
                      outline-none
                      transition
                      placeholder:text-slate-500
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                    "
                  />

                </div>
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-slate-500
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
                      border border-slate-700
                      bg-slate-950 pl-10 pr-4
                      text-sm text-white
                      outline-none
                      transition
                      placeholder:text-slate-500
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                    "
                  />

                </div>
              </div>

            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label htmlFor="age" className="mb-2 block text-sm font-medium text-slate-300">
                  Age
                </label>

                <div className="relative">
                  <CalendarDays size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="13"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="nationality" className="mb-2 block text-sm font-medium text-slate-300">
                  Nationality
                </label>

                <div className="relative">
                  <Globe2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    id="nationality"
                    name="nationality"
                    type="text"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Enter your nationality"
                    autoComplete="country-name"
                    className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

            </div>

            <div className="mt-5">
              <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-300">
                Address
              </label>

              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-3 text-slate-500" />
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  autoComplete="street-address"
                  rows="3"
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
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
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-slate-500
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
                      border border-slate-700
                      bg-slate-950
                      pl-10 pr-11
                      text-sm text-white
                      outline-none
                      transition
                      placeholder:text-slate-500
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
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
                      text-slate-500
                      transition
                      hover:text-slate-300
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Minimum 8 characters.
                </p>
              </div>

              {/* Confirm Password */}

              <div>
                <label
                  htmlFor="confirm_password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="
                      absolute left-3 top-1/2
                      -translate-y-1/2
                      text-slate-500
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
                      border border-slate-700
                      bg-slate-950
                      pl-10 pr-11
                      text-sm text-white
                      outline-none
                      transition
                      placeholder:text-slate-500
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
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
                      text-slate-500
                      transition
                      hover:text-slate-300
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
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Account Role
              </label>

              <div className="
                flex h-11 items-center
                rounded-lg border border-slate-700
                bg-slate-950 px-4
              ">

                <span className="
                  rounded-full bg-blue-500/10
                  px-3 py-1 text-xs font-semibold
                  text-blue-300
                ">
                  USER
                </span>

                <span className="ml-3 text-sm text-slate-400">
                  Normal PredictHub user
                </span>

              </div>

            </div>

            {/* =================================================
                Buttons
            ================================================== */}

            <div className="
              mt-8 flex flex-col-reverse
              gap-3 border-t border-slate-800
              pt-6 sm:flex-row sm:justify-between
            ">

              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="
                  flex h-11 items-center gap-2 rounded-lg
                  border border-slate-700
                  bg-slate-900 px-5
                  text-sm font-medium
                  text-slate-300
                  transition
                  hover:bg-slate-800
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <ArrowLeft size={18} />
                Back
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
                  <span className="flex h-7 w-28 items-center justify-center overflow-hidden">
                    <Commet
                      color="#32cd32"
                      size="small"
                      text="Loading"
                      textColor="#dbeafe"
                      style={{ fontSize: "6px" }}
                    />
                  </span>
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