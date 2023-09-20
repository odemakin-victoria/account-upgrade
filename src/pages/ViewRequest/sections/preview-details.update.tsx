import motif from "../../../shared/assets/images/background.jpg"

export interface Document {
    documentName?: string
    documentType?: string
    documentStatus: string
    documentComment: string | null
}

export enum DocumentType {
    Customerphoto = "CUSTOMERPHOTO",
    Diaspora = "DIASPORA",
    Identification = "IDENTIFICATION",
    Proofofadress = "PROOFOFADRESS",
    Signature = "SIGNATURE",
    extraDocument = "EXTRADOCUMENTS",
}

export enum DocumentStatus {
    Accepted = "Accepted",
    Pending = "Pending",
}

/**
 * Represents a file field for uploading files.
 */
export type FileField = {
    name: string | null
    file: File | null
} | null

export type TFormRequest = {
    customerPhoto: FileField
    extraDocument: FileField
    proofOfIdentityImage: FileField[] | null
    proofOfAddressImage: FileField[] | null
    proofOfNinImage: FileField[] | null
    signature: FileField
    acceptedTerms: boolean
    diasporaDocs: FileField[] | null
    accountNumber: string
    channelId:string
    bvn: string
    notificationPreference:string
    title: string
    maritalStatus: string
    motherMaidenName: string
    FullNameOfKin: string
    RelationshipOfKin: string
    dobOfKin: string
    linkedIn: string
    facebook: string
    instagram:string
    tiktok: string
    twitter:string
    thread:string
    vnin: string
    idNo: string
    idType:string
    issueDate: string
    expiryDate:string
    PhoneNumberOfKin: string
    HouseNumberOfKin: string
    StateOfKin: string
    StreetNameOfKin: string
    LocalGovernmentOfKin: string
    PostalZipCodeOfKin: string
    RequestType: string
    ChannelId:string,

    FirstName: string
    LastName: string
    MiddleName: string
    status: string
    employersName:string
    employersAddress:string
   
    natureOfBusiness: string
    numberofYears: string
    annualIncome: string
    countryOfTaxResidence: string
    foreignTaxId: string
    countryTaxResidence: string
    mobileNumber: string
    zipCode: string | null
    localGovernment: string
    addressLine1: string
    addressLine2: string
    city: string
    houseNumber: string
    streetAddress: string
    country: string
    state: string
    isDiaspora: "yes" | "no"
    dateOfBirth: string
}

export interface PreviewDataProps {
    previewData: PreviewDataProps
    FirstName: string
    MiddleName: string
    LastName: string
    maritalStatus: string
    motherMaidenName: string
    dateOfBirth: string
    isDiaspora: "yes" | "no"
    country: string
    state: string
    employersName:string
    employersAddress:string
    notificationPreference:string
    zipCode: string | null
    localGovernment: string
    addressLine1: string
    addressLine2: string
    city: string
    houseNumber: string
    streetAddress: string
    Documents: Document[]
}

