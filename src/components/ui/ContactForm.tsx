"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { buttonClasses } from "./button";

const fieldClass =
  "mt-1.5 block w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-base text-ink placeholder:text-muted/70 focus:border-espresso focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

/** Front-end only: composes a WhatsApp message (or an email) from what the visitor typed. */
export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const text = () => `Hello, my name is ${name.trim()}.\n\n${message.trim()}`;

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappUrl(text()), "_blank", "noopener,noreferrer");
      }}
    >
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-ink">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          What are you looking for?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="For example: a white MALM bed, 160 × 200, in Dubai."
          className={`${fieldClass} resize-y`}
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className={buttonClasses("primary", "lg", "sm:flex-1")}>
          <WhatsAppIcon />
          Send on WhatsApp
        </button>
        <a
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Furniture enquiry")}&body=${encodeURIComponent(text())}`}
          className={buttonClasses("secondary", "lg", "sm:flex-1")}
        >
          Send by email
        </a>
      </div>
      <p className="text-sm text-muted">Your message opens in WhatsApp or your email app, ready to send. Nothing is stored on this website.</p>
    </form>
  );
}
