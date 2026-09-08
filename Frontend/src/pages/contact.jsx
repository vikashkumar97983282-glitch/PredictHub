
import { useState } from "react";

import {
  Mail,
  MessageSquare,
  Bug,
  Lightbulb,
  Handshake,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";

import { useSidebar } from "../contexts/use-sidebar";

function Contact() {
  // ============================================================
  // SIDEBAR
  // ============================================================

  const {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();

  // ============================================================
  // FORM STATE
  // ============================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  // ============================================================
  // HANDLE SUBMIT
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all fields.",
      });

      return;
    }

    try {
      setLoading(true);

      /*
        ----------------------------------------------------------
        FASTAPI INTEGRATION
        ----------------------------------------------------------

        When your backend endpoint is ready, replace the temporary
        code below with something like:

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/contact`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to send message"
          );
        }
      */

      // Temporary success simulation
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      setStatus({
        type: "success",
        message:
          "Your message has been sent successfully. Thank you for contacting PredictHub!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="flex min-h-screen bg-[#0d1422] text-white">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
        onToggleSidebar={toggleSidebar}
      />

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* ====================================================
            NAVBAR
        ==================================================== */}

        <Navbar
          onMenuClick={toggleMobileMenu}
        />

        {/* ====================================================
            MOBILE OVERLAY
        ==================================================== */}

        {isMobileMenuOpen && (
          <div
            onClick={closeMobileMenu}
            className="
              fixed
              inset-0
              z-40
              bg-black/60
              lg:hidden
            "
          />
        )}

        {/* ====================================================
            MAIN
        ==================================================== */}

        <main className="flex-1 overflow-x-hidden bg-[#0f1726]">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

              {/* ==================================================
                  HEADER
              ================================================== */}

              <section className="mb-8">
                <div className="flex flex-col gap-4">

                  {/* Label */}

                  <div className="flex items-center gap-2">
                    <Mail
                      size={18}
                      className="text-blue-400"
                    />

                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Contact
                    </span>
                  </div>

                  {/* Title */}

                  <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                    Get in Touch with{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      PredictHub
                    </span>
                  </h1>

                  {/* Description */}

                  <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                    Have a question, feedback, feature idea, or found
                    an issue? Send us a message and help us make
                    PredictHub better.
                  </p>
                </div>
              </section>

              {/* ==================================================
                  MAIN GRID
              ================================================== */}

              <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">

                {/* ==================================================
                    CONTACT FORM
                ================================================== */}

                <div className="rounded-2xl border border-slate-800 bg-[#111b2b] shadow-xl shadow-black/10">

                  {/* Form Header */}

                  <div className="border-b border-slate-800 px-5 py-5 sm:px-7">
                    <div className="flex items-center gap-3">

                      <div className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-blue-500/20
                        bg-blue-500/10
                        text-blue-400
                      ">
                        <MessageSquare size={19} />
                      </div>

                      <div>
                        <h2 className="text-base font-semibold text-slate-100">
                          Send a Message
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          Fill out the form and we'll get back to you.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Form Body */}

                  <div className="p-5 sm:p-7">

                    {/* Status */}

                    {status.message && (
                      <div
                        className={`
                          mb-5
                          flex
                          items-start
                          gap-3
                          rounded-xl
                          border
                          px-4
                          py-3
                          text-sm

                          ${
                            status.type === "success"
                              ? "border-green-500/20 bg-green-500/5 text-green-400"
                              : "border-red-500/20 bg-red-500/5 text-red-400"
                          }
                        `}
                      >
                        {status.type === "success" ? (
                          <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0"
                          />
                        ) : (
                          <AlertCircle
                            size={18}
                            className="mt-0.5 shrink-0"
                          />
                        )}

                        <span>
                          {status.message}
                        </span>
                      </div>
                    )}

                    {/* Form */}

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >

                      {/* Name + Email */}

                      <div className="grid gap-5 sm:grid-cols-2">

                        {/* Name */}

                        <div>
                          <label
                            htmlFor="name"
                            className="mb-2 block text-xs font-medium text-slate-300"
                          >
                            Name
                          </label>

                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoComplete="name"
                            className="
                              w-full
                              rounded-xl
                              border
                              border-slate-800
                              bg-[#0d1422]
                              px-4
                              py-3
                              text-sm
                              text-white
                              outline-none
                              transition
                              placeholder:text-slate-600
                              focus:border-blue-500/50
                              focus:ring-2
                              focus:ring-blue-500/10
                            "
                          />
                        </div>

                        {/* Email */}

                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-medium text-slate-300"
                          >
                            Email
                          </label>

                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="
                              w-full
                              rounded-xl
                              border
                              border-slate-800
                              bg-[#0d1422]
                              px-4
                              py-3
                              text-sm
                              text-white
                              outline-none
                              transition
                              placeholder:text-slate-600
                              focus:border-blue-500/50
                              focus:ring-2
                              focus:ring-blue-500/10
                            "
                          />
                        </div>

                      </div>

                      {/* Subject */}

                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block text-xs font-medium text-slate-300"
                        >
                          Subject
                        </label>

                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="
                            w-full
                            rounded-xl
                            border
                            border-slate-800
                            bg-[#0d1422]
                            px-4
                            py-3
                            text-sm
                            text-white
                            outline-none
                            transition
                            focus:border-blue-500/50
                            focus:ring-2
                            focus:ring-blue-500/10
                          "
                        >
                          <option
                            value=""
                            className="bg-[#0d1422]"
                          >
                            Select a subject
                          </option>

                          <option
                            value="General Question"
                            className="bg-[#0d1422]"
                          >
                            General Question
                          </option>

                          <option
                            value="Prediction Model Issue"
                            className="bg-[#0d1422]"
                          >
                            Prediction Model Issue
                          </option>

                          <option
                            value="Technical Problem"
                            className="bg-[#0d1422]"
                          >
                            Technical Problem
                          </option>

                          <option
                            value="Bug Report"
                            className="bg-[#0d1422]"
                          >
                            Bug Report
                          </option>

                          <option
                            value="Feature Request"
                            className="bg-[#0d1422]"
                          >
                            Feature Request
                          </option>

                          <option
                            value="Feedback"
                            className="bg-[#0d1422]"
                          >
                            Feedback
                          </option>

                          <option
                            value="Collaboration"
                            className="bg-[#0d1422]"
                          >
                            Collaboration
                          </option>

                          <option
                            value="Other"
                            className="bg-[#0d1422]"
                          >
                            Other
                          </option>
                        </select>
                      </div>

                      {/* Message */}

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-xs font-medium text-slate-300"
                        >
                          Message
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          rows={7}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help..."
                          className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-slate-800
                            bg-[#0d1422]
                            px-4
                            py-3
                            text-sm
                            leading-6
                            text-white
                            outline-none
                            transition
                            placeholder:text-slate-600
                            focus:border-blue-500/50
                            focus:ring-2
                            focus:ring-blue-500/10
                          "
                        />
                      </div>

                      {/* Submit */}

                      <button
                        type="submit"
                        disabled={loading}
                        className="
                          group
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-blue-600
                          px-5
                          py-3
                          text-sm
                          font-semibold
                          text-white
                          shadow-lg
                          shadow-blue-600/10
                          transition
                          hover:bg-blue-500
                          hover:shadow-blue-500/20
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                        "
                      >
                        {loading ? (
                          <>
                            <span
                              className="
                                h-4
                                w-4
                                animate-spin
                                rounded-full
                                border-2
                                border-white/30
                                border-t-white
                              "
                            />

                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={17} />

                            Send Message

                            <ArrowRight
                              size={16}
                              className="
                                transition-transform
                                duration-200
                                group-hover:translate-x-1
                              "
                            />
                          </>
                        )}
                      </button>

                    </form>
                  </div>
                </div>

                {/* ==================================================
                    RIGHT SIDE
                ================================================== */}

                <div className="space-y-5">

                  {/* Let's Connect */}

                  <div className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-6
                  ">
                    <div className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-indigo-500/20
                      bg-indigo-500/10
                      text-indigo-400
                    ">
                      <Mail size={19} />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-slate-100">
                      Let's Connect
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Whether you have a question about a prediction
                      model, found a problem, or have an idea for
                      PredictHub, feel free to reach out.
                    </p>
                  </div>

                  {/* General Support */}

                  <div className="
                    group
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-5
                    transition
                    hover:border-blue-500/30
                  ">
                    <div className="flex items-start gap-4">

                      <div className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-blue-500/20
                        bg-blue-500/10
                        text-blue-400
                      ">
                        <MessageSquare size={18} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">
                          General Support
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Questions about PredictHub, models,
                          or predictions? Send us a message.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Bug Report */}

                  <div className="
                    group
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-5
                    transition
                    hover:border-red-500/30
                  ">
                    <div className="flex items-start gap-4">

                      <div className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        text-red-400
                      ">
                        <Bug size={18} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">
                          Report an Issue
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Found a bug or prediction problem?
                          Let us know so we can improve the platform.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Feature Request */}

                  <div className="
                    group
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-5
                    transition
                    hover:border-yellow-500/30
                  ">
                    <div className="flex items-start gap-4">

                      <div className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-yellow-500/20
                        bg-yellow-500/10
                        text-yellow-400
                      ">
                        <Lightbulb size={18} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">
                          Feature Request
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Have an idea for a new model or feature?
                          We'd love to hear your suggestions.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Collaboration */}

                  <div className="
                    group
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-5
                    transition
                    hover:border-purple-500/30
                  ">
                    <div className="flex items-start gap-4">

                      <div className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-purple-500/20
                        bg-purple-500/10
                        text-purple-400
                      ">
                        <Handshake size={18} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">
                          Collaboration
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Interested in AI, ML, deep learning,
                          or collaborating on a project?
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              </section>

              {/* ==================================================
                  SOCIAL CONNECTIONS
              ================================================== */}

              <section className="
                mt-6
                rounded-2xl
                border
                border-slate-800
                bg-[#111b2b]
                px-5
                py-6
                sm:px-7
              ">
                <div className="
                  flex
                  flex-col
                  gap-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                ">

                  <div>
                    <h2 className="text-base font-semibold text-slate-100">
                      Connect With Me
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Follow PredictHub development and explore
                      AI, ML and software projects.
                    </p>
                  </div>

                  <div className="flex gap-2.5">

                    {/* GitHub */}

                    <a
                      href="https://github.com/vikashkumar97983282-glitch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="
                        flex
                        h-10
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-800
                        bg-[#0d1422]
                        px-4
                        text-xs
                        font-medium
                        text-slate-400
                        transition
                        hover:border-slate-600
                        hover:text-white
                      "
                    >
                      <span className="font-bold">
                        GH
                      </span>

                      GitHub
                    </a>

                    {/* LinkedIn */}

                    <a
                      href="https://www.linkedin.com/in/vikash-kumar-sharma-85a34b288/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="
                        flex
                        h-10
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-800
                        bg-[#0d1422]
                        px-4
                        text-xs
                        font-medium
                        text-slate-400
                        transition
                        hover:border-blue-500/40
                        hover:bg-blue-500/5
                        hover:text-blue-400
                      "
                    >
                      <span className="font-bold">
                        in
                      </span>

                      LinkedIn
                    </a>

                  </div>
                </div>
              </section>

              {/* ==================================================
                  FAQ
              ================================================== */}

              <section className="mt-10">

                <div className="mb-6">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                    FAQ
                  </div>

                  <h2 className="text-2xl font-bold text-slate-100">
                    Frequently Asked Questions
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Quick answers to common PredictHub questions.
                  </p>
                </div>

                <div className="space-y-3">

                  {/* FAQ 1 */}

                  <details className="
                    group
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-5
                  ">
                    <summary className="
                      cursor-pointer
                      list-none
                      text-sm
                      font-medium
                      text-slate-100
                    ">
                      <div className="flex items-center justify-between gap-4">
                        <span>
                          What is PredictHub?
                        </span>

                        <span className="
                          text-lg
                          text-slate-500
                          transition
                          group-open:rotate-45
                        ">
                          +
                        </span>
                      </div>
                    </summary>

                    <p className="
                      mt-3
                      max-w-3xl
                      text-sm
                      leading-6
                      text-slate-500
                    ">
                      PredictHub is an AI and machine learning
                      platform that allows users to explore
                      prediction models and generate
                      data-driven predictions.
                    </p>
                  </details>

                  {/* FAQ 2 */}

                  <details className="
                    group
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-5
                  ">
                    <summary className="
                      cursor-pointer
                      list-none
                      text-sm
                      font-medium
                      text-slate-100
                    ">
                      <div className="flex items-center justify-between gap-4">
                        <span>
                          Can I suggest a new prediction model?
                        </span>

                        <span className="
                          text-lg
                          text-slate-500
                          transition
                          group-open:rotate-45
                        ">
                          +
                        </span>
                      </div>
                    </summary>

                    <p className="
                      mt-3
                      max-w-3xl
                      text-sm
                      leading-6
                      text-slate-500
                    ">
                      Yes. Select "Feature Request" from the
                      subject dropdown and describe the model
                      or feature you'd like to see.
                    </p>
                  </details>

                  {/* FAQ 3 */}

                  <details className="
                    group
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-5
                  ">
                    <summary className="
                      cursor-pointer
                      list-none
                      text-sm
                      font-medium
                      text-slate-100
                    ">
                      <div className="flex items-center justify-between gap-4">
                        <span>
                          How can I report a bug?
                        </span>

                        <span className="
                          text-lg
                          text-slate-500
                          transition
                          group-open:rotate-45
                        ">
                          +
                        </span>
                      </div>
                    </summary>

                    <p className="
                      mt-3
                      max-w-3xl
                      text-sm
                      leading-6
                      text-slate-500
                    ">
                      Select "Bug Report" from the subject
                      dropdown and describe the issue in detail.
                    </p>
                  </details>

                  {/* FAQ 4 */}

                  <details className="
                    group
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#111b2b]
                    p-5
                  ">
                    <summary className="
                      cursor-pointer
                      list-none
                      text-sm
                      font-medium
                      text-slate-100
                    ">
                      <div className="flex items-center justify-between gap-4">
                        <span>
                          Is the contact form connected to the backend?
                        </span>

                        <span className="
                          text-lg
                          text-slate-500
                          transition
                          group-open:rotate-45
                        ">
                          +
                        </span>
                      </div>
                    </summary>

                    <p className="
                      mt-3
                      max-w-3xl
                      text-sm
                      leading-6
                      text-slate-500
                    ">
                      The form currently performs frontend
                      validation and a temporary submission
                      simulation. You can connect it to your
                      FastAPI contact endpoint when the backend
                      route is ready.
                    </p>
                  </details>

                </div>
              </section>

            </div>
          </div>
        </main>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <Footer />
      </div>
    </div>
  );
}

export default Contact;

