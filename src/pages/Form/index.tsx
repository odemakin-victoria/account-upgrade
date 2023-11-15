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


 
    const methods = useForm<TFormRequest>({
        defaultValues: {
            ...FormInitialState,
            purposeOfAccount: "",
            employersAddress: "",
        },
        resolver: yupResolver(formValidationSchema),
    })
    const requiredFields: { [key: string]: string[] } = {
        account: ["accountNumber", "bvn"],
        personal: ["title", "purposeOfAccount","motherMaidenName", "maritalStatus"],
        contact: ["state","FullNameOfKin","RelationshipOfKin", "dobOfKin","PhoneNumberOfKin","status", "employersName","employersAddress" ],
        identification: ["idNo", "idType",],
      };
      
      
      const isCurrentTabValid = () => {
        const requiredFieldsForTab = requiredFields[activeTab];
        return requiredFieldsForTab.every((field: any) => !!methods.watch(field));
      };
    
      const handleTabChange = (tabName: string) => {
        if (tabName !== activeTab) {
          if (isCurrentTabValid()) {
            setActiveTab(tabName);
          }
        }
      };
    class CaesarCipher {
        public static CaesarEncrypt(
            input: string,
            key: number,
            rounds: number,
            _customAlphabet: string | null = null
        ): string {
            const DefaultAlphabet =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=}{][~`>,?"
            let alphabet = DefaultAlphabet
            const encryptedText = input.split("")

            for (let round = 0; round < rounds; round++) {
                for (let i = 0; i < encryptedText.length; i++) {
                    const originalChar = encryptedText[i]
                    if (alphabet.includes(originalChar)) {
                        const originalIndex = alphabet.indexOf(originalChar)
                        const newIndex = (originalIndex + key) % alphabet.length
                        const newChar = alphabet[newIndex]
                        encryptedText[i] = newChar
                    }
                }
            }

            return encryptedText.join("")
        }
    }

    const handleSubmit = async (data: TFormRequest) => {
        // const encryptedRequestType = caesarEncrypt("upgrade", 3); // Encrypt "upgrade" with shift 3

        var formHandler = new submissionHandler()
        var formData = formHandler.createRequest({
            ...data,
            accountNumber: CaesarCipher.CaesarEncrypt(data.accountNumber, 5, 3),
            bvn: CaesarCipher.CaesarEncrypt(data.bvn, 5, 3),
            RequestType: "upgrade",
            channelId: "01",
            title: CaesarCipher.CaesarEncrypt(data.title, 5, 3),
            maritalStatus: CaesarCipher.CaesarEncrypt(data.maritalStatus, 5, 3),
            motherMaidenName: CaesarCipher.CaesarEncrypt(
                data.motherMaidenName,
                5,
                3
            ),
            purposeOfAccount: CaesarCipher.CaesarEncrypt(
                data.purposeOfAccount,
                5,
                3
            ),
            otherReasons: CaesarCipher.CaesarEncrypt(data.otherReasons, 5, 3),
            FirstName: CaesarCipher.CaesarEncrypt(data.FirstName, 5, 3),
            LastName: CaesarCipher.CaesarEncrypt(data.LastName, 5, 3),
            MiddleName: CaesarCipher.CaesarEncrypt(data.MiddleName, 5, 3),
            linkedIn: CaesarCipher.CaesarEncrypt(data.linkedIn, 5, 3),
            facebook: CaesarCipher.CaesarEncrypt(data.facebook, 5, 3),
            instagram: CaesarCipher.CaesarEncrypt(data.instagram, 5, 3),
            tiktok: CaesarCipher.CaesarEncrypt(data.tiktok, 5, 3),
            twitter: CaesarCipher.CaesarEncrypt(data.twitter, 5, 3),
            thread: CaesarCipher.CaesarEncrypt(data.thread, 5, 3),
            vnin: CaesarCipher.CaesarEncrypt(data.vnin, 5, 3),
            idNo: CaesarCipher.CaesarEncrypt(data.idNo, 5, 3),
            idType: CaesarCipher.CaesarEncrypt(data.idType, 5, 3),
            issueDate: dayjs(data.issueDate).format(),

            expiryDate: dayjs(data.expiryDate).format(),

            FullNameOfKin: CaesarCipher.CaesarEncrypt(data.FullNameOfKin, 5, 3),
            RelationshipOfKin: CaesarCipher.CaesarEncrypt(
                data.RelationshipOfKin,
                5,
                3
            ),
            dobOfKin: dayjs(data.dobOfKin).format(),

            PhoneNumberOfKin: CaesarCipher.CaesarEncrypt(
                data.PhoneNumberOfKin,
                5,
                3
            ),
            HouseNumberOfKin: CaesarCipher.CaesarEncrypt(
                data.HouseNumberOfKin,
                5,
                3
            ),
            StateOfKin: CaesarCipher.CaesarEncrypt(data.StateOfKin, 5, 3),
            StreetNameOfKin: CaesarCipher.CaesarEncrypt(
                data.StreetNameOfKin,
                5,
                3
            ),
            LocalGovernmentOfKin: CaesarCipher.CaesarEncrypt(
                data.LocalGovernmentOfKin,
                5,
                3
            ),
            PostalZipCodeOfKin: CaesarCipher.CaesarEncrypt(
                data.PostalZipCodeOfKin,
                5,
                3
            ),
            status: CaesarCipher.CaesarEncrypt(data.status, 5, 3),
            employersName: CaesarCipher.CaesarEncrypt(data.employersName, 5, 3),
            natureOfBusiness: CaesarCipher.CaesarEncrypt(
                data.natureOfBusiness,
                5,
                3
            ),
            numberofYears: CaesarCipher.CaesarEncrypt(data.numberofYears, 5, 3),
            employersAddress: CaesarCipher.CaesarEncrypt(
                data.employersAddress,
                5,
                3
            ),
            annualIncome: CaesarCipher.CaesarEncrypt(data.annualIncome, 5, 3),
            sourceOfWealth: CaesarCipher.CaesarEncrypt(
                data.sourceOfWealth,
                5,
                3
            ),
            foreignTaxId: CaesarCipher.CaesarEncrypt(data.foreignTaxId, 5, 3),
            countryTaxResidence: CaesarCipher.CaesarEncrypt(
                data.countryTaxResidence,
                5,
                3
            ),
            citizenshipAddressLine1: CaesarCipher.CaesarEncrypt(
                data.citizenshipAddressLine1,
                5,
                3
            ),
            citizenshipAddressLine2: CaesarCipher.CaesarEncrypt(
                data.citizenshipAddressLine2,
                5,
                3
            ),
            addressLine1: CaesarCipher.CaesarEncrypt(data.addressLine1, 5, 3),
            addressLine2: CaesarCipher.CaesarEncrypt(data.addressLine2, 5, 3),
            city: CaesarCipher.CaesarEncrypt(data.city, 5, 3),
            streetAddress: CaesarCipher.CaesarEncrypt(data.streetAddress, 5, 3),
            houseNumber: CaesarCipher.CaesarEncrypt(data.houseNumber, 5, 3),
            localGovernment: CaesarCipher.CaesarEncrypt(
                data.localGovernment,
                5,
                3
            ),
            country: CaesarCipher.CaesarEncrypt(data.country, 5, 3),
            zipCode: CaesarCipher.CaesarEncrypt(data.zipCode || "", 5, 3),
            state: CaesarCipher.CaesarEncrypt(data.state, 5, 3),
        })

        form.mutate(formData)
        console.log(data)
        navigate(ROOT_ROUTE)
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



    const handleNext = (nextTab: string) => {
        const tabsInOrder = ["account", "personal", "contact", "identification"];
        const currentIndex = tabsInOrder.indexOf(activeTab);

        if (nextTab === "previous" || nextTab === "next") {
            if (nextTab === "next" && currentIndex < tabsInOrder.length - 1) {
                const nextTab = tabsInOrder[currentIndex + 1];
                setActiveTab(nextTab);
            } else if (nextTab === "previous" && currentIndex > 0) {
                const previousTab = tabsInOrder[currentIndex - 1];
                setActiveTab(previousTab);
            }
        }
    };
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
                                
                               
                                onClick={() => handleNext("previous")} // Go to the previous tab
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
                                    form.isLoading || !isCurrentTabValid() ||                                   
                                    (activeTab === "identification" &&
                                        !methods.watch("acceptedTerms"))
                                }
                                onClick={() => handleNext("next")} // Go to the next tab
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
