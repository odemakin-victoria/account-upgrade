import { FormControl, Label } from "@/shared/components"
import { FileField } from "@/shared/types"
import { useFormContext } from "react-hook-form"
import { FiTrash2 } from "react-icons/fi"
import LabelDecor from "../components/label-decor"
import SectionContainer from "../components/section"
import SignatureCanvas from "./Signature"
import { useState, ChangeEvent } from 'react';





export default function MeansofIdentification() {
    const { setValue, watch, getValues } = useFormContext()
    const [vnin, setVnin] = useState('');
   
    const handleVninChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        if (/^\d{1,16}$/.test(input)) {
          setVnin(input);
        }
      };


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files
            const fieldName = e.target.name

            setValue(fieldName, {
                name: file[0].name,
                file: file[0],
            })
        }
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

    function removeImage(fieldName: string) {
        setValue(`${fieldName}`, null)
    }


 

    return (
        <SectionContainer
            className="mb-4"
            aria-labelledby="means-of-identification"
        >
            <h2 className="text-lg mb-8 heading" id="means-of-identification">
                <LabelDecor text="4" />
                Means of Identification
            </h2>
            {/* Upload ID */}
            <div className="mb-10">
                <Label labelName="Upload-id" aria-describedby="label-hint" required>
                    Upload Regulatory ID
                </Label>
                {watch("isDiaspora") === "no" ? (
                    <p id="label-hint" aria-hidden="true">
                        Pleae upload your National ID,NIN Slip, Permanent Voter's Card (PVC), International Passport,
                        Driver's License ( The maximum file size for each document upload is 2MB.)
                    </p>
                ) : (
                    <>
                        <p> Any of the below is acceptable ( The maximum file size for each document upload is 2MB.)</p>
                        <ol
                            id="label-hint"
                            aria-hidden="true"
                            className="list-decimal pl-5 mb-4"
                        >
                            <li>Valid Nigerian Passport</li>
                            <li>
                                Expired Nigerian passport + Valid Foreign I.D
                                (issued in the country of Residence)
                            </li>
                            <li>
                                Nigerian birth certificate + Valid Foreign I.D
                                (issued in the country of Residence)
                            </li>
                            <li>
                                Nigerian ID of parent + Birth certificate of
                                customer (Nigerian/Foreign) + Valid Foreign I.D
                                (issued in the country of Residence
                            </li>
                        </ol>
                    </>
                )}

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
            {/* Upload NIN Slip */}
            <div className="mb-10">
                <Label labelName="Upload-id" aria-describedby="label-hint">
                    Uploaded your NIN Slip/ National ID ?{" "}
                </Label>
                {watch("isDiaspora") === "no" ? (
                    <p
                        id="label-hint"
                        aria-hidden="true"
                        className="mb-4 text-base font-normal leading-normal"
                    >
                        Please provide your virtual NIN Below (Dial *346*3*YOUR
                        NIN* 1301388 # or Download the NIMC App to generate your
                        virtual NIN. Our Enterprise Code is 1301388)( The maximum file size for each document upload is 2MB.)
                    </p>
                ) : (
                    <>
                        <p> Any of the below is acceptable ( The maximum file size for each document upload is 2MB.)</p>
                        <ol
                            id="label-hint"
                            aria-hidden="true"
                            className="list-decimal pl-5 mb-4"
                        >
                            <li>Valid Nigerian Passport</li>
                            <li>
                                Expired Nigerian passport + Valid Foreign I.D
                                (issued in the country of Residence)
                            </li>
                            <li>
                                Nigerian birth certificate + Valid Foreign I.D
                                (issued in the country of Residence)
                            </li>
                            <li>
                                Nigerian ID of parent + Birth certificate of
                                customer (Nigerian/Foreign) + Valid Foreign I.D
                                (issued in the country of Residence
                            </li>
                        </ol>
                    </>
                )}

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

            <div className="mb-10">
        <Label labelName="bvn" >Virtual National Identification Number (VNIN)</Label>
        <FormControl
          fieldName="vnin"
          variant="input"
          id="vnin"
          type="text"
          placeholder="Enter your VNIN"
          maxLength={16}
          value={vnin}
          onChange={handleVninChange}
        />
      </div>

            {/* Upload Utility bill */}
            <div className="mb-10">
                <Label
                    labelName="Upload-id-2"
                    aria-describedby="label-hint"
                    required
                >
                    Utility Bill/ Statement of Account/ Proof of Address 
                </Label>

                {watch("isDiaspora") === "no" ? (
                    <p id="label-hint" aria-hidden="true">
                        This should be issued within the last 3 months ( The maximum file size for each document upload is 2MB.).
                    </p>
                ) : (
                    <>
                        <p> Any of the below is acceptable ( The maximum file size for each document upload is 2MB.)</p>

                        <ol
                            id="label-hint"
                            aria-hidden="true"
                            className="list-decimal pl-5 mb-4"
                        >
                            <li>
                                Notarized/Verified Utility bill (Issued within
                                the last 3 months)- Notarization not required if
                                it bears same address as Foreign ID
                            </li>
                            <li>Notarized/Online generated Bank statement</li>
                            <li>
                                Foreign ID carrying the customer’s address (As a
                                secondary ID to Valid Nigerian passport or
                                another foreign ID)
                            </li>
                            <li>
                                Letter of introduction from school showing
                                current residential address
                            </li>
                        </ol>
                    </>
                )}
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
            {/* Upload Passport  */}
            <div className="mb-10">
                <Label labelName="Upload Photo" required>
                    Capture Facial Selfie/ Upload Passport Photo{" "}
                </Label>

                <p> Any of the below is acceptable ( The maximum file size for each document upload is 2MB.)</p>

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
            <SignatureCanvas />
        </SectionContainer>
    )
}
