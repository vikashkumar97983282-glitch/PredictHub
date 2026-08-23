import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";

const predictionModels = [
  {
    icon: "🧠",
    title: "Machine Learning",
    description:
      "Use trained machine learning models to analyze data and generate accurate predictions.",
  },
  {
    icon: "🤖",
    title: "Deep Learning",
    description:
      "Leverage powerful neural networks for complex prediction and classification tasks.",
  },
  {
    icon: "📊",
    title: "Data Prediction",
    description:
      "Transform your input data into meaningful insights using intelligent prediction models.",
  },
];

const features = [
  {
    number: "01",
    title: "Multiple Models",
    description:
      "Access different ML and DL models from a single prediction platform.",
  },
  {
    number: "02",
    title: "Fast Predictions",
    description:
      "Get prediction results quickly using optimized trained models.",
  },
  {
    number: "03",
    title: "Easy to Use",
    description:
      "Enter your data and let the model handle the prediction process.",
  },
  {
    number: "04",
    title: "Data Driven",
    description:
      "Make smarter decisions using AI-powered prediction results.",
  },
];

function Home() {
  // Mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Desktop sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#030712] text-white">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

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
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* NAVBAR */}

        <Navbar
          onMenuClick={() => {
            // Mobile only
            if (window.innerWidth < 1024) {
              setSidebarOpen((prev) => !prev);
            }
          }}
        />

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">

          <div className="min-h-full bg-slate-950">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative overflow-hidden">

              {/* Background glow */}

              <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

              <div className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

              <div className="relative mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24">

                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">

                  {/* LEFT */}

                  <div className="min-w-0 flex-1">

                    <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 sm:px-4 sm:py-2 sm:text-sm">

                      <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />

                      <span>AI • ML • DEEP LEARNING</span>

                    </div>

                    <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">

                      Intelligent

                      <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Predictions
                      </span>

                      Powered by AI

                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:mt-6 sm:text-lg sm:leading-8">

                      PredictHub brings machine learning and deep learning
                      models together to transform your data into intelligent,
                      data-driven predictions.

                    </p>

                    {/* Buttons */}

                    <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">

                      <button
                        type="button"
                        className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold transition hover:bg-blue-500 sm:w-auto sm:px-7"
                      >
                        Start Predicting →
                      </button>

                      <button
                        type="button"
                        className="w-full rounded-xl border border-slate-700 px-6 py-3.5 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white sm:w-auto sm:px-7"
                      >
                        Explore Models
                      </button>

                    </div>

                    {/* Stats */}

                    <div className="mt-10 grid grid-cols-2 gap-7 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-6">

                      <div>
                        <h3 className="text-2xl font-bold sm:text-3xl">
                          10+
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                          Prediction Models
                        </p>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold sm:text-3xl">
                          95%+
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                          Model Accuracy
                        </p>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold sm:text-3xl">
                          AI
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                          Powered Platform
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* =====================================================
                      PREDICTION CARD
                  ====================================================== */}

                  <div className="w-full lg:max-w-[430px] lg:flex-none">

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-blue-900/20 backdrop-blur sm:rounded-3xl sm:p-6">

                      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">

                        <div className="min-w-0">

                          <p className="text-xs text-slate-500 sm:text-sm">
                            PREDICTION MODEL
                          </p>

                          <h3 className="mt-1 truncate text-lg font-bold sm:text-xl">
                            Random Forest
                          </h3>

                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg sm:h-12 sm:w-12 sm:text-xl">
                          🧠
                        </div>

                      </div>

                      {/* Chart */}

                      <div className="mb-5 flex h-32 items-end gap-2 overflow-hidden rounded-xl bg-slate-950 p-3 sm:mb-6 sm:h-40 sm:gap-3 sm:rounded-2xl sm:p-5">

                        <div className="h-[35%] flex-1 rounded-t-md bg-blue-500/40" />
                        <div className="h-[50%] flex-1 rounded-t-md bg-blue-500/50" />
                        <div className="h-[42%] flex-1 rounded-t-md bg-blue-500/60" />
                        <div className="h-[70%] flex-1 rounded-t-md bg-blue-500/70" />
                        <div className="h-[60%] flex-1 rounded-t-md bg-blue-500/80" />
                        <div className="h-[85%] flex-1 rounded-t-md bg-blue-500" />

                      </div>

                      {/* Confidence */}

                      <div className="flex flex-col gap-3 rounded-xl bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl">

                        <div>

                          <p className="text-xs text-slate-500 sm:text-sm">
                            Prediction Confidence
                          </p>

                          <p className="mt-1 text-xl font-bold text-green-400 sm:text-2xl">
                            95.8%
                          </p>

                        </div>

                        <div className="w-fit rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                          High Confidence
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* =====================================================
                MODELS
            ====================================================== */}

            <section className="border-t border-slate-900 bg-slate-950 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

              <div className="mx-auto w-full max-w-7xl">

                <div className="mx-auto max-w-2xl text-center">

                  <p className="text-xs font-semibold tracking-widest text-blue-400 sm:text-sm">
                    PREDICTION TECHNOLOGY
                  </p>

                  <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
                    Explore AI-Powered Predictions
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                    Choose from different prediction technologies designed
                    to solve real-world problems.
                  </p>

                </div>

                <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">

                  {predictionModels.map((model) => (

                    <div
                      key={model.title}
                      className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900 sm:p-7"
                    >

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl sm:h-14 sm:w-14 sm:text-2xl">
                        {model.icon}
                      </div>

                      <h3 className="mt-5 text-lg font-bold sm:mt-6 sm:text-xl">
                        {model.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                        {model.description}
                      </p>

                      <button
                        type="button"
                        className="mt-5 font-semibold text-blue-400 hover:text-blue-300"
                      >
                        Explore Model →
                      </button>

                    </div>

                  ))}

                </div>

              </div>

            </section>

            {/* =====================================================
                HOW IT WORKS
            ====================================================== */}

            <section className="bg-slate-900/50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

              <div className="mx-auto w-full max-w-7xl">

                <div className="text-center">

                  <p className="text-xs font-semibold tracking-widest text-purple-400 sm:text-sm">
                    HOW IT WORKS
                  </p>

                  <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
                    Predict in Three Simple Steps
                  </h2>

                </div>

                <div className="mt-12 grid gap-10 sm:mt-14 md:grid-cols-3 md:gap-8">

                  <div>

                    <div className="text-5xl font-black text-blue-500/10 sm:text-6xl">
                      01
                    </div>

                    <h3 className="-mt-4 text-lg font-bold sm:text-xl">
                      Choose a Model
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                      Select the machine learning or deep learning model
                      that matches your prediction problem.
                    </p>

                  </div>

                  <div>

                    <div className="text-5xl font-black text-purple-500/10 sm:text-6xl">
                      02
                    </div>

                    <h3 className="-mt-4 text-lg font-bold sm:text-xl">
                      Enter Your Data
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                      Provide the required input values through our simple
                      and user-friendly prediction interface.
                    </p>

                  </div>

                  <div>

                    <div className="text-5xl font-black text-cyan-500/10 sm:text-6xl">
                      03
                    </div>

                    <h3 className="-mt-4 text-lg font-bold sm:text-xl">
                      Get Your Prediction
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                      Our trained AI model processes your data and provides
                      the prediction result instantly.
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* =====================================================
                FEATURES
            ====================================================== */}

            <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

              <div className="mx-auto w-full max-w-7xl">

                <div className="mx-auto max-w-2xl text-center">

                  <p className="text-xs font-semibold tracking-widest text-blue-400 sm:text-sm">
                    WHY PREDICTHUB
                  </p>

                  <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
                    Built for Smarter Predictions
                  </h2>

                </div>

                <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">

                  {features.map((feature) => (

                    <div
                      key={feature.number}
                      className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                    >

                      <span className="text-sm font-bold text-blue-400">
                        {feature.number}
                      </span>

                      <h3 className="mt-4 text-lg font-bold sm:mt-5 sm:text-xl">
                        {feature.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {feature.description}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </section>

            {/* =====================================================
                CTA
            ====================================================== */}

            <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">

              <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-12 text-center sm:rounded-3xl sm:px-8 sm:py-16">

                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl sm:h-60 sm:w-60" />

                <div className="relative">

                  <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                    Ready to Start Predicting?
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:mt-5 sm:text-base">
                    Explore powerful machine learning and deep learning
                    models with PredictHub and turn your data into
                    intelligent predictions.
                  </p>

                  <button
                    type="button"
                    className="mt-7 rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-slate-100 sm:mt-8 sm:px-8"
                  >
                    Start Predicting →
                  </button>

                </div>

              </div>

            </section>

            <Footer/>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Home;