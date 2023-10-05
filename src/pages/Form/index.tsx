import { useState } from "react"
import { Layout } from "@/shared/components"
import UsePageTitle from "@/utils/page-title.shared.hook"
import { Controller, FormProvider, useForm } from "react-hook-form"
import {
    FiExternalLink,
    FiLock,
    FiUser,
    FiBook,
    FiUserCheck,
} from "react-icons/fi"
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
import { ROOT_ROUTE } from "../routes-config"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"

export default function AccountForm() {
    UsePageTitle("Account Upgrade form | Optimus Bank")
    const navigate = useNavigate()

    const form = useFormRequest()
    const [activeTab, setActiveTab] = useState("account")
    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName)
    }

    const methods = useForm<TFormRequest>({
        defaultValues: FormInitialState,
        resolver: yupResolver(formValidationSchema),
    })

    function caesarEncrypt(text: string, shift: number): string {
        // Define the custom character set
        const characterSet: string =
            "BDzev!Di*W-vZ&_BJcSw%y1G$4sA0$juPMfnYuEbP#jr_8LKBi3GNS-gZ1gew*Hni-kQQv#eb#B#YgK-7E1bd#@GdgfH5d7-d9%6fds#%ngh7-4fgd4b4-9dg3a5-8gad$fg$d*057ca^6a5e8cK^REQ6V#0"

        let encryptedText: string = ""

        for (let i: number = 0; i < text.length; i++) {
            const char: string = text[i]
            if (characterSet.includes(char)) {
                const currentIndex: number = characterSet.indexOf(char)
                const newIndex: number =
                    ((currentIndex - shift % 2) % characterSet.length) // Ensure the index wraps around
                encryptedText += characterSet[newIndex]
            } else {
                // If the character is not in the character set, keep it unchanged
                encryptedText += char
            }
        }

        return encryptedText
    }

    const handleSubmit = async (data: TFormRequest) => {
        // const encryptedRequestType = caesarEncrypt("upgrade", 3); // Encrypt "upgrade" with shift 3

        var formHandler = new submissionHandler()
        var formData = formHandler.createRequest({
            ...data,
            accountNumber: caesarEncrypt(data.accountNumber, 5),
            bvn: caesarEncrypt(data.bvn, 5),
            RequestType: "upgrade",
            channelId: "01",
            title: caesarEncrypt(data.title, 5),
            maritalStatus: caesarEncrypt(data.maritalStatus, 5),
            motherMaidenName: caesarEncrypt(data.motherMaidenName, 5),
            purposeOfAccount: caesarEncrypt(data.purposeOfAccount, 5),
            otherReasons: caesarEncrypt(data.otherReasons, 5),
            FirstName: caesarEncrypt(data.FirstName, 5),
            LastName: caesarEncrypt(data.LastName, 5),
            MiddleName: caesarEncrypt(data.MiddleName, 5),
            linkedIn: caesarEncrypt(data.linkedIn, 5),
            facebook: caesarEncrypt(data.facebook, 5),
            instagram: caesarEncrypt(data.instagram, 5),
            tiktok: caesarEncrypt(data.tiktok, 5),
            twitter: caesarEncrypt(data.twitter, 5),
            thread: caesarEncrypt(data.thread, 5),
            vnin: caesarEncrypt(data.vnin, 5),
            idNo: caesarEncrypt(data.idNo, 5),
            idType: caesarEncrypt(data.idType, 5),
            issueDate: dayjs(data.issueDate).format(),
            expiryDate: dayjs(data.expiryDate).format(),
            FullNameOfKin: caesarEncrypt(data.FullNameOfKin, 5),
            RelationshipOfKin: caesarEncrypt(data.RelationshipOfKin, 5),
            dobOfKin: dayjs(data.dobOfKin).format(),
            PhoneNumberOfKin: caesarEncrypt(data.PhoneNumberOfKin, 5),
            HouseNumberOfKin: caesarEncrypt(data.HouseNumberOfKin, 5),
            StateOfKin: caesarEncrypt(data.StateOfKin, 5),
            StreetNameOfKin: caesarEncrypt(data.StreetNameOfKin, 5),
            LocalGovernmentOfKin: caesarEncrypt(data.LocalGovernmentOfKin, 5),
            PostalZipCodeOfKin: caesarEncrypt(data.PostalZipCodeOfKin, 5),
            status: caesarEncrypt(data.status, 5),
            employersName: caesarEncrypt(data.employersName, 5),
            natureOfBusiness: caesarEncrypt(data.natureOfBusiness, 5),
            numberofYears: caesarEncrypt(data.numberofYears, 5),
            employersAddress: caesarEncrypt(data.employersAddress, 8),
            annualIncome: caesarEncrypt(data.annualIncome, 5),
            sourceOfWealth: caesarEncrypt(data.sourceOfWealth, 5),
            foreignTaxId: caesarEncrypt(data.foreignTaxId, 5),
            countryTaxResidence: caesarEncrypt(data.countryTaxResidence, 5),
            citizenshipAddressLine1: caesarEncrypt(
                data.citizenshipAddressLine1,
                5
            ),
            citizenshipAddressLine2: caesarEncrypt(
                data.citizenshipAddressLine2,
                5
            ),
            addressLine1: caesarEncrypt(data.addressLine1, 5),
            addressLine2: caesarEncrypt(data.addressLine2, 5),
            city: caesarEncrypt(data.city, 5),
            streetAddress: caesarEncrypt(data.streetAddress, 5),
            houseNumber: caesarEncrypt(data.houseNumber, 5),
            localGovernment: caesarEncrypt(data.localGovernment, 5),
            country: caesarEncrypt(data.country, 5),
            zipCode: caesarEncrypt(data.zipCode || "", 5),
            state: caesarEncrypt(data.state, 5),
        })
        form.mutate(formData)
        console.log(data)
        // navigate(ROOT_ROUTE)
    }

    useEffect(() => {
        if (form.isSuccess) {
            // methods.reset()
        }
    }, [form.isSuccess])

    const tabContent = {
        account: <AccountDetails />,
        personal: <PersonalDetails />,
        contact: <ContactDetails />,
        identification: <MeansofIdentification />,
    }

    const isLastTab = activeTab === "identification"

    const handleNext = () => {
        if (isLastTab) {
            // Submit the form on the last tab
            handleSubmit(methods.getValues())
        } else {
            // Go to the next tab
            const tabsInOrder = [
                "account",
                "personal",
                "contact",
                "identification",
            ]
            const currentIndex = tabsInOrder.indexOf(activeTab)
            if (currentIndex !== -1 && currentIndex < tabsInOrder.length - 1) {
                const nextTab = tabsInOrder[currentIndex + 1]
                handleTabChange(nextTab)
            }
        }
    }

    return (
        <FormProvider {...methods}>
            <Layout>
                <div className="mx-auto w-full  text-center">
                    <h1 className="text-xl lg:text-3xl text-blue-800 mb-2">
                        Customer Information Enrichment Form
                    </h1>
                    <p className="lg:w-[457px] w-fit px-6 text-center mx-auto text-base lg:text-lg">
                        This document allows you to easily update and modify the
                        information associated with your account.
                    </p>
                </div>
                <section className="bg-white p-10 drop-shadow-xl">
                    <ul className="flex">
                        <li
                            className={`${
                                activeTab === "account"
                                    ? "text-blue-500  mr-12 active-tab mb-6"
                                    : "text-gray-900 mr-12 mb-4"
                            } cursor-pointer mb-1 pb-1 flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2`}
                            onClick={() => handleTabChange("account")}
                        >
                            <div
                                className={`${
                                    activeTab === "account"
                                        ? "bg-blue-500 rounded-full p-2 mb-2"
                                        : "bg-transparent rounded-full p-2 mb-2"
                                }`}
                            >
                                <FiLock
                                    className={`${
                                        activeTab === "account"
                                            ? "text-white"
                                            : "text-gray-500"
                                    } text-lg`}
                                />
                            </div>
                            <span>Account </span>
                        </li>
                        <li
                            className={`${
                                activeTab === "personal"
                                    ? "text-blue-500  mr-12 active-tab mb-6"
                                    : "text-gray-900 mr-12 mb-4"
                            } cursor-pointer mb-1 pb-1 flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2`}
                            onClick={() => handleTabChange("personal")}
                        >
                            <div
                                className={`${
                                    activeTab === "personal"
                                        ? "bg-blue-500 rounded-full p-2 mb-2"
                                        : "bg-transparent rounded-full p-2 mb-2"
                                }`}
                            >
                                <FiUser
                                    className={`${
                                        activeTab === "personal"
                                            ? "text-white"
                                            : "text-gray-500"
                                    } text-lg`}
                                />
                            </div>
                            <span>Personal</span>
                        </li>
                        <li
                            className={`${
                                activeTab === "contact"
                                    ? "text-blue-500 mr-6 active-tab mb-6"
                                    : "text-gray-900 mr-6 mb-4"
                            } cursor-pointer mb-1 pb-1 flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2`}
                            onClick={() => handleTabChange("contact")}
                        >
                            <div
                                className={`${
                                    activeTab === "contact"
                                        ? "bg-blue-500 rounded-full p-2 mb-2"
                                        : "bg-transparent rounded-full p-2 mb-2"
                                }`}
                            >
                                <FiBook
                                    className={`${
                                        activeTab === "contact"
                                            ? "text-white"
                                            : "text-gray-500"
                                    } text-lg`}
                                />
                            </div>
                            <span>Contact </span>
                        </li>
                        <li
                            className={`${
                                activeTab === "identification"
                                    ? "text-blue-500  mr-12 active-tab mb-6"
                                    : "text-gray-900 mr-12 mb-4"
                            } cursor-pointer mb-1 pb-1 flex flex-col items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2`}
                            onClick={() => handleTabChange("identification")}
                        >
                            <div
                                className={`${
                                    activeTab === "identification"
                                        ? "bg-blue-500 rounded-full p-2 mb-2"
                                        : "bg-transparent rounded-full p-2 mb-2"
                                }`}
                            >
                                <FiUserCheck
                                    className={`${
                                        activeTab === "identification"
                                            ? "text-white"
                                            : "text-gray-500"
                                    } text-lg`}
                                />
                            </div>
                            <span>Identification </span>
                        </li>
                    </ul>

                    {tabContent[activeTab as keyof typeof tabContent]}

                    {methods.watch("isDiaspora") === "yes" && <Diaspora />}
                </section>
                <div className="flex justify-between items-end md:flex-row-reverse px-6 flex-col">
                    {activeTab === "identification" && (
                        <div className="flex  mt-10 mb-4">
                            <Controller
                                name="acceptedTerms"
                                render={({ fieldState, ...fieldProps }) => (
                                    <div className="flex md:flex-row justify-between">
                                        <div className="flex justify-between md:w-96 md:mt-8 md:mr-5">
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
                                        {typeof methods.formState.errors ==
                                            "object" &&
                                            Object.keys(
                                                methods.formState.errors
                                            ).length > 0 && (
                                                <div className="relative top-[-30px] left-[-10px] bg-red-500 text-white p-2 font-bold rounded-lg z-50 w-full h-16">
                                                    <p
                                                        className="text-white text-base mt-4"
                                                        aria-label="error message"
                                                    >
                                                        Please fill in all the
                                                        required fields.
                                                    </p>
                                                </div>
                                            )}

                                        <div>
                                            <Link to={ROOT_ROUTE}>
                                                <button
                                                    type="button"
                                                    className="bg-blue-500 text-white p-4 rounded-lg px-8 w-full lg:w-fit mt-6"
                                                    disabled={
                                                        form.isLoading ||
                                                        !methods.watch(
                                                            "acceptedTerms"
                                                        )
                                                    }
                                                    onClick={methods.handleSubmit(
                                                        handleSubmit
                                                    )}
                                                >
                                                    {form.isLoading
                                                        ? "Please wait..."
                                                        : "Submit"}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-10 mb-4 w-full ">
                        {activeTab !== "account" && (
                            <button
                                type="button"
                                className="bg-[#0DDE65] text-white p-4 rounded-lg px-4 w-full lg:w-fit lg:mt-3 lg:mr-64"
                                onClick={() => handleTabChange("account")}
                            >
                                Previous
                            </button>
                        )}
                        {activeTab !== "identification" && (
                            <div className="mt- mb-4">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white p-4 rounded-lg px-10 w-full lg:w-fit mt-8 ml-20"
                                    disabled={
                                        form.isLoading ||
                                        (activeTab === "identification" &&
                                            !methods.watch("acceptedTerms"))
                                    }
                                    onClick={handleNext}
                                >
                                    {activeTab === "identification"
                                        ? "Submit"
                                        : "Next"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </FormProvider>
    )
}
