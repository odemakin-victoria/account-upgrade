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
          
                zipCode: data?.contactAddress?.zipCode,

                localGovernment: data?.contactAddress?.localGovernment,
                houseNumber: data?.contactAddress?.houseNumber,
                streetAddress: data?.contactAddress?.streetAddress,

                FirstName: data?.PersonalDetails?.FirstName,
                LastName: data?.PersonalDetails?.LastName,
                MiddleName: data?.PersonalDetails?.MiddleName,
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
                    mobileNumber: data?.Citizenship?.MobileNumber,
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
