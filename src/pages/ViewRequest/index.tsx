import { FormProvider, useForm, useFormContext } from "react-hook-form"
import PersonalDetails from "./sections/personal-details.update"
import ContactDetailsUpdate from "./sections/contact-details.update"
import UploadedDocumentUpdate from "./sections/uploaded-documents.update"
import { useFormQuery } from "./hooks/queries.hooks"
import { useEffect, useReducer, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    CREATE_ACCOUNT_REQUEST,
    UPDATE_ACCOUNT_REQUEST,
} from "../routes-config"
import { BsArrowRight } from "react-icons/bs"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import {
    Button,
    FormControl,
    Label,
    Modal,
    OTPInput,
} from "@/shared/components"
import { ApiResponse } from "@/shared/types"
import { OTPValidator } from "../Form/utils/AuthHandler"
import { NotificationManager } from "@/utils/ResponseHandler.shared"
import {
    ActionType,
    formModalReducer,
    initialState,
} from "../Form/utils/ModalHandler"
import dayjs from "dayjs"
import UsePageTitle from "@/utils/page-title.shared.hook"
import { Tabs } from "@mantine/core"
import { useClickOutside } from "@mantine/hooks"

export default function UpdateRequest() {
    UsePageTitle("View Update Request | Optimus Bank")

    const [state, dispatch] = useReducer(formModalReducer, initialState)
    const response = useFormQuery()

    const methods = useForm({
        defaultValues: {
            accountNumber: "",
            bvn: "",
            state: "",
            postalCode: "",
            localGovt: "",
            customerPhoto: null,
            customerId: "",
            contactAddressId: "",
            diasporaDocs: null,
            signature: null,
            maritalStatus: "",
            motherMaidenName: "",
            nextOfKinName: "",
            nextOfKinPhone: "",
            acceptedTerms: false,
            city: "",
            country: "Nigeria",
            isDiaspora: "no",
            line1: "",
            line2: "",
            documents: [] || null,
        },
    })
    useEffect(() => {
        dispatch({ type: "OPEN_OTP_REQUEST_MODAL", payload: true })
    }, [])

    useEffect(() => {
        var data = response.data?.data
        if (response.isSuccess) {
            methods.reset({
                accountNumber: data?.accountNumber,
                bvn: data?.bvn ?? undefined,
                maritalStatus: data?.customer?.maritalStatus,
                localGovt: data?.contactAddress?.localGovt,
                line1: data?.contactAddress?.line1 ?? undefined,
                line2: data?.contactAddress?.line2 ?? undefined,
                nextOfKinName: data?.customer?.nextOfKinName,
                nextOfKinPhone: data?.customer?.nextOfKinPhone,
                motherMaidenName: data?.customer?.motherMaidenName,
                country: data?.contactAddress?.country ?? "",
                isDiaspora:
                    data?.contactAddress!.country.toLowerCase() === "nigeria"
                        ? "no"
                        : "yes",
                postalCode: data?.contactAddress?.postalCode,
                documents: data?.accountDocuments as any,
                contactAddressId: data?.contactAddress?.contactAddressId,
                customerId: data?.customer?.customerId,
                state: data?.contactAddress.state,
            })
        }
    }, [response.isSuccess])

    const otpMethods = useForm({
        defaultValues: {
            DOB: "",
            token: "",
            accountNumber: "",
        },
    })

    const [showMenu, setShowMenu] = useState(false)
    const ref = useClickOutside(() => setShowMenu(false))

    return (
        <>
            <FormProvider {...methods}>
                <div
                    className=" bg-[#E8E8E8] overflow-scroll"
                    style={{
                        background: `url(https://forms.zohopublic.com/optimusbankhr/downloadlogoperma?filepath=/optimusbankhr/zf-customthemes-zf/1683535029165_title__2_.jpg)`,
                        backgroundSize: "stretch",
                    }}
                >
                    <header className="w-full bg-white md:px-14 px-6 py-6 md:fixed h-24 z-50 flex items-center justify-between relative">
                        <nav className=" ">
                            <img
                                src="https://optimusbank.com/assets/images/header/Optimus_Logo.svg"
                                alt="optimus_bank_logo"
                            />
                        </nav>
                        <HiOutlineMenuAlt3
                            size={24}
                            className="cursor-pointer md:hidden"
                            onClick={() => setShowMenu(!showMenu)}
                        />

                        <div
                            ref={ref}
                            className={`${
                                showMenu
                                    ? "absolute top-20 flex bg-white flex-col items-start w-full left-0"
                                    : "hidden "
                            } md:flex `}
                        >
                            <Link
                                to="https://optimusbank.com"
                                className="transition-all p-4 rounded hover:bg-blue-500 hover:text-white inline-flex items-center justify-center justify-self-end w-full md:w-fit"
                            >
                                <span>Home</span>
                            </Link>
                            <Link
                                to={CREATE_ACCOUNT_REQUEST}
                                className="transition-all p-4 rounded hover:bg-blue-500 hover:text-white inline-flex items-center justify-center w-full md:w-fit"
                            >
                                <span>Create Account Request</span>{" "}
                                <BsArrowRight className="ml-4" />
                            </Link>
                        </div>
                    </header>{" "}
                    <section className="px-10 flex justify-between items-center mb-10 flex-wrap lg:flex-nowrap gap-6 mt-36">
                        <div className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-0 md:items-center">
                            <h1 className="mr-6 text-xl lg:text-2xl">
                                Account Update Request
                            </h1>
                            <span className="bg-[#FEFFB8]  p-4 rounded-lg font-medium w-fit">
                                {response.data?.data.updateStatus}
                            </span>
                        </div>
                    </section>
                    <div></div>
                    <div className="lg:px-10 px-4 justify-between gap">
                        <Tabs
                            defaultValue="Personal Details"
                            orientation="horizontal"
                        >
                            <div className="overflow-scroll md:overflow-auto">
                                <Tabs.List className="font-sans mb-6">
                                    <Tabs.Tab
                                        className="font-sans text-lg"
                                        value="Personal Details"
                                    >
                                        Personal Details
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        className="font-sans text-lg"
                                        value="Contact Details"
                                    >
                                        Contact Details
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        className="font-sans text-lg"
                                        value="Uploaded Documents"
                                    >
                                        Uploaded Documents
                                    </Tabs.Tab>
                                </Tabs.List>
                            </div>

                            <Tabs.Panel value="Personal Details">
                                <PersonalDetails
                                    isLoading={response.isLoading}
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value="Contact Details">
                                <ContactDetailsUpdate
                                    isLoading={response.isLoading}
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value="Uploaded Documents">
                                <UploadedDocumentUpdate />
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                </div>
            </FormProvider>

            <FormProvider {...otpMethods}>
                <AccountOTPRequest
                    isOpen={
                        state.openOtpRequestModal ??
                        response.error?.response?.status === 401
                    }
                    dispatch={(action) =>
                        dispatch({ type: action.type, payload: action.payload })
                    }
                />
                <AccountOTPRequestValidation
                    isOpen={state.openValidateModal}
                    dispatch={(action) =>
                        dispatch({ type: action.type, payload: action.payload })
                    }
                />
            </FormProvider>
        </>
    )
}

