import { TFormRequest } from "@/shared/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FormInitialState } from "../utils/initialstate"
import { otpRequestSchema, formValidationSchema } from "../validation.schema"
import { useFormRequest } from "./queries.hooks"
import { formUtils } from "../utils/FormUtils"
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
                localGovt: data?.contactAddress?.localGovt,
                line1: data?.contactAddress?.line1,
                line2: data?.contactAddress?.line2,
                FirstName: data?.PersonalDetails?.FirstName,
                LastName: data?.PersonalDetails?.LastName,
                MiddleName: data?.PersonalDetails?.MiddleName,
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
