import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useSidebar } from "../contexts/use-sidebar";

function About() {

  const {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();


  return (
    <div className="flex min-h-screen w-full bg-[#030712] text-white">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
        onToggleSidebar={toggleSidebar}
      />

      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* NAVBAR */}

        <Navbar
          onMenuClick={toggleMobileMenu}
        />

        {/* CONTENT */}
        <main className="flex-1 overflow-x-hidden">

          <div className="min-h-full bg-slate-950">

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative overflow-hidden border-b border-slate-900">

              {/* Background Glow */}
              <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

              <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">

                <div className="mx-auto max-w-3xl text-center">

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">

                    <span className="h-2 w-2 rounded-full bg-blue-400" />

                    ABOUT PREDICTHUB

                  </div>

                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

                    Making AI-Powered

                    <span className="block bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Predictions Simple
                    </span>

                  </h1>

                  <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                    PredictHub is an AI and machine learning platform designed
                    to make powerful prediction technologies simple,
                    accessible, and easy to use.
                  </p>

                </div>

              </div>

            </section>

            {/* =====================================================
                ABOUT CONTENT
            ====================================================== */}
            <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

                {/* LEFT */}
                <div>

                  <p className="text-sm font-semibold tracking-widest text-blue-400">
                    OUR MISSION
                  </p>

                  <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                    Turning Data Into Intelligent Decisions
                  </h2>

                  <p className="mt-6 text-base leading-8 text-slate-400">
                    PredictHub was created with a simple goal: to bring
                    machine learning and artificial intelligence closer to
                    everyone.
                  </p>

                  <p className="mt-5 text-base leading-8 text-slate-400">
                    Machine learning models can be powerful, but using them
                    often requires technical knowledge and complex workflows.
                    PredictHub provides a simple platform where users can
                    select a model, enter their data, and receive meaningful
                    predictions.
                  </p>

                  <p className="mt-5 text-base leading-8 text-slate-400">
                    From traditional machine learning algorithms to modern
                    deep learning approaches, PredictHub focuses on making
                    prediction technology easier to understand and use.
                  </p>

                </div>

                {/* RIGHT - CARD */}
                <div className="relative">

                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl" />

                  <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl sm:p-9">

                    <div className="grid grid-cols-2 gap-4">

                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                        <div className="text-3xl">🧠</div>

                        <h3 className="mt-4 font-bold">
                          Machine Learning
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Intelligent algorithms trained to discover patterns
                          and make predictions.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                        <div className="text-3xl">🤖</div>

                        <h3 className="mt-4 font-bold">
                          Deep Learning
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Neural networks designed to solve complex prediction
                          problems.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                        <div className="text-3xl">📊</div>

                        <h3 className="mt-4 font-bold">
                          Data Analysis
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Transform raw data into useful information and
                          insights.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                        <div className="text-3xl">⚡</div>

                        <h3 className="mt-4 font-bold">
                          Fast Results
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Get prediction results through optimized trained
                          models.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* =====================================================
                WHAT WE OFFER
            ====================================================== */}
            <section className="border-y border-slate-900 bg-slate-900/40 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

              <div className="mx-auto max-w-7xl">

                <div className="mx-auto max-w-2xl text-center">

                  <p className="text-sm font-semibold tracking-widest text-purple-400">
                    WHAT WE OFFER
                  </p>

                  <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                    Everything You Need to Predict
                  </h2>

                  <p className="mt-5 text-base leading-7 text-slate-400">
                    PredictHub brings essential AI and machine learning
                    capabilities together in one simple platform.
                  </p>

                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                  {/* CARD 1 */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7 transition hover:-translate-y-1 hover:border-blue-500/50">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                      🧠
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      Multiple AI Models
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      Explore different machine learning and deep learning
                      approaches for various prediction tasks.
                    </p>

                  </div>

                  {/* CARD 2 */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7 transition hover:-translate-y-1 hover:border-purple-500/50">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                      📈
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      Data-Driven Results
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      Use trained models to analyze input data and generate
                      useful prediction results.
                    </p>

                  </div>

                  {/* CARD 3 */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7 transition hover:-translate-y-1 hover:border-cyan-500/50">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
                      ⚡
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                      Simple Experience
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      A clean and user-friendly interface makes it easy to
                      interact with prediction models.
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* =====================================================
                TECHNOLOGIES
            ====================================================== */}
            <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

              <div className="mx-auto max-w-7xl">

                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                  <div>

                    <p className="text-sm font-semibold tracking-widest text-blue-400">
                      TECHNOLOGY
                    </p>

                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                      Built With Modern Technologies
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-400">
                      PredictHub combines modern web development technologies
                      with machine learning tools to create a reliable and
                      interactive prediction platform.
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                    {[
                      "Python",
                      "React",
                      "Tailwind CSS",
                      "Scikit-Learn",
                      "Pandas",
                      "NumPy",
                    ].map((technology) => (
                      <div
                        key={technology}
                        className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-5 text-center text-sm font-semibold text-slate-300 transition hover:border-blue-500/50 hover:text-blue-400"
                      >
                        {technology}
                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </section>

            {/* =====================================================
                VISION
            ====================================================== */}
            <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">

              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-r from-slate-900 to-slate-950 px-6 py-12 text-center sm:px-10 sm:py-16">

                <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-600/10 blur-3xl" />

                <div className="relative">

                  <p className="text-sm font-semibold tracking-widest text-blue-400">
                    OUR VISION
                  </p>

                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                    A Smarter Future With AI
                  </h2>

                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                    We believe artificial intelligence should not be limited
                    to experts. PredictHub aims to make intelligent prediction
                    technology accessible to students, developers,
                    researchers, and businesses.
                  </p>

                  <Link
                    to="/predict"
                    className="mt-7 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500"
                  >
                    Explore PredictHub →
                  </Link>

                </div>

              </div>

            </section>

            {/* FOOTER */}
            <Footer />

          </div>

        </main>

      </div>

    </div>
  );
}

export default About;
