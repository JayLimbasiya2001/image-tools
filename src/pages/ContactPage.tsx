import { FormEvent, useState } from "react";
import { Seo } from "../seo/Seo";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Seo
        title="Contact – Pixeloop Tools"
        description="Contact the creator of Pixeloop Tools to ask questions, suggest features or report an issue with the free online image tools."
        path="/contact"
      />
      <section className="max-w-xl space-y-5">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
          Contact
        </h1>
        <p className="text-sm md:text-base text-slate-300">
          Have a feature request, found a bug, or want to collaborate? Use the form below
          to send a message. In a production deployment you can wire this form up to your
          preferred form backend or email service.
        </p>
        <form
          onSubmit={onSubmit}
          className="glass-panel p-5 space-y-4"
          aria-label="Contact form"
        >
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none focus:border-brand-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="message"
              className="block text-xs font-medium text-slate-200"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none focus:border-brand-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition"
          >
            Send message
          </button>
          {submitted && (
            <p className="text-[11px] text-brand-300">
              This demo form has been submitted locally. Connect it to a real backend to
              receive messages.
            </p>
          )}
        </form>
      </section>
    </>
  );
}

