import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { FormField, FormFieldType } from "@/models/form";
import { SubmitHandler } from "react-hook-form";

export default function Home() {
  type FormData = {
    [key: string]: string | number | boolean | string[] | undefined;
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form data:", data);
  };

  const fields: FormField[] = [
    {
      type: FormFieldType.TEXT,
      label: "Name",
      key: "name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      type: FormFieldType.EMAIL,
      label: "Email",
      key: "email",
      placeholder: "Enter your email",
      required: true,
      pattern: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i",
      errorMessages: {
        required: "Email is required",
        pattern: "Invalid email address",
      },
    },
    {
      type: FormFieldType.SELECT,
      label: "Country",
      key: "country",
      placeholder: "Select your country",
      options: [
        { label: "USA", value: "usa" },
        { label: "Canada", value: "canada" },
        { label: "UK", value: "uk" },
      ],
      required: true,
    },
    {
      type: FormFieldType.TEXTAREA,
      label: "Message",
      key: "message",
      placeholder: "Enter your message",
      required: true,
    },
    {
      type: FormFieldType.CHECKBOX,
      label: "Subscribe to newsletter",
      key: "subscribe",
      checked: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto pt-20">
        <div className="shadow border rounded-xl p-6">
          <FormBuilder fields={fields} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
