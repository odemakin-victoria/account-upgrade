import { TFormRequest } from "@/shared/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FormInitialState } from "../utils/initialstate"
import { otpRequestSchema, formValidationSchema } from "../validation.schema"
import {  useFormRequest } from "./queries.hooks"
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
                maritalStatus: data?.customer?.maritalStatus,
                localGovt: data?.contactAddress?.localGovt,
                line1: data?.contactAddress?.line1,
                line2: data?.contactAddress?.line2,
                nextOfKinName: data?.customer?.nextOfKinName,
                nextOfKinPhone: data?.customer?.nextOfKinPhone,
                motherMaidenName: data.customer?.motherMaidenName,
                country: data.contactAddress?.country ?? "",
                isDiaspora:
                    data?.contactAddress!.country.toLowerCase() === "nigeria"
                        ? "no"
                        : "yes",
                proofOfAddressImage: formUtils.filterAccountDocuments(
                    data.accountDocuments,
                    "PROOFOFADRESS"
                ),
                proofOfIdentityImage: formUtils.filterAccountDocuments(
                    data.accountDocuments,
                    "IDENTIFICATION"
                ),
                signature: formUtils.findItemByName(
                    data.accountDocuments,
                    "SIGNATURE"
                ),
                customerPhoto: formUtils.findItemByName(
                    data.accountDocuments,
                    "CUSTOMERPHOTO"
                ),
                diasporaDocs: formUtils.filterAccountDocuments(
                    data.accountDocuments,
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
