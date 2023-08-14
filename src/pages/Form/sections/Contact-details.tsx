import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import LabelDecor from "../components/label-decor"
import SectionContainer from "../components/section"
import ContactDetailsFactory from "../utils/contact-details.factory"
import { Label, FormControl } from "@/shared/components"
import countries from "@/assets/data/countnries.json"

export default function ContactDetails() {
    const { setValue, watch } = useFormContext()

    const [isDiaspora, setIsDiaspora] = useState("no")
    const [isStudent, setIsStudent] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setValue("isDiaspora", e.target.value)
        setIsDiaspora(e.target.value)

        // Check if "Student" is selected and set the corresponding state.
        if (e.target.value === "yes") {
            setIsStudent(true)
        } else {
            setIsStudent(false)
        }
    }

    useEffect(() => {
        setIsDiaspora(watch("isDiaspora"))
        setIsStudent(watch("EmployeeStatus") === "Student")
    }, [watch("isDiaspora"), watch("EmployeeStatus")])

    //   const isUnemployedOrRetired =
    //     watch("employmentStatus") === "Unemployed" || watch("employmentStatus") === "Retired";

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
                            required

                            // checked={watch("isDiaspora")}
                        />
                        <span
                            className={`${
                                isDiaspora?.toLowerCase() === "no"
                                    ? "bg-blue-500 text-white "
                                    : ""
                            }  border border-gray-400 rounded-sm p-4`}
                        >
                            Nigeria
                        </span>
                    </label>

                    <label
                        htmlFor="outside-nigeria"
                        className="cursor-pointer "
                    >
                        <input
                            type="radio"
                            name="isDiaspora"
                            value={"yes"}
                            onChange={handleChange}
                            id="outside-nigeria"
                            className="peer/true mr-4 hidden"
                            required

                            // checked={watch("isDiaspora")}
                        />
                        <span
                            className={` border border-gray-400 rounded-sm p-4 ${
                                isDiaspora?.toLowerCase() === "yes"
                                    ? "bg-blue-500 text-white "
                                    : ""
                            }`}
                        >
                            Outside Nigeria
                        </span>
                    </label>
                </div>
            </div>
            <ContactDetailsFactory />
            {/* Employment status */}
            <div className="mb-6">
                <Label labelName="marital-status">Employment Status</Label>

                <FormControl
                    fieldName="Status"
                    variant="select"
                    options={[
                        {
                            label: "Paid Employment",
                            value: "Paid Employment",
                        },
                        {
                            label: "Self Employed",
                            value: "Self Employed",
                        },
                        {
                            label: "Unemployed",
                            value: "Unemployed",
                        },
                        {
                            label: "Retired",
                            value: "Retired",
                        },
                        {
                            label: "Student",
                            value: "Student",
                        },
                    ]}
                    id="employment-status"
                    placeholder="Enter your Employment Status"
                />
            </div>

            {/* Employer's Name */}
            <div className="mb-10">
                <Label labelName="Employer-Name" required>
                    Employer's Name /School Name
                </Label>
                <FormControl
                    fieldName="EmployersName"
                    variant="input"
                    id="Employer-Name"
                    type="text"
                    placeholder="Enter your Employer's Name "
                />
            </div>

            {!isStudent && (
                <>
                    {/* Nature of Business */}
                    <div className="mb-10">
                        <Label labelName="Nature-of-Business">
                            Nature of Business/ Occupation
                        </Label>
                        <FormControl
                            fieldName="NatureOfBusiness"
                            variant="input"
                            id="Nature-of-Business"
                            type="text"
                            placeholder="Enter your Nature of Business "
                        />
                    </div>

                    {/* Number of Years in Employment */}
                    <div className="mb-10">
                        <Label labelName="number-of-years-in-employment">
                            Number of Years in Employment{" "}
                        </Label>

                        <FormControl
                            fieldName="NumberofYears"
                            variant="select"
                            options={[
                                {
                                    label: "Less than 1 year",
                                    value: "Less than 1 year",
                                },
                                {
                                    label: "1 to 5 years",
                                    value: "1 to 5 years",
                                },
                                {
                                    label: "Above 5 years to 10 years",
                                    value: "Above 5 years to 10 years",
                                },
                                {
                                    label: "Above 10 years",
                                    value: "Above 10 years",
                                },
                            ]}
                            id="number-of-years-in-employment"
                            placeholder="Enter your number of years in Employment"
                        />
                    </div>

                    {/* Expected Annual Income */}
                    <div className="mb-10">
                        <Label labelName="expected-annual-income">
                            Expected Annual Income
                        </Label>

                        <FormControl
                            fieldName="AnnualIncome"
                            variant="select"
                            options={[
                                {
                                    label: "Less than 50,000",
                                    value: "Less than 50,000",
                                },
                                {
                                    label: "50,000 to 250,000",
                                    value: "50,000 to 250,000",
                                },
                                {
                                    label: "250,000  to 500,000",
                                    value: "250000  to 500,000",
                                },
                                {
                                    label: "500,000 to 1,000,000",
                                    value: "500,000 to 1,000,000",
                                },
                                {
                                    label: "1,000,000 To less Than 5,000,000",
                                    value: "Above 10 years",
                                },
                                {
                                    label: "5,000,000 to 10,000,000",
                                    value: "5,000,000 to 10,000,000",
                                },
                            ]}
                            id="expected-annual-income"
                            placeholder="Enter your expected annual Income"
                        />
                    </div>
                </>
            )}

            {/* Citizenship */}
            <div className="mb-10">
                <Label labelName="" className="text-sm font-semibold">
                    Please fill this section if you hold ay other citizenship
                    asides Nigerian nationality
                </Label>
            </div>
            <div className="mb-10">
                <Label labelName="Country-of-Tax-Residence">
                    Country of Tax Residence{" "}
                </Label>
                <FormControl
                    fieldName="countryOfTaxResidence"
                    variant="input"
                    id="Country-of-Tax-Residence"
                    type="text"
                    placeholder="Enter your Country of Tax Residence "
                />
            </div>
            <div className="mb-10">
                <Label labelName="Foreign-Tax-Id">Foreign Tax ID </Label>
                <FormControl
                    fieldName="foreignTaxId"
                    variant="input"
                    id="Foreign-Tax-Id"
                    type="text"
                    placeholder="Enter your Foreign Tax ID "
                />
            </div>
            <div className="mb-10">
                <Label labelName="Mobile-Number">Mobile Number</Label>
                <FormControl
                    fieldName="mobileNNumber"
                    variant="input"
                    id="Mobile-Number"
                    type="text"
                    placeholder="Enter your Mobile Number"
                />
            </div>
            <div className="mb-10">
                <Label labelName="line2Address" required>
                    Address Line 1
                </Label>
                <FormControl
                    fieldName="TaxAddress1"
                    variant="input"
                    id="line2Address"
                    placeholder="Address line 2"
                />
            </div>
            <div className="mb-10">
                <Label labelName="line2Address">Address Line 2</Label>
                <FormControl
                    fieldName="TaxAddress2"
                    variant="input"
                    id="line2Address"
                    placeholder="Address line 2"
                />
            </div>
            <div className="mb-10">
                <Label labelName="country" required>
                    Country
                </Label>
                <FormControl
                    fieldName="secondCountry"
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
        </SectionContainer>
    )
}
