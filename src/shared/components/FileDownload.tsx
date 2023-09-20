import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form"
import { FormControl, Label } from "@/shared/components";

import DocumentDownload from "../../pages/Form/components/document-download"


import SmsAlert from "../../pages/Form/assets/images/SMS ALERT INDEMNITY (1).pdf"


function FileDownload() {
  const { setValue, watch,  } = useFormContext()

  const selectedOption = watch("notificationPreference");

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue("notificationPreference", newValue);
  };

  return (
    <div className="mb-10 w-full">
      <Label labelName="Notification-Preference" required>
        Notification Preference
      </Label>
      <FormControl
        fieldName="notificationPreference"
        variant="select"
        options={[
          {
            label: "SMS Only",
            value: "SMS Only",
          },
          {
            label: "Email Only",
            value: "Email Only",
          },
          {
            label: "SMS and Email",
            value: "SMS and Email",
          },
        ]}
        id="notificationPreference"
        placeholder="Enter your Notification Preference"
        onChange={handleDropdownChange}
        value={selectedOption}
      />
      {/* Conditional rendering based on selectedOption */}
      {selectedOption === "Email Only" && (
          <div>
          <p
              aria-label="Description for customers in diaspora"
              className="border-t border-t-gray-400 pt-4"
          >
              Please download the SMS Alert Indemity Form ,Complete and
              attach in the Upload Document section.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
              <DocumentDownload
                  name="Sms Alert Indemity Form"
                  link={SmsAlert}
              />
          </div>

        

        
      </div>
      )}
    </div>
  );
}

export default FileDownload;