export function AccountOTPRequest({
    isOpen,
    dispatch,
}: {
    isOpen: boolean
    dispatch: ({
        type,
        payload,
    }: {
        type: ActionType
        payload: boolean
    }) => void
}) {
    const [isRequestingOTP, setisRequestingOTP] = useState(false)
    const { getValues } = useFormContext()

    const handleOtpRequest = async () => {
        const res = await OTPValidator.sendOTP({
            accountNumber: getValues("accountNumber"),
            DOB: dayjs(getValues("DOB")).format("YYYY-MM-DDTHH:mm:ss"),
            callback: (w) => {
                setisRequestingOTP(w)
            },
        })

        if (res.responseCode === "200") {
            setisRequestingOTP(false)
            dispatch({
                type: "OPEN_VALIDATE_MODAL",
                payload: true,
            })
        }
    }

    return (
        <Modal
            opened={isOpen}
            withCloseButton={false}
            centered
        
            onClose={() => {}}
            styles={{
                root: {
                    borderRadius: 90,
                },
                body: {
                    padding: 14,
                    paddingLeft: 24,
                    paddingRight: 24,
                },
            }}
        >
            <h1
                className="font-bold text-2xl mt-6 mb-4"
                aria-label="Modal title"
            >
                Account Number Verification
            </h1>
            <p
                className="text-gray-500 mb-8"
                aria-label="An otp has been sent to the phone number associated with this account"
            >
                Kindly Enter your the details below
            </p>

            <div className="mb-6">
                <Label labelName="accountNumber">Account Number</Label>
                <FormControl
                    fieldName="accountNumber"
                    variant="input"
                    id="accountNumber"
                    type="text"
                    placeholder="Enter your account number"
                />
            </div>
            <div className="mb-6">
                <Label labelName="date-of-birth">Date of Birth</Label>

                <FormControl
                    fieldName="DOB"
                    variant="DatePicker"
                    id="date-of-birth"
                    placeholder="Enter your Date of birth "
                />
            </div>
            <div className="flex items-center gap-4">
                {/* {!isRequestingOTP && (
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() =>
                            dispatch({ type: "CLOSE", payload: false })
                        }
                    >
                        Cancel
                    </Button>
                )} */}
                <Button
                    variant="primary"
                    type="button"
                    onClick={handleOtpRequest}
                    disabled={isRequestingOTP}
                >
                    {isRequestingOTP ? "Please wait..." : "Continue"}
                </Button>
            </div>
            <p>
                Need to create an account update request?{" "}
                <Link
                    to={CREATE_ACCOUNT_REQUEST}
                    className="text-blue-500 my-3 inline-block font-bold"
                >
                    Click here.
                </Link>
            </p>
        </Modal>
    )
}

