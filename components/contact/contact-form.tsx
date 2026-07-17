"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  submitContactForm,
  type ContactFormState,
  type ContactFormErrors,
} from "@/app/actions/contact";

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
    <p className="mt-1 font-display text-[0.75rem] leading-none text-laterite">
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
    <div className="border-b border-[#464646]/15 pb-[0.8rem]">
      <label
        className="block font-display text-[clamp(1rem,1.25vw,1.125rem)] leading-none text-[#464646]"
        htmlFor={`contact-${name}`}
      >
        {label}
      </label>
      <input
        aria-describedby={errors?.[name] ? `contact-${name}-error` : undefined}
        aria-invalid={Boolean(errors?.[name])}
        autoComplete={autoComplete}
        className="mt-2 block w-full bg-transparent font-display text-[1rem] leading-none text-[#232323] outline-none"
        id={`contact-${name}`}
        name={name}
        required={required}
        type={type}
      />
      <div id={`contact-${name}-error`}>
        <FieldError errors={errors} name={name} />
      </div>
    </div>
  );
}

function MessageField({ errors }: { errors?: ContactFormErrors }) {
  return (
    <div className="border-b border-[#464646]/15 pb-[0.8rem]">
      <label
        className="block font-display text-[clamp(1rem,1.25vw,1.125rem)] leading-none text-[#232323]"
        htmlFor="contact-message"
      >
        Enter Your Message
      </label>
      <textarea
        aria-describedby={
          errors?.message ? "contact-message-error" : undefined
        }
        aria-invalid={Boolean(errors?.message)}
        className="mt-3 block min-h-[7.7rem] w-full resize-none bg-transparent font-display text-[1rem] leading-[1.45] text-[#232323] outline-none"
        id="contact-message"
        name="message"
        required
      />
      <div id="contact-message-error">
        <FieldError errors={errors} name="message" />
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-[2.625rem] flex h-[3.125rem] w-full items-center justify-between bg-[#4e4e4e] px-[0.75rem] font-display text-[1rem] leading-none text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      <span>{pending ? "Sending" : "Send Enquiry"}</span>
      <span aria-hidden="true" className="text-[1.35rem] leading-none">
        &rsaquo;
      </span>
    </button>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    submitContactForm,
    initialContactFormState,
  );

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      action={formAction}
      className="relative z-10 flex h-full flex-col px-[2.625rem] pb-[3.25rem] pt-[3.65rem]"
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
        <MessageField errors={state.errors} />
      </div>

      <div className="mt-auto">
        {state.message ? (
          <p
            className={`mb-[1rem] font-display text-[0.875rem] leading-[1.35] ${
              state.status === "success" ? "text-[#232323]" : "text-laterite"
            }`}
            role={state.status === "error" ? "alert" : "status"}
          >
            {state.message}
          </p>
        ) : null}
        <SubmitButton />
      </div>
    </form>
  );
}
