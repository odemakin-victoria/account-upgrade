import * as yup from "yup"

export const formValidationSchema = yup.object().shape({
    accountNumber: yup
      .string()
      .required("Account Number is required") // Add error message
      .min(5, "Invalid Account Number")
      .test(
        "accountNumberLength",
        "Account Number must be 10 digit",
        (value) => {
            if (value && value.length >= 10) {
                return true; // Validation passed
            } else {
                return new yup.ValidationError(
                    "Account Number must be 10 digit",
                    null,
                    "accountNumber"
                ); // Validation failed
            }
        }
    ),
      bvn: yup
      .string()
      .required("bvn is required") 
      .test(
        "BvnLength",
        "BVN must be 11 digit",
        (value) => {
            if (value && value.length >= 10) {
                return true; // Validation passed
            } else {
                return new yup.ValidationError(
                    "BVN must be 11 digit",
                    null,
                    "bvn"
                ); // Validation failed
            }
        }
    ),
      
    maritalStatus: yup.string().required("Marital Status is required"), // Add error message
    purposeOfAccount:yup.string().required("Purpose Of Account is required"),
    title:yup.string().required("Title is required"),
    state:yup.string().required("state is required"),
    localGovernment:yup.string().required("Local Government is required"),
    RelationshipOfKin:yup.string().required("Relationship Of Kin is required"),
    dobOfKin:yup.string().required("Date Of Birth Of Kin is required"),
    status:yup.string().required("Employment Status is required"),
    employersName:yup.string().required("Employer's Name is required"),
    employersAddress:yup.string().required("Employer's Address is required"),

   
   
    idType:yup.string().required("Identification Card is required"),
    idNo:yup.string().required("Identification Number is required"),
    motherMaidenName: yup.string().required("Mother's Maiden Name is required"), // Add error message
    FullNameOfKin: yup.string().required("Full Name of Kin is required"), // Add error message
    PhoneNumberOfKin: yup.string().required("Phone Number of Kin is required"), // Add error message
    signature: yup.mixed().required("Signature is required"), // Add error message
    proofOfIdentityImage:yup.mixed().required("Upload Regulatory ID is required"), 
    customerPhoto: yup.mixed().required("Customer Photo is required"), // Add error message
    proofOfAddressImage: yup.mixed().required("Proof of Address Image is required"), // Add error message
    acceptedTerms: yup.mixed().required("You must accept the Terms and Conditions"), // Add error message
  });
  
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
