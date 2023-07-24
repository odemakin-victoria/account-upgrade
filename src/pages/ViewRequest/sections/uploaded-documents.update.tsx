import { AccountDocumentRequest, AccountDocumentResponse } from "@/shared/types"
import dayjs from "dayjs"
import { useFormContext } from "react-hook-form"
import { AiOutlineEdit } from "react-icons/ai"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { useDocumentUpdate } from "../hooks/queries.hooks"
import { Label } from "@/shared/components"
import { useState } from "react"
import { mapItemName } from "@/utils/FormUtils.shared"
dayjs.extend(localizedFormat)

export default function UploadedDocumentUpdate() {
    const { getValues } = useFormContext()
    const [files, setFiles] = useState<AccountDocumentRequest[]>([])
    const upd = useDocumentUpdate()

    const handleFileSelection = (
        e: React.ChangeEvent<HTMLInputElement>,
        documentId: string
    ) => {
        const file = e.target.files && e.target.files[0]

        if (!file) {
            return
        }

        const existingFileIndex = files.findIndex(
            (c) => c.documentId === documentId
        )
        const isExistingFile = existingFileIndex > -1

        if (isExistingFile) {
            // File already exists, perform replace operation
            const updatedFiles = [...files]
            updatedFiles[existingFileIndex] = {
                documentId,
                documentName: file.name,
                document: file,
            }
            setFiles(updatedFiles)
        } else {
            // File doesn't exist, perform add operation
            const newFile = {
                documentId,
                documentName: file.name,
                document: file,
            }
            const filesInState = files ? [...files, newFile] : [newFile]
            setFiles(filesInState)
        }

        // Rest of your code for handling file selection
    }

    const createFormData = (files: AccountDocumentRequest[] | null) => {
        const formData = new FormData()

        files?.forEach((element, index) => {
            formData.append(
                `customerDocument[${index}].documentId`,
                element.documentId
            )
            formData.append(
                `customerDocument[${index}].document`,
                element.document
            )
            formData.append(
                `customerDocument[${index}].documentName`,
                element.documentName ?? ""
            )
            formData.append(
                `customerDocument[${index}].documentType`,
                element.documentType ?? ""
            )
        })

        return formData
    }

    return (
        <div className="flex-1 ">
            <div className="flex gap-6 justify-between py-6 items-center text-xl">
                <p className="font-bold">Uploaded Documents</p>
            </div>

            <div className="overflow-scroll md:overflow-auto bg-white gap-10 border border-[#EBEAEF] mb-6 ">
                <table className="w-full border-seperate border-spacing-y-10  ">
                    <thead>
                        <tr className="bg-blue-500 text-white  ">
                            <th className="p-4 text-left">Document Name</th>
                            <th className="p-4 text-left">Document Type</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Comment</th>
                            <th className="p-4 text-left">Upload Date</th>
                            <th className="p-4 text-left"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {(
                            getValues("documents") as AccountDocumentResponse[]
                        ).map((item, index) => {
                            return (
                                <tr
                                    key={item.documentId}
                                    className={` ${
                                        files.findIndex(
                                            (c) =>
                                                c.documentId === item.documentId
                                        ) > -1
                                            ? "bg-blue-100"
                                            : ""
                                    }`}
                                >
                                    <td className="p-4">
                                        {files.find(
                                            (d) =>
                                                d.documentId == item.documentId
                                        )?.documentName ?? item.documentName}
                                    </td>
                                    <td className="p-4">{mapItemName(item.documentType??"")}</td>
                                    <td className="p-4">
                                        <StatusPill
                                            status={item.documentStatus}
                                        />
                                    </td>
                                    <td className="p-4">
                                        {item.documentComment ?? "---"}
                                    </td>
                                    <td className="p-4">
                                        {dayjs(item.dateCreated).format("LL")}
                                    </td>
                                    <td>
                                        {item.documentStatus.toLowerCase() !==
                                            "accepted" && (
                                            <div>
                                                <Label
                                                    labelName={`change document ${
                                                        index + 1
                                                    }`}
                                                    className={`bg-blue-100 p-4 border border-blue-300 w-fit inline-block cursor-pointer`}
                                                >
                                                    <AiOutlineEdit />
                                                </Label>

                                                <input
                                                    type="file"
                                                    name=""
                                                    id={`change document ${
                                                        index + 1
                                                    }`}
                                                    hidden
                                                    onChange={(e) =>
                                                        handleFileSelection(
                                                            e,
                                                            item.documentId
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {files.length > 0 && (
                <div className="flex gap-6 p-6 justify-end">
                    <button
                        type="button"
                        className="bg-blue-500 text-white p-4 rounded-lg px-4 font-regular"
                        onClick={() => upd.mutate(createFormData(files))}
                    >
                        {upd.isLoading ? "Please wait..." : "Update Documents"}
                    </button>
                </div>
            )}
        </div>
    )
}

export function StatusPill({ status }: { status: string }) {
    const statusStyle =
        status.toLowerCase() === "rejected"
            ? "bg-red-100 text-red-600 p-4 rounded-lg"
            : status.toLowerCase() === "pending"
            ? "bg-yellow-100 text-yellow-600 p-4 rounded-lg"
            : status.toLowerCase() === "accepted"
            ? "bg-green-100 text-green-600 p-4 rounded-lg"
            : ""

    return <span className={statusStyle}>{status}</span>
}
