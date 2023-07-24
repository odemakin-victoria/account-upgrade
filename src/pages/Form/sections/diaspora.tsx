import React from "react"
import { useFormContext } from "react-hook-form"
import { FiTrash2 } from "react-icons/fi"
import DocumentDownload from "../components/document-download"
import ImageUpload from "../components/image-upload"

import DiasporaDoc from "../assets/images/DIASPORA_CUSTOMER_DOCS.pdf"
import { FileField } from "@/shared/types"


export default function Diaspora() {
    const { setValue, watch, getValues } = useFormContext()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const diasporaDocs = getValues("diasporaDocs")

        if (diasporaDocs?.length === 4) {
            return
        }

        if (
            e.target.files &&
            e.target.files.length > 0 &&
            e.target.files.length <= 4
        ) {
            const files = [...e.target.files]

            const finalFIles = files.map((file) => {
                return {
                    file,
                    name: file.name,
                }
            })

            if (diasporaDocs?.length > 0) {
                setValue("diasporaDocs", diasporaDocs.concat(finalFIles))
            } else {
                setValue("diasporaDocs", finalFIles)
            }
        }
    }

    function removeImage(itemName: string) {
        const diasporaDocs = getValues("diasporaDocs")
        const filteredOocs = [...diasporaDocs].filter(
            (item: FileField) => item?.name !== itemName
        )
        setValue("diasporaDocs", filteredOocs)
    }

    return (
        <div>
            <p
                aria-label="Description for customers in diaspora"
                className="border-t border-t-gray-400 pt-4"
            >
                For Diaspora customers please download below file, complete and
                attach in next field
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
                <DocumentDownload
                    name="Self Certification Form"
                    link={DiasporaDoc}
                />
            </div>

            <ImageUpload
                accept="application/pdf"
                multiple
                name="diasporaDocs"
                handleChange={onChange}
            />

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 my-4">
                {watch("diasporaDocs") &&
                    watch("diasporaDocs")?.map((item: File) => {
                        return (
                            <div
                                className="bg-blue-200 w-fit border border-blue-300 items-center inline-flex"
                                aria-label="upload-files"
                            >
                                <span
                                    className="inline-flex px-3"
                                    aria-label="uploaded-image-name"
                                >
                                    {item.name?.slice(0, 20)}
                                </span>
                                <button
                                    className="p-4 bg-white inline-flex h-full justify-center items-center"
                                    onClick={() => removeImage(item.name)}
                                >
                                    <FiTrash2 className="text-red-400" />
                                </button>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
