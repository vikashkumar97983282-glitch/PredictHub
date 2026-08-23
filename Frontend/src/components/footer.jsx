import React from "react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo / About */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Predict<span className="text-blue-500">Hub</span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              PredictHub is an AI and machine learning platform that helps
              users build, explore, and understand prediction models.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/models"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Prediction Models
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-sm text-slate-400 transition hover:text-blue-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Technologies
            </h3>

            <ul className="mt-4 space-y-3">
              <li className="text-sm text-slate-400">Machine Learning</li>
              <li className="text-sm text-slate-400">Deep Learning</li>
              <li className="text-sm text-slate-400">Artificial Intelligence</li>
              <li className="text-sm text-slate-400">Data Science</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect With Us
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Follow PredictHub and stay updated with the latest AI and ML
              projects.
            </p>

            <div className="mt-5 flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-blue-600 hover:text-white"
                aria-label="GitHub"
              >
                <span className="text-sm font-bold">GH</span>
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-blue-600 hover:text-white"
                aria-label="LinkedIn"
              >
                <span className="text-sm font-bold">in</span>
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-blue-600 hover:text-white"
                aria-label="Twitter"
              >
                <span className="text-sm font-bold">X</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} PredictHub. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-400"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-400"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;