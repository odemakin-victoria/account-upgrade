import { TFormRequest } from "@/shared/types"
import { ICustomer, IContactAddress } from "../types"
import { formUtils } from "./FormUtils"
import { FileHandler } from "./FileHandler"

type AccountDocument = {
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

    private mapCustomerDetails(data: TFormRequest): ICustomer {
        const customer: ICustomer = {
            maritalStatus: data.maritalStatus,
            motherMaidenName: data.motherMaidenName,
            nextOfKinName: data.nextOfKinName,
            nextOfKinPhone: data.nextOfKinPhone,
        }
        return customer
    }

    private mapContactAddress(data: TFormRequest): Partial<IContactAddress> {
        const contactAddress: Partial<IContactAddress> = {
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

    private prepareAccountDocuments(data: TFormRequest): AccountDocument[] {
        const accountDocuments: AccountDocument[] = []

        formUtils.addIfNotNull(accountDocuments, data, "customerPhoto")
        formUtils.addIfNotNull(accountDocuments, data, "signature")

        data.proofOfAddressImage?.forEach((item) => {
            accountDocuments.push({
                documentType: "PROOFOFADDRESS",
                document: item?.file ?? null,
                documentName: item?.name ?? null,
                fileExt: FileHandler.getFileExtension(item?.file?.name),
            })
        })

        data.proofOfIdentityImage?.forEach((item) => {
            accountDocuments.push({
                documentType: "IDENTIFICATION",
                document: item?.file ?? null,
                documentName: item?.name ?? null,
                fileExt: FileHandler.getFileExtension(item?.file?.name),
            })
        })

        data.diasporaDocs?.forEach((item) => {
            accountDocuments.push({
                documentType: "DIASPORA",
                document: item?.file ?? null,
                documentName: item?.name ?? null,
                fileExt: FileHandler.getFileExtension(item?.file?.name),
            })
        })

        return accountDocuments
    }

    private mapAccountDocuments(accountDocuments: AccountDocument[]) {
        accountDocuments.forEach((document, index) => {
            this.formData.append(
                `AccountDocuments[${index}].DocumentType`,
                document.documentType.toUpperCase() ?? ""
            )
            this.formData.append(
                `AccountDocuments[${index}].document`,
                document.document as File
            )
            this.formData.append(
                `AccountDocuments[${index}].documentName`,
                (document.documentName as string) || "unknown"
            )

            this.formData.append(
                `AccountDocuments[${index}].FileExtension`,
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
            "signature",
            "maritalStatus",
            "motherMaidenName",
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

        const customer = this.mapCustomerDetails(data)
        const contactAddress = this.mapContactAddress(data)

        this.appendObjectValuesToFormData(customer, "Customer")
        this.appendObjectValuesToFormData(contactAddress, "ContactAddress")

        const accountDocuments = this.prepareAccountDocuments(data)
        this.mapAccountDocuments(accountDocuments)

        return this.formData
    }
}
