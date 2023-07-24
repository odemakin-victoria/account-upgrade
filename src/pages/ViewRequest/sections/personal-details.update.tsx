import { FormControl, Label } from "@/shared/components"
import { useCustomerUpdate } from "../hooks/queries.hooks"
import { useFormContext } from "react-hook-form"
import { Skeleton } from "@mantine/core"

export default function PersonalDetails({ isLoading }: { isLoading: boolean }) {
    const { getValues } = useFormContext()

    const upd = useCustomerUpdate()

    return (
        <div className="bg-[#F8FAFB] w-full h-fit">
            <div className="flex gap-6 justify-between p-6 items-center">
                <p className="font-medium">Personal Details</p>

                {/* <button
                    className="bg-blue-100 p-4 border border-blue-300"
                    name="edit contact details"
                    onClick={() => setIsEdit(!isEditing)}
                >
                    <AiOutlineEdit />
                </button> */}
            </div>

            <div className="grid md:grid-cols-2 bg-white gap-10 p-6  border border-[#EBEAEF]">
                <div className="">
                    <Label labelName="marital-status">Marital Status</Label>
                    <Skeleton visible={isLoading}>
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
                            ]}
                            id="marital-status"
                            placeholder="Enter your Marital Status"
                        />
                    </Skeleton>
                </div>

                <div className="">
                    <Label labelName="Mother-Maiden-Name">
                        Mother Maiden Name
                    </Label>
                    <Skeleton visible={isLoading}>
                        <FormControl
                            fieldName="motherMaidenName"
                            variant="input"
                            id="Mother-Maiden-Name"
                            type="text"
                            placeholder="Enter your Mother's Maiden Name "
                        />
                    </Skeleton>
                </div>
                <div className="">
                    <Label labelName="Name-of-Next-of-Kin">
                        Name of Next of Kin
                    </Label>
                    <Skeleton visible={isLoading}>
                        <FormControl
                            fieldName="nextOfKinName"
                            variant="input"
                            id="Name-of-Next-of-Kin"
                            type="text"
                            placeholder="Enter your next of Kin's Name"
                        />
                    </Skeleton>
                </div>
                <div className="">
                    <Label labelName="Phone-number-of-Next-of-Kin">
                        Phone number of Next of Kin
                    </Label>
                    <Skeleton visible={isLoading}>
                        <FormControl
                            fieldName="nextOfKinPhone"
                            variant="input"
                            id="Phone-number-of-Next-of-Kin"
                            type="text"
                            placeholder="Enter your Phone No. of Next of Kin "
                        />
                    </Skeleton>
                </div>
            </div>

            <div className="flex gap-6 p-6 justify-end">
                <button
                    type="button"
                    className="bg-blue-500 text-white p-4 rounded-lg px-4 w-full lg:w-fit"
                    onClick={() =>
                        upd.mutate({
                            customerId: getValues("customerId"),
                            maritalStatus: getValues("maritalStatus"),
                            motherMaidenName: getValues("motherMaidenName"),
                            nextOfKinName: getValues("nextOfKinName"),
                            nextOfKinPhone: getValues("nextOfKinPhone"),
                        })
                    }
                >
                    {upd.isLoading
                        ? "Please wait..."
                        : "Update Personal Details"}
                </button>
            </div>
        </div>
    )
}
