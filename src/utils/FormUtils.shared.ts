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
                localGovt: data?.contactAddress?.localGovt,
                line1: data?.contactAddress?.line1,
                line2: data?.contactAddress?.line2,
                FullNameOfKin: data?.NextOfKin?.FullNameOfKin,
                RelationshipOfKin:
                    data?.NextOfKin?.RelationshipOfKin,
                    DobOfKin: data?.NextOfKin?.DobOfKin,
                    PhoneNumberOfKin: data?.NextOfKin?.PhoneNumberOfKin,
                    HouseNumberOfKin: data?.NextOfKin?.HouseNumberOfKin,
                    StateOfKin: data?.NextOfKin?.StateOfKin,
                    PostalZipCodeOfKin: data?.NextOfKin?.PostalZipCodeOfKin,
                    StreetNameOfKin: data?.NextOfKin?.StreetNameOfKin,
                    LocalGovernmentOfKin: data?.NextOfKin?.LocalGovernmentOfKin,
                    Status: data?.EmployeeStatus?.Status,
                    EmployersName: data?.EmployeeStatus?.EmployersName,
                    NatureOfBusiness: data?.EmployeeStatus?.NatureOfBusiness,
                    NumberofYears:
                    data?.EmployeeStatus?.NumberofYears,
                    AnnualIncome:
                    data?.EmployeeStatus?.AnnualIncome,
                countryOfTaxResidence:
                    data?.contactAddress?.countryOfTaxResidence,
                foreignTaxId: data?.contactAddress?.foreignTaxId,
                mobileNumber: data?.contactAddress?.mobileNumber,
                TaxAddress1: data?.contactAddress?.TaxAddress1,
                TaxAddress2: data?.contactAddress?.TaxAddress2,
                secondCountry: data?.contactAddress?.secondCountry,

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