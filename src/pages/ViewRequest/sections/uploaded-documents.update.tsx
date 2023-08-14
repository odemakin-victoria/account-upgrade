import React, { useState } from "react"

import dayjs from "dayjs"
import { useFormContext } from "react-hook-form"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { FormControl, Label } from "@/shared/components"
import { FiTrash2 } from "react-icons/fi"

dayjs.extend(localizedFormat)

interface Document {
    name: string
    type: string
    status: string
    uploadDate: string
    comments: string
    file: File // Add the correct type for the file property
}

type UploadedDocumentUpdateProps = {
    returnData?: (data: any) => void
}

export default function UploadedDocumentUpdate({
    returnData,
}: UploadedDocumentUpdateProps) {
    const { setValue, watch } = useFormContext()
    const [Documents, setUploadedDocuments] = useState<Document[]>([])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files
            const fieldName = e.target.name
            const documentType = watch("documentType")

            const newDocument: Document = {
                name: file[0].name,
                type: documentType,
                status: "pending",
                uploadDate: dayjs().format("LLL"),
                file: file[0],
                comments: "",
            }
            setUploadedDocuments((prevDocs) => [...prevDocs, newDocument])

            setValue(fieldName, {
                name: file[0].name,
                file: file[0],
            })
        }
    }
    function removeDocument(index: number) {
        setUploadedDocuments((prevDocs) => {
            const newDocs = [...prevDocs]
            newDocs.splice(index, 1)
            return newDocs
        })
    }

    function removeImage(fieldName: string) {
        setValue(`${fieldName}`, null)
    }
    const moveToNext = () => {
        const data = {
            Documents: Documents,
        }
        returnData && returnData(data)
    }
    return (
        <div className="flex-1 ">
            <div className="flex gap-6 justify-between py-6 items-center text-xl">
                <p className="font-bold">Upload Documents</p>
            </div>
            <div className="flex ">
                <div className="">
                    <Label labelName="document-type">
                        Choose type of Document
                    </Label>
                    <FormControl
                        fieldName="documentType"
                        variant="select"
                        options={[
                            {
                                label: "Affidavit",
                                value: "Affidavit",
                            },
                            {
                                label: "Birth Certificate.",
                                value: "Birth Certificate.",
                            },
                            {
                                label: "Marriage Certificate",
                                value: "Marriage Certificate",
                            },
                            {
                                label: "Additional Documents",
                                value: "Additional Documents",
                            },
                        ]}
                        id="document-type"
                        placeholder="Choosen a Document Type"
                        className="mb-8 mr-64 "
                    />
                </div>
                <div className="mb-8">
                    <Label labelName="Upload Photo"></Label>
                    <FormControl
                        fieldName="customerPhoto"
                        onChange={onChange}
                        variant="image"
                        accept=".pdf, .jpg, .jpeg, .png"
                    />

                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 my-4">
                        {watch("customerPhoto") && (
                            <div
                                className="bg-blue-200 w-fit border border-blue-300 items-center inline-flex"
                                aria-label="upload-files"
                            >
                                <span
                                    className="inline-flex px-3"
                                    aria-label="uploaded-image-name"
                                >
                                    {watch("customerPhoto").name?.slice(0, 20)}
                                </span>
                                <button
                                    className="p-4 bg-white inline-flex h-full justify-center items-center"
                                    onClick={() => removeImage("customerPhoto")}
                                >
                                    <FiTrash2 className="text-red-400" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-scroll md:overflow-auto bg-white gap-10 border border-[#EBEAEF] mb-6 ">
                <table className="w-full border-seperate border-spacing-y-10  ">
                    <thead>
                        <tr className="bg-blue-500 text-white  ">
                            <th className="p-4 text-left">Document Name</th>
                            <th className="p-4 text-left">Document Type</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Comments</th>
                            <th className="p-4 text-left">Upload Date</th>
                            <th className="p-4 text-left"> Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Documents.map((document, index) => (
                            <tr key={index}>
                                <td className="p-4">{document.name}</td>
                                <td className="p-4">{document.type}</td>
                                <td className="p-4">
                                    <StatusPill status={document.status} />
                                </td>
                                <td className="p-4">
                                    {document.comments ?? "---"}
                                </td>
                                <td className="p-4">{document.uploadDate}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => removeDocument(index)}
                                        className="text-red-400"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-6 p-6 justify-end">
                <button
                    type="button"
                    className="bg-blue-500 text-white p-4 rounded-lg px-4 font-regular"
                    onClick={moveToNext}
                >
                    Preview
                </button>
            </div>
        </div>
    )
}

export function StatusPill({ status }: { status: string }) {
    const statusStyle =
        status.toLowerCase() === "rejected"
            ? "bg-red-100 text-red-600 p-4 rounded-lg"
            : status.toLowerCase() === "pending"
            ? "bg-yellow-100 text-yellow-600 p-4 rounded-lg font-bold"
            : status.toLowerCase() === "accepted"
            ? "bg-green-100 text-green-600 p-4 rounded-lg"
            : ""

    return <span className={statusStyle}>{status}</span>
}