export function AccountOTPRequestValidation({
    isOpen,
    dispatch,
}: {
    isOpen: boolean
    dispatch: ({
        type,
        payload,
    }: {
        type: ActionType
        payload: boolean
    }) => void
}) {
    const [isValidatingOtp, setIsValidatingOtp] = useState(false)
    const { getValues, reset } = useFormContext()

    const [otp, setOtp] = useState<Object | null>(null)

    const navigate = useNavigate()
    const handleOTPValidation = async () => {
        if (!otp) {
            NotificationManager.showErrorNotification("Please enter an OTP")
            return
        }

        const result = await OTPValidator.validateOtp({
            token: Object.values(otp).join(""),
            accountNumber: getValues("accountNumber"),
            dob: dayjs(getValues("DOB")).format("YYYY-MM-DDTHH:mm:ss"),
            callback: (e) => setIsValidatingOtp(e),
        })

        if (result.responseCode == "200") {
            setIsValidatingOtp(false)
            dispatch({ type: "CLOSE", payload: false })
            navigate(
                `${UPDATE_ACCOUNT_REQUEST}?accNo=${getValues(
                    "accountNumber"
                )}&token=${
                    (
                        result.data as ApiResponse<{ accessToken: string }> & {
                            accessToken: string
                        }
                    ).accessToken
                }`
            )
            reset()
        }
    }
    return (
        <Modal
            opened={isOpen}
            centered
            onClose={() => {}}
            styles={{
                root: {
                    borderRadius: 90,
                },
                body: {
                    padding: 20,
                },
            }}
        >
            <h1 className="font-bold text-2xl mb-2" aria-label="Modal title">
                Account Number Verification
            </h1>
            <p
                className="mb-10 text-gray-500"
                aria-label="An otp has been sent to the phone number associated with this account"
            >
                An OTP was sent to your phone number at{" "}
                <span className="font-bold">{getValues("accountNumber")}</span>
            </p>

            <OTPInput
                onCodeFilled={(e) => {
                    setOtp(e as unknown as Record<string, string>)
                }}
            />
            <div className="flex items-center gap-4">
                {!isValidatingOtp && (
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() =>
                            dispatch({ type: "CLOSE", payload: false })
                        }
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    variant="primary"
                    type="button"
                    onClick={handleOTPValidation}
                    // disabled={isValidatingOtp}
                >
                    {isValidatingOtp ? "Please wait..." : "Verify OTP"}
                </Button>
            </div>
        </Modal>
    )
}
