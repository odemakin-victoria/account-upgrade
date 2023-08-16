import { Document, TFormRequest, FileField } from "@/shared/types"
import { FileHandler } from "./FileHandler"

type documentKeys =
    | "signature"
    | "proofOfAddressImage"
    | "customerPhoto"
    | "proofOfIdentityImage"
    | "proofOfNinImage"
    | "extraDocument"


export class formUtils {
    /**
     * Finds an item in the array of AccountDocuments based on the given search term.
     */
    static findItemByName(arr: Document[], searchTerm: string) {
        const foundItem = arr?.find((item) => item.documentType === searchTerm)
        if (foundItem?.documentName) {
            const { documentName } = foundItem
            return { file: null, name: documentName } as FileField
        } else {
            return null
        }
    }

    /**
     * Filters the array of AccountDocuments based on the given filter term.
     */
    static filterAccountDocuments(arr: Document[], filterTerm: string) {
        return arr
            ?.filter(
                (item: Document) => item.documentType === filterTerm
            )
            .map((item: Document) => {
                return {
                    file: null,
                    name: item.documentName,
                }
            })
    }

    /**
     * Add items to an array based on the specified keys
     */
    static addIfNotNull(
        array: unknown[],
        obj: TFormRequest,
        key: documentKeys
    ) {
        const value = obj[key]
        if (value !== null && value !== undefined) {
            const newObj = {
                // @ts-ignore
                document: obj[key]?.file,
                // @ts-ignore
                documentName: obj[key]?.name,
                documentType:
                    key === "proofOfAddressImage"
                        ? "PROOFOFADRESS"
                        : key === "customerPhoto"
                        ? "CUSTOMERPHOTO"
                        : key === "proofOfNinImage"
                        ? "IDENTIFICATION"
                        : key === "extraDocument"
                        ? "EXTRADOCUMENTS"
                        : key === "proofOfIdentityImage"
                        ? "IDENTIFICATION"
    
                        : key === "signature" && "SIGNATURE",
                // @ts-ignore

                fileExt: FileHandler.getFileExtension(obj[key]?.name),
            }
            array.push(newObj)
        }
    }

    static deleteFromObject = (obj: TFormRequest, keys: string[]) => {
        keys.forEach((item) => delete obj[item as keyof TFormRequest])
    }
}
