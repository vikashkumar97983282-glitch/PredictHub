import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  Database,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
  BarChart3,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";

/* =====================================================
   API CONFIGURATION
===================================================== */

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");


/* =====================================================
   API STATUS HOOK
===================================================== */

function useBackendStatus() {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [backendResponse, setBackendResponse] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkBackend = async () => {
      const apiUrl = `${API_BASE_URL}`;

      console.log("");
      console.log("╔════════════════════════════════════════════╗");
      console.log("║       PredictHub Backend Status            ║");
      console.log("╚════════════════════════════════════════════╝");

      console.log("🔄 Checking backend API...");
      console.log("🌐 API URL:", apiUrl);

      const startTime = performance.now();

      try {
        const response = await axios.get(apiUrl, {
          timeout: 15000,
          headers: {
            Accept: "application/json",
          },
        });

        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        if (!isMounted) return;

        setBackendStatus("online");
        setBackendResponse(response.data);

        console.log("");
        console.log("╔════════════════════════════════════════════╗");
        console.log("║       ✅ BACKEND API IS RUNNING            ║");
        console.log("╚════════════════════════════════════════════╝");

        console.log("🌐 API URL:", apiUrl);
        console.log("📡 HTTP Status:", response.status);
        console.log("⚡ Response Time:", `${responseTime} ms`);
        console.log("📦 Backend Response:", response.data);

        console.log("");
      } catch (error) {
        if (!isMounted) return;

        setBackendStatus("offline");
        setBackendResponse(null);

        console.log("");
        console.log("╔════════════════════════════════════════════╗");
        console.log("║       ❌ BACKEND API IS NOT RUNNING        ║");
        console.log("╚════════════════════════════════════════════╝");

        console.log("🌐 API URL:", apiUrl);

        if (error.response) {
          console.error(
            "📡 HTTP Status:",
            error.response.status
          );

          console.error(
            "❌ Status Text:",
            error.response.statusText
          );

          console.error(
            "📦 Backend Response:",
            error.response.data
          );

          console.error(
            "⚠️ Backend responded, but returned an error."
          );
        } else if (error.request) {
          console.error(
            "❌ Network Error: Frontend could not connect to backend."
          );

          console.error(
            "Possible reasons:"
          );

          console.error(
            "1️⃣ Backend server is not running."
          );

          console.error(
            "2️⃣ VITE_API_URL is incorrect."
          );

          console.error(
            "3️⃣ Backend server is sleeping on Render."
          );

          console.error(
            "4️⃣ CORS is not configured correctly."
          );

          console.error(
            "5️⃣ Backend is using HTTP while frontend uses HTTPS."
          );

          console.error(
            "6️⃣ Backend URL is unreachable."
          );
        } else if (error.code === "ECONNABORTED") {
          console.error(
            "⏱️ Request Timeout: Backend did not respond within 15 seconds."
          );
        } else {
          console.error(
            "❌ Axios Error:",
            error.message
          );
        }

        console.log("");
      }
    };

    checkBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    backendStatus,
    backendResponse,
  };
}


/* =====================================================
   PREDICTION MODELS
===================================================== */

const predictionModels = [
  {
    icon: <Brain size={25} />,
    title: "Machine Learning",
    description:
      "Use trained machine learning models to analyze data and generate accurate predictions.",
  },
  {
    icon: <Cpu size={25} />,
    title: "Deep Learning",
    description:
      "Leverage neural networks to solve complex prediction and classification problems.",
  },
  {
    icon: <BarChart3 size={25} />,
    title: "Data Prediction",
    description:
      "Transform your input data into meaningful insights using intelligent models.",
  },
];


/* =====================================================
   FEATURES
===================================================== */

const features = [
  {
    number: "01",
    title: "Multiple Models",
    description:
      "Access different machine learning and deep learning models.",
  },
  {
    number: "02",
    title: "Fast Predictions",
    description:
      "Get intelligent prediction results quickly and efficiently.",
  },
  {
    number: "03",
    title: "Easy to Use",
    description:
      "Provide your data through a simple and user-friendly interface.",
  },
  {
    number: "04",
    title: "Data Driven",
    description:
      "Make better decisions using AI-powered prediction results.",
  },
];


/* =====================================================
   HOW IT WORKS DATA
===================================================== */

