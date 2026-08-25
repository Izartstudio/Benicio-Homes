"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitBrochureForm,
  type BrochureFormErrors,
  type BrochureFormState,
} from "@/app/actions/brochure";
import { CTA } from "@/components/ui/cta";
import { OptimizedImage } from "@/components/ui/optimized-image";
import styles from "./brochure-prompt.module.css";

const initialState: BrochureFormState = { status: "idle" };
export const OPEN_BROCHURE_FORM_EVENT = "benicio:open-brochure-form";

type BrochurePromptProps = {
  projectSlug: string;
};

function BrochureField({
  autoComplete,
  errors,
  label,
  name,
  type = "text",
}: {
  autoComplete: string;
  errors?: BrochureFormErrors;
  label: string;
  name: "email" | "name" | "phone";
  type?: string;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={`brochure-${name}`}>{label}</label>
      <input
        aria-invalid={Boolean(errors?.[name])}
        autoComplete={autoComplete}
        id={`brochure-${name}`}
        name={name}
        required
        type={type}
      />
      {errors?.[name] ? <p className={styles.error}>{errors[name]}</p> : null}
    </div>
  );
}

function BrochureSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.submit} disabled={pending} type="submit">
      <span>{pending ? "Submitting" : "Download Project Brochure"}</span>
      <span aria-hidden="true">›</span>
    </button>
  );
}

function BrochureForm({ projectSlug }: BrochurePromptProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useActionState(
    submitBrochureForm,
    initialState,
  );

  useEffect(() => {
    if (formState.status !== "success") return;

    formRef.current?.reset();

    const downloadLink = document.createElement("a");
    downloadLink.href = `/assets/pdf/${projectSlug}.pdf`;
    downloadLink.download = `${projectSlug}-brochure.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }, [formState.status, formState.submissionId, projectSlug]);

  return (
    <form action={formAction} className={styles.brochureForm} ref={formRef}>
      <div className={styles.formTexture} aria-hidden="true">
        <OptimizedImage
          alt=""
          className={styles.formTextureImage}
          fill
          quality={75}
          sizes="(max-width: 767px) 100vw, 38rem"
          src="/assets/textures/formbgtexture.webp"
        />
      </div>
      <div className={styles.formContent}>
        <header>
          <h3>VANAM VILLAS</h3>
        </header>
        <div className={styles.fields}>
          <BrochureField autoComplete="name" errors={formState.errors} label="Full Name" name="name" />
          <BrochureField autoComplete="tel" errors={formState.errors} label="Phone Number" name="phone" type="tel" />
          <BrochureField autoComplete="email" errors={formState.errors} label="Email Address" name="email" type="email" />
        </div>
        {formState.message ? (
          <p className={formState.status === "success" ? styles.success : styles.formError} role={formState.status === "error" ? "alert" : "status"}>
            {formState.message}
          </p>
        ) : null}
        <BrochureSubmitButton />
      </div>
    </form>
  );
}

export function BrochurePrompt({ projectSlug }: BrochurePromptProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogTitleId = useId();

  useEffect(() => {
    const openBrochureForm = () => setIsOpen(true);
    window.addEventListener(OPEN_BROCHURE_FORM_EVENT, openBrochureForm);
    return () => window.removeEventListener(OPEN_BROCHURE_FORM_EVENT, openBrochureForm);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <section className={styles.section} aria-label="Project brochure">
        <div className={styles.copyBlock}>
          <p data-project-brochure-copy>
            Every aspect serves a reason. Discover the full concept behind
            Vanam Villas.
          </p>
          <CTA
            className={styles.cta}
            darkBackground="#575757"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            Download Brochure
          </CTA>
        </div>
        <div className={styles.rule} aria-hidden="true">
          <span />
          <i />
        </div>
      </section>

      {isOpen ? (
        <div
          className={styles.backdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
          role="presentation"
          style={{
            backdropFilter: "blur(18px) saturate(0.85)",
            WebkitBackdropFilter: "blur(18px) saturate(0.85)",
          }}
        >
          <section
            aria-labelledby={dialogTitleId}
            aria-modal="true"
            className={styles.dialog}
            role="dialog"
          >
            <h2 className="sr-only" id={dialogTitleId}>
              Download brochure form
            </h2>
            <button
              aria-label="Close brochure form"
              className={styles.close}
              onClick={() => setIsOpen(false)}
              type="button"
            >
              ×
            </button>
            <BrochureForm projectSlug={projectSlug} />
          </section>
        </div>
      ) : null}
    </>
  );
}
