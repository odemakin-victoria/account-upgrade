import { FormControl, Label } from "@/shared/components"
import LabelDecor from "../components/label-decor"
import SectionContainer from "../components/section"
import { useState, ChangeEvent, useEffect } from "react"
import { useFormContext } from "react-hook-form"

export default function PersonalDetails() {
    const { setValue, watch } = useFormContext()

    const [isOtherSelected, setIsOtherSelected] = useState(false)

    const selectedPurpose = watch("purposeOfAccount")
    

    const handlePurposeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value
        setValue("purposeOfAccount", newValue)
        setIsOtherSelected(newValue === "Others")
    }

    // Effect to set initial state based on selectedPurpose
    useEffect(() => {
        setIsOtherSelected(selectedPurpose === "Others")
    }, [selectedPurpose])
    return (
        <SectionContainer>
            <h2 className="text-lg mb-8 heading">
                <LabelDecor text="2" />
                Personal Details
            </h2>
            <div className="md:flex justify-between">
                {/* Title */}
                <div className="mb-10 w-full mr-10">
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
                                label: "Mx",
                                value: "Mx",
                            },
                            {
                                label: "Mr and Mrs",
                                value: "Mr AND Mrs",
                            },
                            {
                                label: "Mr/Ms",
                                value: "Mr/Ms",
                            },
                            {
                                label: "Sir",
                                value: "Sir",
                            },
                            {
                                label: "Dr",
                                value: "Dr",
                            },
                            {
                                label: "Admiral",
                                value: "Admiral",
                            },
                            {
                                label: "Advocate",
                                value: "Advocate",
                            },

                            {
                                label: "Air Marshal",
                                value: "Air Marshal",
                            },
                            {
                                label: "Air Vice Marshal",
                                value: "Air Vice Marshal",
                            },

                            {
                                label: "Alfa",
                                value: "Alfa",
                            },
                            {
                                label: "Ambassador",
                                value: "Ambassador",
                            },
                            {
                                label: "Arch Bishop",
                                value: "Arch Bishop",
                            },

                            {
                                label: "Architect",
                                value: "Architect",
                            },
                            {
                                label: "Assistant Inspector General Of Police.",
                                value: "Assistant Inspector General Of Police.",
                            },
                            {
                                label: "Asst. Superintendent Of Police.",
                                value: "Asst. Superintendent Of Police.",
                            },

                            {
                                label: "Baroness",
                                value: "Baroness",
                            },
                            {
                                label: "Barrister",
                                value: "Barrister",
                            },
                            {
                                label: "Bishop",
                                value: "Bishop",
                            },
                            {
                                label: "Brigader",
                                value: "Brigader",
                            },
                            {
                                label: "Brother",
                                value: "Brother",
                            },
                            {
                                label: "Captain",
                                value: "Captain",
                            },

                            {
                                label: "Colonel",
                                value: "Colonel",
                            },
                            {
                                label: "Commander",
                                value: "Commander",
                            },
                            {
                                label: "Commissioner Of Police",
                                value: "Commissioner Of Police",
                            },
                            {
                                label: "Count",
                                value: "Count",
                            },
                            {
                                label: "Deacon",
                                value: "Deacon",
                            },
                            {
                                label: "Deaconess",
                                value: "Deaconess",
                            },
                            {
                                label: "Doctor",
                                value: "Doctor",
                            },
                            {
                                label: "Dr(Mrs)",
                                value: "Dr(Mrs)",
                            },
                            {
                                label: "Elder",
                                value: "Elder",
                            },
                            {
                                label: "Emir",
                                value: "Emir",
                            },
                            {
                                label: "Engineer",
                                value: "Engineer",
                            },
                            {
                                label: "Evangelist",
                                value: "Evangelist",
                            },
                            {
                                label: "Father",
                                value: "Father",
                            },
                            {
                                label: "Frau",
                                value: "Frau",
                            },
                            {
                                label: "General",
                                value: "General",
                            },
                            {
                                label: "Hajiya",
                                value: "Hajiya",
                            },
                            {
                                label: "Herr",
                                value: "Herr",
                            },
                            {
                                label: "Hh",
                                value: "Hh",
                            },
                            {
                                label: "His/Her Royal Highness",
                                value: "His/Her Royal Highness",
                            },
                            {
                                label: "Ichie",
                                value: "Ichie",
                            },
                            {
                                label: "Inspector General Of Police",
                                value: "Inspector General Of Police",
                            },
                            {
                                label: "Justice",
                                value: "Justice",
                            },
                            {
                                label: "Kumari",
                                value: "Kumari",
                            },
                            {
                                label: "Lady",
                                value: "Lady",
                            },
                            {
                                label: "Lieutenant",
                                value: "Lieutenant",
                            },
                            {
                                label: "Lieutenant Colonel",
                                value: "Lieutenant Colonel",
                            },
                            {
                                label: "Lolo",
                                value: "Lolo",
                            },
                            {
                                label: "Lord",
                                value: "Lord",
                            },
                            {
                                label: "Lt.Commander",
                                value: "Lt.Commander",
                            },
                            {
                                label: "Madam",
                                value: "Madam",
                            },
                            {
                                label: "Major",
                                value: "Major",
                            },
                            {
                                label: "Major General",
                                value: "Major General",
                            },
                            {
                                label: "Mallam",
                                value: "Mallam",
                            },
                            {
                                label: "Master",
                                value: "Master",
                            },
                            {
                                label: "Messers",
                                value: "Messers",
                            },
                            {
                                label: "Mister",
                                value: "Mister",
                            },
                            {
                                label: "Oba",
                                value: "Oba",
                            },
                            {
                                label: "Obong",
                                value: "Obong",
                            },
                            {
                                label: "Olori",
                                value: "Olori",
                            },
                            {
                                label: "Olorogun",
                                value: "Olorogun",
                            },
                            {
                                label: "Otunba",
                                value: "Otunba",
                            },
                            {
                                label: "Ovie",
                                value: "Ovie",
                            },
                            {
                                label: "Pa",
                                value: "Pa",
                            },
                            {
                                label: "Pastor",
                                value: "Pastor",
                            },
                            {
                                label: "Prince",
                                value: "Prince",
                            },
                            {
                                label: "Princess",
                                value: "Princess",
                            },
                            {
                                label: "Professor",
                                value: "Professor",
                            },
                            {
                                label: "Rabbi",
                                value: "Rabbi",
                            },
                            {
                                label: "Rear Admiral",
                                value: "Rear Admiral",
                            },
                            {
                                label: "Rev",
                                value: "Rev",
                            },
                            {
                                label: "Reverend",
                                value: "Reverend",
                            },
                            {
                                label: "Senator",
                                value: "Senator",
                            },
                            {
                                label: "Sheikh",
                                value: "Sheikh",
                            },
                            {
                                label: "Shekh",
                                value: "Shekh",
                            },
                            {
                                label: "Shri",
                                value: "Shri",
                            },
                            {
                                label: "Sister",
                                value: "Sister",
                            },
                            {
                                label: "Smt",
                                value: "Smt",
                            },
                            {
                                label: "Superintendent Of Police",
                                value: "Superintendent Of Policel",
                            },
                            {
                                label: "The Hon",
                                value: "The Hon",
                            },
                            {
                                label: "Viscount",
                                value: "Viscount",
                            },
                            {
                                label: "Wg Cdr",
                                value: "Wg Cdr",
                            },
                        ]}
                        id="title"
                        placeholder="Select your Title"
                    />
                </div>

                {/* Martial status */}
                <div className="mb-10 w-full">
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
            </div>

            <div className="md:flex justify-between">
                {/* Mother's madien name */}
                <div className="mb-10 w-full mr-10">
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
                {/* Purpose of Account   */}
                <div className="mb-10 w-full">
                    <Label labelName="Purpose Of Account" required>
                        Purpose Of Account
                    </Label>

                    <FormControl
                        fieldName="purposeOfAccount"
                        variant={isOtherSelected ? "input" : "select"}
                        options={[
                            {
                                label: "Savings",
                                value: "Savings",
                            },
                            {
                                label: "Salary",
                                value: "Salary",
                            },
                            {
                                label: "Student Account",
                                value: "Student Account",
                            },
                            {
                                label: "Individual Retirement Account",
                                value: "Individual Retirement Account",
                            },
                            {
                                label: "Business Account",
                                value: "Business Account",
                            },
                            {
                                label: "Checking Account",
                                value: "Checking Account",
                            },
                            {
                                label: "Joint Account",
                                value: "Joint Account",
                            },
                            {
                                label: "Health Savings Account",
                                value: "Health Savings Account",
                            },

                            {
                                label: "Senior Account",
                                value: "Senior Account",
                            },
                            {
                                label: "Certificate of Deposit (CD)",
                                value: "Certificate of Deposit (CD)",
                            },
                            {
                                label: "Money Market Account",
                                value: "Money Market Account",
                            },
                            {
                                label: "Others",
                                value: "Others",
                            },
                        ]}
                        id="Purpose-Of-Account"
                        placeholder={
                            isOtherSelected
                                ? "Please specify"
                                : "Enter your Purpose of account"
                        }
                        value={selectedPurpose}
                        onChange={handlePurposeChange}
                    />
                    {isOtherSelected && (
                         <><FormControl
                            fieldName="otherReasons"
                            variant="input"
                            id="other-Reasons"
                            type="text"
                            placeholder="Please specify" /><p className="text-sm text-gray-500 mt-2">
                                Please specify
                            </p></>
                    )}
                </div>
            </div>
        </SectionContainer>
    )
}
