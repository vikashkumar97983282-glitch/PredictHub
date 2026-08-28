import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* ================= MAIN FOOTER ================= */}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* LOGO / ABOUT */}

          <div>
            <h2 className="text-2xl font-bold text-white">
              Predict<span className="text-blue-500">Hub</span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              PredictHub is an AI and machine learning platform that helps
              users build, explore, and understand prediction models.
            </p>
          </div>


          {/* QUICK LINKS */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/models"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Prediction Models
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>


          {/* TECHNOLOGIES */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Technologies
            </h3>

            <ul className="mt-4 space-y-3">
              <li className="text-sm text-slate-400">
                Machine Learning
              </li>

              <li className="text-sm text-slate-400">
                Deep Learning
              </li>

              <li className="text-sm text-slate-400">
                Artificial Intelligence
              </li>

              <li className="text-sm text-slate-400">
                Data Science
              </li>
            </ul>
          </div>


          {/* CONNECT WITH US */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect With Us
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Follow PredictHub and stay updated with the latest AI and ML
              projects.
            </p>


            <div className="mt-5 flex gap-4">

              {/* GITHUB */}

              <a
                href="https://github.com/vikashkumar97983282-glitch/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-800
                  text-slate-400
                  transition
                  duration-200
                  hover:scale-110
                  hover:bg-blue-600
                  hover:text-white
                "
                aria-label="GitHub"
              >
                <span className="text-sm font-bold">
                  GH
                </span>
              </a>


              {/* LINKEDIN */}

              <a
                href="https://www.linkedin.com/in/vikash-kumar-sharma-85a34b288/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-800
                  text-slate-400
                  transition
                  duration-200
                  hover:scale-110
                  hover:bg-blue-600
                  hover:text-white
                "
                aria-label="LinkedIn"
              >
                <span className="text-sm font-bold">
                  in
                </span>
              </a>


              {/* TWITTER / X */}

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-800
                  text-slate-400
                  transition
                  duration-200
                  hover:scale-110
                  hover:bg-blue-600
                  hover:text-white
                "
                aria-label="Twitter"
              >
                <span className="text-sm font-bold">
                  X
                </span>
              </a>

            </div>
          </div>

        </div>


        {/* ================= BOTTOM FOOTER ================= */}

        <div className="mt-10 border-t border-slate-800 pt-6">

          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-4
              text-center
              sm:flex-row
              sm:text-left
            "
          >

            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} PredictHub. All rights reserved.
            </p>


            <div className="flex gap-6">

              <Link
                to="/privacy-policy"
                className="text-sm text-slate-500 transition hover:text-blue-400"
              >
                Privacy Policy
              </Link>


              <Link
                to="/terms"
                className="text-sm text-slate-500 transition hover:text-blue-400"
              >
                Terms of Service
              </Link>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;