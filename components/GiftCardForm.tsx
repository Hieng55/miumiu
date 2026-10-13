"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Image from "next/image";
import { Check, Gift, Phone } from "lucide-react";
import Swal from "sweetalert2";

const presetAmounts = [50, 100, 150, 200, 250];

type FormDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  purchaseDate: string;
};

type GiftCardDetails = FormDetails & { amount: string };

function salonDate() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function displayDate(value: string) {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${month}/${day}/${year}` : "Select a date";
}

const initialDetails: FormDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  purchaseDate: salonDate(),
};

export default function GiftCardForm() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [formDetails, setFormDetails] = useState(initialDetails);
  const [details, setDetails] = useState<GiftCardDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedAmount = useMemo(
    () => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(selectedAmount),
    [selectedAmount],
  );

  const enteredName = `${formDetails.firstName} ${formDetails.lastName}`.trim();
  const cardName = enteredName ? enteredName.toLocaleUpperCase("en-US") : "Someone special";
  const cardDate = displayDate(formDetails.purchaseDate);

  function updateField(field: keyof FormDetails, value: string) {
    setFormDetails((current) => ({ ...current, [field]: value }));
  }

  function tiltCard(event: MouseEvent<HTMLDivElement>) {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--card-rotate-x", `${(0.5 - y) * 10}deg`);
    card.style.setProperty("--card-rotate-y", `${(x - 0.5) * 12}deg`);
    card.style.setProperty("--card-shine-x", `${x * 100}%`);
    card.style.setProperty("--card-shine-y", `${y * 100}%`);
  }

  function resetCard(event: MouseEvent<HTMLDivElement>) {
    const card = event.currentTarget;
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
    card.style.setProperty("--card-shine-x", "50%");
    card.style.setProperty("--card-shine-y", "50%");
  }

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formDetails,
      amount: selectedAmount,
      website: String(new FormData(event.currentTarget).get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/gift-card.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || "We could not send your request. Please try again.");
      }

      await Swal.fire({
        icon: "success",
        iconColor: "#a86f26",
        title: "Request sent!",
        text: "Miu Miu Nail Design has received your gift card request and will contact you shortly.",
        confirmButtonText: "Done",
        confirmButtonColor: "#31241c",
        background: "#fffaf3",
        color: "#31241c",
        customClass: { popup: "miumiu-sweet-alert" },
      });
      setDetails({ ...formDetails, amount: formattedAmount });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Request not sent",
        text: error instanceof Error ? error.message : "We could not send your request. Please try again.",
        confirmButtonText: "Try again",
        confirmButtonColor: "#31241c",
        background: "#fffaf3",
        color: "#31241c",
        customClass: { popup: "miumiu-sweet-alert" },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="gift-card__hero" aria-labelledby="gift-card-title">
      <div className="gift-card__intro">
        <div className="gift-card__copy">
          <p className="gift-card__eyebrow"><span /> A little luxury, beautifully given <span /></p>
          <h1 id="gift-card-title">The gift of <em>feeling beautiful.</em></h1>
          <p className="gift-card__lead">
            Treat someone special to time just for them. Miu Miu gift cards can be
            used toward any salon service and never go out of style.
          </p>
        </div>

        <div className="gift-card__preview-stage">
          <div
            className="gift-card__preview"
            style={{ "--card-rotate-x": "0deg", "--card-rotate-y": "0deg", "--card-shine-x": "50%", "--card-shine-y": "50%" } as CSSProperties}
            onMouseMove={tiltCard}
            onMouseLeave={resetCard}
            role="img"
            aria-label={`Gift card preview for ${cardName}, ${formattedAmount}`}
          >
            <div className="gift-card__preview-shine" aria-hidden="true" />
            <div className="gift-card__preview-grain" aria-hidden="true" />
            <div className="gift-card__preview-top">
              <span className="gift-card__preview-logo">
                <Image
                  src="/image/clear-logo.webp"
                  alt="Miu Miu Nail Design"
                  width={420}
                  height={435}
                />
              </span>
            </div>
            <div className="gift-card__preview-title">
              <small>A moment of beauty</small>
              <strong>Gift Card</strong>
            </div>
            <div className="gift-card__preview-details">
              <span><small>Gifted to</small><strong key={cardName}>{cardName}</strong></span>
              <span><small>Value</small><strong key={formattedAmount}>{formattedAmount}</strong></span>
              <span><small>Purchase date</small><strong key={cardDate}>{cardDate}</strong></span>
            </div>
            {(formDetails.email || formDetails.phone) && (
              <p className="gift-card__preview-contact" key={`${formDetails.email}-${formDetails.phone}`}>
                {[formDetails.email, formDetails.phone].filter(Boolean).join("  •  ")}
              </p>
            )}
          </div>
        </div>

        <p className="gift-card__live-note"><span aria-hidden="true" /> Live preview — your details appear on the card</p>

        <ul className="gift-card__benefits">
          <li><span>01</span> Choose from five gift values</li>
          <li><span>02</span> Redeem toward any salon service</li>
          <li><span>03</span> Finalize securely with our salon team</li>
        </ul>
      </div>

      <div className="gift-card__form-wrap">
        {details ? (
          <div className="gift-card__confirmation" role="status">
            <span className="gift-card__confirmation-icon"><Check aria-hidden="true" /></span>
            <p className="gift-card__kicker">Your request is ready</p>
            <h2>One last step.</h2>
            <p>
              Contact the salon to securely complete payment. Your gift card request
              is for <strong>{details.amount}</strong> under {details.firstName} {details.lastName}.
            </p>
            <div className="gift-card__confirmation-actions">
              <a href="tel:+14089603611">
                <Phone aria-hidden="true" /> Call (408) 960-3611
              </a>
            </div>
            <button type="button" onClick={() => setDetails(null)}>Edit details</button>
          </div>
        ) : (
          <form className="gift-card__form" onSubmit={submitRequest}>
            <label className="gift-card__honeypot" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <div className="gift-card__form-heading">
              <span><Gift aria-hidden="true" /></span>
              <div>
                <p className="gift-card__kicker">Gift card details</p>
                <h2>Create your gift</h2>
              </div>
            </div>

            <fieldset className="gift-card__amounts">
              <legend>Choose an amount</legend>
              <div>
                {presetAmounts.map((preset) => (
                  <button
                    className={selectedAmount === preset ? "is-selected" : ""}
                    type="button"
                    aria-pressed={selectedAmount === preset}
                    onClick={() => setSelectedAmount(preset)}
                    key={preset}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="gift-card__fields">
              <label><span>First name</span><input name="firstName" autoComplete="given-name" value={formDetails.firstName} onChange={(event) => updateField("firstName", event.target.value)} required /></label>
              <label><span>Last name</span><input name="lastName" autoComplete="family-name" value={formDetails.lastName} onChange={(event) => updateField("lastName", event.target.value)} required /></label>
              <label><span>Email</span><input name="email" type="email" autoComplete="email" value={formDetails.email} onChange={(event) => updateField("email", event.target.value)} required /></label>
              <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" value={formDetails.phone} onChange={(event) => updateField("phone", event.target.value)} required /></label>
              <label className="gift-card__date"><span>Purchase date</span><input name="purchaseDate" type="date" value={formDetails.purchaseDate} onChange={(event) => updateField("purchaseDate", event.target.value)} required /></label>
            </div>

            <p className="gift-card__payment-note">
              Your request will be sent directly to the salon. Our team will contact
              you to complete payment securely.
            </p>
            <button className="gift-card__submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending request…" : `Continue with ${formattedAmount}`} {!isSubmitting && <span aria-hidden="true">→</span>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
