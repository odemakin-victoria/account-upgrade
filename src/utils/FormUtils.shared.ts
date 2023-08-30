import { TFormRequest } from "@/shared/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FormInitialState } from "../../src/pages/Form/utils/initialstate"
import { otpRequestSchema, formValidationSchema } from "../pages/Form/validation.schema"
import { useFormRequest } from "../pages/Form/hooks/queries.hooks"
import { formUtils } from "../pages/Form/utils/FormUtils"
import { useFormQuery } from "@/pages/ViewRequest/hooks/queries.hooks"

export default function useFormUtils({ step }: { step: number }) {
    const methods = useForm<TFormRequest>({
        defaultValues: FormInitialState,
        resolver: yupResolver(
            step === 0 ? otpRequestSchema : formValidationSchema
        ),
    })

    const form = useFormRequest()
    const formQuery = useFormQuery()

    useEffect(() => {
        if (formQuery.isSuccess) {
            let data = formQuery.data.data
            methods.reset({
                accountNumber: data?.accountNumber,
                bvn: data?.bvn || "",
                RequestType: data?.RequestType,
                title: data?.PersonalDetails?.title,
                maritalStatus: data?.PersonalDetails?.maritalStatus,
                FirstName: data?.PersonalDetails?.FirstName,
                LastName: data?.PersonalDetails?.LastName,
                MiddleName: data?.PersonalDetails?.MiddleName,
                zipCode: data?.contactAddress?.zipCode,
                localGovernment: data?.contactAddress?.localGovernment,
                houseNumber: data?.contactAddress?.houseNumber,
                streetAddress: data?.contactAddress?.streetAddress,
                FullNameOfKin: data?.NextOfKin?.FullNameOfKin,
                RelationshipOfKin:
                    data?.NextOfKin?.RelationshipOfKin,
                    dobOfKin: data?.NextOfKin?.dobOfKin,
                    PhoneNumberOfKin: data?.NextOfKin?.PhoneNumberOfKin,
                    HouseNumberOfKin: data?.NextOfKin?.HouseNumberOfKin,
                    StateOfKin: data?.NextOfKin?.StateOfKin,
                    PostalZipCodeOfKin: data?.NextOfKin?.PostalZipCodeOfKin,
                    StreetNameOfKin: data?.NextOfKin?.StreetNameOfKin,
                    LocalGovernmentOfKin: data?.NextOfKin?.LocalGovernmentOfKin,
                    status: data?.EmployeeStatus?.status,
                    employersName: data?.EmployeeStatus?.employersName,
                    natureOfBusiness: data?.EmployeeStatus?.natureOfBusiness,
                    numberofYears:
                    data?.EmployeeStatus?.numberofYears,
                    annualIncome:
                    data?.EmployeeStatus?.annualIncome,
                    foreignTaxId: data?.Citizenship?.foreignTaxId,
                    mobileNumber: data?.Citizenship?.mobileNumber,
                    addressLine1: data?.Citizenship?.Line1,
                    addressLine2: data?.Citizenship?.Line2,
                    countryTaxResidence: data?.Citizenship?.countryTaxResidence,
                  

                motherMaidenName: data.PersonalDetails?.motherMaidenName,
                country: data.contactAddress?.country ?? "",
                isDiaspora:
                    data?.contactAddress!.country.toLowerCase() === "nigeria"
                        ? "no"
                        : "yes",
                proofOfAddressImage: formUtils.filterAccountDocuments(
                    data.Documents,
                    "PROOFOFADRESS"
                ),
                proofOfIdentityImage: formUtils.filterAccountDocuments(
                    data.Documents,
                    "IDENTIFICATION"
                ),
                proofOfNinImage: formUtils.filterAccountDocuments(
                    data.Documents,
                    "IDENTIFICATION"
                ),
                signature: formUtils.findItemByName(
                    data.Documents,
                    "SIGNATURE"
                ),
                customerPhoto: formUtils.findItemByName(
                    data.Documents,
                    "CUSTOMERPHOTO"
                ),
                diasporaDocs: formUtils.filterAccountDocuments(
                    data.Documents,
                    "DIASPORA"
                ),
            })
        }
    }, [formQuery.isSuccess])

    return {
        methods,
        form,
    }
}


// import { ApiResponse } from "@/shared/types"
// import { NotificationManager } from "@/utils/ResponseHandler.shared"
// import { AxiosError } from "axios"

// export function errorResponse<T>(error: unknown) {
//     const errorResponse = error as AxiosError<ApiResponse<T>>

//     NotificationManager.showErrorNotification(
//         errorResponse.response?.data.responseMessage
//     )

//     return {
//         responseCode: (error as ApiResponse<T>).responseCode,
//         responseMessage:
//             errorResponse.response?.data.responseMessage ?? "An Error occurred",
//     }
// }



export function mapItemName(itemName:string) {
    const mapping:{[key:string]:string} = {
      IDENTIFICATION: 'National ID',
      PROOFOFADDRESS: 'Proof of Address',
      SIGNATURE: 'Signature',
      CUSTOMERPHOTO: 'Photo'
    };
  
    return mapping[itemName] || itemName;
  }