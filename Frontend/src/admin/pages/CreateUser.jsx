import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
import { requestJson } from "../../lib/api";
import { LoaderCircle } from "lucide-react";

const CreateUser = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await requestJson("/admin/users", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          role: form.role.toLowerCase(),
        }),
      });
      navigate("/admin/users");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <div className="flex items-center gap-3">

        <Link
          to="/admin/users"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-white">
            Create User
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Create a new PredictHub account.
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-[#243047] bg-[#111827] p-5 shadow-xl shadow-black/20 sm:p-7"
      >

        <div className="mb-6 flex items-center gap-3 border-b border-[#243047] pb-5">

          <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
            <UserPlus size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              User Information
            </h2>

            <p className="text-xs text-slate-400">
              Enter the account details below.
            </p>
          </div>

        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Full Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="user@example.com"
              className="w-full rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create password"
              className="w-full rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#243047] bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#243047] pt-5 sm:flex-row sm:justify-end">

          {error && (
            <p className="self-center text-xs font-medium text-red-400 sm:mr-auto">
              {error}
            </p>
          )}

          <Link
            to="/admin/users"
            className="rounded-lg border border-[#243047] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Creating...
              </>
            ) : "Create User"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default CreateUser;