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
        setFormData({ name: "", email: "", message: "" }); // Clear form on success
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setStatus("idle"); // Reset status when user types again
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getButtonText = () => {
    if (status === "sending") return "Sending...";
    if (status === "success") return "Message Sent!";
    if (status === "error") return "Try Again";
    return "Send Message";
  };

  const getButtonIcon = () => {
    if (status === "sending") return (
      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
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
    <section id="contact" className="sec-pad gradient-contact relative overflow-hidden">
      {/* Floating Contact-themed Elements */}
      <div className="floating-gradient floating-gradient-1 opacity-20"></div>
      <div className="floating-gradient floating-gradient-2 opacity-15"></div>
      <div className="floating-gradient floating-gradient-3 opacity-25"></div>
      
      {/* Communication Lines Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
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
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="gradient-card p-6 rounded-2xl backdrop-blur-lg border border-white/10 text-center group hover:border-blue-400/30 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl">
                📧
              </div>
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-sm text-gray-400">Quick Response</p>
            </div>
            
            <div className="gradient-card p-6 rounded-2xl backdrop-blur-lg border border-white/10 text-center group hover:border-purple-400/30 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                💼
              </div>
              <h3 className="font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-400">Professional Network</p>
            </div>
            
            <div className="gradient-card p-6 rounded-2xl backdrop-blur-lg border border-white/10 text-center group hover:border-green-400/30 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                💬
              </div>
              <h3 className="font-semibold text-white mb-2">Chat</h3>
              <p className="text-sm text-gray-400">Let's Talk</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="gradient-card p-8 md:p-12 rounded-3xl backdrop-blur-lg border border-white/20 hover:border-white/30 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium mb-3 text-white"
                >
                  Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    placeholder="Enter Your Name"
                    required
                    className={`w-full px-6 py-4 rounded-xl text-base bg-gray-900/50 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                      focusedField === 'name' 
                        ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                        : 'border-gray-600/50 hover:border-gray-500/70'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
                       style={{ opacity: focusedField === 'name' ? 1 : 0 }}></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium mb-3 text-white"
                >
                  Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    placeholder="Enter Your Email"
                    required
                    className={`w-full px-6 py-4 rounded-xl text-base bg-gray-900/50 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                      focusedField === 'email' 
                        ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                        : 'border-gray-600/50 hover:border-gray-500/70'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
                       style={{ opacity: focusedField === 'email' ? 1 : 0 }}></div>
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium mb-3 text-white"
                >
                  Message *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    placeholder="Enter Your Message"
                    required
                    rows={6}
                    className={`w-full px-6 py-4 rounded-xl text-base bg-gray-900/50 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none resize-vertical backdrop-blur-sm ${
                      focusedField === 'message' 
                        ? 'border-pink-400 shadow-lg shadow-pink-400/20' 
                        : 'border-gray-600/50 hover:border-gray-500/70'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
                       style={{ opacity: focusedField === 'message' ? 1 : 0 }}></div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className={`btn-gradient inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 group relative overflow-hidden ${
                    status === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                    status === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                    'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                  } ${status === 'sending' ? 'cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/30'}`}
                  disabled={status === "sending"}
                >
                  <span className="flex items-center gap-3">
                    {getButtonIcon()}
                    {getButtonText()}
                  </span>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                </button>
              </div>

              {/* Status Messages */}
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

          {/* Additional Contact Methods */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-gray-400 mb-6">Prefer other ways to connect?</p>
            <div className="flex justify-center gap-6">
              <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 group">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 group">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 group">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}