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
type FormErrors = Partial<Record<keyof FormDetails, string>>;

const namePattern = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;

function validateField(field: keyof FormDetails, value: string): string | undefined {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "This field is required.";
  }

  if (field === "firstName" || field === "lastName") {
    if (trimmedValue.length < 2) return "Please enter at least 2 characters.";
    if (trimmedValue.length > 60) return "Please use 60 characters or fewer.";
    if (!namePattern.test(trimmedValue)) return "Please enter a valid name.";
  }

  if (field === "email") {
    if (trimmedValue.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmedValue)) {
      return "Please enter a valid email address.";
    }
  }

  if (field === "phone") {
    const digits = trimmedValue.replace(/\D/g, "");
    if (!/^[0-9+().\-\s]+$/.test(trimmedValue) || digits.length < 10 || digits.length > 15) {
      return "Please enter a valid 10–15 digit phone number.";
    }
  }

  if (field === "purchaseDate") {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmedValue);
    if (!match) return "Please select a valid purchase date.";
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
      return "Please select a valid purchase date.";
    }
  }

  return undefined;
}

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
  const [errors, setErrors] = useState<FormErrors>({});
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
    setErrors((current) => {
      if (!current[field]) return current;
      return { ...current, [field]: validateField(field, value) };
    });
  }

  function validateOnBlur(field: keyof FormDetails) {
    setErrors((current) => ({
      ...current,
      [field]: validateField(field, formDetails[field]),
    }));
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

    const nextErrors = (Object.keys(formDetails) as Array<keyof FormDetails>).reduce<FormErrors>((result, field) => {
      const error = validateField(field, formDetails[field]);
      if (error) result[field] = error;
      return result;
    }, {});

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidField = Object.keys(nextErrors)[0];
      event.currentTarget.querySelector<HTMLInputElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...Object.fromEntries(
        Object.entries(formDetails).map(([field, value]) => [field, value.trim()]),
      ),
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
          <p className="gift-card__eyebrow">
            <span className="gift-card__eyebrow-ornament" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
            A little luxury, beautifully given
            <span className="gift-card__eyebrow-ornament gift-card__eyebrow-ornament--right" aria-hidden="true">
              <svg viewBox="0 0 58 8"><path d="M1 4h43" /><path d="m50 1 3 3-3 3-3-3 3-3Z" /></svg>
            </span>
          </p>
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
                  src="/image/logo-miu-miu.webp"
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
          <form className="gift-card__form" onSubmit={submitRequest} noValidate>
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
              <label className={errors.firstName ? "has-error" : undefined}>
                <span>First name</span>
                <input name="firstName" autoComplete="given-name" maxLength={60} value={formDetails.firstName} onChange={(event) => updateField("firstName", event.target.value)} onBlur={() => validateOnBlur("firstName")} aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "firstName-error" : undefined} required />
                {errors.firstName && <small className="gift-card__field-error" id="firstName-error">{errors.firstName}</small>}
              </label>
              <label className={errors.lastName ? "has-error" : undefined}>
                <span>Last name</span>
                <input name="lastName" autoComplete="family-name" maxLength={60} value={formDetails.lastName} onChange={(event) => updateField("lastName", event.target.value)} onBlur={() => validateOnBlur("lastName")} aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "lastName-error" : undefined} required />
                {errors.lastName && <small className="gift-card__field-error" id="lastName-error">{errors.lastName}</small>}
              </label>
              <label className={errors.email ? "has-error" : undefined}>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" maxLength={160} value={formDetails.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => validateOnBlur("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} required />
                {errors.email && <small className="gift-card__field-error" id="email-error">{errors.email}</small>}
              </label>
              <label className={errors.phone ? "has-error" : undefined}>
                <span>Phone</span>
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} value={formDetails.phone} onChange={(event) => updateField("phone", event.target.value)} onBlur={() => validateOnBlur("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} required />
                {errors.phone && <small className="gift-card__field-error" id="phone-error">{errors.phone}</small>}
              </label>
              <label className={`gift-card__date${errors.purchaseDate ? " has-error" : ""}`}>
                <span>Purchase date</span>
                <input name="purchaseDate" type="date" value={formDetails.purchaseDate} onClick={(event) => event.currentTarget.showPicker?.()} onChange={(event) => updateField("purchaseDate", event.target.value)} onBlur={() => validateOnBlur("purchaseDate")} aria-invalid={Boolean(errors.purchaseDate)} aria-describedby={errors.purchaseDate ? "purchaseDate-error" : undefined} required />
                {errors.purchaseDate && <small className="gift-card__field-error" id="purchaseDate-error">{errors.purchaseDate}</small>}
              </label>
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
