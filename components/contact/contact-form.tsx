"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  submitContactForm,
  type ContactFormState,
  type ContactFormErrors,
} from "@/app/actions/contact";
import { CTA } from "@/components/ui/cta";
import styles from "./contact-section.module.css";

type FieldProps = {
  autoComplete?: string;
  errors?: ContactFormErrors;
  label: string;
  name: "email" | "location" | "message" | "name" | "phone";
  required?: boolean;
  type?: string;
};

const initialContactFormState: ContactFormState = {
  status: "idle",
};

function FieldError({
  errors,
  name,
}: {
  errors?: ContactFormErrors;
  name: FieldProps["name"];
}) {
  if (!errors?.[name]) {
    return null;
  }

  return (
    <p className={styles.fieldError}>
      {errors[name]}
    </p>
  );
}

function TextField({
  autoComplete,
  errors,
  label,
  name,
  required,
  type = "text",
}: FieldProps) {
  return (
    <div className={`relative border-b border-[#464646]/15 pb-[0.8rem] ${styles.field}`}>
      <label
        className="block [font-size:var(--contact-form-text-size)] leading-none text-[#464646]"
        htmlFor={`contact-${name}`}
      >
        {label}
      </label>
      <input
        aria-describedby={errors?.[name] ? `contact-${name}-error` : undefined}
        aria-invalid={Boolean(errors?.[name])}
        autoComplete={autoComplete}
        className="mt-2 block w-full bg-transparent [font-size:var(--contact-form-text-size)] leading-none text-[#232323] outline-none"
        id={`contact-${name}`}
        name={name}
        required={required}
        type={type}
      />
      <div className={styles.fieldErrorSlot} id={`contact-${name}-error`}>
        <FieldError errors={errors} name={name} />
      </div>
    </div>
  );
}

function ProjectSelect() {
  return (
    <div className="relative border-b border-[#464646]/15 pb-[0.8rem]">
      <label className="sr-only" htmlFor="contact-interested-project">
        Interested Project
      </label>
      <select
        className="block w-full appearance-none bg-transparent pr-[2.5rem] [font-size:var(--contact-form-text-size)] leading-none text-[#232323] outline-none"
        defaultValue=""
        id="contact-interested-project"
        name="interestedProject"
      >
        <option disabled value="">
          Interested Project
        </option>
        <option value="Vanam Villa">Vanam Villa</option>
        <option value="Zen Villa">Zen Villa</option>
        <option value="Nayan Villa">Nayan Villa</option>
        <option value="Villa Perola">Villa Perola</option>
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[0.65rem] top-[0.15rem] size-[0.55rem] rotate-45 border-b border-r border-[#232323]"
      />
    </div>
  );
}

function MessageField({ errors }: { errors?: ContactFormErrors }) {
  return (
    <div className={`relative border-b border-[#464646]/15 pb-[0.8rem] ${styles.field}`}>
      <label
        className="block [font-size:var(--contact-form-text-size)] leading-none text-[#232323]"
        htmlFor="contact-message"
      >
        Enter Your Message
      </label>
      <textarea
        aria-describedby={
          errors?.message ? "contact-message-error" : undefined
        }
        aria-invalid={Boolean(errors?.message)}
        className="mt-3 block min-h-[7.7rem] w-full resize-none bg-transparent [font-size:var(--contact-form-text-size)] leading-[1.45] text-[#232323] outline-none"
        id="contact-message"
        name="message"
        required
      />
      <div className={styles.fieldErrorSlot} id="contact-message-error">
        <FieldError errors={errors} name="message" />
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <CTA
      arrowClassName="text-[1.35rem] leading-none"
      className="mt-[1rem] flex h-[3.125rem] w-full items-center justify-between px-[0.75rem] [font-size:var(--contact-form-text-size)] leading-none disabled:cursor-not-allowed disabled:opacity-60"
      darkBackground="#4e4e4e"
      disabled={pending}
      type="submit"
      variant="dark"
    >
      {pending ? "Sending" : "Send Enquiry"}
    </CTA>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  const statusMessage = state.errors ? undefined : state.message;

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      action={formAction}
      className={`relative z-10 flex h-full flex-col px-[2.625rem] pb-[4rem] pt-[3.65rem] ${styles.form}`}
      noValidate
      ref={formRef}
    >
      <div className="space-y-[1.9rem]">
        <TextField
          autoComplete="name"
          errors={state.errors}
          label="Name"
          name="name"
          required
        />
        <TextField
          autoComplete="tel"
          errors={state.errors}
          label="Phone Number"
          name="phone"
          required
          type="tel"
        />
        <TextField
          autoComplete="email"
          errors={state.errors}
          label="Email Address"
          name="email"
          required
          type="email"
        />
        <TextField
          autoComplete="address-level2"
          errors={state.errors}
          label="Location"
          name="location"
        />
        <ProjectSelect />
        <MessageField errors={state.errors} />
      </div>

      <div className="mt-auto">
        <p
          aria-live="polite"
          className={`${styles.formStatus} ${
            statusMessage ? "visible" : "invisible"
          } ${
            state.status === "success" ? "text-[#D45231]" : "text-laterite"
          }`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {statusMessage ?? "\u00a0"}
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
