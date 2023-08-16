export interface Document {
    name: string
    type: string
    status: string
    uploadDate: string
    comments: string
}

export interface PreviewDataProps {
    firstName: string
    middleName: string
    lastName: string
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
    previewData: PreviewDataProps
    setPreviewPage: (val: boolean) => void
    openOTPModal: ()=>void
}> = ({ previewData, setPreviewPage, openOTPModal}) => {
    console.log(previewData, "the preview data")

    const handleBackToForm = () => {
        setPreviewPage(false)
        // Implement the logic to go back to the form page
        
    }

    return (
        <div >
            <div className="container mx-auto px-16 py-8 bg-white shadow-lg rounded-lg w-3/4">
                <h1 className="text-4xl font-bold my-8 text-blue-500 text-center">
                    {" "}
                    Summary
                </h1>
                {/* Display Personal Details */}
                <h2 className="text-xl font-bold mb-2">Personal Details:</h2>
                <p className="mb-2">First Name: {previewData?.firstName}</p>
                <p className="mb-2">Middle Name: {previewData.middleName}</p>
                <p className="mb-2">Last Name: {previewData.lastName}</p>
                <p className="mb-2">Marital Status: {previewData.maritalStatus}</p>
                <p className="mb-2">Mother Maiden Name: {previewData.motherMaidenName}</p>
                <p className="mb-2">
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
                        {previewData.state && <p className="mb-2">State: {previewData.state}</p>}
                        {previewData.localGovt && (
                            <p className="mb-2">Local Government: {previewData.localGovt}</p>
                        )}
                        {previewData.line1 && (
                            <p className="mb-2">Address Line 1: {previewData.line1}</p>
                        )}
                        {previewData.postalCode && (
                            <p className="mb-2">Postal Code: {previewData.postalCode}</p>
                        )}
                    </>
                ) : (
                    // Show all contact details when isDiaspora is not "NO"
                    <>
                        {previewData.country && (
                            <p className="mb-2">Country: {previewData.country}</p>
                        )}
                        {previewData.localGovt && (
                            <p className="mb-2">Local Government: {previewData.localGovt}</p>
                        )}
                        {previewData.state && <p className="mb-2">State: {previewData.state}</p>}
                        {previewData.city && <p className="mb-2">City: {previewData.city}</p>}
                        {previewData.postalCode && (
                            <p className="mb-2">Postal Code: {previewData.postalCode}</p>
                        )}
                        {previewData.line1 && (
                            <p className="mb-2">Address Line 1: {previewData.line1}</p>
                        )}
                        {previewData.line2 && (
                            <p className="mb-2">Address Line 2: {previewData.line2}</p>
                        )}
                    </>
                )}
                {/* Display Uploaded Documents */}
                <h2 className="text-xl font-bold mt-6 mb-2">
                    Uploaded Documents:
                </h2>
                <ul>
                    {previewData.Documents.map((document, index) => (
                        <li key={index}>
                            <p className="mb-2">Name: {document.name}</p>
                            <p className="mb-2">Type: {document.type}</p>
                            <p className="mb-2">Status: {document.status}</p>
                            <p className="mb-2">
                                Upload Date:{" "}
                                {new Date(
                                    document.uploadDate
                                ).toLocaleDateString()}
                            </p>
                            <p className="mb-2">Comments: {document.comments}</p>
                        </li>
                    ))}
                </ul>

                {/* Back to Form Button */}
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handleBackToForm}
                        className="bg-blue-500 text-white py-8 px-4 rounded-lg"
                    >
                        Back to Form
                    </button>
                    <button
                        onClick={openOTPModal}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                        Submit
                    </button>
                </div>
                <div className="w-full h-16 mt-8 bg-cover rounded-lg bg-repeat" style={{
                background: `url(https://forms.zohopublic.com/optimusbankhr/downloadlogoperma?filepath=/optimusbankhr/zf-customthemes-zf/1683535029165_title__2_.jpg)`,
                backgroundSize: "stretch",
            }}>
          {/* Content inside the div if needed */}
        </div>
            </div>
            
        </div>
    )
}

export default PreviewPage