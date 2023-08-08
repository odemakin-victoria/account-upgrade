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
    updateStatus: string
    bvn: string | null
    customer: Customer
    contactAddress: ContactAddress
    accountDocuments: AccountDocument[]
}

/**
 * Represents an account document.
 */
export interface AccountDocument {
    documentName?: string
    documentType?: string
    documentStatus: string
    documentComment: string | null
}

/**
 * Represents an account document with additional response-specific properties.
 */
export interface AccountDocumentResponse extends AccountDocument {
    documentId: string
    dateCreated: string
    dateLastModified: string
}

/**
 * Represents a request for an account document.
 */
export interface AccountDocumentRequest {
    documentId: string
    document: File,
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
    employmentStatus:string
    employerName:string
    natureOfBusiness:string
    numberOfYearsInEmployment:string
    expectedAnnualIncome:string
    countryOfTaxResidence:string
    foreignTaxId:string
    mobileNumber:string
    TaxAddress1:string
    TaxAddress2:string
    secondCountry:string
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
export interface Customer {
    customerId: string
    title:string
    maritalStatus: string
    motherMaidenName: string
    nextOfKinName: string
    relationshipWithNextOfKin: string
    nextOfKinDOB:string
    nextOfKinPhone: string
    nextOfKinHouseNumber: string
    nextOfKinStreetName: string
    nextOfKinState:string
    NextofKinLocalGovt:string
    nextOfKinPostalCode:string
    dateCreated: Date
    dateLastModified: Date
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
    file: File  | null
} | null

/**
 * Represents the form request for submitting account information.
 */
export type TFormRequest = {
    customerPhoto: FileField
    proofOfIdentityImage: FileField[] | null
    proofOfAddressImage: FileField[] | null
    proofOfNinImage:FileField[] | null
    signature: FileField
    acceptedTerms: boolean
    diasporaDocs: FileField[] | null
    accountNumber: string
    bvn: string
    title:string
    maritalStatus: string
    motherMaidenName: string
    nextOfKinName: string
    relationshipWithNextOfKin: string
    nextOfKinDOB:string
    nextOfKinPhone: string
    nextOfKinHouseNumber: string
    nextOfKinStreetName:string
    nextOfKinState:string
    NextofKinLocalGovt:string
    employmentStatus:string
    employerName:string
    natureOfBusiness:string
    nextOfKinPostalCode:string
    numberOfYearsInEmployment:string
    expectedAnnualIncome:string
    countryOfTaxResidence:string
    foreignTaxId:string
    mobileNumber:string
    TaxAddress1:string
    TaxAddress2: string
    secondCountry:string
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

