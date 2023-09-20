export interface CustomerUpdateRequest {
    customerId: string
    title:string
    maritalStatus: string
    motherMaidenName: string
    purposeOfAccount:string
    otherReasons:string
    FirstName: string
    notificationPreference:string
    employersAddress:string
    employersName:string
    LastName:string
    MiddleName:string
    dateOfBirth:string
    isDiaspora: string
    country: string
    state: string
    localGovernment: string
    city: string
    zipCode: string
    addressLine1: string
    addressLine2: string
  
    Documents: Document[]
}
