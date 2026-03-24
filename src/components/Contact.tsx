"use client";

import { useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus("idle");
  };

  const getButtonText = () => {
    if (status === "sending") return "Sending...";
    if (status === "success") return "Message Sent!";
    if (status === "error") return "Try Again";
    return "Send Message";
  };

  const getButtonIcon = () => {
    if (status === "sending") return (
      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
    );
    if (status === "success") return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
    if (status === "error") return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    );
    return (
      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    );
  };

  return (
    <section
      id="contact"
      className="sec-pad gradient-contact relative overflow-hidden scroll-mt-28"
    >
      {/* Floating gradients */}
      <div className="floating-gradient floating-gradient-1 opacity-20" />
      <div className="floating-gradient floating-gradient-2 opacity-15" />
      <div className="floating-gradient floating-gradient-3 opacity-25" />

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="main-container relative z-10">
        <h2 className="heading-sec animate-fade-in-up">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            📬 Let's Connect
          </span>
        </h2>
        <p className="heading-sec__sub text-center mb-16 animate-fade-in-up opacity-90">
          Don't hesitate to shoot me an e-mail! I'd love to hear from you.
        </p>

        <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "📧", title: "Email", sub: "Quick Response", from: "from-blue-500", to: "to-cyan-500", hover: "hover:border-blue-400/30" },
              { icon: "💼", title: "LinkedIn", sub: "Professional Network", from: "from-purple-500", to: "to-pink-500", hover: "hover:border-purple-400/30" },
              { icon: "💬", title: "Chat", sub: "Let's Talk", from: "from-green-500", to: "to-teal-500", hover: "hover:border-green-400/30" },
            ].map(({ icon, title, sub, from, to, hover }) => (
              <div key={title} className={`gradient-card p-6 rounded-2xl backdrop-blur-lg border border-white/10 text-center group ${hover} transition-all duration-300`}>
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${from} ${to} rounded-full flex items-center justify-center text-2xl`}>
                  {icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="gradient-card p-8 md:p-12 rounded-3xl backdrop-blur-lg border border-white/20 hover:border-white/30 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-3 text-white">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter Your Name"
                  required
                  className={`w-full px-6 py-4 rounded-xl text-base bg-gray-900/50 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                    focusedField === 'name'
                      ? 'border-blue-400 shadow-lg shadow-blue-400/20'
                      : 'border-gray-600/50 hover:border-gray-500/70'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-3 text-white">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter Your Email"
                  required
                  className={`w-full px-6 py-4 rounded-xl text-base bg-gray-900/50 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                    focusedField === 'email'
                      ? 'border-purple-400 shadow-lg shadow-purple-400/20'
                      : 'border-gray-600/50 hover:border-gray-500/70'
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-lg font-medium mb-3 text-white">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter Your Message"
                  required
                  rows={6}
                  className={`w-full px-6 py-4 rounded-xl text-base bg-gray-900/50 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none resize-vertical backdrop-blur-sm ${
                    focusedField === 'message'
                      ? 'border-pink-400 shadow-lg shadow-pink-400/20'
                      : 'border-gray-600/50 hover:border-gray-500/70'
                  }`}
                />
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`btn-gradient inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 group relative overflow-hidden ${
                    status === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    status === 'error'   ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                          'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                  } ${status === 'sending' ? 'cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/30'}`}
                >
                  {getButtonIcon()}
                  {getButtonText()}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none" />
                </button>
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="text-center p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm animate-fade-in-up">
                  <div className="flex items-center justify-center gap-2 text-green-300 font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Your message has been sent successfully! I'll get back to you soon.
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="text-center p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm animate-fade-in-up">
                  <div className="flex items-center justify-center gap-2 text-red-300 font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Something went wrong. Please try again later.
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}