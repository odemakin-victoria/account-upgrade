import { Button, Layout } from "@/shared/components"
import UsePageTitle from "@/utils/page-title.shared.hook"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { FiExternalLink } from "react-icons/fi"
import AccountDetails from "./sections/Account-details"
import ContactDetails from "./sections/Contact-details"
import PersonalDetails from "./sections/Personal-details"
import Diaspora from "./sections/diaspora"
import MeansofIdentification from "./sections/means-of-identification"
import { TFormRequest } from "@/shared/types"
import { submissionHandler } from "./utils/SubmissionHandler"
import { FormInitialState } from "./utils/initialstate"
import { yupResolver } from "@hookform/resolvers/yup"
import { formValidationSchema } from "./validation.schema"
import { useFormRequest } from "./hooks/queries.hooks"
import { useEffect } from "react"

export default function AccountForm() {
    UsePageTitle("Account Update form | Optimus Bank")
    const form = useFormRequest()

    const handleSubmit = async (data: TFormRequest) => {
        console.log(data, "the data")
        var formHandler = new submissionHandler()
        var formData = formHandler.createRequest({
            ...data,
            RequestType: "upgrade",
        })

        form.mutate(formData)
    }

    const methods = useForm<TFormRequest>({
        defaultValues: FormInitialState,
        resolver: yupResolver(formValidationSchema),
    })

    useEffect(() => {
        if (form.isSuccess) {
            // methods.reset()
        }
    }, [form.isSuccess])

    return (
        <FormProvider {...methods}>
            <Layout>
                <div className="mx-auto w-full mb-20 text-center">
                    <h1 className="text-xl lg:text-3xl text-blue-800 mb-2">
                        Customer Information Enrichment Form
                    </h1>
                    <p className="lg:w-[457px] w-fit px-6 text-center mx-auto text-base lg:text-lg">
                        This document allows you to easily update and modify the
                        information associated with your account.
                    </p>
                </div>
                <section className="bg-white p-10 drop-shadow-xl">
                    <AccountDetails />
                    <PersonalDetails />
                    <ContactDetails />
                    <MeansofIdentification />

                    {methods.watch("isDiaspora") === "yes" && <Diaspora />}

                    <div className="flex items-center  mt-10 mb-4">
                        <Controller
                            name="acceptedTerms"
                            render={({ fieldState, ...fieldProps }) => (
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <input
                                            {...fieldProps}
                                            checked={fieldProps.field.value}
                                            type="checkbox"
                                            id="acceptedTerms"
                                            aria-label="accept-terms"
                                            onChange={(e) => {
                                                methods.setValue(
                                                    "acceptedTerms",
                                                    e.target.checked
                                                )
                                            }}
                                            className="bg-white border border-gray-300 rounded mr-2 h-7 w-7"
                                        />

                                        <p>
                                            I accept the{" "}
                                            <a
                                                href="https://www.optimusbank.com/terms-conditions"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-bold text-blue-400 inline-flex items-center"
                                            >
                                                Terms and Conditions.{" "}
                                                <FiExternalLink />
                                            </a>
                                        </p>
                                    </div>
                                    {fieldState.error &&
                                        fieldState.error.message && (
                                            <p
                                                className="text-red-400 text-base mt-4"
                                                aria-label="error message"
                                            >
                                                {fieldState.error?.message}
                                            </p>
                                        )}
                                </div>
                            )}
                        />
                    </div>

                    <Button
                        type="button"
                        variant="primary"
                        className="font-normal w-[228px]"
                        disabled={
                            form.isLoading || !methods.watch("acceptedTerms")
                        }
                        onClick={methods.handleSubmit(handleSubmit)}
                    >
                        {form.isLoading ? "Please wait..." : "Submit"}
                    </Button>
                </section>
            </Layout>
        </FormProvider>
    )
}
