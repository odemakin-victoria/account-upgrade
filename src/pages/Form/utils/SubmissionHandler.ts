import { TFormRequest } from "@/shared/types"
import {
    PersonalDetails,
    ContactAddress,
    NextOfKin,
    EmployeeStatus,
    Citizenship,
    RequestType,
    socialMedia,
    idDetails,
} from "../types"
import { formUtils } from "./FormUtils"
import { FileHandler } from "./FileHandler"
import dayjs from "dayjs"

type Document = {
    documentType: string
    document: File | null
    documentName: string | null
    fileExt: string
}
function caesarEncrypt(text: string, shift: number): string {
    let result = ""
    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i)
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65)
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97)
            }
        }
        result += char
    }
    return result
}

// Example usage:


export class submissionHandler {
    private formData: FormData

    constructor() {
        this.formData = new FormData()
    }

    
    private prepareFormData(dataToSend: Record<string, keyof TFormRequest>) {
        for (let val in dataToSend) {
            this.formData.append(val, dataToSend[`${val}`])
        }
    }

    private mapCustomerDetails(data: TFormRequest): PersonalDetails {
        const PersonalDetails: PersonalDetails = {
            title: data.title, 
            maritalStatus: data.maritalStatus,
            motherMaidenName: data.motherMaidenName, 
            purposeOfAccount: data.purposeOfAccount, 
            otherReasons: data.otherReasons, 
            FirstName: data.FirstName, 
            dateOfBirth: dayjs(data.dateOfBirth).format(),
            LastName: data.LastName, 
            MiddleName: data.MiddleName, 
        }
        return PersonalDetails
    }
    private mapSocialMediaDetails(data: TFormRequest): socialMedia {
        const socialMedia: socialMedia = {
            linkedIn:data.linkedIn, 
            facebook: data.facebook, 
            instagram: data.instagram, 
            tiktok: data.tiktok, 
            twitter: data.twitter, 
            thread: data.thread, 
        }
        return socialMedia
    }
    private mapidDetails(data: TFormRequest): idDetails {
        const idDetails: idDetails = {
            vnin: data.vnin, 
            idNo: data.idNo, 
            idType:data.idType, 
            issueDate: dayjs(data.issueDate).format(), 
            expiryDate: dayjs(data.expiryDate).format(), 
        }
        return idDetails
    }

    private mapRequestType(data: TFormRequest): RequestType {
        const RequestType: RequestType = {
            RequestType: data.RequestType, 
        }
        return RequestType
    }

    private mapNextOfKinDetails(data: TFormRequest): NextOfKin {
        const NextOfKin: NextOfKin = {
            FullNameOfKin: data.FullNameOfKin, 
            RelationshipOfKin: data.RelationshipOfKin, 
            dobOfKin: dayjs(data.dobOfKin).format(), 
            PhoneNumberOfKin: data.PhoneNumberOfKin, 
            HouseNumberOfKin: data.HouseNumberOfKin, 
            StateOfKin: data.StateOfKin, 
            StreetNameOfKin: data.StreetNameOfKin, 
            LocalGovernmentOfKin: data.LocalGovernmentOfKin, 
            PostalZipCodeOfKin: data.PostalZipCodeOfKin, 
        }

        return NextOfKin
    }

    private mapEmployeeStatus(data: TFormRequest): EmployeeStatus {
        const EmployeeStatus: EmployeeStatus = {
            status: data.status, 
            employersName: data.employersName, 
            natureOfBusiness: data.natureOfBusiness, 
            numberofYears: data.numberofYears, 
            employersAddress:data.employersAddress, 
            annualIncome: data.annualIncome, 
            sourceOfWealth: data.sourceOfWealth, 
        }

        return EmployeeStatus
    }
    private mapCitizenship(data: TFormRequest): Citizenship {
        const Citizenship: Citizenship = {
            foreignTaxId: data.foreignTaxId,
            countryTaxResidence: data.countryTaxResidence, 
            citizenshipAddressLine1: 
                data.citizenshipAddressLine1,
                
            citizenshipAddressLine2: 
                data.citizenshipAddressLine2,
              
        }

        return Citizenship
    }

    private mapContactAddress(data: TFormRequest): Partial<ContactAddress> {
        const contactAddress: Partial<ContactAddress> = {
            addressLine1: data.addressLine1, 
            addressLine2: data.addressLine2, 
            city: data.city, 
            streetAddress: data.streetAddress,
            houseNumber: data.houseNumber, 
            localGovernment: data.localGovernment, 
            country: data.country, 
            zipCode: data.zipCode || "",  // Use an empty string as the default value
            state: data.state,
        }

        return contactAddress
    }

