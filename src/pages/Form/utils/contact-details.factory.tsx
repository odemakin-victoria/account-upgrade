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
        <>
            <div className="mb-10">
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

            <div className="mb-10">
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

            <div className="mb-10">
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

            <div className="mb-10">
                <Label labelName="line2Address" required>
                    Address Line 1
                </Label>
                <FormControl
                    fieldName="line1"
                    variant="input"
                    id="line2Address"
                    placeholder="Address line 2"
                />
            </div>
            <div className="mb-10">
                <Label labelName="line2Address">Address Line 2</Label>
                <FormControl
                    fieldName="line2"
                    variant="input"
                    id="line2Address"
                    placeholder="Address line 2"
                />
            </div>

            <div className="mb-10">
                <Label labelName="postalCode" required>
                    Zip Code
                </Label>
                <FormControl
                    fieldName="postalCode"
                    variant="input"
                    id="street-address"
                    placeholder="Enter your location zipcode"
                />
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
            <div className="mb-10">
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

            <div className="mb-10">
                <Label labelName="local-government" required>
                    Local Government
                </Label>
                <FormControl
                    fieldName="localGovt"
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

            <div className="mb-10">
                <Label labelName="house-number">House Number</Label>
                <FormControl
                    fieldName="houseNumber"
                    variant="input"
                    id="house-number"
                    placeholder="Enter house number"
                />
            </div>
            <div className="mb-6 ">
                <Label labelName="street-address">Street Name</Label>
                <FormControl
                    fieldName="line1"
                    variant="input"
                    id="street-address"
                    placeholder="Enter street name."
                />
            </div>

            <div className="mb-10">
                <Label labelName="post-code">Postal Zip Code</Label>
                <FormControl
                    fieldName="postalCode"
                    variant="input"
                    id="post-code"
                    type="text"
                    placeholder="Enter your Post code"
                />
            </div>
        </>
    )
}
