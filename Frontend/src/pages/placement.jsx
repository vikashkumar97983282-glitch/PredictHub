import { useState } from "react";
import {
  ArrowLeft,
  Brain,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Commet from "react-loading-indicators/Commet";

function PlacementForm() {
  const navigate = useNavigate();

  // =====================================================
  // API
  // =====================================================

  const API_ENDPOINT =
    "https://predicthub-g9lj.onrender.com/prediction/placement";

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
  const [predictionInfo, setPredictionInfo] = useState(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear previous result/messages
    setError("");
    setSuccessMessage("");
    setPrediction(null);
    setPredictionInfo(null);
  };

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("jwt") ||
      ""
    );
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset previous state
    setError("");
    setSuccessMessage("");
    setPrediction(null);
    setPredictionInfo(null);

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

    if (!Number.isFinite(cgpa)) {
      setError("Please enter a valid CGPA.");
      return;
    }

    if (!Number.isFinite(resumeScore)) {
      setError("Please enter a valid resume score.");
      return;
    }

    if (cgpa < 0 || cgpa > 10) {
      setError("CGPA must be between 0 and 10.");
      return;
    }

    if (resumeScore < 0 || resumeScore > 10) {
      setError("Resume score must be between 0 and 10.");
      return;
    }

    // ===================================================
    // TOKEN
    // ===================================================

    const token = getToken();

    // ===================================================
    // DEBUG
    // ===================================================

    console.log("=================================");
    console.log("Placement Prediction Request");
    console.log("=================================");
    console.log("URL:", API_ENDPOINT);
    console.log("CGPA:", cgpa);
    console.log("Resume Score:", resumeScore);
    console.log("Token:", token ? "Available" : "Not available");

    try {
      setLoading(true);

      // =================================================
      // HEADERS
      // =================================================

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      // Only send Authorization header if token exists
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // =================================================
      // API CALL
      // =================================================

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({
          cgpa: cgpa,
          resume_score: resumeScore,
        }),
      });

      // =================================================
      // READ RESPONSE
      // =================================================

      let result = null;

      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
      }

      console.log("=================================");
      console.log("Placement Prediction Response");
      console.log("=================================");
      console.log("HTTP Status:", response.status);
      console.log("Response:", result);

      // =================================================
      // HTTP ERROR
      // =================================================

      if (!response.ok) {
        let errorMessage = "Prediction failed.";

        if (response.status === 401) {
          errorMessage =
            result?.detail ||
            result?.message ||
            "Unauthorized. Please login again.";
        } else if (response.status === 403) {
          errorMessage =
            result?.detail ||
            result?.message ||
            "This prediction model is currently inactive.";
        } else if (response.status === 404) {
          errorMessage =
            result?.detail ||
            result?.message ||
            "Prediction endpoint or model not found.";
        } else if (response.status >= 500) {
          errorMessage =
            result?.detail ||
            result?.message ||
            "Prediction server error. Please try again.";
        } else {
          errorMessage =
            result?.detail ||
            result?.message ||
            "Unable to generate prediction.";
        }

        throw new Error(errorMessage);
      }

      // =================================================
      // SUCCESS RESPONSE
      // =================================================

      /*
        YOUR ACTUAL API RESPONSE:

        {
          "message": "Prediction completed successfully",
          "data": 100,
          "prediction": 100,
          "prediction_id": "..."
        }

        So DO NOT check:

        result.success === true

        because your backend does not return "success".
      */

      if (!result) {
        throw new Error(
          "The server returned an empty response."
        );
      }

      // =================================================
      // CHECK API MESSAGE
      // =================================================

      if (
        result.message &&
        result.message.toLowerCase().includes("failed")
      ) {
        throw new Error(
          result.message || "Prediction failed."
        );
      }

      // =================================================
      // GET PREDICTION VALUE
      // =================================================

      /*
        Supports all of these possible backend formats:

        1. data: 100

        2. prediction: 100

        3. result: 100

        4. data: {
             prediction: 100
           }
      */

      let predictionValue = null;

      if (
        result?.data !== undefined &&
        result?.data !== null &&
        typeof result.data === "object"
      ) {
        predictionValue =
          result.data.prediction ??
          result.data.result ??
          result.data.value;
      } else {
        predictionValue = result?.data;
      }

      if (
        predictionValue === undefined ||
        predictionValue === null
      ) {
        predictionValue =
          result?.prediction ??
          result?.result ??
          result?.value;
      }

      // =================================================
      // CHECK PREDICTION
      // =================================================

      if (
        predictionValue === undefined ||
        predictionValue === null
      ) {
        throw new Error(
          "Prediction value was not returned by the server."
        );
      }

      // =================================================
      // CONVERT NUMERIC VALUE
      // =================================================

      const numericPrediction = Number(predictionValue);

      const finalPrediction = Number.isFinite(
        numericPrediction
      )
        ? numericPrediction
        : predictionValue;

      console.log(
        "Final Prediction:",
        finalPrediction
      );

      // =================================================
      // SET PREDICTION
      // =================================================

      setPrediction(finalPrediction);

      // =================================================
      // SET PREDICTION INFO
      // =================================================

      setPredictionInfo({
        model_id:
          result?.data?.model_id || null,

        model_key:
          result?.data?.model_key ||
          "placement",

        model_name:
          result?.data?.model_name ||
          "Placement Prediction",

        prediction_id:
          result?.prediction_id || null,
      });

      // =================================================
      // SUCCESS MESSAGE
      // =================================================

      setSuccessMessage(
        result?.message ||
          "Prediction completed successfully."
      );

    } catch (err) {
      console.error(
        "Placement prediction error:",
        err
      );

      setError(
        err?.message ||
          "Unable to generate prediction."
      );
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
  // RESULT LABEL
  // =====================================================

  const getPredictionLabel = () => {
    const value = Number(prediction);

    /*
      Supports:

      1   = Likely to be Placed
      0   = Not Likely to be Placed

      100 = Likely to be Placed
      0   = Not Likely to be Placed
    */

    if (value === 1 || value === 100) {
      return "Likely to be Placed";
    }

    if (value === 0) {
      return "Not Likely to be Placed";
    }

    /*
      If the model returns a percentage/score
      between 0 and 100.
    */

    if (value > 0 && value <= 100) {
      if (value >= 80) {
        return "Likely to be Placed";
      }

      return "Not Likely to be Placed";
    }

    return "Prediction Result";
  };

  // =====================================================
  // RESULT DESCRIPTION
  // =====================================================

  const getPredictionDescription = () => {
    const value = Number(prediction);

    if (value === 1 || value === 100) {
      return "Based on the provided information, the model predicts a positive placement outcome.";
    }

    if (value === 0) {
      return "Based on the provided information, the model predicts a negative placement outcome.";
    }

    if (value > 50 && value <= 100) {
      return "The model indicates a higher likelihood of placement.";
    }

    if (value >= 0 && value <= 50) {
      return "The model indicates a lower likelihood of placement.";
    }

    return "The prediction has been generated successfully.";
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        w-full
        overflow-y-auto
        overflow-x-hidden
        bg-[#070b14]
        text-white
      "
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          overflow-hidden
        "
      >
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
          "
        />

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
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-size-[40px_40px]
          "
        />
      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className="
          relative
          z-10
          min-h-screen
          w-full
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-screen
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

          <div>
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
                transition
                hover:border-slate-700
                hover:bg-[#151f31]
                hover:text-white
              "
            >
              <ArrowLeft size={17} />

              <span>
                Back to Models
              </span>
            </button>
          </div>

          {/* =================================================
              HEADER
          ================================================= */}

          <section
            className="
              mt-8
              text-center
              sm:mt-10
            "
          >
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

            <div
              className="
                mx-auto
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-purple-500/20
                bg-purple-500/5
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-purple-400
              "
            >
              <Sparkles size={13} />

              <span>
                Machine Learning
              </span>
            </div>

            <h1
              className="
                mt-5
                text-3xl
                font-bold
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Placement Prediction
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-slate-400
                sm:text-base
              "
            >
              Enter your academic and resume
              information to generate a placement
              prediction using machine learning.
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
                  disabled={loading}
                  placeholder="Enter your CGPA"
                  className="
                    box-border
                    block
                    w-full
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#070b14]
                    px-4
                    py-3.5
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-purple-500/50
                    focus:ring-4
                    focus:ring-purple-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <p
                  className="
                    mt-2
                    text-xs
                    text-slate-500
                  "
                >
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
                  disabled={loading}
                  placeholder="Enter your resume score"
                  className="
                    box-border
                    block
                    w-full
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#070b14]
                    px-4
                    py-3.5
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-600
                    focus:border-purple-500/50
                    focus:ring-4
                    focus:ring-purple-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <p
                  className="
                    mt-2
                    text-xs
                    text-slate-500
                  "
                >
                  Score should be between 0 and 10.
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
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    p-4
                    text-sm
                    text-red-400
                  "
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="wrap-break-word">
                    {error}
                  </span>
                </div>
              )}

              {/* =================================================
                  SUCCESS
              ================================================= */}

              {successMessage && (
                <div
                  className="
                    mt-6
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    p-4
                    text-sm
                    text-emerald-400
                  "
                >
                  <CheckCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="wrap-break-word">
                    {successMessage}
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
                  transition
                  hover:bg-purple-500
                  hover:shadow-purple-500/30
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <Commet
                    color="#32cd32"
                    size="small"
                    text="Loading"
                    textColor=""
                  />
                ) : (
                  <>
                    <Brain size={19} />

                    <span>
                      Predict Placement
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* =================================================
                PREDICTION RESULT
            ================================================= */}

            {prediction !== null && (
              <div
                className="
                  mt-8
                  overflow-hidden
                  rounded-2xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/5
                  p-5
                  sm:p-6
                "
              >
                {/* HEADER */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
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

                  <div>
                    <p
                      className="
                        text-sm
                        text-slate-400
                      "
                    >
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
                      {getPredictionLabel()}
                    </h2>
                  </div>
                </div>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-4
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  {getPredictionDescription()}
                </p>

                {/* VALUE */}

                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#070b14]
                    p-5
                    text-center
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
                      mt-3
                      text-4xl
                      font-bold
                      text-emerald-400
                    "
                  >
                    {formatPrediction()}
                  </p>
                </div>

                {/* MODEL INFO */}

                {predictionInfo && (
                  <div
                    className="
                      mt-4
                      grid
                      grid-cols-1
                      gap-3
                      sm:grid-cols-2
                    "
                  >
                    {/* MODEL */}

                    <div
                      className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-[#070b14]
                        p-3
                      "
                    >
                      <p
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Model
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-medium
                          text-slate-200
                        "
                      >
                        {predictionInfo.model_name}
                      </p>
                    </div>

                    {/* STATUS */}

                    <div
                      className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-[#070b14]
                        p-3
                      "
                    >
                      <p
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        Status
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-medium
                          text-emerald-400
                        "
                      >
                        Completed
                      </p>
                    </div>

                    {/* PREDICTION ID */}

                    {predictionInfo.prediction_id && (
                      <div
                        className="
                          rounded-xl
                          border
                          border-slate-800
                          bg-[#070b14]
                          p-3
                          sm:col-span-2
                        "
                      >
                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >
                          Prediction ID
                        </p>

                        <p
                          className="
                            mt-1
                            break-all
                            text-xs
                            font-medium
                            text-slate-400
                          "
                        >
                          {predictionInfo.prediction_id}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>

          <div className="h-20" />
        </div>
      </main>
    </div>
  );
}

export default PlacementForm;