import motif from "../../../shared/assets/images/background.jpg";

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
    bvn: string
    title: string
    maritalStatus: string
    motherMaidenName: string
    FullNameOfKin: string
    RelationshipOfKin: string
    DobOfKin: string
    PhoneNumberOfKin: string
    HouseNumberOfKin: string
    StateOfKin: string
    StreetNameOfKin: string
    LocalGovernmentOfKin: string
    PostalZipCodeOfKin: string
    RequestType: string
    FirstName: string
    LastName: string
    MiddleName: string
    Status: string
    EmployersName: string
    NatureOfBusiness: string
    NumberofYears: string
    AnnualIncome: string
    countryOfTaxResidence: string
    foreignTaxId: string
    mobileNumber: string
    TaxAddress1: string
    TaxAddress2: string
    secondCountry: string
    line1?: string
    line2?: string
    postalCode: string | null
    localGovt: string
    city: string
    state: string
    country: string
    isDiaspora: "yes" | "no"
    DOB: string
}

export interface PreviewDataProps {
    previewData: PreviewDataProps;
    FirstName: string
    middleName: string
    LastName: string
    maritalStatus: string
    motherMaidenName: string
    DOB: string
    isDiaspora: string
    country: string
    state: string
    localGovt: string
    city: string
    postalCode: string
    line1: string
    line2: string
    Documents: Document[]
}

const PreviewPage: React.FC<{
    previewData: any,
    setPreviewPage: (val: boolean) => void
    openOTPModal: () => void
}> = ({ previewData, setPreviewPage, openOTPModal }) => {
    console.log(previewData, "the preview data")

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
                <h2 className="text-xl font-bold mb-2">Personal Details:</h2>
                <p className="mb-2 pb-2 border-b border-gray-200 ">First Name: {previewData?.FirstName}</p>
                <p className="mb-2 pb-2 border-b border-gray-200">Middle Name: {previewData.middleName}</p>
                <p className="mb-2 pb-2 border-b border-gray-200">Last Name: {previewData.LastName}</p>
                <p className="mb-2 pb-2 border-b border-gray-200">
                    Marital Status: {previewData.maritalStatus}
                </p>
                <p className="mb-2 pb-2 border-b border-gray-200">
                    Mother Maiden Name: {previewData.motherMaidenName}
                </p>
                <p className="mb-2 pb-2 border-b border-gray-200">
                    Date of Birth:{" "}
                    {new Date(previewData.DOB).toLocaleDateString()}
                </p>

                {/* Display Contact Details */}
                {/* Display Contact Details */}
                <h2 className="text-xl font-bold mt-6 mb-2">
                    Contact Details:
                </h2>
                {previewData.isDiaspora === "NO" ? (
                    // Show specific contact details when isDiaspora is "NO"
                    <>
                        {previewData.state && (
                            <p className="mb-2 pb-2 border-b border-gray-200">State: {previewData.state}</p>
                        )}
                        {previewData.localGovt && (
                            <p className="mb-2 pb-2 border-b border-gray-200">
                                Local Government: {previewData.localGovt}
                            </p>
                        )}
                        {previewData.line1 && (
                            <p className="mb-2 pb-2 border-b border-gray-200">
                                Address Line 1: {previewData.line1}
                            </p>
                        )}
                        {previewData.postalCode && (
                            <p className="mb-2 pb-2 border-b border-gray-200">
                                Postal Code: {previewData.postalCode}
                            </p>
                        )}
                    </>
                ) : (
                    // Show all contact details when isDiaspora is not "NO"
                    <>
                        {previewData.country && (
                            <p className="mb-2 pb-2 border-b border-gray-200">
                                Country: {previewData.country}
                            </p>
                        )}
                        {previewData.localGovt && (
                            <p className="mb-2 pb-2 border-b border-gray-200">
                                Local Government: {previewData.localGovt}
                            </p>
                        )}
                        {previewData.state && (
                            <p className="mb-2 pb-2 border-b border-gray-200">State: {previewData.state}</p>
                        )}
                        {previewData.city && (
                            <p className="mb-2 pb-2 border-b border-gray-200">City: {previewData.city}</p>
                        )}
                        {previewData.postalCode && (
                            <p className="mb-2 pb-2 border-b border-gray-200">
                                Postal Code: {previewData.postalCode}
                            </p>
                        )}
                        {previewData.line1 && (
                            <p className="mb-2 pb-2 border-b border-gray-200">
                                Address Line 1: {previewData.line1}
                            </p>
                        )}
                        {previewData.line2 && (
                            <p className="mb-2 pb-2 border-b border-gray-200">
                                Address Line 2: {previewData.line2}
                            </p>
                        )}
                    </>
                )}
                {/* Display Uploaded Documents */}
                <h2 className="text-xl font-bold mt-6 mb-2">
                    Uploaded Documents:
                </h2>
                <div className="mb-8">
                {previewData.proofOfIdentityImage.map((item: { file: File, name: string }, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-semibold pb-2 border-b border-gray-200">
                Document Type: Marriage Certificate
              </p>
              <p>File Name: {item.name}</p>
            </div>
          ))}

          {previewData.proofOfNinImage.map((item: { file: File, name: string }, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-semibold pb-2 border-b border-gray-200">
                Document Type: Birth Certificate/ Affidavit
              </p>
              <p>File Name: {item.name}</p>
            </div>
          ))}

          {previewData.proofOfAddressImage.map((item: { file: File, name: string }, index: number) => (
            <div key={index} className="mb-4">
              <p className="font-semibold pb-2 border-b border-gray-200">
                Document Type: Additional Documents
              </p>
              <p>File Name: {item.name}</p>
            </div>
          ))}
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
                <div
                   
                >
                    {/* Content inside the div if needed */}
                </div>
            </div>
        </div>
    )
}

export default PreviewPage
