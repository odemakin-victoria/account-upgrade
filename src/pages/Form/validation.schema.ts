import * as yup from "yup"

export const formValidationSchema = yup.object().shape({
    accountNumber: yup
        .string()
        .required("Required")
        .min(5, "Invalid Account Number"),
    maritalStatus: yup.string().required("Required"),
    motherMaidenName: yup.string().required("Required"),
    FullNameOfKin: yup.string().required("Required"),
    PhoneNumberOfKin: yup.string().required("Required"),
    signature: yup.mixed().required("Required"),
    customerPhoto: yup.mixed().required("Required"),
    proofOfAddressImage: yup.mixed().required("Required"),
    acceptedTerms: yup.mixed().required("Required"),
})

export const otpRequestSchema = yup.object().shape({
    accountNumber: yup
        .string()
        .required("Required")
        .min(5, "Invalid Account Number"),
    // DOB: yup.string().required("Required"),
    // proofOfIdentityImage:yup.object({
    //     file:yup.mixed().required("Required")
    // }).required("Required"),
    // customerPhoto:yup.object({
    //     file:yup.mixed().required("Required")
    // }).required("Required"),
    // proofOfAddressImage:yup.object({
    //     file:yup.mixed().required("Required")
    // }).required("Required"),
})
