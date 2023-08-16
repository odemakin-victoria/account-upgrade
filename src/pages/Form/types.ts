export interface PersonalDetails {
    customerId?: string
    title: string
    maritalStatus: string
    motherMaidenName: string
    FirstName:string,
    LastName:string,
    MiddleName:string,
    dateCreated?: Date
    dateLastModified?: Date
}

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
    
    dateCreated?: Date
    dateLastModified?: Date
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
export interface RequestType {
    RequestType:string
}

export interface ContactAddress {
    postalCode: string
    localGovt: string
    state: string
    line1: string
    line2: string
    city: string
    foreignTaxId: string
    mobileNumber: string
    TaxAddress1: string
    TaxAddress2: string
    secondCountry: string
    dateCreated: Date
    dateLastModified: Date
    country: string
    requestId: string
}
export interface Document {
    documentName?: string
    documentType?: string
    documentStatus: string
    documentComment: string | null
}
export interface AccountRequestResponse {
    accountNumber: string
    RequestType:string
    updateStatus: string
    bvn: string | null
    PersonalDetails: PersonalDetails
    NextOfKin:NextOfKin
    EmployeeStatus:EmployeeStatus
    contactAddress: ContactAddress
    Documents: Document[]
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
    file: File  | null
} | null