const PreviewPage: React.FC<{
    previewData: any
    setPreviewPage: (val: boolean) => void
    openOTPModal: () => void
}> = ({ previewData, setPreviewPage, openOTPModal }) => {
    

    const handleBackToForm = () => {
        setPreviewPage(false)
        // Implement the logic to go back to the form page
    }

    return (
        <div>
            <div className="container mx-auto  py-8 bg-white shadow-lg rounded-lg w-3/4">
                <img
                    src={motif}
                    alt="Form Header"
                    className="w-full h-full object-cover mt-[-28px]"
                />
                <div className="px-16">
                    <h1 className="text-4xl font-bold my-8 text-blue-500 text-center">
                        {" "}
                        Summary
                    </h1>
                    {/* Display Personal Details */}
                    <h2 className="text-xl font-bold mb-2">
                        Personal Details:
                    </h2>
                    <p className="mb-2 pb-2 border-b border-gray-200 ">
                        First Name: {previewData?.FirstName}
                    </p>
                    <p className="mb-2 pb-2 border-b border-gray-200">
                        Middle Name: {previewData.MiddleName}
                    </p>
                    <p className="mb-2 pb-2 border-b border-gray-200">
                        Last Name: {previewData.LastName}
                    </p>
                    <p className="mb-2 pb-2 border-b border-gray-200">
                        Marital Status: {previewData.maritalStatus}
                    </p>
                    <p className="mb-2 pb-2 border-b border-gray-200">
                        Mother Maiden Name: {previewData.motherMaidenName}
                    </p>
                    <p className="mb-2 pb-2 border-b border-gray-200">
                        Date of Birth:{" "}
                        {new Date(previewData.dateOfBirth).toLocaleDateString()}
                    </p>

                    {/* Display Contact Details */}
                    {/* Display Contact Details */}
                    <h2 className="text-xl font-bold mt-6 mb-2">
                    Account Holder Details:
                    </h2>
                    {previewData.isDiaspora === "no" ? (
    // Show specific contact details when isDiaspora is "no"
    <>
        {previewData.state && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                State: {previewData.state}
            </p>
        )}
        {previewData.localGovernment && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Local Government: {previewData.localGovernment}
            </p>
        )}
        {previewData.streetAddress && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Street Address:{previewData.streetAddress}
            </p>
        )}
        {previewData.zipCode && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Postal Code: {previewData.zipCode}
            </p>
        )}
         {previewData.zipCode && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                employersName: {previewData.employersName}
            </p>
        )}
         {previewData.zipCode && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                employersAddress: {previewData.employersAddress}
            </p>
        )}
         {previewData.zipCode && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                notificationPreference: {previewData.notificationPreference}
            </p>
        )}
    </>
) : (
    // Show all contact details when isDiaspora is not "no"
    <>
        {previewData.country && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Country: {previewData.country}
            </p>
        )}
        {previewData.localGovernment && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Local Government: {previewData.localGovernment}
            </p>
        )}
        {previewData.state && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                State: {previewData.state}
            </p>
        )}
        {previewData.city && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                City: {previewData.city}
            </p>
        )}
        {previewData.zipCode && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Postal Code: {previewData.zipCode}
            </p>
        )}
        {previewData.addressLine1 && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Street Address: {previewData.addressLine1}
            </p>
        )}
          {previewData.streetAddress && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Street Address:{previewData.streetAddress}
            </p>
        )}
        {previewData.addressLine2 && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                Address Line 2: {previewData.addressLine2}
            </p>
        )}
          {previewData.zipCode && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                employersName: {previewData.employersName}
            </p>
        )}
         {previewData.zipCode && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                employersAddress: {previewData.employersAddress}
            </p>
        )}
         {previewData.zipCode && (
            <p className="mb-2 pb-2 border-b border-gray-200">
                notificationPreference: {previewData.notificationPreference}
            </p>
        )}
    </>
)}
                    
                    {/* Display Uploaded Documents */}
                    <h2 className="text-xl font-bold mt-6 mb-2">
                        Uploaded Documents:
                    </h2>
                    <div className="mb-8">
                        {previewData.proofOfIdentityImage.map(
                            (
                                item: { file: File; name: string },
                                index: number
                            ) => (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold pb-2 border-b border-gray-200">
                                        Document Type: Marriage Certificate
                                    </p>
                                    <p>File Name: {item.name}</p>
                                </div>
                            )
                        )}
{previewData.customerPhoto && (
  <div className="mb-4">
    <p className="font-semibold pb-2 border-b border-gray-200">
      Document Type: Birth Certificate/Affidavit
    </p>
    <p>File Name: {previewData.customerPhoto.name}</p>
    {/* Add additional details here if needed */}
  </div>
)}

                        {previewData.proofOfAddressImage.map(
                            (
                                item: { file: File; name: string },
                                index: number
                            ) => (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold pb-2 border-b border-gray-200">
                                        Document Type: Additional Documents
                                    </p>
                                    <p>File Name: {item.name}</p>
                                </div>
                            )
                        )}
                    </div>

                    {/* Back to Form Button */}
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={handleBackToForm}
                            className="bg-blue-500 text-white py-4 px-4 rounded-lg"
                        >
                            Back to Form
                        </button>
                        <button
                            onClick={openOTPModal}
                            className="bg-blue-500 text-white py-4 px-4 rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <img
                    src={motif}
                    alt="Form Header"
                    className="w-full h-full object-cover mt-20 mb-[-30px]"
                />
                <div>{/* Content inside the div if needed */}</div>
            </div>
        </div>
    )
}

export default PreviewPage
