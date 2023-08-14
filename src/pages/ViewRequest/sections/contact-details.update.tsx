import { FormControl, Label } from "@/shared/components"
// import countries from "@/assets/data/countnries.json"
import statesAndLga from "@/assets/data/statesAndLga.json"
import { useFormContext } from "react-hook-form"
import { Skeleton, Switch } from "@mantine/core"
// import { useContactDetailsUpdate } from "../hooks/queries.hooks"
import countries from "@/assets/data/countnries.json"

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
            postalCode: getValues("postalCode"),
            line1: getValues("line1"),
            line2: getValues("line2"),
        }
        returnData && returnData(data)
        setCurrentPage()
    }

    return (
        <div className="bg-[#F8FAFB] w-full  h-fit">
            <div className="flex gap-6 justify-between p-6 md:items-center flex-col md:flex-row">
                <p className="font-medium">Contact Details</p>
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
                        fieldName="diasporaState"
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
                        fieldName="postalCode"
                        variant="input"
                        id="street-address"
                        placeholder="Enter your location zipcode"
                    />
                </div>

                <div className="">
                    <Label labelName="line2Address">Address Line 1</Label>
                    <FormControl
                        fieldName="line1"
                        variant="input"
                        id="line2Address"
                        placeholder="house address, xyz."
                    />
                </div>
                <div className="">
                    <Label labelName="line2Address">Address Line 2</Label>
                    <FormControl
                        fieldName="line2"
                        variant="input"
                        id="line2Address"
                        placeholder="Address line 2"
                    />
                </div>
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
            localGovt: getValues("localGovt"),
            line1: getValues("line1"),
            postalCode: getValues("postalCode"),
        }
        returnData && returnData(data)

        setCurrentPage()
    }

    return (
        <div className="bg-[#F8FAFB] w-full shadow-lg h-fit">
            <div className="flex gap-6 justify-between p-6 md:items-center flex-col md:flex-row">
                <p className="font-medium">Contact Details</p>
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
                    <Label labelName="state" required>State</Label>
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
                    </Skeleton>
                </div>

                <div className=" ">
                    <Label labelName="street-address">Street Address</Label>
                    <Skeleton visible={isLoading}>
                        {" "}
                        <FormControl
                            fieldName="line1"
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
                            fieldName="postalCode"
                            variant="input"
                            id="post-code"
                            type="text"
                            placeholder="Enter your Post code"
                        />
                    </Skeleton>
                </div>
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
