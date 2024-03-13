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
      label: "Text Field",
      key: "text",
      placeholder: "Enter text",
      required: true,
      errorMessages: {
        required: "Text is required",
      },
    },
    {
      type: FormFieldType.EMAIL,
      label: "Email Field",
      key: "email",
      placeholder: "Enter email",
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      errorMessages: {
        required: "Email is required",
        pattern: "Invalid email address",
      },
    },
    {
      type: FormFieldType.TEL,
      label: "Telephone Field",
      key: "tel",
      placeholder: "Enter telephone",
      required: true,
      errorMessages: {
        required: "Telephone is required",
      },
    },
    {
      type: FormFieldType.DATE,
      label: "Date Field",
      key: "date",
      placeholder: "Select date",
      required: true,
      errorMessages: {
        required: "Date is required",
      },
    },
    {
      type: FormFieldType.DATETIME,
      label: "Datetime Field",
      key: "datetime",
      placeholder: "Select datetime",
      required: true,
      errorMessages: {
        required: "Datetime is required",
      },
    },
    {
      type: FormFieldType.TIME,
      label: "Time Field",
      key: "time",
      placeholder: "Select time",
      required: true,
      errorMessages: {
        required: "Time is required",
      },
    },
    {
      type: FormFieldType.URL,
      label: "URL Field",
      key: "url",
      placeholder: "Enter URL",
      required: true,
      errorMessages: {
        required: "URL is required",
      },
    },
    {
      type: FormFieldType.PASSWORD,
      label: "Password Field",
      key: "password",
      placeholder: "Enter password",
      required: true,
      errorMessages: {
        required: "Password is required",
      },
    },
    {
      type: FormFieldType.HIDDEN,
      label: "",
      key: "hidden",
      value: "hidden-value",
    },
    {
      type: FormFieldType.NUMBER,
      label: "Number Field",
      key: "number",
      placeholder: "Enter number",
      required: true,
      errorMessages: {
        required: "Number is required",
      },
    },
    {
      type: FormFieldType.SELECT,
      label: "Select Field",
      key: "select",
      placeholder: "Select option",
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ],
      required: true,
      errorMessages: {
        required: "Selection is required",
      },
    },
    {
      type: FormFieldType.TEXTAREA,
      label: "Textarea Field",
      key: "textarea",
      placeholder: "Enter text",
      required: true,
      errorMessages: {
        required: "Text is required",
      },
    },
    {
      type: FormFieldType.CHECKBOX,
      label: "Checkbox Field",
      key: "checkbox",
      checked: false,
      errorMessages: {}, // No specific error messages for checkbox
    },
    {
      type: FormFieldType.RADIO,
      label: "Radio Field",
      key: "radio",
      options: [
        { label: "Option A", value: "optionA" },
        { label: "Option B", value: "optionB" },
        { label: "Option C", value: "optionC" },
      ],
      required: true,
      errorMessages: {
        required: "Selection is required",
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto py-20">
        <div className="shadow border rounded-xl p-12">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Sample Form</h1>
              <p className="text-sm font-light my-1">
                This is a form built on React Hook Forms and Tailwind CSS
              </p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="24"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#74C0FC"
                  d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
                />
              </svg>
            </div>
          </div>
          <div className="p-6">
            <FormBuilder fields={fields} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
