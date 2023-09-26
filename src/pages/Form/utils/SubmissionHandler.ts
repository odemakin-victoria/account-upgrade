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
            title: caesarEncrypt(data.title, 3),
            maritalStatus: caesarEncrypt(data.maritalStatus, 3),
            motherMaidenName: caesarEncrypt(data.motherMaidenName, 3),
            purposeOfAccount: caesarEncrypt(data.purposeOfAccount, 3),
            otherReasons: caesarEncrypt(data.otherReasons, 3),
            FirstName: caesarEncrypt(data.FirstName, 3),
            dateOfBirth: dayjs(data.dateOfBirth).format(),
            LastName: caesarEncrypt(data.LastName, 3),
            MiddleName: caesarEncrypt(data.MiddleName, 3),
        }
        return PersonalDetails
    }
    private mapSocialMediaDetails(data: TFormRequest): socialMedia {
        const socialMedia: socialMedia = {
            linkedIn: caesarEncrypt(data.linkedIn, 3),
            facebook: caesarEncrypt(data.facebook, 3),
            instagram: caesarEncrypt(data.instagram, 3),
            tiktok: caesarEncrypt(data.tiktok, 3),
            twitter: caesarEncrypt(data.twitter, 3),
            thread: caesarEncrypt(data.thread, 3),
        }
        return socialMedia
    }
    private mapidDetails(data: TFormRequest): idDetails {
        const idDetails: idDetails = {
            vnin: caesarEncrypt(data.vnin, 3),
            idNo: caesarEncrypt(data.idNo, 3),
            idType: caesarEncrypt(data.idType, 3),
            issueDate: caesarEncrypt(dayjs(data.issueDate).format(), 3),
            expiryDate: caesarEncrypt(dayjs(data.expiryDate).format(), 3),
        }
        return idDetails
    }

    private mapRequestType(data: TFormRequest): RequestType {
        const RequestType: RequestType = {
            RequestType: caesarEncrypt(data.RequestType, 3),
        }
        return RequestType
    }

    private mapNextOfKinDetails(data: TFormRequest): NextOfKin {
        const NextOfKin: NextOfKin = {
            FullNameOfKin: caesarEncrypt(data.FullNameOfKin, 3),
            RelationshipOfKin: caesarEncrypt(data.RelationshipOfKin, 3),
            dobOfKin: caesarEncrypt(dayjs(data.dobOfKin).format(), 3),
            PhoneNumberOfKin: caesarEncrypt(data.PhoneNumberOfKin, 3),
            HouseNumberOfKin: caesarEncrypt(data.HouseNumberOfKin, 3),
            StateOfKin: caesarEncrypt(data.StateOfKin, 3),
            StreetNameOfKin: caesarEncrypt(data.StreetNameOfKin, 3),
            LocalGovernmentOfKin: caesarEncrypt(data.LocalGovernmentOfKin, 3),
            PostalZipCodeOfKin: caesarEncrypt(data.PostalZipCodeOfKin, 3),
        }

        return NextOfKin
    }

    private mapEmployeeStatus(data: TFormRequest): EmployeeStatus {
        const EmployeeStatus: EmployeeStatus = {
            status: caesarEncrypt(data.status, 3),
            employersName: caesarEncrypt(data.employersName, 3),
            natureOfBusiness: caesarEncrypt(data.natureOfBusiness, 3),
            numberofYears: caesarEncrypt(data.numberofYears, 3),
            employersAddress: caesarEncrypt(data.employersAddress, 3),
            annualIncome: caesarEncrypt(data.annualIncome, 3),
            sourceOfWealth: caesarEncrypt(data.sourceOfWealth, 3),
        }

        return EmployeeStatus
    }
    private mapCitizenship(data: TFormRequest): Citizenship {
        const Citizenship: Citizenship = {
            foreignTaxId: caesarEncrypt(data.foreignTaxId, 3),
            countryTaxResidence: caesarEncrypt(data.countryTaxResidence, 3),
            citizenshipAddressLine1: caesarEncrypt(
                data.citizenshipAddressLine1,
                3
            ),
            citizenshipAddressLine2: caesarEncrypt(
                data.citizenshipAddressLine2,
                3
            ),
        }

        return Citizenship
    }

    private mapContactAddress(data: TFormRequest): Partial<ContactAddress> {
        const contactAddress: Partial<ContactAddress> = {
            addressLine1: caesarEncrypt(data.addressLine1, 3),
            addressLine2: caesarEncrypt(data.addressLine2, 3),
            city: caesarEncrypt(data.city, 3),
            streetAddress: caesarEncrypt(data.streetAddress, 3),
            houseNumber: caesarEncrypt(data.houseNumber, 3),
            localGovernment: caesarEncrypt(data.localGovernment, 3),
            country: caesarEncrypt(data.country, 3),
            zipCode: caesarEncrypt(data.zipCode || "", 3), // Use an empty string as the default value
            state: caesarEncrypt(data.state, 3),
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
