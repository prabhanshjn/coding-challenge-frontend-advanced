import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { FormField } from "@/models/form";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Toaster } from "react-hot-toast";

export default function Home() {
  type FormData = {
    [key: string]: string | number | boolean | string[] | undefined;
  };
  const [fields, setFields] = useState<FormField[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/formConfig")
      .then((response) => response.json())
      .then((data) => {
        setFields(data.fields);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching form configurations:", error);
      });
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form data:", data);
    fetch("/api/formSubmission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Form submission response:", responseData);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="min-h-screen">
      <Toaster />
      <div className="max-w-2xl mx-auto md:py-20 py-8">
        <div className="md:shadow md:border rounded-xl md:p-12 p-6">
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
          {isLoaded ? (
            <div className="md:p-6 md:mt-4 mt-12">
              <FormBuilder fields={fields} onSubmit={onSubmit} />
            </div>
          ) : (
            <div className="min-h-[90vh]">
              <p className="mt-12">The Form is Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