const howItWorksSteps = [
  {
    number: "01",
    title: "Choose a Model",
    description:
      "Select the machine learning or deep learning model that matches your prediction problem.",
    icon: <Brain size={28} />,
    color: "blue",
    points: [
      "Machine Learning",
      "Deep Learning",
      "Classification & Regression",
    ],
  },
  {
    number: "02",
    title: "Enter Your Data",
    description:
      "Provide the required feature values. PredictHub prepares your input for the selected model.",
    icon: <Database size={28} />,
    color: "purple",
    points: [
      "Enter Features",
      "Validate Input",
      "Prepare Data",
    ],
  },
  {
    number: "03",
    title: "Get Prediction",
    description:
      "The trained AI model analyzes your data and generates the final prediction result.",
    icon: <Sparkles size={28} />,
    color: "cyan",
    points: [
      "Process Data",
      "Analyze Patterns",
      "Generate Result",
    ],
  },
];


/* =====================================================
   HOW IT WORKS
===================================================== */

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }

        return prev + 1;
      });
    }, 30);

    const slideTimer = setTimeout(() => {
      setActiveStep(
        (prev) => (prev + 1) % howItWorksSteps.length
      );
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimer);
    };
  }, [activeStep]);

  const step = howItWorksSteps[activeStep];

  const themes = {
    blue: {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      glow: "bg-blue-500/10",
      gradient: "from-blue-500 via-blue-400 to-cyan-400",
    },

    purple: {
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      glow: "bg-purple-500/10",
      gradient: "from-purple-500 via-fuchsia-400 to-pink-400",
    },

    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      glow: "bg-cyan-500/10",
      gradient: "from-cyan-500 via-sky-400 to-blue-400",
    },
  };

  const theme = themes[step.color];

  const previousStep = () => {
    setActiveStep(
      (prev) =>
        (prev - 1 + howItWorksSteps.length) %
        howItWorksSteps.length
    );

    setProgress(0);
  };

  const nextStep = () => {
    setActiveStep(
      (prev) =>
        (prev + 1) % howItWorksSteps.length
    );

    setProgress(0);
  };

  return (
    <section className="relative overflow-hidden border-y border-slate-900 bg-[#0c1424] px-5 py-16 sm:px-8 lg:px-10">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="absolute bottom-[10%] right-[15%] h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5">

            <Zap
              size={13}
              className="text-purple-400"
            />

            <span className="text-xs font-semibold tracking-wider text-purple-300">
              HOW IT WORKS
            </span>

          </div>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Three Steps to

            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Intelligent Prediction
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Choose your model, provide your data, and let AI generate
            intelligent predictions.
          </p>

        </div>

        <div className="mx-auto mt-10 flex max-w-md items-center justify-between">

          {howItWorksSteps.map((item, index) => {

            const isActive = activeStep === index;

            return (
              <React.Fragment key={item.number}>

                <button
                  type="button"
                  onClick={() => {
                    setActiveStep(index);
                    setProgress(0);
                  }}
                  className="flex flex-col items-center"
                >

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-300 sm:h-12 sm:w-12 ${
                      isActive
                        ? `${theme.bg} ${theme.border} ${theme.text} shadow-lg`
                        : "border-slate-700 bg-slate-900 text-slate-500"
                    }`}
                  >
                    {item.number}
                  </div>

                </button>

                {index !== howItWorksSteps.length - 1 && (
                  <div
                    className={`mx-2 h-px flex-1 transition-all duration-500 ${
                      activeStep > index
                        ? `bg-gradient-to-r ${theme.gradient}`
                        : "bg-slate-800"
                    }`}
                  />
                )}

              </React.Fragment>
            );
          })}

        </div>

        <div className="relative mx-auto mt-8 max-w-5xl">

          <div
            className={`pointer-events-none absolute -inset-4 rounded-3xl ${theme.glow} blur-3xl`}
          />

          <div
            className={`relative overflow-hidden rounded-3xl border ${theme.border} bg-[#121c30]/90 shadow-xl`}
          >

            <div className="pointer-events-none absolute right-3 top-0 select-none text-[120px] font-black leading-none text-white/[0.025] sm:text-[160px]">
              {step.number}
            </div>

            <div className="relative grid lg:grid-cols-[1.4fr_0.8fr]">

              <div className="p-6 sm:p-8 lg:p-10">

                <div className="flex items-center gap-4">

                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${theme.bg} ${theme.border} ${theme.text}`}
                  >
                    {step.icon}
                  </div>

                  <div>

                    <p
                      className={`text-xs font-bold tracking-[0.2em] ${theme.text}`}
                    >
                      STEP {activeStep + 1}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold sm:text-3xl">
                      {step.title}
                    </h3>

                  </div>

                </div>

                <p className="mt-6 max-w-2xl leading-7 text-slate-400">
                  {step.description}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">

                  {step.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-3"
                    >

                      <CheckCircle2
                        size={16}
                        className={theme.text}
                      />

                      <span className="text-xs text-slate-300 sm:text-sm">
                        {point}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              <div className="relative flex min-h-[240px] items-center justify-center border-t border-slate-800 bg-slate-950/30 p-6 lg:min-h-full lg:border-l lg:border-t-0">

                {activeStep === 0 && (
                  <div className="grid w-full max-w-[230px] grid-cols-2 gap-3">

                    <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">

                      <Brain
                        size={22}
                        className="text-blue-400"
                      />

                      <p className="mt-3 text-xs font-semibold">
                        ML Model
                      </p>

                    </div>

                    <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4">

                      <Cpu
                        size={22}
                        className="text-purple-400"
                      />

                      <p className="mt-3 text-xs font-semibold">
                        DL Model
                      </p>

                    </div>

                    <div className="col-span-2 flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3">

                      <span className="text-xs text-slate-300">
                        Model Selected
                      </span>

                      <CheckCircle2
                        size={17}
                        className="text-green-400"
                      />

                    </div>

                  </div>
                )}

                {activeStep === 1 && (
                  <div className="w-full max-w-[240px] space-y-3">

                    {[
                      "Feature 01",
                      "Feature 02",
                      "Feature 03",
                    ].map((feature, index) => (
                      <div
                        key={feature}
                        className="rounded-xl border border-slate-700 bg-slate-900 p-3"
                      >

                        <div className="flex justify-between">

                          <span className="text-xs text-slate-400">
                            {feature}
                          </span>

                          <span className="text-xs text-purple-400">
                            ✓
                          </span>

                        </div>

                        <div className="mt-2 h-1.5 rounded-full bg-slate-800">

                          <div
                            className="h-full rounded-full bg-purple-500"
                            style={{
                              width: `${[80, 65, 90][index]}%`,
                            }}
                          />

                        </div>

                      </div>
                    ))}

                    <div className="flex items-center justify-center gap-2 pt-2 text-xs text-purple-400">

                      <Database size={15} />

                      Data Ready

                    </div>

                  </div>
                )}

                {activeStep === 2 && (
                  <div className="w-full max-w-[240px] rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-[10px] tracking-wider text-slate-500">
                          PREDICTION
                        </p>

                        <h4 className="mt-1 text-xl font-bold">
                          ₹45,00,000
                        </h4>

                      </div>

                      <Sparkles
                        size={24}
                        className="text-cyan-400"
                      />

                    </div>

                    <div className="mt-5">

                      <div className="flex justify-between text-xs">

                        <span className="text-slate-400">
                          Confidence
                        </span>

                        <span className="text-green-400">
                          95.8%
                        </span>

                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">

                        <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-cyan-500 to-green-400" />

                      </div>

                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-green-400">

                      <CheckCircle2 size={15} />

                      Prediction Complete

                    </div>

                  </div>
                )}

              </div>

            </div>

            <div className="flex items-center justify-between border-t border-slate-800 px-5 py-4 sm:px-8">

              <div className="flex flex-1 items-center gap-3">

                <span className="text-xs text-slate-500">
                  0{activeStep + 1}/03
                </span>

                <div className="h-1.5 max-w-[180px] flex-1 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className={`h-full bg-gradient-to-r ${theme.gradient}`}
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={previousStep}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-slate-500 hover:text-white"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border ${theme.border} ${theme.bg} ${theme.text} transition hover:scale-105`}
                >
                  <ChevronRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


/* =====================================================
   HOME PAGE
===================================================== */

function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  // ===================================================
  // BACKEND API STATUS
  // ===================================================

  const {
    backendStatus,
    backendResponse,
  } = useBackendStatus();


  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-white">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() =>
          setSidebarCollapsed((prev) => !prev)
        }
      />


      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <Navbar
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        />


        {/* =====================================================
            PAGE
        ===================================================== */}

        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">


          {/* =====================================================
              HERO
          ===================================================== */}

          <section className="relative overflow-hidden">

            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">

              <div className="flex flex-col gap-12 lg:flex-row lg:items-center">

                {/* HERO LEFT */}

                <div className="flex-1">

                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs text-blue-400">

                    <span className="h-2 w-2 rounded-full bg-blue-400" />

                    AI • ML • DEEP LEARNING

                  </div>

                  <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">

                    Intelligent

                    <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Predictions
                    </span>

                    Powered by AI

                  </h1>

                  <p className="mt-6 max-w-2xl leading-8 text-slate-400">

                    PredictHub brings machine learning and deep learning
                    models together to transform your data into
                    intelligent predictions.

                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                    <Link
                      to="/prediction"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500"
                    >

                      Start Predicting

                      <ArrowRight size={18} />

                    </Link>

                    <Link
                      to="/models"
                      className="rounded-xl border border-slate-700 px-7 py-3.5 text-center font-semibold text-slate-300 transition hover:border-blue-500"
                    >

                      Explore Models

                    </Link>

                  </div>

                </div>


                {/* HERO RIGHT */}

                <div className="w-full lg:max-w-[400px]">

                  <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">

                    <p className="text-xs text-slate-500">
                      AI MODEL
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      Random Forest
                    </h3>

                    <div className="mt-6 flex h-36 items-end gap-3 rounded-2xl bg-slate-950 p-5">

                      {[40, 60, 45, 75, 65, 90].map(
                        (height, index) => (

                          <div
                            key={index}
                            className="flex-1 rounded-t bg-blue-500"
                            style={{
                              height: `${height}%`,
                            }}
                          />

                        )
                      )}

                    </div>

                    <div className="mt-5 rounded-2xl bg-slate-950 p-4">

                      <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                          Confidence
                        </span>

                        <span className="font-bold text-green-400">
                          95.8%
                        </span>

                      </div>

                      <div className="mt-3 h-2 rounded-full bg-slate-800">

                        <div className="h-full w-[95%] rounded-full bg-green-400" />

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              MODELS
          ===================================================== */}

          <section className="border-t border-slate-900 px-5 py-20 sm:px-8 lg:px-10">

            <div className="mx-auto max-w-7xl">

              <div className="text-center">

                <p className="text-sm font-semibold tracking-widest text-blue-400">
                  PREDICTION TECHNOLOGY
                </p>

                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Explore AI-Powered Models
                </h2>

              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">

                {predictionModels.map((model) => (

                  <div
                    key={model.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition hover:-translate-y-1 hover:border-blue-500/50"
                  >

                    <div className="text-blue-400">
                      {model.icon}
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      {model.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-400">
                      {model.description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </section>


          {/* =====================================================
              HOW IT WORKS
          ===================================================== */}

          <HowItWorks />


          {/* =====================================================
              FEATURES
          ===================================================== */}

          <section className="px-5 py-20 sm:px-8 lg:px-10">

            <div className="mx-auto max-w-7xl">

              <div className="text-center">

                <p className="text-sm font-semibold tracking-widest text-blue-400">
                  WHY PREDICTHUB
                </p>

                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Built for Smarter Predictions
                </h2>

              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {features.map((feature) => (

                  <div
                    key={feature.number}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-7"
                  >

                    <span className="font-bold text-blue-400">
                      {feature.number}
                    </span>

                    <h3 className="mt-5 text-xl font-bold">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {feature.description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </section>


          {/* =====================================================
              CTA
          ===================================================== */}

          <section className="px-5 pb-20 sm:px-8 lg:px-10">

            <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-16 text-center">

              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to Start Predicting?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">

                Transform your data into intelligent predictions using
                powerful AI and machine learning models.

              </p>

              {typeof backendResponse === "string" && (
                <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
                  {backendResponse}
                </p>
              )}

              <Link
                to="/prediction"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-slate-100"
              >

                Start Predicting

                <ArrowRight size={18} />

              </Link>

            </div>

          </section>


          {/* =====================================================
              FOOTER
          ===================================================== */}

          <Footer />

        </main>

      </div>

    </div>
  );
}

export default Home;