    private appendObjectValuesToFormData(
        obj: Record<string, any>,

        prefix: string
    ) {
        Object.keys(obj).forEach((key) => {
            // @ts-ignore

            this.formData.append(`${prefix}.${key}`, obj[key])
        })
    }

    private prepareAccountDocuments(data: TFormRequest): Document[] {
        const Documents: Document[] = []

        formUtils.addIfNotNull(Documents, data, "customerPhoto")

        formUtils.addIfNotNull(Documents, data, "signature")

        data.proofOfAddressImage?.forEach((item) => {
            Documents.push({
                documentType: "PROOFOFADDRESS",

                document: item?.file ?? null,

                documentName: item?.name ?? null,

                fileExt: FileHandler.getFileExtension(item?.file?.name),
            })
        })

        data.proofOfIdentityImage?.forEach((item) => {
            Documents.push({
                documentType: "IDENTIFICATION",

                document: item?.file ?? null,

                documentName: item?.name ?? null,

                fileExt: FileHandler.getFileExtension(item?.file?.name),
            })
        })

        data.proofOfNinImage?.forEach((item) => {
            Documents.push({
                documentType: "IDENTIFICATION",

                document: item?.file ?? null,

                documentName: item?.name ?? null,

                fileExt: FileHandler.getFileExtension(item?.file?.name),
            })
        })

        data.diasporaDocs?.forEach((item) => {
            Documents.push({
                documentType: "DIASPORA",

                document: item?.file ?? null,

                documentName: item?.name ?? null,

                fileExt: FileHandler.getFileExtension(item?.file?.name),
            })
        })

        return Documents
    }

    private mapAccountDocuments(Documents: Document[]) {
        Documents.forEach((document, index) => {
            this.formData.append(
                `Documents[${index}].DocumentType`,

                document.documentType.toUpperCase() ?? ""
            )

            this.formData.append(
                `Documents[${index}].document`,

                document.document as File
            )

            this.formData.append(
                `Documents[${index}].documentName`,

                (document.documentName as string) || "unknown"
            )

            this.formData.append(
                `Documents[${index}].FileExtension`,

                (document.fileExt as string) || "unknown"
            )
        })

        // Display the key/value pairs

        for (const pair of this.formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`)
        }
    }

    public createRequest(data: TFormRequest) {
        // @ts-ignore
        const dataToSend: { [x: NewType]: keyof TFormRequest } = { ...data }

        formUtils.deleteFromObject(dataToSend as unknown as TFormRequest, [
            "proofOfIdentityImage",
            "proofOfAddressImage",
            "proofOfNinImage",
            "signature",
            "maritalStatus",
            "motherMaidenName",
            "purposeOfAccount",
            "otherReasons",
            "FirstName",
            "MiddleName",
            "LastName",
            "nextOfKinName",
            "nextOfKinPhone",
            "citizenshipAddressLine1",
            "citizenshipAddressLine2",
            "city",
            "localGovt",
            "state",
            "dateOfBirth",
            "issueDate",
            "expiryDate",
            "ChannelId",
        ])

        this.prepareFormData(dataToSend)

        const PersonalDetails = this.mapCustomerDetails(data)
        const NextOfKin = this.mapNextOfKinDetails(data)
        const EmployeeStatus = this.mapEmployeeStatus(data)
        const Citizenship = this.mapCitizenship(data)
        const contactAddress = this.mapContactAddress(data)
        const socialMedia = this.mapSocialMediaDetails(data)
        const idDetails = this.mapidDetails(data)
        const mapRequestType = this.mapRequestType(data)

        this.appendObjectValuesToFormData(PersonalDetails, "PersonalDetails")
        this.appendObjectValuesToFormData(NextOfKin, "NextOfKin")
        this.appendObjectValuesToFormData(EmployeeStatus, "EmployeeStatus")
        this.appendObjectValuesToFormData(contactAddress, "ContactAddress")
        this.appendObjectValuesToFormData(Citizenship, "Citizenship")
        this.appendObjectValuesToFormData(socialMedia, "socialMedia")
        this.appendObjectValuesToFormData(idDetails, "idDetails")
        this.appendObjectValuesToFormData(mapRequestType, "RequestType")

        const Documents = this.prepareAccountDocuments(data)
        this.mapAccountDocuments(Documents)

        const encryptedData = caesarEncrypt(JSON.stringify(data), 3)

        // Convert the encrypted data to bytes (UTF-8 encoding)

        // Add the encrypted data to the FormData object
        this.formData.append("EncryptedData", encryptedData)

        return this.formData
    }
}
