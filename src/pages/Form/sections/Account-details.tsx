import { FormControl, Label } from "@/shared/components"
import LabelDecor from "../components/label-decor"
import SectionContainer from "../components/section"
import { Controller, } from "react-hook-form";


export default function AccountDetails() {
    

    return (
        <SectionContainer>
            <h2 className="text-lg mb-8 heading">
                <LabelDecor text="1" /> Account Details
            </h2>
            <div className="md:flex justify-between">
    <div className="mb-6 mr-10 w-full">
    <Controller
    name="accountNumber"
    render={({ field, fieldState }) => (
        <div className="mb-6 mr-10 w-full">
            <Label
                labelName="account-number"
                aria-label="account number"
                required
            >
                Account Number
            </Label>
            <FormControl
                fieldName={"accountNumber"} variant="input"
                id="account-number"
                placeholder="Enter your Account Number"
                className="focus:shadow-lg"
                maxLength={10}
                {...field}
                onInput={(e) => {
                    // Use the onInput event handler to restrict input to numbers
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                } }            />
            {fieldState.invalid && (
                <p className="text-red-500">{fieldState.error?.message}</p>
            )}
        </div>
    )}
    rules={{
        required: "Account Number is required",
        validate: (value) => {
            if (value.length < 10) {
                return "Account Number must have 10 digits.";
            }
            return true;
        },
    }}
/>

</div>



    <div className="mb-10 w-full">
      
    <Controller
    name="bvn"
    render = {({ field, fieldState }) => (
        <div className="mb-10 w-full">
            <Label labelName="bvn" >
                BVN
            </Label>
            <FormControl
                fieldName={"bvn"} variant="input"
                id="bvn"
                type="text"
                placeholder="Enter your BVN"
                maxLength={11}
                {...field}
                onInput={(e) => {
                    // Use the onInput event handler to restrict input to numbers
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                } }            />
            {fieldState.invalid && (
                <p className="text-red-500">{fieldState.error?.message}</p>
            )}
        </div>
    )}
    rules={{
        required: "BVN is required",
        validate: (value) => {
            if (value.length < 11) {
                return "BVN must have 11 digits.";
            }
            return true;
        },
    }}
/>
</div>
</div>
 </SectionContainer>
    )
}
