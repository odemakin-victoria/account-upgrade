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
    channelId:string
    updateStatus: string
    bvn: string | null
    notificationPreference:string
    socialMedia:socialMedia
    PersonalDetails: PersonalDetails
    NextOfKin: NextOfKin
    idDetails:idDetails
    employeeStatus: EmployeeStatus
    contactAddress: ContactAddress
    citizenship:Citizenship
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
    zipCode?: string
    houseNumber:string
    localGovernment: string
    state: string
    addressLine1?: string
    addressLine2?: string
    streetAddress?: string
    
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
    purposeOfAccount:string
    otherReasons:string
    FirstName: string
    LastName: string
    MiddleName: string
    dateOfBirth: string
    dateCreated: Date
    dateLastModified: Date
}
/**
 * Represents the next of kin personal information.
 */
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
    dateCreated: Date
    dateLastModified: Date
}
export interface EmployeeStatus {
    status: string
    employersName: string
    natureOfBusiness: string
    numberofYears: string
    annualIncome: string
    sourceOfWealth:string
    employersAddress:string
    dateCreated?: Date
    dateLastModified?: Date
}
export interface socialMedia {
    customerId?: string
    linkedIn: string
    facebook: string
    instagram:string
    tiktok: string
    twitter:string
    thread:string,
    dateCreated?: Date
    dateLastModified?: Date
}
export interface idDetails {
    customerId?: string
    vnin: string
    idNo: string
    idType:string
    issueDate: string
    expiryDate:string
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

export interface ChannelId {
    ChannelId:string
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


// files for preview 


export interface PreviewDataProps {
    previewData: PreviewDataProps;
    FirstName: string
    MiddleName: string
    LastName: string
    maritalStatus: string
    motherMaidenName: string
    dateOfBirth: string
    isDiaspora: string
    country: string
    state: string
    employersName:string
    employersAddress:string
    notificationPreference:string
    localGovernment: string
    city: string
    zipCode: string
    addressLine1: string
    streetAddress: string
    addressLine2: string
    Documents: Document[]
}
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
    channelId:string
    bvn: string
    notificationPreference:string
    employersAddress:string
    sourceOfWealth:string
    title: string
    ChannelId:string
    maritalStatus: string
    motherMaidenName: string
    FullNameOfKin: string
    RelationshipOfKin: string
    dobOfKin: string
    PhoneNumberOfKin: string
    HouseNumberOfKin: string
    StateOfKin: string
    StreetNameOfKin: string
    
    LocalGovernmentOfKin: string
    PostalZipCodeOfKin: string
    RequestType: string
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
    FirstName: string
    LastName: string
    MiddleName: string
    purposeOfAccount:string
    otherReasons:string
    status: string
    employersName: string
    natureOfBusiness: string
    numberofYears: string
    annualIncome: string
   
    countryOfTaxResidence: string
    foreignTaxId: string
    countryTaxResidence: string
  
    zipCode: string | null
    localGovernment: string
    addressLine1: string
    addressLine2: string
    citizenshipAddressLine1:string
    citizenshipAddressLine2:string
    city: string
    houseNumber:string
    streetAddress:string
    country: string
    state: string
    isDiaspora: "yes" | "no"
    dateOfBirth: string
}
