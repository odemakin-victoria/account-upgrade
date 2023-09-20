import { useEffect, useState,ChangeEvent } from "react"
import { useFormContext } from "react-hook-form"
import LabelDecor from "../components/label-decor"
import SectionContainer from "../components/section"
import ContactDetailsFactory from "../utils/contact-details.factory"
import SocialMediaFactory from "../utils/social-media-details.factory"
import { Label, FormControl } from "@/shared/components"
import countries from "@/assets/data/countnries.json"
import statesAndLga from "@/assets/data/statesAndLga.json"


export default function ContactDetails() {
    const { setValue, watch, getValues } = useFormContext()


    const [isGrayedOut, setIsGrayedOut] = useState<boolean>(false)

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsGrayedOut(e.target.checked)
    }
    function getLocalNames() {
        if (!watch("StateOfKin")) return

        const lga = statesAndLga
            .filter((item) => item.state.name === getValues("StateOfKin"))
            .flat()[0]?.state.locals

        return lga
    }

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
        setIsStudent(watch("status") === "Student")
    }, [watch("isDiaspora"), watch("status")])

    //   const isUnemployedOrRetired =
    //     watch("employmentStatus") === "Unemployed" || watch("employmentStatus") === "Retired";

    return (
        <SectionContainer>
            <h2 className="text-lg mb-8 heading">
                <LabelDecor text="3" /> Account Holder Details
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

            <h2 className="text-lg mb-8 heading">
                <LabelDecor text="4" /> Next of Kin Details
            </h2>
            <div className="md:flex justify-between">
                {/* Next of Kin  */}
                <div className="mb-10 w-full mr-10">
                    <div className="flex  items-center mb-2">
                        <Label labelName="Name-of-Next-of-Kin" required>
                            Next of Kin
                        </Label>
                        <p className="text-xs text-gray-500 mb-2">
                            An alternate contact person in case you are
                            unreachable or unavailable.
                        </p>
                      
                    </div>
                    <FormControl
                        fieldName="FullNameOfKin"
                        variant="input"
                        id="Name-of-Next-of-Kin"
                        type="text"
                        placeholder="Enter your next of Kin's Name"
                    />
                      <div className="flex justify-between w-64">
                        <p className="text-xs text-gray-500 mb-2">
                           First Name
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                           Last Name
                        </p>
                        </div>
                </div>
                {/* Relationship with Next of Kin  */}
                <div className="mb-10 w-full">
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
            </div>
            <div className="md:flex justify-between">
                {/* Date of Birth of Next of Kin  */}
                <div className="mb-10 w-full mr-10">
                    <Label labelName="date-of-birth" required>
                        Date of Birth of Next of Kin{" "}
                    </Label>

                    <FormControl
                        fieldName="dobOfKin"
                        variant="DatePicker"
                        id="date-of-birth"
                        placeholder="Enter your Next of Kin Date of birth "
                    />
                </div>
                {/* Next of kin Phone Number */}
                <div className="mb-10 w-full">
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
            </div>
            {/* Address of Next of Kin */}
            <div className="md:flex justify-between">
                <div className="flex justify-between  mb-10 flex-col  w-full  mr-10">
                    <Label labelName="house-number">
                        Address of Next of Kin
                    </Label>

                    {/* Checkbox to gray out all fields */}
                    <div>
                        <label className="text-xs text-gray-500 ">
                            <input
                                type="checkbox"
                                checked={isGrayedOut}
                                onChange={handleCheckboxChange}
                                className="justify-between  mr-4 "
                            />
                            Tick if address is same as Primary Address Holder
                        </label>
                    </div>
                </div>
                {!isGrayedOut && (
                    <div className="mb-10 w-full">
                        <Label labelName="next-of-kin-state">State</Label>
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
             
            </div>
            <div className="md:flex justify-between">
            {!isGrayedOut && (
                    <div className="mb-10 w-full mr-10">
                        <Label labelName="next-of-kin-local-government">
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
                    <div className="mb-10 w-full">
                        <Label labelName="next-of-kin-postal-zip-code">
                            Area
                        </Label>
                        <FormControl
                            fieldName="PostalZipCodeOfKin"
                            variant="input"
                            id="next-of-kin-postal-zip-code"
                            placeholder="Enter your current Area"
                        />
                    </div>
                )}
               
               
            </div>
            <div className="md:flex justify-between">
            {!isGrayedOut && (
                    <div className="mb-10 w-full mr-10">
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
                    <div className="mb-10 w-full">
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
              
            </div>

            {/* Employment status */}
            <h2 className="text-lg mb-8 heading">
                <LabelDecor text="5" /> Social Media  Details
            </h2>
            <SocialMediaFactory />

            <h2 className="text-lg mb-8 heading">
                <LabelDecor text="6" /> Employment Details
            </h2>
            <div className="md:flex justify-between">

            <div className="mb-6 w-full mr-10">
                <Label labelName="marital-status" required>
                    Employment Status
                </Label>

                <FormControl
                    fieldName="status"
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
            <div className="mb-10 w-full">
                <Label labelName="Employer-Name" required>
                    Employer's Name /School Name/Business Name
                </Label>
                <FormControl
                    fieldName="employersName"
                    variant="input"
                    id="Employer-Name"
                    type="text"
                    placeholder="Enter your Employer's Name "
                />
            </div>
            </div>

            <div className="md:flex justify-between">

            <div className="mb-10 w-3/6">
                <Label labelName="Employer-Address" required>
                    Employer's Address /School Address/Business Address
                </Label>
                <FormControl
                    fieldName="employersAddress"
                    variant="input"
                    id="Employer-Address"
                    type="text"
                    placeholder="Enter your Employer's Address "
                />
            </div>

         
</div>
            {/* Employer Address */}
            {!isStudent && (
                <>
                <div className="md:flex justify-between">

                    <div className="mb-10 w-full mr-10">
                        <Label labelName="Nature-of-Business">
                            Nature of Business/ Occupation
                        </Label>
                        <FormControl
                            fieldName="natureOfBusiness"
                            variant="input"
                            id="Nature-of-Business"
                            type="text"
                            placeholder="Enter your Nature of Business "
                        />
                    </div>
                    <div className="mb-10 w-full">
                        <Label labelName="Source-of-Wealth ">
                           Source of Funds/Wealth
                        </Label>
                        <FormControl
                            fieldName="sourceOfWealth"
                            variant="input"
                            id="source-Of-Wealth"
                            type="text"
                            placeholder="Enter your Source of Wealth "
                        />
                    </div>
                </div>
             
                    <div className="md:flex justify-between">

                    <div className="mb-10 w-full mr-10">
                <Label labelName="number-of-years-in-employment" >
                   Number of Years In Employment
                </Label>

                <FormControl
                    fieldName="numberofYears"
                    variant="select"
                    options={[
                        {
                            label: "Less Than a year",
                            value: "Less Than a year",
                        },
                        {
                            label: "1 year to 5 years",
                            value: "1 year to 5 years",
                        },
                        {
                            label: "5 years to 10 years",
                            value: "5 years to 10 years",
                        },
                        {
                            label: "10 years and above",
                            value: "10 years and above",
                        }
                       
                    ]}
                    id="Number-of-Years"
                    placeholder="Enter your number of years in employment"
                />
            </div>

                    {/* Expected Annual Income */}
                    <div className="mb-10 w-full">
                        <Label labelName="expected-annual-income">
                            Expected Annual Income
                        </Label>

                        <FormControl
                            fieldName="annualIncome"
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
                                {
                                    label: "10,000,000 to 20,000,000",
                                    value: "10,000,000 to 20,000,000",
                                },
                                {
                                    label: "20,000,000 and  Above",
                                    value: "20,000,000 and  Above",
                                },
                            ]}
                            id="expected-annual-income"
                            placeholder="Enter your expected annual Income"
                        />
                    </div>
</div>
                </>
            )}


            {/* Citizenship */}
            
            
            {isDiaspora === "no" && (
                <>
                    {/* Citizenship */}
                    <div className="mb-10 w-full">
                        <Label labelName="" className="text-sm font-semibold">
                            Please fill this section if you hold any other citizenship
                            aside from Nigerian nationality
                        </Label>
                    </div>
                    <div className="md:flex justify-between">
                    <div className="mb-10 w-full mr-10">
                <Label labelName="Foreign-Tax-Id">Foreign Tax ID </Label>
                <FormControl
                    fieldName="foreignTaxId"
                    variant="input"
                    id="Foreign-Tax-Id"
                    type="text"
                    placeholder="Enter your Foreign Tax ID "
                />
            </div>
                   
                    <div className="mb-10 w-full">
                <Label labelName="Country-of-Tax-Residence"> Country of Tax Residence{" "}</Label>
                <FormControl
                    fieldName="countryTaxResidence"
                    variant="select"
                    id="Country-of-Tax-Residence"
                    placeholder="Enter your Country of Tax Residence "
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
                </div>

            <div className="md:flex justify-between">
            <div className="mb-10 w-full mr-10">
                <Label labelName="line2Address">Address Line 2</Label>
                <FormControl
                    fieldName="citizenshipAddressLine2"
                    variant="input"
                    id="line2Address"
                    placeholder="Address line 2"
                />
            </div>
                 
            
            
            <div className="mb-10 w-full">
                <Label labelName="line1Address">Address Line 1</Label>
                <FormControl
                    fieldName="citizenshipAddressLine1"
                    variant="input"
                    id="line2Address"
                    placeholder="Address line 2"
                />
            </div>
                </div>

         
                </>
            )}

            {isDiaspora === "yes" && (
                <div className="mb-10">
                    <div className="mb-10">
                <Label labelName="" className="text-sm font-semibold">
                    Please fill this section if you hold any other citizenship
                    asides Nigerian nationality
                </Label>
            </div>
            <div className="md:flex justify-between">

                   <div className="mb-10 w-full">
                <Label labelName="Country-of-Tax-Residence"> Country of Tax Residence{" "}</Label>
                <FormControl
                    fieldName="countryTaxResidence"
                    variant="select"
                    id="Country-of-Tax-Residence"
                    placeholder="Enter your Country of Tax Residence "
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
                <Label labelName="Foreign-Tax-Id">Foreign Tax ID </Label>
                <FormControl
                    fieldName="foreignTaxId"
                    variant="input"
                    id="Foreign-Tax-Id"
                    type="text"
                    placeholder="Enter your Foreign Tax ID "
                />
            </div>
            </div>
            
           
                </div>
            )}
          
        </SectionContainer>
    )
}
