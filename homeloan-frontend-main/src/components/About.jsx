import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/*
  About.jsx
  - Self-contained About page component using Tailwind classes.
  - Includes: Hero, Mission, How it works, Interactive timeline, Stats (infographic),
    Testimonials, Partners logos, Video placeholder, Simple chart placeholder.
  - Accessibility: alt text, aria labels, keyboard focusable controls.
  - SEO: sets document.title and meta description on mount.
*/

const stats = [
  { label: "Loans Facilitated", value: 18500 },
  { label: "Bank Partners", value: 42 },
  { label: "Happy Customers", value: 23200 },
];

const timeline = [
  { year: "2018", title: "Founded", detail: "Started with a simple EMI calculator and a mission to simplify loan choices." },
  { year: "2019", title: "Bank Integrations", detail: "Partnered with our first 10 banks and added eligibility checks." },
  { year: "2021", title: "Growth", detail: "Reached 50k monthly site visits and expanded product coverage." },
  { year: "2023", title: "Feature Complete", detail: "Launched comparison engine, document upload and assisted applications." },
];

const testimonials = [
  { name: "Asha R.", quote: "HomeeLoan made comparing banks simple — saved me ₹35,000 over the loan tenure.", role: "Teacher" },
  { name: "Ravi K.", quote: "Quick responses and transparent advice. The EMI calculator is spot on.", role: "Software Engineer" },
  { name: "Meera S.", quote: "Their team helped with eligibility and documents. Very supportive.", role: "Entrepreneur" },
];

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const countersRef = useRef([]);

  // SEO meta
  useEffect(() => {
    document.title = "About Us — HomeeLoan";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', 'HomeeLoan helps homebuyers compare loans, calculate EMIs and apply with trusted banks. Learn about our mission, team and impact.');
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'HomeeLoan helps homebuyers compare loans, calculate EMIs and apply with trusted banks. Learn about our mission, team and impact.';
      document.head.appendChild(m);
    }
  }, []);

  // simple counter animation
  useEffect(() => {
    const observers = countersRef.current.map((el, i) => {
      if (!el) return null;
      let start = 0;
      const end = stats[i].value;
      const duration = 1200;
      let startTime = null;

      function step(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
      }
      return requestAnimationFrame(step);
    });

    return () => observers.forEach((id) => id && cancelAnimationFrame(id));
  }, []);

  return (
    <main className="max-w-auto mx-full px-6 lg:px-8 py-12 font-sans bg-gradient-to-r from-green-100 to-blue-100">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl pt-20 font-extrabold text-green-900 mb-3">Helping you find the right home loan — faster</h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-6">
          We compare top banks, calculate clear EMIs, and guide you through the process so you can make confident decisions.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/compare-loans" className="inline-flex items-center px-5 py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow hover:scale-105 transition-transform">
            Compare Loans
          </Link>
          <Link to="/emi-calculator" className="inline-flex items-center px-5 py-3 rounded-md border border-gray-200 text-gray-700 bg-white hover:shadow">
            Use EMI Calculator
          </Link>
        </div>
      </section>

      {/* Mission + How it works */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
        <article className="lg:col-span-1 p-6 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">Our mission is to simplify home financing for every homebuyer. We combine unbiased data, easy-to-use tools and trusted bank partnerships to help you compare options and choose the right loan.</p>
        </article>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Compare', desc: 'Side-by-side bank offers so you can evaluate rates and charges.' },
            { title: 'Calculate', desc: 'Accurate EMI and amortisation schedules to understand total cost.' },
            { title: 'Apply', desc: 'Assisted application process with partner banks for faster approvals.' },
          ].map((c, i) => (
            <motion.article key={i} whileHover={{ y: -6 }} className="p-5 bg-white rounded shadow">
              <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-gray-600">{c.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Timeline + Stats */}
      <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Our Story</h2>
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <ol className="flex gap-6 items-start md:items-center md:justify-between">
                {timeline.map((t, idx) => (
                  <li key={t.year} className="min-w-[180px] md:min-w-0">
                    <button
                      onClick={() => setActiveTimeline(idx)}
                      className={`w-full text-left p-4 rounded-lg border ${activeTimeline === idx ? 'border-green-400 bg-green-50' : 'border-gray-100 bg-white'} focus:outline-none`}
                      aria-expanded={activeTimeline === idx}
                    >
                      <div className="text-sm text-gray-500">{t.year}</div>
                      <div className="font-medium text-gray-900">{t.title}</div>
                      <div className="mt-2 text-sm text-gray-600 hidden md:block">{t.detail}</div>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold">{timeline[activeTimeline].title} — {timeline[activeTimeline].year}</h3>
              <p className="text-gray-600 mt-2">{timeline[activeTimeline].detail}</p>
            </div>
          </div>
        </div>

        <aside className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">By the numbers</h3>
          <div className="grid grid-cols-1 gap-4">
            {stats.map((s, i) => (
              <div key={s.label} className="flex justify-between items-center">
                <div>
                  <div ref={(el) => (countersRef.current[i] = el)} className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </div>
                <div className="w-24 h-10 bg-gradient-to-r from-green-200 to-blue-200 rounded" aria-hidden></div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Testimonials, Partners, Media */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">What our users say</h2>

          <div className="relative">
            <div className="min-h-[120px]">
              <blockquote className="text-gray-700">
                “{testimonials[activeTestimonial].quote}”
              </blockquote>
              <p className="mt-3 font-medium">— {testimonials[activeTestimonial].name}, <span className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</span></p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
                className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Prev
              </button>
              <button
                onClick={() => setActiveTestimonial((p) => (p + 1) % testimonials.length)}
                aria-label="Next testimonial"
                className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          {/* Partners logos strip */}
          <div className="flex-1 overflow-x-auto py-4">
            <div className="flex gap-6 items-center w-max">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-28 h-12 bg-gray-50 flex items-center justify-center rounded shadow-sm">
                  <span className="text-sm text-gray-500">Bank {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optional video or chart */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-sm font-semibold mb-2">Intro video</h4>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {/* Placeholder - replace src with hosted video or YouTube iframe */}
                <button className="text-green-600">Play video</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple chart placeholder */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Loan distribution (sample)</h2>
          <svg viewBox="0 0 200 100" className="w-full h-40" role="img" aria-label="Sample loan distribution chart">
            <rect x="0" y="60" width="30" height="40" fill="#34D399" />
            <rect x="40" y="30" width="30" height="70" fill="#60A5FA" />
            <rect x="80" y="45" width="30" height="55" fill="#F59E0B" />
            <rect x="120" y="10" width="30" height="90" fill="#A78BFA" />
            <rect x="160" y="70" width="30" height="30" fill="#F472B6" />
          </svg>
        </div>
      </section>

      {/* CTA + Contact */}
      <section className="mb-12 text-center">
        <div className="inline-block bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-6 rounded-md shadow-lg">
          <h3 className="text-lg font-semibold">Ready to find your home loan?</h3>
          <p className="text-sm text-white/90 mt-2">Start by comparing loans or using our EMI calculator — it's free and unbiased.</p>
          <div className="mt-4 flex gap-3 justify-center">
            <Link to="/compare-loans" className="px-4 py-2 bg-white text-green-600 rounded">Compare Loans</Link>
            <Link to="/emi-calculator" className="px-4 py-2 border border-white text-white rounded">EMI Calculator</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
