import { FormField, FormFieldType } from "@/models/form";
import { NextApiRequest, NextApiResponse } from "next";

// Array of form fields with detailed configurations
const formFields: FormField[] = [
  {
    type: FormFieldType.TEXT,
    label: "Name",
    key: "text",
    placeholder: "Enter Name",
    required: true,
    errorMessages: {
      required: "Text is required",
      maxLength: "Max Length is 50 Characters",
    },
    maxLength: 50,
  },
  {
    type: FormFieldType.EMAIL,
    label: "Email",
    key: "email",
    placeholder: "Enter email",
    required: true,
    pattern: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$`,
    errorMessages: {
      required: "Email is required",
      pattern: "Invalid email address",
    },
    maxLength: 100,
  },
  {
    type: FormFieldType.TEL,
    label: "Telephone",
    key: "tel",
    placeholder: "Enter telephone",
    maxLength: 12,
    required: true,
    pattern: "^[0-9]{8,12}$",
    errorMessages: {
      maxLength: "Number should be less than 12 digits",
      required: "Telephone is required",
      pattern: "Invalid telephone number",
    },
  },
  {
    type: FormFieldType.DATE,
    label: "Date",
    key: "date",
    placeholder: "Select date",
    required: true,
    errorMessages: {
      required: "Date is required",
    },
  },
  {
    type: FormFieldType.DATETIME,
    label: "Datetime",
    key: "datetime",
    placeholder: "Select datetime",
    required: false,
    errorMessages: {
      required: "Datetime is required",
    },
  },
  {
    type: FormFieldType.TIME,
    label: "Time",
    key: "time",
    placeholder: "Select time",
    required: true,
    errorMessages: {
      required: "Time is required",
    },
    disabled: true,
  },
  {
    type: FormFieldType.URL,
    label: "URL",
    key: "url",
    placeholder: "Enter URL",
    required: true,
    pattern: `^(ftp|http|https):\/\/[^ "]+$`,
    errorMessages: {
      required: "URL is required",
      pattern: "Invalid URL",
    },
  },
  {
    type: FormFieldType.PASSWORD,
    label: "Password",
    key: "password",
    placeholder: "Enter password",
    required: true,
    minLength: 8,
    errorMessages: {
      required: "Password is required",
      minLength: "Password must be at least 8 characters long",
    },
  },
  {
    type: FormFieldType.NUMBER,
    label: "Number",
    key: "number",
    placeholder: "Enter number",
    required: true,
    min: 20,
    max: 100,
    pattern: "^[0-9]+$",
    step: 3,
    errorMessages: {
      required: "Number is required",
      pattern: "Please enter a number only",
      min: "Number must be greater than or equal to 20",
      max: "Number must be less than or equal to 100",
    },
  },
  {
    type: FormFieldType.SELECT,
    label: "SelectBox",
    key: "select",
    placeholder: "Select option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", selected: true },
      { label: "Option 3", value: "option3", disabled: true },
    ],

    required: true,
    errorMessages: {
      required: "Selection is required",
    },
  },
  {
    type: FormFieldType.TEXTAREA,
    label: "Textarea",
    key: "textarea",
    placeholder: "Enter text",
    required: true,
    maxLength: 200,
    errorMessages: {
      required: "Text is required",
      maxLength: "Text must be less than or equal to 200 characters",
    },
    value: "This is a readonly text area",
    readonly: true,
  },
  {
    type: FormFieldType.CHECKBOX,
    label: "Checkbox",
    key: "checkbox",
    checked: true,
  },
  {
    type: FormFieldType.RADIO,
    label: "Radiobutton Options",
    key: "radio",
    options: [
      { label: "Option A", value: "optionA" },
      { label: "Option B", value: "optionB" },
      { label: "Option C", value: "optionC", disabled: true },
    ],
    required: true,
    errorMessages: {
      required: "Selection is required",
    },
  },
  {
    type: FormFieldType.HIDDEN,
    label: "",
    key: "hidden",
    value: "hidden-value",
  },
];

/**
 * Handles form configuration API requests.
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 */
const formConfigHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const formConfig = {
    fields: formFields,
  };

  //Respond with status 200 - OK and send form configuration as JSON
  res.status(200).json(formConfig);
};

export default formConfigHandler;
