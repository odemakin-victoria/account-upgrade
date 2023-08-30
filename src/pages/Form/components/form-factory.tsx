import {
  FormControl,
  Label,
} from "@/shared/components";
import { Controller, useFormContext } from "react-hook-form";
import { FiExternalLink } from "react-icons/fi";
import AccountDetails from "../sections/Account-details";
import ContactDetails from "../sections/Contact-details";
import Diaspora from "../sections/diaspora";
import MeansofIdentification from "../sections/means-of-identification";
import PersonalDetails from "../sections/Personal-details";

export default function FormFactory({ step }: { step: number }) {
  const { watch, setValue } = useFormContext();

  switch (step) {
    case 0:
      return (
          <section className="bg-white p-4 py-10">
            <div className="mb-6">
              <Label labelName="accountNumber">Account Number</Label>
              <FormControl
                fieldName="accountNumber"
                variant="input"
                id="accountNumber"
                type="text"
                placeholder="Enter your account number"
              />
            </div>
            <div className="mb-6">
              <Label labelName="date-of-birth">Date of Birth</Label>
              

              <FormControl
                fieldName="dateOfBirth"
                variant="DatePicker"
                id="date-of-birth"
                placeholder="Enter your Date of birth "
                
              />
            </div>

          
          </section>
      );
    case 1:
      return (
        <section className="bg-white p-4">
          <AccountDetails />
          <PersonalDetails />
          <ContactDetails />
          <MeansofIdentification />

          {watch("isDiaspora") === "yes" && <Diaspora />}

          <div className="flex items-center  mt-10 mb-4">
            <Controller
              name="acceptedTerms"
              render={({ fieldState, ...fieldProps }) => (
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      {...fieldProps}
                      checked={fieldProps.field.value}
                      type="checkbox"
                      id="acceptedTerms"
                      aria-label="accept-terms"
                      onChange={(e) =>
                        setValue("acceptedTerms", e.target.checked)
                      }
                      className="bg-white border border-gray-300 rounded mr-2 h-7 w-7"
                    />

                    <p>
                      I accept the{" "}
                      <a
                        href="https://www.optimusbank.com/terms-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-400 inline-flex items-center"
                      >
                        Terms and Conditions. <FiExternalLink />
                      </a>
                    </p>
                  </div>
                  {fieldState.error && fieldState.error.message && (
                    <p
                      className="text-red-400 text-base mt-4"
                      aria-label="error message"
                    >
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </section>
      );
    default:
      return null;
  }
}
