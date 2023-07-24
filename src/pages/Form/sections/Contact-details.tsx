import { Label } from "@/shared/components";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import LabelDecor from "../components/label-decor";
import SectionContainer from "../components/section";
import ContactDetailsFactory from "../utils/contact-details.factory";

export default function ContactDetails() {
  const { setValue, watch } = useFormContext();

  const [isDiaspora, setIsDiaspora] = useState("no");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue("isDiaspora", e.target.value);
    setIsDiaspora(e.target.value);
  };


  useEffect(() => {
    setIsDiaspora(watch("isDiaspora"))
  
  }, [watch("isDiaspora")])
  


  return (
    <SectionContainer>
      <h2 className="text-lg mb-8 heading">
        <LabelDecor text="3" /> Contact Details
      </h2>
      <div className="mb-10 ">
        <Label labelName="radio">Where are you located?</Label>

        <div className="flex gap-6 mt-8">
          <label htmlFor="nigeria" className="cursor-pointer ">
            <input
              type="radio"
              name="isDiaspora"
              value={"no"}
              onChange={handleChange}
              id="nigeria"
              className="peer/false mr-4 hidden"

              // checked={watch("isDiaspora")}
            />
            <span
              className={`${
                isDiaspora?.toLowerCase() === "no" ? "bg-blue-500 text-white " : ""
              }  border border-gray-400 rounded-sm p-4`}
            >
              Nigeria
            </span>
          </label>

          <label htmlFor="outside-nigeria" className="cursor-pointer ">
            <input
              type="radio"
              name="isDiaspora"
              value={"yes"}
              onChange={handleChange}
              id="outside-nigeria"
              className="peer/true mr-4 hidden"

              // checked={watch("isDiaspora")}
            />
            <span
              className={` border border-gray-400 rounded-sm p-4 ${
                isDiaspora?.toLowerCase() === "yes" ? "bg-blue-500 text-white " : ""
              }`}
            >
              Outside Nigeria
            </span>
          </label>
        </div>
      </div>
      <ContactDetailsFactory />
    </SectionContainer>
  );
}
