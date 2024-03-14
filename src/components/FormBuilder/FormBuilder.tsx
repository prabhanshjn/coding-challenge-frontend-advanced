import { FormField, FormFieldType, FormSubmitData } from "@/models/form";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

/**
 * Component for rendering a dynamic form based on provided fields.
 * @param fields - Array of form fields to render.
 * @param onSubmit - Function to handle form submission.
 */

const FormBuilder = ({
  fields,
  onSubmit: onSubmit = () => {},
}: {
  fields: FormField[];
  onSubmit?: SubmitHandler<FormSubmitData>; // TODO: Define appropriate type
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    setError,
    getValues,
    watch,
    trigger,
    reset,
  } = useForm({
    mode: "onChange", //This means that the validation will be checked on every change of field
  });

  //Reset the form after successful submission for better UX
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: Render form fields as defined in `fields` */}
      <div className="flex flex-col gap-4 justify-center">
        {fields.map((field) => {
          return (
            <div key={field.key}>
              {/* Render label with optional asterisk for required fields */}
              <p className="mb-3">
                {field.label}
                {field.required && "*"}
              </p>
              {/* Render appropriate input or field based on field type */}
              {field.type === FormFieldType.SELECT ? (
                //SelectBox Input
                <select
                  {...register(field.key, {
                    required: field.required && field.errorMessages?.required,
                    value: field.value,
                  })}
                  className="select select-bordered w-full"
                >
                  <option disabled={true} selected>
                    {field.placeholder}
                  </option>
                  {field.options?.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      selected={option.selected}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === FormFieldType.CHECKBOX ? (
                //Checkbox Input
                <input
                  {...register(field.key, {
                    required: field.required
                      ? field.errorMessages?.required
                      : undefined,
                    value: field.value,
                  })}
                  defaultChecked={field.checked}
                  type="checkbox"
                  className="checkbox border-gray-100"
                />
              ) : field.type === FormFieldType.RADIO ? (
                //Radiobutton Input
                <div className="flex flex-row gap-6 my-2">
                  {field.options?.map((option) => (
                    <div key={option.value}>
                      <label className="flex items-center">
                        <input
                          {...register(field.key, {
                            required:
                              field.required && field.errorMessages?.required,
                            disabled: option.disabled,
                            value: option.value,
                          })}
                          type="radio"
                          className="radio border-gray-100"
                          value={option.value}
                          defaultChecked={option.value === field.value}
                        />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ) : field.type === FormFieldType.TEXTAREA ? (
                //TextArea Input
                <textarea
                  {...register(field.key, {
                    required: field.required && field.errorMessages?.required,
                    value: field.value,
                    maxLength: field.maxLength && {
                      value: field.maxLength,
                      message: field.errorMessages?.maxLength || "",
                    },

                    minLength: field.minLength && {
                      value: field.minLength,
                      message: field.errorMessages?.minLength || "",
                    },
                  })}
                  className="textarea textarea-bordered w-full"
                  placeholder={field.placeholder}
                  readOnly={field.readonly}
                ></textarea>
              ) : (
                //Default Input with dynamic input type
                <input
                  type={field.type}
                  {...register(field.key, {
                    value: field.value,
                    disabled: field.disabled,
                    required: field.required && field.errorMessages?.required,
                    pattern: field.pattern
                      ? {
                          value: new RegExp(field.pattern),
                          message: field.errorMessages?.pattern || "",
                        }
                      : undefined,
                    max: field.max && {
                      value: field.max,
                      message: field.errorMessages?.max || "",
                    },
                    maxLength: field.maxLength && {
                      value: field.maxLength,
                      message: field.errorMessages?.maxLength || "",
                    },
                    min: field.min && {
                      value: field.min,
                      message: field.errorMessages?.min || "",
                    },
                    minLength: field.minLength && {
                      value: field.minLength,
                      message: field.errorMessages?.minLength || "",
                    },
                  })}
                  className="input input-bordered w-full "
                  placeholder={field.placeholder}
                  readOnly={field.readonly}
                  size={field.size}
                  step={field.step}
                />
              )}
              {/* Render error message if validation fails on every onChange */}
              {errors[field.key] && (
                <p className="text-sm font-medium text-red-300 my-1">
                  {errors[field.key]?.message?.toString()}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary btn-md w-full mt-6 disabled:opacity-50 disabled:bg-gray-400 disabled:text-white"
      >
        {/* Loading spinner during form submission */}
        {isSubmitting && <span className="loading loading-spinner"></span>}
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
