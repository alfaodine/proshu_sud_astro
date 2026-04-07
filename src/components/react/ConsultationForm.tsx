import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendEmail } from "../../lib/email";

const schema = yup.object({
  name: yup.string().required("Введіть ім'я"),
  phone: yup
    .string()
    .required("Введіть номер телефону")
    .matches(/^\d+$/, "Тільки цифри")
    .min(10, "Мінімум 10 цифр")
    .max(14, "Максимум 14 цифр"),
  comment: yup.string().required("Опишіть суть проблеми"),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  formId?: string;
  className?: string;
}

export default function ConsultationForm({ formId, className }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const file = fileRef.current?.files?.[0];
      await sendEmail({
        name: data.name,
        phone: data.phone,
        comment: data.comment,
        file,
      });
      reset();
      setFileName("");
      setShowSuccess(true);
    } catch (e) {
      console.error("Failed to send email:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form id={formId} className={className} onSubmit={handleSubmit(onSubmit)}>
        {formId === "modal_form" && <p>
          Вартість консультації <span>550 грн.</span> Якщо після консультації
          знадобляться додаткові послуги, то ця сума буде включено у вартість
          послуги.
        </p>}
        <label>
          Ваше ім'я
          <input type="text" placeholder="Іван" {...register("name")} />
          {errors.name && (
            <span className="error-log-show">{errors.name.message}</span>
          )}
        </label>
        <label>
          Ваш номер телефону
          <input type="text" placeholder="0508855888" {...register("phone")} />
          {errors.phone && (
            <span className="error-log-show">{errors.phone.message}</span>
          )}
        </label>
        <label>
          Опишіть суть проблеми
          <textarea cols={40} rows={5} {...register("comment")} />
          {errors.comment && (
            <span className="error-log-show">{errors.comment.message}</span>
          )}
        </label>
        <input
          type="file"
          accept="application/pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*"
          ref={fileRef}
          style={{ display: "none" }}
          id={`upload_${formId || "default"}`}
          onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
        />
        <label
          htmlFor={`upload_${formId || "default"}`}
          data-after={fileName || "Прикріпити файл"}
          style={{
            display: "inline-block",
            position: "relative",
            width: "3em",
            height: "3em",
            background: "#C5232D url(/img/svg/pin-icon.svg) no-repeat center",
            borderRadius: "50px",
            color: "white",
            padding: "0.5rem",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Надсилається..." : "Надіслати"}
        </button>
      </form>

      {showSuccess && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <div className="modal-body">
              <span
                className="close close-info"
                onClick={() => setShowSuccess(false)}
              >
                &times;
              </span>
              <div className="model-content-info" style={{ padding: "5%" }}>
                <p>Дякуємо! Ми скоро з Вами зв'яжемось.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
