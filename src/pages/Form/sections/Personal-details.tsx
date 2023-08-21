import { FormControl, Label } from "@/shared/components"
import LabelDecor from "../components/label-decor"
import SectionContainer from "../components/section"
import { useState, ChangeEvent } from "react"
import statesAndLga from "@/assets/data/statesAndLga.json"

import { useFormContext } from "react-hook-form"

export default function PersonalDetails() {
    const [isGrayedOut, setIsGrayedOut] = useState<boolean>(false)

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsGrayedOut(e.target.checked)
    }
    const { getValues, watch, formState } = useFormContext()
    function getLocalNames() {
        console.log("state", watch("StateOfKin"))

        if (!watch("StateOfKin")) return
       

        const lga = statesAndLga
            .filter((item) => item.state.name === getValues("StateOfKin"))
            .flat()[0]?.state.locals



        return lga
    }
    console.log(formState.errors)

    return (
        <SectionContainer>
            <h2 className="text-lg mb-8 heading">
                <LabelDecor text="2" />
                Personal Details
            </h2>
            {/* Title */}
            <div className="mb-10">
                <Label labelName="title" required>Title</Label>

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
            <div className="mb-10">
                <Label labelName="marital-status" required>Marital Status</Label>

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
                <Label labelName="Mother-Maiden-Name" required>Mother Maiden Name</Label>
                <FormControl
                    fieldName="motherMaidenName"
                    variant="input"
                    id="Mother-Maiden-Name"
                    type="text"
                    placeholder="Enter your Mother's Maiden Name "
                />
            </div>
            {/* State of Origin  */}

            {/* Next of Kin  */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-2">
                    <Label labelName="Name-of-Next-of-Kin" required>Next of Kin</Label>
                    <p className="text-xs text-gray-500 mb-2">
                        An alternate contact person in case you are unreachable
                        or unavailable.
                    </p>
                </div>
                <FormControl
                    fieldName="FullNameOfKin"
                    variant="input"
                    id="Name-of-Next-of-Kin"
                    type="text"
                    placeholder="Enter your next of Kin's Name"
                />
            </div>
            {/* Relationship with Next of Kin  */}
            <div className="mb-10">
                <Label labelName="relationship-with-next-of-kin" required>
                    Relationship with Next of Kin
                </Label>

                <FormControl
                    fieldName="RelationshipOfKin"
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
                            label: "Sister",
                            value: "Sister",
                        },
                        {
                            label: "Brother",
                            value: "Brother",
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

            {/* Date of Birth of Next of Kin  */}
            <div className="mb-10">
                <Label labelName="date-of-birth" required>
                    Date of Birth of Next of Kin{" "}
                </Label>

                <FormControl
                    fieldName="DobOfKin"
                    variant="DatePicker"
                    id="date-of-birth"
                    placeholder="Enter your Next of Kin Date of birth "
                />
            </div>
            {/* Next of kin Phone Number */}
            <div className="mb-10" >
                <Label labelName="Phone-number-of-Next-of-Kin" required>
                    Phone number of Next of Kin
                </Label>
                <FormControl
                    fieldName="PhoneNumberOfKin"
                    variant="input"
                    id="Phone-number-of-Next-of-Kin"
                    type="text"
                    placeholder="Enter your Phone No. of Next of Kin "
                />
            </div>
            {/* Address of Next of Kin */}

            <div className="flex justify-between  mb-10 flex-col ">
                <Label labelName="house-number">Address of Next of Kin</Label>

                {/* Checkbox to gray out all fields */}
                <div>
                    <label className="text-xs text-gray-500 ">
                        <input
                            type="checkbox"
                            checked={isGrayedOut}
                            onChange={handleCheckboxChange}
                            className="justify-between  mr-4 "
                        />
                        Tick if address is same as contact
                    </label>
                </div>
            </div>
            {!isGrayedOut && (
                <div className="mb-10">
                    <Label labelName="next-of-kin-house-number">
                        House Number
                    </Label>
                    <FormControl
                        fieldName="HouseNumberOfKin"
                        variant="input"
                        id="next-of-kin-house-number"
                        placeholder="Enter house number"
                    />
                </div>
            )}

            {!isGrayedOut && (
                <div className="mb-10">
                    <Label labelName="next-of-kin-street-name">
                        Street Name
                    </Label>
                    <FormControl
                        fieldName="StreetNameOfKin"
                        variant="input"
                        id="next-of-kin-street-name"
                        placeholder="Enter street name."
                    />
                </div>
            )}
            {!isGrayedOut && (
                <div className="mb-10">
                    <Label labelName="next-of-kin-state" >
                        State
                    </Label>
                    <FormControl
                        fieldName="StateOfKin"
                        variant="select"
                        id="next-of-kin-state"
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
            )}
            {!isGrayedOut && (
                <div className="mb-10">
                    <Label labelName="next-of-kin-local-government" required>
                        Local Government
                    </Label>
                    <FormControl
                        fieldName="LocalGovernmentOfKin"
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
            )}

            {!isGrayedOut && (
                <div className="mb-10">
                    <Label labelName="next-of-kin-postal-zip-code">
                        Postal Zip Code
                    </Label>
                    <FormControl
                        fieldName="PostalZipCodeOfKin"
                        variant="input"
                        id="next-of-kin-postal-zip-code"
                        placeholder="Enter postal zip code"
                    />
                </div>
            )}

            {/* <div className="mb-10 ">
        <Label labelName="street-address">Street Address</Label>
        <FormControl
          fieldName="line1"
          variant="input"
          id="street-address"
          placeholder="house address, xyz."
        />
      </div> */}
        </SectionContainer>
    )
}
