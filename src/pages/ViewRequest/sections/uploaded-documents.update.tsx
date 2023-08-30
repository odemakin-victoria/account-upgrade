import { FormControl, Label } from "@/shared/components"
import { FileField } from "@/shared/types"
import { useFormContext } from "react-hook-form"
import { FiTrash2 } from "react-icons/fi"
import SectionContainer from "../../Form/components/section"


type UploadedDocumentUpdateProps = {
    returnData?: (data: any) => void
}


export default function UploadedDocumentUpdate({
        returnData,
    }: UploadedDocumentUpdateProps) {
    const { setValue, watch, getValues } = useFormContext()

    const moveToNext = () => {
                const data = {
                    proofOfIdentityImage: watch("proofOfIdentityImage") || [],
                    proofOfNinImage: watch("proofOfNinImage") || [],
                    proofOfAddressImage: watch("proofOfAddressImage") || [],
                    customerPhoto: watch("customerPhoto"),
                }
                returnData && returnData(data)
            }

 

    const onChangeForDiaspora = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const name = getValues(e.target.name)

        if (e.target.files && e.target.files.length > 0) {
            const files = [...e.target.files]

            const finalFiles = files.map((file) => {
                return {
                    file,
                    name: file.name,
                } as FileField
            })

            if (name?.length > 0) {
                setValue(e.target.name, name.concat(finalFiles))
            } else {
                setValue(e.target.name, finalFiles)
            }
        }
    }

    function removeImageMultiple(fieldName: string, itemName?: string | null) {
        if (!itemName) {
            return
        }

        const docs = getValues(fieldName)
        const filteredOocs = [...docs].filter(
            (item: FileField) => item?.name !== itemName
        )

        if (filteredOocs.length == 0) {
            setValue(fieldName, null)
        } else {
            setValue(fieldName, filteredOocs)
        }
    }

   

    return (
        <SectionContainer
            className="mb-4"
            aria-labelledby="means-of-identification"
        >
           
            <div className="bg-[#F8FAFB] sm:w-full  lg:w-3/5  h-fit sm:p-4 p-20 mx-auto">
<div className="bg-white p-10 sm:p-4">
{/* Upload Marriage Cetrtificate */}
            <div className="mb-10">
                <Label labelName="Upload-id" aria-describedby="label-hint" >
                Uploaded Documents
                </Label>
               
                    <p id="label-hint" aria-hidden="true" className="mt-6 mb-2">
                        Please upload your Marriage Certification if required or needed for the update ( The maximum file size for each document upload is 2MB.)
                    </p>
                
                

                <FormControl
                    fieldName="proofOfIdentityImage"
                    onChange={onChangeForDiaspora}
                    variant="image"
                    multiple={watch("isDiaspora") === "yes"}
                    accept=".pdf, .jpg, .jpeg, .png"
                />

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 my-4">
                    {watch("proofOfIdentityImage") &&
                        watch("proofOfIdentityImage")?.map(
                            (item: FileField) => {
                                return (
                                    <div
                                        className="bg-blue-200 w-fit border border-blue-300 items-center inline-flex"
                                        aria-label="upload-files"
                                    >
                                        <span
                                            className="inline-flex px-3"
                                            aria-label="uploaded-image-name"
                                        >
                                            {item?.name?.slice(0, 20)}
                                        </span>
                                        <button
                                            className="p-4 bg-white inline-flex h-full justify-center items-center"
                                            onClick={() =>
                                                removeImageMultiple(
                                                    "proofOfIdentityImage",
                                                    item?.name
                                                )
                                            }
                                        >
                                            <FiTrash2 className="text-red-400" />
                                        </button>
                                    </div>
                                )
                            }
                        )}
                </div>
            </div>
            {/* Upload Affidavit */}
            <div className="mb-10">
                
                
                    <p
                        id="label-hint"
                        aria-hidden="true"
                        className="mb-4 text-base font-normal leading-normal"
                    >
                        Please provide your Affidavit or your Birth Certificate if required or needed for the update  ( The maximum file size for each document upload is 2MB).
                    </p>
                
              

                <FormControl
                    fieldName="proofOfNinImage"
                    onChange={onChangeForDiaspora}
                    variant="image"
                    multiple={watch("isDiaspora") === "yes"}
                    accept=".pdf, .jpg, .jpeg, .png"
                />

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 my-4">
                    {watch("proofOfNinImage") &&
                        watch("proofOfNinImage")?.map((item: FileField) => {
                            return (
                                <div
                                    className="bg-blue-200 w-fit border border-blue-300 items-center inline-flex"
                                    aria-label="upload-files"
                                >
                                    <span
                                        className="inline-flex px-3"
                                        aria-label="uploaded-image-name"
                                    >
                                        {item?.name?.slice(0, 20)}
                                    </span>
                                    <button
                                        className="p-4 bg-white inline-flex h-full justify-center items-center"
                                        onClick={() =>
                                            removeImageMultiple(
                                                "proofOfNinImage",
                                                item?.name
                                            )
                                        }
                                    >
                                        <FiTrash2 className="text-red-400" />
                                    </button>
                                </div>
                            )
                        })}
                </div>
            </div>

            {/* Upload Additional Document */}
            <div className="mb-10">
        

                
                    <p id="label-hint" aria-hidden="true">
                    Please provide any other Additional Documents if required or needed for the update( The maximum file size for each document upload is 2MB).
                    </p>
                
                <FormControl
                    fieldName="proofOfAddressImage"
                    onChange={onChangeForDiaspora}
                    variant="image"
                    multiple={watch("isDiaspora") === "yes"}
                    accept=".pdf, .jpg, .jpeg, .png"
                />

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 my-4">
                    {watch("proofOfAddressImage") &&
                        watch("proofOfAddressImage")?.map((item: File) => {
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
                                        onClick={() =>
                                            removeImageMultiple(
                                                "proofOfAddressImage",
                                                item.name
                                            )
                                        }
                                    >
                                        <FiTrash2 className="text-red-400" />
                                    </button>
                                </div>
                            )
                        })}
                </div>
            </div>
            
</div>
            </div>

            {/* Upload ID */}
            <div className="flex gap-6 p-6 justify-end">
 <button
    type="button"
    className="bg-blue-500 text-white p-4 rounded-lg px-4 font-regular"
    onClick={moveToNext}
>
    Preview
</button>
</div>
         
        </SectionContainer>
    )
}










