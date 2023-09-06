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
    const { getValues, watch } = useFormContext()
    function getLocalNames() {
      

        if (!watch("StateOfKin")) return
       

        const lga = statesAndLga
            .filter((item) => item.state.name === getValues("StateOfKin"))
            .flat()[0]?.state.locals



        return lga
    }
  

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
                        }, {
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
                        }, {
                            label: "Ichie",
                            value: "Ichie",
                        }, {
                            label: "Inspector General Of Police",
                            value: "Inspector General Of Police",
                        }, {
                            label: "Justice",
                            value: "Justice",
                        }, {
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
                        },{
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
                        },{
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
                    fieldName="dobOfKin"
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
                    <Label labelName="next-of-kin-local-government" >
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
