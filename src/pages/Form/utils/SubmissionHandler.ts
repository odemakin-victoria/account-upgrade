import { TFormRequest } from "@/shared/types"
import {
    PersonalDetails,
    ContactAddress,
    NextOfKin,
    EmployeeStatus,
    Citizenship,
    RequestType
} from "../types"
import { formUtils } from "./FormUtils"
import { FileHandler } from "./FileHandler"

type Document = {
    documentType: string
    document: File | null
    documentName: string | null
    fileExt: string
}
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
            FirstName: data.FirstName,
            LastName: data.LastName,
            MiddleName: data.MiddleName
           
        }
        return PersonalDetails
    }
    private mapRequestType(data: TFormRequest): RequestType {
        const RequestType: RequestType = {
            RequestType: data.RequestType
           
        }
        return RequestType
    }

    private mapNextOfKinDetails(data: TFormRequest): NextOfKin {
        const NextOfKin: NextOfKin = {
            FullNameOfKin: data.FullNameOfKin,
            RelationshipOfKin: data.RelationshipOfKin,
            DobOfKin: data.DobOfKin,
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
            Status: data.Status,
            EmployersName: data.EmployersName,
            NatureOfBusiness: data.NatureOfBusiness,
            NumberofYears: data.NumberofYears,
            AnnualIncome: data.AnnualIncome,
        }
        return EmployeeStatus
    }
    private mapCitizenship(data: TFormRequest): Citizenship {
        const Citizenship: Citizenship = {
            ForeignTaxId: data.ForeignTaxId,
            CountryTaxResidence: data.CountryTaxResidence,
            MobileNumber: data.MobileNumber,
            AddressLine1: data.AddressLine1,
            AddressLine2: data.AddressLine2,
            Country: data.Country,
        }
        return Citizenship
    }


    private mapContactAddress(data: TFormRequest): Partial<ContactAddress> {
        const contactAddress: Partial<ContactAddress> = {
            line1: data.line1,
            line2: data.line2,
            city: data.city,
            localGovt: data.localGovt,
            country: data.country,
            postalCode: data.postalCode || undefined,
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
            "FirstName",
            "MiddleName",
            "LastName",
            "nextOfKinName",
            "nextOfKinPhone",
            "line1",
            "line2",
            "city",
            "localGovt",
            "state",
            "DOB",
            
        ])

        this.prepareFormData(dataToSend)

        const PersonalDetails = this.mapCustomerDetails(data)
        const NextOfKin = this.mapNextOfKinDetails(data)
        const EmployeeStatus = this.mapEmployeeStatus(data)
        const Citizenship = this.mapCitizenship(data)
        const contactAddress = this.mapContactAddress(data)
        const mapRequestType = this.mapRequestType(data)

        this.appendObjectValuesToFormData(PersonalDetails, "PersonalDetails")
        this.appendObjectValuesToFormData(NextOfKin, "NextOfKin")
        this.appendObjectValuesToFormData(EmployeeStatus, "EmployeeStatus")
        this.appendObjectValuesToFormData(contactAddress, "ContactAddress")
        this.appendObjectValuesToFormData(Citizenship, "Citizenship")
        this.appendObjectValuesToFormData(mapRequestType, "RequestType")
        const Documents = this.prepareAccountDocuments(data)
        this.mapAccountDocuments(Documents)

        return this.formData
    }
}
