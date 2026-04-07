import { useState } from "react";
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
    comment: yup.string().optional().default(''),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  formId?: string;
  className?: string;
}

export default function ConsultationForm({ formId, className }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      await sendEmail({
        name: data.name,
        phone: data.phone,
        comment: data.comment,
      });
      reset();
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
          Вартість консультації <span>1000 грн.</span> Якщо після консультації
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
