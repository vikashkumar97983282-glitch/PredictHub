import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import predictHubImage from "../assets/predicthub-img.png";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[#080f1d] text-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Blue Glow */}
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />

        {/* Purple Glow */}
        <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]" />

        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* =========================
            TOP CTA
        ========================== */}
        <div className="mb-7 overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10">
          <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-sm">
                  ✨
                </span>

                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Ready to explore AI predictions?
                </h3>
              </div>

              <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
                Explore powerful machine learning and deep learning models
                with PredictHub.
              </p>
            </div>

            <Link
              to="/prediction"
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition duration-200 hover:bg-blue-500 hover:shadow-blue-500/20"
            >
              Start Predicting

              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* =========================
            MAIN FOOTER
        ========================== */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* =========================
              BRAND
          ========================== */}
          <div>
            <Link to="/" className="inline-flex items-center gap-1">
              <span className="flex h-11 w-16 shrink-0 items-start justify-center overflow-hidden">
                <img
                  src={predictHubImage}
                  alt="PredictHub"
                  className="w-20 max-w-none object-contain"
                />
              </span>

              <span className="text-2xl font-bold leading-none tracking-tight text-indigo-400">
                PredictHub
              </span>
            </Link>

            {/* Status Badge */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-2.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                <span className="relative h-2 w-2 rounded-full bg-blue-400" />
              </span>

              <span className="text-[10px] font-medium tracking-wider text-blue-300">
                AI • ML • DEEP LEARNING
              </span>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              PredictHub is an AI and machine learning platform that helps
              users explore prediction models, understand data, and generate
              intelligent predictions.
            </p>

            {/* Technology Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-[10px] text-slate-400">
                Machine Learning
              </span>

              <span className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-[10px] text-slate-400">
                Deep Learning
              </span>

              <span className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-[10px] text-slate-400">
                AI
              </span>
            </div>
          </div>

          {/* =========================
              PLATFORM
          ========================== */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>

            <div className="mt-4 space-y-2.5">
              <Link
                to="/"
                className="group flex items-center gap-1 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-blue-400"
              >
                Home
                <span className="opacity-0 transition group-hover:opacity-100">
                  →
                </span>
              </Link>

              <Link
                to="/models"
                className="group flex items-center gap-1 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-blue-400"
              >
                Prediction Models
                <span className="opacity-0 transition group-hover:opacity-100">
                  →
                </span>
              </Link>

              <Link
                to="/prediction"
                className="group flex items-center gap-1 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-blue-400"
              >
                Prediction
                <span className="opacity-0 transition group-hover:opacity-100">
                  →
                </span>
              </Link>

              <Link
                to="/about"
                className="group flex items-center gap-1 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-blue-400"
              >
                About
                <span className="opacity-0 transition group-hover:opacity-100">
                  →
                </span>
              </Link>

              <Link
                to="/contact"
                className="group flex items-center gap-1 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-blue-400"
              >
                Contact
                <span className="opacity-0 transition group-hover:opacity-100">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* =========================
              TECHNOLOGIES
          ========================== */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Technologies
            </h3>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Machine Learning
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Deep Learning
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Artificial Intelligence
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Data Science
              </div>
            </div>
          </div>

          {/* =========================
              CONNECT
          ========================== */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Connect With Me
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Follow my development journey and check out my latest AI, ML and
              software projects.
            </p>

            {/* Social Buttons */}
            <div className="mt-4 flex gap-2.5">
              {/* GitHub */}
              <a
                href="https://github.com/vikashkumar97983282-glitch/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition duration-200 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
              >
                <FaGithub size={18} aria-hidden="true" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/vikash-kumar-sharma-85a34b288/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaLinkedinIn size={18} aria-hidden="true" />
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition duration-200 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
              >
                <FaTwitter size={18} aria-hidden="true" />
              </a>
            </div>

            {/* Online Status */}
            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>

              <span className="text-xs text-slate-500">
                PredictHub is online
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* =========================
            BOTTOM FOOTER
        ========================== */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PredictHub.
            <span className="ml-1">All rights reserved.</span>
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-5">
            <Link
              to="/privacy-policy"
              className="text-xs text-slate-500 transition hover:text-blue-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-slate-500 transition hover:text-blue-400"
            >
              Terms of Service
            </Link>
          </div>

          {/* Back To Top */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            aria-label="Back to top"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-sm text-slate-400 transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;