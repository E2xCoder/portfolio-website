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

  const getButtonText = () => {
    if (status === "sending") return "Sending...";
    if (status === "success") return "Message Sent!";
    if (status === "error") return "Try Again";
    return "Submit";
  };

  return (
    <section
      id="contact"
      className="sec-pad transition-colors duration-300"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="main-container">
        <h2 className="heading-sec animate-fade-in-up">
          <span style={{ color: 'var(--color-text-primary)' }}>Contact</span>
        </h2>
        <p className="heading-sec__sub text-center mb-16 animate-fade-in-up">
          Don't hesitate to shoot me an e-mail!
        </p>

        <div className="max-w-2xl mx-auto animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium mb-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                required
                className="form-input w-full px-5 py-3 rounded-lg text-base focus:outline-none transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium mb-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                required
                className="form-input w-full px-5 py-3 rounded-lg text-base focus:outline-none transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium mb-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter Your Message"
                required
                rows={8}
                className="form-input w-full px-5 py-3 rounded-lg text-base focus:outline-none transition-all duration-300 resize-vertical"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`btn w-full sm:w-auto ${status === 'success' ? 'bg-green-600 hover:bg-green-700' : ''} ${status === 'error' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                disabled={status === "sending"}
              >
                {getButtonText()}
              </button>
            </div>
            {status === "success" && (
              <p className="text-center text-green-500 mt-4">Your message has been sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-center text-red-500 mt-4">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
