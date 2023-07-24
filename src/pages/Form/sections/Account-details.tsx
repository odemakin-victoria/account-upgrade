import { FormControl, Label } from "@/shared/components";
import LabelDecor from "../components/label-decor";
import SectionContainer from "../components/section";

export default function AccountDetails() {
  return (
    <SectionContainer>
      <h2 className="text-lg mb-8 heading">
        <LabelDecor text="1" /> Account Details
      </h2>

      <div className="mb-6 ">
        <Label labelName="account-number" aria-label="account number" required>
          Account Number
        </Label>
        <FormControl
          fieldName="accountNumber"
          variant="input"
          id="account-number"
          placeholder="Enter your Account Number"
          className="focus:shadow-lg"
          maxLength={12}
        />
      </div>

      <div className="mb-10">
        <Label labelName="bvn">BVN</Label>
        <FormControl
          fieldName="bvn"
          variant="input"
          id="bvn"
          type="text"
          placeholder="Enter your Bvn"
        />
      </div>
    </SectionContainer>
  );
}
