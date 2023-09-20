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
                notificationPreference:data?.notificationPreference,
                RequestType: data?.RequestType,
                channelId:data?.channelId,
                title: data?.PersonalDetails?.title,
                maritalStatus: data?.PersonalDetails?.maritalStatus,
          
                zipCode: data?.contactAddress?.zipCode,

                localGovernment: data?.contactAddress?.localGovernment,
                houseNumber: data?.contactAddress?.houseNumber,
                streetAddress: data?.contactAddress?.streetAddress,

                FirstName: data?.PersonalDetails?.FirstName,
                employersAddress:data?.EmployeeStatus?.employersAddress,
                LastName: data?.PersonalDetails?.LastName,
                MiddleName: data?.PersonalDetails?.MiddleName,
                FullNameOfKin: data?.NextOfKin?.FullNameOfKin,
                sourceOfWealth: data?.EmployeeStatus?.sourceOfWealth,

                RelationshipOfKin:
                    data?.NextOfKin?.RelationshipOfKin,
                    dobOfKin: data?.NextOfKin?.dobOfKin,
                    vnin: data?.idDetails?.vnin,
                    idNo: data?.idDetails?.idNo,
                    idType: data?.idDetails?.idType,
                    issueDate: data?.idDetails?.issueDate,
                    expiryDate: data?.idDetails?.expiryDate,
                    linkedIn: data?.socialMedia?.linkedIn,
                    facebook: data?.socialMedia?.facebook,
                    instagram: data?.socialMedia?.instagram,
                    tiktok: data?.socialMedia?.tiktok,
                    twitter: data?.socialMedia?.twitter,
                    thread: data?.socialMedia?.thread,
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
                   
                    citizenshipAddressLine1: data?.Citizenship?.citizenshipAddressLine1,
                    citizenshipAddressLine2: data?.Citizenship?.citizenshipAddressLine2,
                    countryTaxResidence: data?.Citizenship?.countryTaxResidence,

                motherMaidenName: data.PersonalDetails?.motherMaidenName,
                purposeOfAccount:data.PersonalDetails?.purposeOfAccount,
                otherReasons:data.PersonalDetails?.otherReasons,
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
