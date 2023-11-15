import { Label, FormControl } from "@/shared/components"
import countries from "@/assets/data/countnries.json"
import statesAndLga from "@/assets/data/statesAndLga.json"

import { useFormContext } from "react-hook-form"

export default function ContactDetailsFactory() {
    const { watch } = useFormContext()
    switch (true) {
        case watch("isDiaspora") === "yes":
            return <DiasporaFields />
        case watch("isDiaspora") === "no":
            return <NigerianFields />
        default:
            return null
    }
}

export function DiasporaFields() {
    return (
        <><div className="relative sm:py-4 ">
              <span className="absolute sm:top-[-20px]  ">
                        (Non-Resident Nigerian)
                        </span> 
        </div>
        <div className="md:flex justify-between">

            <div className="mb-10 w-full mr-10">
                <Label labelName="country" required>
                    Country
                </Label>
                <FormControl
                    fieldName="country"
                    variant="select"
                    id="country"
                    options={countries
                        ?.filter((item) => item.name !== "Nigeria")
                        .map((item) => {
                            return {
                                label: item.name,
                                value: item.name,
                            }
                        })}
                    type="text"
                />
            </div>

            <div className="mb-10 w-full">
                <Label labelName="state" required>
                    State
                </Label>
                <FormControl
                    fieldName="state"
                    variant="input"
                    id="state"
                    type="text"
                    placeholder="Enter your State"
                />
            </div>
        </div>
            <div className="md:flex justify-between">

            <div className="mb-10 w-full mr-10">
                <Label labelName="city" required>
                    City
                </Label>
                <FormControl
                    fieldName="city"
                    variant="input"
                    id="city"
                    placeholder="City"
                />
            </div>

            <div className="mb-10 w-full">
                <Label labelName="line2Address" required>
                    Address Line 1
                </Label>
                <FormControl
                    fieldName="addressLine1"
                    variant="input"
                    id="line2Address"
                    placeholder="Address line 2"
                />
            </div>
</div>
            <div className="md:flex justify-between">

            <div className="mb-10 w-full mr-10">
                <Label labelName="line2Address">Address Line 2</Label>
                <FormControl
                    fieldName="addressLine2"
                    variant="input"
                    id="line2Address"
                    placeholder="Address line 2"
                />
            </div>

            <div className="mb-10 w-full">
                <Label labelName="postalCode" required>
                    Zip Code
                </Label>
                <FormControl
                    fieldName="zipCode"
                    variant="input"
                    id="street-address"
                    placeholder="Enter your location zipcode"
                />
            </div>
</div>
        </>
    )
}

export function NigerianFields() {
    const { getValues, watch } = useFormContext()
    function getLocalNames() {
        if (!watch("state")) return
        const lga = statesAndLga
            .filter((item) => item.state.name === getValues("state"))
            .flat()[0]?.state.locals

        return lga
    }
    return (
        <>
         <div className="md:flex justify-between">

            <div className="mb-10 w-full mr-10">
                <Label labelName="state" required>
                    State
                </Label>
                <FormControl
                    fieldName="state"
                    variant="select"
                    id="state"
                    options={statesAndLga?.map((item) => {
                        return {
                            label: item.state.name,
                            value: item.state.name,
                        }
                    })}
                    type="text"
                    placeholder="Enter your State"
                />
            </div>

            <div className="mb-10 w-full">
                <Label labelName="local-government" required>
                    Local Government
                </Label>
                <FormControl
                    fieldName="localGovernment"
                    variant="select"
                    id="local-government"
                    options={getLocalNames()?.map((item) => {
                        return {
                            label: item.name,
                            value: item.name,
                        }
                    })}
                    type="text"
                />
            </div>
</div>
            <div className="md:flex justify-between">
            <div className="mb-10 w-full mr-10">
                <Label labelName="post-code" required>Area</Label>
                <FormControl
                    fieldName="zipCode"
                    variant="input"
                    id="post-code"
                    type="text"
                    placeholder="Enter your current Area"
                />
            </div>


            <div className="mb-6 w-full ">
                <Label labelName="street-address " required>Street Name</Label>
                <FormControl
                    fieldName="streetAddress"
                    variant="input"
                    id="street-address"
                    placeholder="Enter street name."
                />
            </div>
</div>
<div className="mb-10 w-3/6 mr-10">
                <Label labelName="house-number" required >House Number</Label>
                <FormControl
                    fieldName="houseNumber"
                    variant="input"
                    id="house-number"
                    placeholder="Enter house number"
                />
            </div>

           
        </>
    )
}
