import { FormControl, Label } from "@/shared/components";
import LabelDecor from "../components/label-decor";
import SectionContainer from "../components/section";
import PersonalDetailsFactory from "../utils/personal-details.factory";

export default function PersonalDetails() {


  return (
    <SectionContainer>
      <h2 className="text-lg mb-8 heading">
        <LabelDecor text="2" />
        Personal Details
      </h2>
{/* Title */}
  <div className="mb-6">
  <Label labelName="title" required>
    Title
  </Label>

  <FormControl
    fieldName="title"
    variant="select"
    options={[
      {
        label: "Miss",
        value: "Miss",
      },
      {
        label: "Mrs",
        value: "Mrs",
      },
      {
        label: "Mr",
        value: "Mr",
      },
      {
        label: "Baby",
        value: "Baby",
      },
      {
        label: "Chief",
        value: "Chief",
      },
      {
        label: "Alhaji",
        value: "Alhaji",
      },
      {
        label: "Alhaja",
        value: "Alhaja",
      },
      {
        label: "Friend",
        value: "Friend",
      },
    ]}
    id="title"
    placeholder="Select your Title"
  />
</div>

{/* Martial status */}
      <div className="mb-6">
        <Label labelName="marital-status" required>
          Marital Status
        </Label>

        <FormControl
          fieldName="maritalStatus"
          variant="select"
          options={[
            {
              label: "Single",
              value: "Single",
            },
            {
              label: "Married",
              value: "Married",
            },
            {
              label: "Separated",
              value: "Separated",
            },
            {
              label: "Widowed",
              value: "Widowed",
            },
            {
              label: "Divorced",
              value: "Divorced",
            },
          ]}
          id="marital-status"
          placeholder="Enter your Marital Status"
        />
      </div>
{/* Mother's madien name */}
      <div className="mb-10">
        <Label labelName="Mother-Maiden-Name" required>
          Mother Maiden Name
        </Label>
        <FormControl
          fieldName="motherMaidenName"
          variant="input"
          id="Mother-Maiden-Name"
          type="text"
          placeholder="Enter your Mother's Maiden Name "
        />
      </div>
      {/* State of Origin  */}
      <div className="mb-10">
      <PersonalDetailsFactory/>
      </div>
  {/* Next of Kin  */}
      <div className="mb-10">

       <div className="flex justify-between items-center mb-2">
    <Label labelName="Name-of-Next-of-Kin" required>
      Next of Kin
    </Label>
    <p className="text-sm text-gray-500">
      An alternate contact person in case you are unreachable or unavailable.
    </p>
  </div>
        <FormControl
          fieldName="nextOfKinName"
          variant="input"
          id="Name-of-Next-of-Kin"
          type="text"
          placeholder="Enter your next of Kin's Name"
        />
      </div>
      {/* Relationship with Next of Kin  */}
      <div className="mb-6">
        <Label labelName="relationship-with-next-of-kin" required>
        Relationship with Next of Kin 
        </Label>

        <FormControl
          fieldName="relationshipWithNextOfKin"
          variant="select"
          options={[
            {
              label: "Mother",
              value: "Mother",
            },
            {
              label: "Father",
              value: "Father",
            },
            {
              label: "Son",
              value: "Son",
            },
            {
              label: "Daugther",
              value: "Daugther",
            },
            {
              label: "Aunt",
              value: "Aunt",
            },
            {
              label: "Uncle",
              value: "Uncle",
            },
            {
              label: "Cousin",
              value: "Cousin",
            },
            {
              label: "Nephew",
              value: "Nephew",
            },
            {
              label: "Partner",
              value: "Partner",
            },
            {
              label: "Guardian",
              value: "Guardian",
            },
            {
              label: "Friend",
              value: "Friend",
            },
            {
              label: "Others",
              value: "Others",
            },
           
          ]}
          id="relationship-with-next-of-kin"
          placeholder="Enter your relationship with Next of Kin"
        />
      </div>
      {/* Next of kin Phone Number */}
      <div className="mb-10">
        <Label labelName="Phone-number-of-Next-of-Kin" required>
          Phone number of Next of Kin
        </Label>
        <FormControl
          fieldName="nextOfKinPhone"
          variant="input"
          id="Phone-number-of-Next-of-Kin"
          type="text"
          placeholder="Enter your Phone No. of Next of Kin "
        />
      </div>
    </SectionContainer>
  );
}
