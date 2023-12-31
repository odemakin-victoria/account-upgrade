import { FormControl, Label } from "@/shared/components"
import countries from "@/assets/data/countnries.json"
import statesAndLga from "@/assets/data/statesAndLga.json"
import { useFormContext } from "react-hook-form"
import { Skeleton, Switch } from "@mantine/core"
import FileDownload from '../../../shared/components/FileDownload';


type ContactDetailsProps = {
    isLoading: boolean
    setCurrentPage: () => void
    returnData?: (data: any) => void
}
export default function ContactDetailsUpdate({
    isLoading,
    setCurrentPage,
    returnData,
}: ContactDetailsProps) {
    const { watch } = useFormContext()

  

    const handleReturnData = (data: any) => {
        // Call the returnData function if provided
        returnData && returnData(data)
    }

   

    switch (watch("isDiaspora")) {
        case "yes":
            return (
                <DiasporaFields
                    isLoading={isLoading}
                    setCurrentPage={setCurrentPage}
                    returnData={handleReturnData} // Pass the returnData function down
                />
            )

        case "no":
            return (
                <NigerianFields
                    isLoading={isLoading}
                    setCurrentPage={setCurrentPage}
                    returnData={handleReturnData} // Pass the returnData function down
                />
            )

        default:
            return null
    }
}

export function DiasporaFields({
    isLoading,
    setCurrentPage,
    returnData,
}: {
    isLoading: boolean
    setCurrentPage: () => void
    returnData?: (data: any) => void
}) {
    const { getValues, setValue } = useFormContext()
    // const upd = useContactDetailsUpdate()
    const moveToNext = () => {
        const data = {
            country: getValues("country"),
            state: getValues("state"),
            city: getValues("city"),
            zipCode: getValues("zipCode"),
            addressLine1: getValues("addressLine1"),
            addressLine2: getValues("addressLine2"),
            employersName: getValues("employersName"),
            employersAddress: getValues("employersAddress"),
            notificationPreference: getValues("notificationPreference"),
      
        }
        returnData && returnData(data)
        setCurrentPage()
    }

    return (
        <div className="bg-[#F8FAFB] w-full  h-fit">
            <div className="flex gap-6 justify-between p-6 md:items-center flex-col md:flex-row">
                <p className="font-medium">Account Holder Details</p>
                <div className="flex items-center gap-6">
                    <span>Nigeria</span>
                    <Switch
                        label=""
                        radius="sm"
                        checked={getValues("isDiaspora") === "yes"}
                        onChange={(e) =>
                            setValue(
                                "isDiaspora",
                                e.target.checked ? "yes" : "no"
                            )
                        }
                    />
                    <span>Diaspora</span>
                </div>
            </div>
            <div className="grid md:grid-cols-2 bg-white gap-10 p-6  border border-[#EBEAEF]">
                <div className="">
                    <Label labelName="country">Country</Label>
                    <Skeleton visible={isLoading}>
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
                    </Skeleton>
                </div>

                <div className="">
                    <Label labelName="state">State</Label>
                    <FormControl
                        fieldName="state"
                        variant="input"
                        id="state"
                        type="text"
                        placeholder="Enter your State"
                    />
                </div>

                <div className="">
                    <Label labelName="city">City</Label>
                    <FormControl
                        fieldName="city"
                        variant="input"
                        id="city"
                        placeholder="City"
                    />
                </div>
                <div className="">
                    <Label labelName="postalCode">Zip Code</Label>
                    <FormControl
                        fieldName="zipCode"
                        variant="input"
                        id="street-address"
                        placeholder="Enter your location zipcode"
                    />
                </div>

                <div className="">
                    <Label labelName="line2Address">Address Line 1</Label>
                    <FormControl
                        fieldName="addressLine1"
                        variant="input"
                        id="line2Address"
                        placeholder="house address, xyz."
                    />
                </div>
                <div className="">
                    <Label labelName="line2Address">Address Line 2</Label>
                    <FormControl
                        fieldName="addressLine2"
                        variant="input"
                        id="line2Address"
                        placeholder="Address line 2"
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
            <div className="mb-10 w-full">
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

            
            <FileDownload />
            </div>
            <div className="flex gap-6 p-6 justify-end">
                <button
                    type="button"
                    className="bg-blue-500 text-white p-4 rounded-lg px-4 w-full lg:w-fit"
                    onClick={moveToNext}
                >
                    {isLoading ? "Please wait..." : "Next"}
                </button>
            </div>
        </div>
    )
}

export function NigerianFields({
    isLoading,
    setCurrentPage,
    returnData,
}: {
    isLoading: boolean
    setCurrentPage: () => void
    returnData?: (data: any) => void
}) {
    const { getValues, watch, setValue } = useFormContext()
 

    function getLocalNames() {
        if (!watch("state")) return
        const lga = statesAndLga
            .filter((item) => item.state.name === getValues("state"))
            .flat()[0]?.state.locals

        return lga
    }
    // const upd = useContactDetailsUpdate()
    const moveToNext = () => {
        const data = {
            state: getValues("state"),
            localGovernment: getValues("localGovernment"),
            streetAddress: getValues("streetAddress"),
            zipCode: getValues("zipCode"),
            employersName: getValues("employersName"),
            employersAddress: getValues("employersAddress"),
            notificationPreference: getValues("notificationPreference"),
        }
        returnData && returnData(data)

        setCurrentPage()
    }






    return (
        <div className="bg-[#F8FAFB] w-full shadow-lg h-fit">
            <div className="flex gap-6 justify-between p-6 md:items-center flex-col md:flex-row">
                <p className="font-medium">Account Holder Details</p>
                <div className="flex items-center gap-6">
                    <span>Nigeria</span>
                    <Switch
                        label=""
                        radius="sm"
                        checked={getValues("isDiaspora") === "yes"}
                        onChange={(e) =>
                            setValue(
                                "isDiaspora",
                                e.target.checked ? "yes" : "no"
                            )
                        }
                    />
                    <span>Diaspora</span>
                </div>
            </div>
            <div className="grid md:grid-cols-2 bg-white gap-10 p-6  border border-[#EBEAEF]">
                <div className="">
                    <Label labelName="state" >State</Label>
                    <Skeleton visible={isLoading}>
                        {" "}
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
                        />
                    </Skeleton>
                </div>

                <div className="">
                    <Label labelName="local-government">Local Government</Label>
                    <Skeleton visible={isLoading}>
                        {" "}
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
                    </Skeleton>
                </div>

                <div className=" ">
                    <Label labelName="street-address">Street Address</Label>
                    <Skeleton visible={isLoading}>
                        {" "}
                        <FormControl
                            fieldName="streetAddress"
                            variant="input"
                            id="street-address"
                            placeholder="house address, xyz."
                        />
                    </Skeleton>
                </div>

                <div className="">
                    <Label labelName="post-code">Post Code</Label>
                    <Skeleton visible={isLoading}>
                        {" "}
                        <FormControl
                            fieldName="zipCode"
                            variant="input"
                            id="post-code"
                            type="text"
                            placeholder="Enter your Post code"
                        />
                    </Skeleton>
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

            <div className="mb-10 w-full">
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
        
            <FileDownload />

            </div>

            <div className="flex gap-6 p-6 justify-end">
                <button
                    type="button"
                    className="bg-blue-500 text-white p-4 rounded-lg px-4 w-full lg:w-fit"
                    onClick={moveToNext}
                >
                    {isLoading ? "Please wait..." : "Next"}
                </button>
            </div>
        </div>
    )
}
