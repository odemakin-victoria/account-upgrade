/**
 * Represents the API response structure.
 */
export interface ApiResponse<T> {
    responseCode: string
    responseMessage: string
    data: T
}

/**
 * Represents the response structure for an account request.
 */
export interface AccountRequestResponse {
    accountNumber: string
    RequestType: string
    updateStatus: string
    bvn: string | null
    PersonalDetails: PersonalDetails
    NextOfKin: NextOfKin
    EmployeeStatus: EmployeeStatus
    contactAddress: ContactAddress
    Documents: Document[]
}

/**
 * Represents an account document.
 */
export interface Document {
    documentName?: string
    documentType?: string
    documentStatus: string
    documentComment: string | null
}

/**
 * Represents an account document with additional response-specific properties.
 */
export interface AccountDocumentResponse extends Document {
    documentId: string
    dateCreated: string
    dateLastModified: string
}

/**
 * Represents a request for an account document.
 */
export interface AccountDocumentRequest {
    documentId: string
    document: File
    documentName?: string
    documentType?: string
}

/**
 * Represents the contact address information.
 */
export interface ContactAddress {
    contactAddressId: string
    country: string
    city: string
    postalCode?: string
    localGovt: string
    state: string
    line1?: string
    line2?: string
    countryOfTaxResidence: string
    foreignTaxId: string
    mobileNumber: string
    TaxAddress1: string
    TaxAddress2: string
    secondCountry: string
    dateCreated?: Date
    dateLastModified?: Date
}

/**
 * Represents an updated contact address.
 */
export interface ContactAddressUpdate extends ContactAddress {
    contactAddressId: string
}

/**
 * Represents the customer personal information.
 */
export interface PersonalDetails {
    customerId: string
    title: string
    maritalStatus: string
    motherMaidenName: string
    FirstName: string
    LastName: string
    MiddleName: string
    DOB: string
    dateCreated: Date
    dateLastModified: Date
}
/**
 * Represents the next of kin personal information.
 */
export interface NextOfKin {
    FullNameOfKin: string
    RelationshipOfKin: string
    DobOfKin: string
    PhoneNumberOfKin: string
    HouseNumberOfKin: string
    StateOfKin: string
    StreetNameOfKin: string
    LocalGovernmentOfKin: string
    PostalZipCodeOfKin: string
    dateCreated: Date
    dateLastModified: Date
}
export interface EmployeeStatus {
    Status: string
    EmployersName: string
    NatureOfBusiness: string
    NumberofYears: string
    AnnualIncome: string
    dateCreated?: Date
    dateLastModified?: Date
}
/**
 * Enumerates the types of documents.
 */
export enum DocumentType {
    Customerphoto = "CUSTOMERPHOTO",
    Diaspora = "DIASPORA",
    Identification = "IDENTIFICATION",
    Proofofadress = "PROOFOFADRESS",
    Signature = "SIGNATURE",
    extraDocument = 'EXTRADOCUMENTS'
}

/**
 * Enumerates the possible statuses of a document.
 */
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

/**
 * Represents the form request for submitting account information.
 */
export type TFormRequest = {
    customerPhoto: FileField
    extraDocument:FileField
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
