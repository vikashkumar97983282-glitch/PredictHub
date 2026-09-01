import { useEffect, useState } from "react";
import { ArrowLeft, Brain, Sparkles, Zap } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const COMING_SOON_TEXT = "COMING SOON......";

function ComingSoon() {
  const { "*": modelSlug } = useParams();
  const [typedComingSoon, setTypedComingSoon] = useState("");

  const modelName = modelSlug
    ? modelSlug
        .split("/")
        .pop()
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "This Model";

  useEffect(() => {
    let timeoutId;

    const typeNext = (index) => {
      setTypedComingSoon(COMING_SOON_TEXT.slice(0, index));

      if (index < COMING_SOON_TEXT.length) {
        timeoutId = window.setTimeout(() => {
          typeNext(index + 1);
        }, 50);
        return;
      }

      timeoutId = window.setTimeout(() => {
        typeNext(0);
      }, 1000);
    };

    typeNext(0);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="min-h-dvh overflow-x-hidden overflow-y-auto bg-[#020816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-32 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-dvh max-w-4xl items-start px-3 pt-5 pb-16 sm:items-center sm:px-6 sm:py-8 sm:pb-8 lg:px-8">
        <section className="relative mt-1.5 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-2.5 shadow-2xl shadow-black/35 backdrop-blur-xl sm:mt-0 sm:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500" />
            <div className="absolute -right-14 top-2 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -left-14 bottom-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300 sm:px-3 sm:text-[11px] sm:tracking-[0.28em]">
                <Sparkles size={12} className="animate-pulse sm:size-3.25" />
                Model Preview
              </div>

              <div className="mt-3 max-w-2xl sm:mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.22em]">
                  Prediction Model
                </p>

                <h1 className="mt-2 max-w-xl whitespace-normal break-normal text-[1.9rem] font-black leading-[1.05] tracking-tight sm:text-4xl">
                  <span className="block whitespace-normal break-normal text-slate-100">
                    {modelName}
                  </span>
                  <span className="mt-1.5 block whitespace-nowrap text-emerald-400">
                    {typedComingSoon}
                    <span
                      className={`ml-0.5 inline-block h-[1em] w-0.5 align-[-0.12em] bg-emerald-400 ${
                        typedComingSoon.length === COMING_SOON_TEXT.length
                          ? "animate-pulse"
                          : "animate-pulse"
                      }`}
                    />
                  </span>
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                  We&apos;re preparing this model now. Soon you&apos;ll be able
                  to open it here and see prediction results in a clean,
                  simple flow.
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 sm:mt-5">
                <div className="rounded-2xl border border-white/10 bg-white/4 px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 sm:text-[11px] sm:tracking-[0.16em]">
                    Status
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-amber-300">
                    Under development
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500 sm:text-[11px] sm:tracking-[0.16em]">
                    Availability
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-emerald-300">
                    Coming Soon
                  </p>
                </div>
              </div>

              <div className="mt-3 grid gap-2.5 sm:mt-5 sm:grid-cols-2 sm:gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/3 p-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/5 sm:p-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 sm:h-8 sm:w-8">
                    <Brain size={15} className="sm:h-4 sm:w-4" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">
                    ML Powered
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Intelligent prediction workflows.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 p-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-white/5 sm:p-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300 sm:h-8 sm:w-8">
                    <Zap size={15} className="sm:h-4 sm:w-4" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Fast Results
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Quick response and smooth interaction.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row">
                <Link
                  to="/prediction"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-950/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/35"
                >
                  <ArrowLeft
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  Back to Predictions
                </Link>

                <div className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-slate-300">
                  More models are on the way
                </div>
              </div>
            </div>
          </section>
      </main>
    </div>
  );
}

export default ComingSoon;
