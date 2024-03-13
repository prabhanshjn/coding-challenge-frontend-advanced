import { FormField, FormFieldType } from "@/models/form";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  [key: string]: string | number | boolean | string[] | undefined;
};

type FormSubmitHandler = SubmitHandler<FormData>;

const FormBuilder = ({
  fields,
  onSubmit: onSubmit = () => {},
}: {
  fields: FormField[];
  onSubmit?: FormSubmitHandler; // TODO: Define appropriate type
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    setValue,
    setError,
    getValues,
    watch,
    trigger,
    reset,
  } = useForm({
    mode: "onChange",
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: Render form fields as defined in `fields` */}
      <div className="flex flex-col gap-4 justify-center">
        {fields.map((field) => {
          return (
            <div key={field.key}>
              <p className="mb-3">
                {field.label}
                {field.required && "*"}
              </p>
              {field.type === FormFieldType.SELECT ? (
                <select
                  {...register(field.key, { required: field.required })}
                  className="select select-bordered   w-full"
                >
                  <option disabled={true} selected>
                    {field.placeholder}
                  </option>
                  {field.options?.map((option) => (
                    <option
                      selected={option.selected}
                      disabled={option.disabled}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === FormFieldType.CHECKBOX ? (
                <input
                  {...register(field.key, {
                    required: field.required
                      ? field.errorMessages?.required
                      : undefined,
                  })}
                  defaultChecked={field.checked}
                  type="checkbox"
                  className="checkbox"
                />
              ) : field.type === FormFieldType.RADIO ? (
                <div className="flex flex-row gap-6 my-2">
                  {field.options?.map((option) => (
                    <div>
                      <label className="flex items-center">
                        <input
                          {...register(field.key, { required: field.required })}
                          type="radio"
                          className="radio"
                        />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ) : field.type === FormFieldType.TEXTAREA ? (
                <textarea
                  {...register(field.key, {
                    required: field.required
                      ? field.errorMessages?.required
                      : undefined,
                  })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Bio"
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  {...register(field.key, {
                    required: field.required
                      ? field.errorMessages?.required
                      : undefined,
                    pattern: field.pattern,
                    max: field.max,
                    maxLength: field.maxLength,
                    min: field.min,
                    minLength: field.minLength,
                  })}
                  className="input input-bordered w-full "
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  readOnly={field.readonly}
                  size={field.size}
                  step={field.step}
                />
              )}
              {errors[field.key] && (
                <p className="text-sm font-medium text-red-300 my-1">
                  {errors[field.key]?.message?.toString()}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button type="submit" className="btn btn-primary btn-md w-full mt-6">
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
