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
    formState,
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: Render form fields as defined in `fields` */}
      {fields.map((field) => {
        return (
          <div key={field.key} className="my-2">
            <p className="my-1">{field.label}</p>
            {field.type === FormFieldType.SELECT ? (
              <select
                {...register(field.key, { required: field.required })}
                className="select select-bordered w-full max-w-xs"
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
                {...register(field.key)}
                defaultChecked={field.checked}
                type="checkbox"
                className="checkbox"
              />
            ) : field.type === FormFieldType.RADIO ? (
              <input type="radio" className="radio" />
            ) : field.type === FormFieldType.TEXTAREA ? (
              <textarea
                {...register(field.key, { required: field.required })}
                className="textarea textarea-bordered"
                placeholder="Bio"
              ></textarea>
            ) : (
              <input
                type={field.type}
                {...register(field.key, {
                  required: field.required,
                })}
                className="input input-bordered w-full max-w-xs"
                placeholder={field.placeholder}
                disabled={field.disabled}
              />
            )}
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary btn-md">
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
