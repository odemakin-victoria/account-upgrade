
import {
  
    ApiResponse,
    
} from "@/shared/types"

import { useMutation } from "react-query"
// import { CustomerUpdateRequest } from "../types"


import { axiosInstance } from "@/config/api"
import { AxiosError, AxiosResponse } from "axios"

import { NotificationManager } from "@/utils/ResponseHandler.shared"


// Mutations
export const useFormRequest = () => {
    const onSubmit = async (values: FormData) => {
        console.log(values, "form request")
        const data = await axiosInstance.post(`/api/account-request`, values)
        return data.data
    }

    return useMutation<AxiosResponse, AxiosError<ApiResponse<null>>, FormData>(
        "submit-form",
        (values: FormData) => onSubmit(values),
        {
            onSuccess: () => {
                NotificationManager.showSuccessNotification(
                    "Account Update Request submitted successfully"
                )
            },
            onError: (data) => {
                NotificationManager.showErrorNotification(
                    data.response?.data.responseMessage
                )

                // dataValue?.data && dataValue.data.length > 0
                //     ? dataValue.data.map((item: string) => <p>{item}</p>)
                //     : dataValue?.message
            },
        }
    )
}


/**
 * Custom hook for fetching account details from the server.
 * Uses `useQuery` from react-query to perform the request.
 * @returns The react-query useQuery object.
 */
export const useFormQuery = () => {
    const onSubmit = async (values: FormData) => {
        const data = await axiosInstance.post(`/api/account-request`, values)
        return data.data
    }

    return useMutation<AxiosResponse, AxiosError<ApiResponse<null>>, FormData>(
        "submit-form",
        (values: FormData) => onSubmit(values),
        {
            onSuccess: () => {
                NotificationManager.showSuccessNotification(
                    "Account Update Request submitted successfully"
                )
            },
            onError: (data) => {
                NotificationManager.showErrorNotification(
                    data.response?.data.responseMessage
                )

                // dataValue?.data && dataValue.data.length > 0
                //     ? dataValue.data.map((item: string) => <p>{item}</p>)
                //     : dataValue?.message
            },
        }
    )
  
}

/**
 * Custom hook for updating customer details on the server.
 * Uses `useMutation` from react-query to perform the update.
 * @returns The react-query useMutation object.
 */
// export const useCustomerUpdate = () => {
//     const queryClient = useQueryClient()

//     /**
//      * Retrieves the token from the URL query parameters.
//      * @returns The token value or null if not found.
//      */
//     function getTokenFromURL(): string | null {
//         const urlParams = new URLSearchParams(window.location.search)
//         return urlParams.get("token")
//     }

//     /**
//      * Sends a request to update the customer details on the server.
//      * @param values - The updated customer details.
//      * @returns A Promise that resolves to the updated customer details.
//      */
//     const request = async (values: { values: CustomerUpdateRequest }) => {
//         const data = await axiosInstance.patch(
//             `/Customer`,
//             {
//                 customerId: values.values.customerId,
//                 maritalStatus: values.values.maritalStatus,
//                 motherMaidenName: values.values.motherMaidenName,
//                 nextOfKinName: values.values.nextOfKinName,
//                 nextOfKinPhone: values.values.nextOfKinPhone,
//             } as CustomerUpdateRequest,
//             {
//                 headers: {
//                     Authorization: `Bearer ${getTokenFromURL()}`,
//                 },
//             }
//         )
//         return data.data
//     }

//     return useMutation<
//         AxiosResponse<Customer>,
//         AxiosError<ApiResponse<null>>,
//         CustomerUpdateRequest
//     >({
//         mutationKey: "patch-account-document", // Updated to a single string value
//         mutationFn: (values) => request({ values }),
//         onSuccess: () => {
//             queryClient.invalidateQueries("get-account-details")
//             NotificationManager.showSuccessNotification()
//         },
//         onError: (err) => {
//             NotificationManager.showErrorNotification(
//                 err.response?.data.responseMessage
//             )
//         },
//     })
// }

// /**
//  * Custom hook for updating contact details on the server.
//  * Uses `useMutation` from react-query to perform the update.
//  * @returns The react-query useMutation object.
//  */
// export const useContactDetailsUpdate = () => {
//     const queryClient = useQueryClient()

//     /**
//      * Retrieves the token from the URL query parameters.
//      * @returns The token value or null if not found.
//      */
//     function getTokenFromURL(): string | null {
//         const urlParams = new URLSearchParams(window.location.search)
//         return urlParams.get("token")
//     }

//     /**
//      * Sends a request to update the contact details on the server.
//      * @param values - The updated contact details.
//      * @returns A Promise that resolves to the updated contact details.
//      */
//     const request = async (values: ContactAddressUpdate) => {
//         const data = await axiosInstance.patch(
//             `/Customer/contact-details`,
//             values,
//             {
//                 headers: {
//                     Authorization: `Bearer ${getTokenFromURL()}`,
//                 },
//             }
//         )
//         return data.data
//     }

//     return useMutation<
//         AxiosResponse<ContactAddress>,
//         AxiosError<ApiResponse<null>>,
//         ContactAddressUpdate
//     >({
//         mutationKey: "patch-account-document", // Updated to a single string value
//         mutationFn: (values) => request(values),
//         onSuccess: () => {
//             queryClient.invalidateQueries("get-account-details")
//             NotificationManager.showSuccessNotification()
//         },
//         onError: (err) => {
//             NotificationManager.showErrorNotification(
//                 err.response?.data.responseMessage
//             )
//         },
//     })
// }

/**
//  * Custom hook for updating account documents on the server.
//  * Uses `useMutation` from react-query to perform the update.
//  * @returns The react-query useMutation object.
//  */
// export const useDocumentUpdate = () => {
//     const queryClient = useQueryClient()

//     /**
//      * Retrieves the token from the URL query parameters.
//      * @returns The token value or null if not found.
//      */
//     function getTokenFromURL(): string | null {
//         const urlParams = new URLSearchParams(window.location.search)
//         return urlParams.get("token")
//     }

//     /**
//      * Sends a request to update the account document on the server.
//      * @param values - The updated account document details.
//      * @returns A Promise that resolves to the updated account document.
//      */
//     const request = async (values: FormData) => {
       

//         const data = await axiosInstance.patch(
//             `/Customer/documents`,
//             values,
//             {
//                 headers: {
//                     Authorization: `Bearer ${getTokenFromURL()}`,
//                 },
//             }
//         )
//         return data.data
//     }

//     return useMutation<
//         AxiosResponse<AccountDocumentResponse>,
//         AxiosError<ApiResponse<null>>,
//         FormData
//     >({
//         mutationKey: "patch-account-document", // Updated to a single string value
//         mutationFn: (values) => request(values),
//         onSuccess: () => {
//             queryClient.invalidateQueries("get-account-details")
//             NotificationManager.showSuccessNotification()
//         },
//         onError: (err) => {
//             NotificationManager.showErrorNotification(
//                 err.response?.data.responseMessage
//             )
//         },
//     })
// }
