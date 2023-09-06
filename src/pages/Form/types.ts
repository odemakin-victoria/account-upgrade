export interface PersonalDetails {
    customerId?: string
    title: string
    maritalStatus: string
    dateOfBirth:string
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
    dobOfKin: string
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
    status: string
    employersName: string
    natureOfBusiness: string
    numberofYears: string
    annualIncome: string
    dateCreated?: Date
    dateLastModified?: Date
}
export interface Citizenship {
    foreignTaxId: string
    countryTaxResidence: string
    citizenshipAddressLine1: string
    citizenshipAddressLine2: string
   
    dateCreated?: Date
    dateLastModified?: Date
}
export interface RequestType {
    RequestType:string
}



export interface ContactAddress {
    zipCode: string
    localGovernment: string
    state: string
    addressLine1: string
    addressLine2: string
    city: string
    houseNumber:string
    streetAddress:string
    country: string

   
   
    dateCreated: Date
    dateLastModified: Date
 
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
    channelId:string
    updateStatus: string
    bvn: string | null
    vnin:string | null
    PersonalDetails: PersonalDetails
    NextOfKin:NextOfKin
    employeeStatus:EmployeeStatus
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

