import  { useState } from "react"
import { FormControl, Label } from "@/shared/components"
import { useCustomerUpdate } from "../hooks/queries.hooks"
import { useFormContext } from "react-hook-form"
import { Skeleton } from "@mantine/core"

type PersonalDetailsProps = {
    isLoading: boolean
    setCurrentPage: () => void
    returnData?: (data: any) => void
}

export default function PersonalDetails({
    isLoading,
    setCurrentPage,
    returnData,
}: PersonalDetailsProps) {
    const { getValues } = useFormContext()
    const [errorMessage, setErrorMessage] = useState("")
    const upd = useCustomerUpdate()

    const moveToNext = () => {
        const firstName = getValues("firstName")
        const lastName = getValues("lastName")
        const motherMaidenName = getValues("motherMaidenName")
        const DOB = getValues("DOB")
        const maritalStatus = getValues("maritalStatus")

        if (
            !firstName ||
            !lastName ||
            !motherMaidenName ||
            !DOB ||
            !maritalStatus
        ) {
            // Set the error message and prevent moving to the next page
            setErrorMessage("Please fill all required fields.");
            return
        }

        setErrorMessage("") // Clear the error message if there was one

        const data = {
            firstName: firstName,
            middleName: getValues("middleName"),
            lastName: lastName,
            maritalStatus: maritalStatus,
            motherMaidenName: motherMaidenName,
            DOB: DOB,
        }
        setCurrentPage()
        returnData && returnData(data)
        console.log(data, "this is personal detail")
    }

    const handleCloseError = () => {
        setErrorMessage(""); // Clear the error message when the close button is clicked
      };
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
                {/* firstName */}
                <div className="">
                    <Label labelName="First-Name" required>
                        First Name{" "}
                    </Label>
                    <FormControl
                        fieldName="firstName"
                        variant="input"
                        id="First-Name"
                        type="text"
                        placeholder="Enter your First Name "
                    />
                </div>
                {/* middle name */}
                <div className="">
                    <Label labelName="Middle-Name">Middle Name </Label>
                    <Skeleton visible={isLoading}>
                        <FormControl
                            fieldName="middleName"
                            variant="input"
                            id="Middle-Name"
                            type="text"
                            placeholder="Enter your Middle Name "
                        />
                    </Skeleton>
                </div>
                {/* Last Name */}
                <div className="">
                    <Label labelName="Last-Name" required>
                        Last Name{" "}
                    </Label>
                    <Skeleton visible={isLoading}>
                        <FormControl
                            fieldName="lastName"
                            variant="input"
                            id="Last-Name"
                            type="text"
                            placeholder="Enter your Last Name "
                        />
                    </Skeleton>
                </div>
                {/* Marital Status */}
                <div className="">
                    <Label labelName="marital-status" required>
                        Marital Status
                    </Label>
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
                    </Skeleton>
                </div>
                {/* Mother madien name  */}
                <div className="">
                    <Label labelName="Mother-Maiden-Name" required>
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
                {/* Date of Birth */}
                <div className="mb-10">
                    <Label labelName="date-of-birth" required>
                        Date of Birth{" "}
                    </Label>

                    <FormControl
                        fieldName="DOB"
                        variant="AgeDatePicker"
                        id="date-of-birth"
                        placeholder="Enter your Next of Kin Date of birth "
                    />
                </div>
            </div>

             {/* Error message */}
      {errorMessage && (
        <div
          className="relative bottom-4 left-4 bg-red-500 text-white p-4 font-bold rounded-lg z-50 w-1/4"
        >
          {errorMessage}
          <button
            className="ml-2 text-white"
            onClick={handleCloseError}
            aria-label="Close"
          >
            &#x2716;
          </button>
        </div>
      )}

            <div className="flex gap-6 p-6 justify-end">
                <button
                    type="button"
                    className="bg-blue-500 text-white p-4 rounded-lg px-4 w-full lg:w-fit"
                    onClick={moveToNext}
                >
                    {upd.isLoading ? "Please wait..." : "Next"}
                </button>
            </div>
        </div>
    )
}
