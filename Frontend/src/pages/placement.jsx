import React, { useState } from "react";
import {
  ArrowLeft,
  Brain,
  Loader2,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function PlacementForm() {
  const navigate = useNavigate();

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    cgpa: "",
    resume_score: "",
  });

  // =====================================================
  // UI STATE
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setPrediction(null);
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setPrediction(null);

    // ===================================================
    // VALIDATION
    // ===================================================

    if (
      formData.cgpa.trim() === "" ||
      formData.resume_score.trim() === ""
    ) {
      setError("Please fill all fields.");
      return;
    }

    const cgpa = Number(formData.cgpa);
    const resumeScore = Number(formData.resume_score);

    if (
      !Number.isFinite(cgpa) ||
      !Number.isFinite(resumeScore)
    ) {
      setError("Please enter valid numbers.");
      return;
    }

    if (cgpa < 0 || cgpa > 10) {
      setError("CGPA must be between 0 and 10.");
      return;
    }

    if (resumeScore < 0 || resumeScore > 100) {
      setError("Resume score must be between 0 and 100.");
      return;
    }

    // ===================================================
    // API REQUEST
    // ===================================================

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       *
       * Your backend route is:
       *
       * http://localhost:8000/model/
       *
       * NOT:
       *
       * http://localhost:8000/model/placement
       */

      const response = await fetch(
        "http://localhost:8000/model/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            cgpa: cgpa,
            resume_score: resumeScore,
          }),
        }
      );

      // =================================================
      // GET RESPONSE
      // =================================================

      const contentType =
        response.headers.get("content-type");

      let result;

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        result = await response.json();
      } else {
        const text = await response.text();

        result = {
          message: text,
        };
      }

      console.log("API Status:", response.status);
      console.log("Backend response:", result);

      // =================================================
      // HANDLE BACKEND ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          result?.detail ||
            result?.message ||
            result?.error ||
            `Prediction failed. Server returned ${response.status}.`
        );
      }

      // =================================================
      // GET PREDICTION
      // =================================================

      const predictionValue =
        result?.data ??
        result?.prediction ??
        result?.result ??
        result;

      setPrediction(predictionValue);
    } catch (error) {
      console.error("Prediction error:", error);

      // Network / CORS / server error
      if (error instanceof TypeError) {
        setError(
          "Unable to connect to the prediction server. Make sure your backend is running on http://localhost:8000."
        );
      } else {
        setError(
          error?.message ||
            "Unable to connect to prediction server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORMAT PREDICTION
  // =====================================================

  const formatPrediction = () => {
    if (
      prediction === null ||
      prediction === undefined
    ) {
      return "";
    }

    if (typeof prediction === "object") {
      return JSON.stringify(prediction);
    }

    return String(prediction);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="fixed inset-0 z-50 w-full overflow-y-auto overflow-x-hidden bg-[#070b14] text-white">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* BLUE GLOW */}

        <div
          className="
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-blue-600/10
            blur-[100px]
            sm:h-96
            sm:w-96
          "
        />

        {/* PURPLE GLOW */}

        <div
          className="
            absolute
            -bottom-32
            -left-32
            h-80
            w-80
            rounded-full
            bg-purple-600/10
            blur-[100px]
            sm:h-96
            sm:w-96
          "
        />

        {/* GRID */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-[size:40px_40px]
          "
        />
      </div>

      {/* =================================================
          SCROLLABLE MAIN
      ================================================= */}

      <main className="relative z-10 min-h-full w-full">

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-4xl
            flex-col
            px-4
            py-6
            sm:px-6
            sm:py-8
            lg:px-8
            lg:py-10
          "
        >

          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <div className="shrink-0">

            <button
              type="button"
              onClick={() => navigate("/prediction")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-800
                bg-[#101827]
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-400
                transition-all
                duration-200
                hover:border-slate-700
                hover:bg-[#151f31]
                hover:text-white
              "
            >
              <ArrowLeft size={17} />

              <span>Back to Models</span>
            </button>

          </div>

          {/* =================================================
              HEADER
          ================================================= */}

          <section className="mt-8 text-center sm:mt-10">

            {/* ICON */}

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-purple-500/20
                bg-purple-500/10
                text-purple-400
                shadow-lg
                shadow-purple-500/10
                sm:h-16
                sm:w-16
              "
            >
              <Brain size={30} />
            </div>

            {/* CATEGORY */}

            <div
              className="
                mx-auto
                mt-5
                inline-flex
                max-w-full
                items-center
                gap-2
                rounded-full
                border
                border-purple-500/20
                bg-purple-500/5
                px-3
                py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-purple-400
                sm:px-4
                sm:text-xs
                sm:tracking-[0.2em]
              "
            >
              <Sparkles size={13} />

              <span>Machine Learning</span>
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-5
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Placement Prediction
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                px-2
                text-sm
                leading-6
                text-slate-400
                sm:text-base
              "
            >
              Enter your academic and resume information
              to generate a placement prediction using
              machine learning.
            </p>

          </section>

          {/* =================================================
              FORM CARD
          ================================================= */}

          <section
            className="
              mx-auto
              mt-8
              w-full
              max-w-2xl
              shrink-0
              rounded-3xl
              border
              border-slate-800
              bg-[#101827]/95
              p-5
              shadow-2xl
              shadow-black/20
              backdrop-blur-xl
              sm:mt-10
              sm:p-8
            "
          >

            <form onSubmit={handleSubmit}>

              {/* =================================================
                  CGPA
              ================================================= */}

              <div>

                <label
                  htmlFor="cgpa"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-200
                  "
                >
                  CGPA
                </label>

                <input
                  id="cgpa"
                  name="cgpa"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="Enter your CGPA"
                  disabled={loading}
                  className="
                    box-border
                    block
                    w-full
                    min-w-0
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#070b14]
                    px-4
                    py-3.5
                    text-white
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-slate-600
                    focus:border-purple-500/50
                    focus:ring-4
                    focus:ring-purple-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <p className="mt-2 text-xs text-slate-500">
                  Example: 8.5
                </p>

              </div>

              {/* =================================================
                  RESUME SCORE
              ================================================= */}

              <div className="mt-6">

                <label
                  htmlFor="resume_score"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-200
                  "
                >
                  Resume Score
                </label>

                <input
                  id="resume_score"
                  name="resume_score"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.resume_score}
                  onChange={handleChange}
                  placeholder="Enter your resume score"
                  disabled={loading}
                  className="
                    box-border
                    block
                    w-full
                    min-w-0
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#070b14]
                    px-4
                    py-3.5
                    text-white
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-slate-600
                    focus:border-purple-500/50
                    focus:ring-4
                    focus:ring-purple-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <p className="mt-2 text-xs text-slate-500">
                  Score should be between 0 and 100.
                </p>

              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div
                  className="
                    mt-6
                    flex
                    w-full
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    p-4
                    text-sm
                    leading-5
                    text-red-400
                  "
                >

                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="min-w-0 break-words">
                    {error}
                  </span>

                </div>
              )}

              {/* =================================================
                  SUBMIT BUTTON
              ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-purple-600
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-purple-500/20
                  transition-all
                  duration-200
                  hover:bg-purple-500
                  hover:shadow-purple-500/30
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    <span>Predicting...</span>
                  </>
                ) : (
                  <>
                    <Brain size={19} />

                    <span>Predict Placement</span>
                  </>
                )}

              </button>

            </form>

            {/* =================================================
                RESULT
            ================================================= */}

            {prediction !== null && (
              <div
                className="
                  mt-8
                  w-full
                  overflow-hidden
                  rounded-2xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/5
                  p-5
                  sm:p-6
                "
              >

                {/* RESULT HEADER */}

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-500/10
                      text-emerald-400
                    "
                  >
                    <CheckCircle size={21} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm text-slate-400">
                      Prediction Result
                    </p>

                    <h2
                      className="
                        text-lg
                        font-bold
                        text-white
                        sm:text-xl
                      "
                    >
                      Prediction Generated
                    </h2>

                  </div>

                </div>

                {/* RESULT VALUE */}

                <div
                  className="
                    mt-5
                    w-full
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#070b14]
                    p-4
                    sm:p-5
                  "
                >

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    Model Output
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-full
                      break-all
                      text-2xl
                      font-bold
                      leading-tight
                      text-emerald-400
                      sm:text-3xl
                    "
                  >
                    {formatPrediction()}
                  </p>

                </div>

              </div>
            )}

          </section>

          {/* =================================================
              BOTTOM SPACE
          ================================================= */}

          <div className="h-16 shrink-0 sm:h-24" />

        </div>

      </main>

    </div>
  );
}

export default PlacementForm;