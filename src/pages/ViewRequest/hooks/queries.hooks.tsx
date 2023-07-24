import { axiosInstance } from "@/config/api"
import {
    AccountDocumentResponse,
    AccountRequestResponse,
    ApiResponse,
    ContactAddress,
    ContactAddressUpdate,
    Customer,
} from "@/shared/types"
import { AxiosError, AxiosResponse } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { CustomerUpdateRequest } from "../types"
import { NotificationManager } from "@/utils/ResponseHandler.shared"

/**
 * Custom hook for fetching account details from the server.
 * Uses `useQuery` from react-query to perform the request.
 * @returns The react-query useQuery object.
 */
export const useFormQuery = () => {
    /**
     * Retrieves the token from the URL query parameters.
     * @returns The token value or null if not found.
     */
    function getTokenFromURL(): string | null {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get("token")
    }

    /**
     * Retrieves the account number from the URL query parameters.
     * @returns The account number or null if not found.
     */
    function getAccountFromUrl(): string | null {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get("accNo")
    }

    /**
     * Sends a request to fetch the account details from the server.
     * @returns A Promise that resolves to the fetched account details.
     */
    const request = async () => {
        const data = await axiosInstance.get(
            `/account-update-request/${getAccountFromUrl()}`,
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromURL()}`,
                },
            }
        )
        return data.data
    }

    return useQuery<
        ApiResponse<AccountRequestResponse>,
        AxiosError<ApiResponse<null>>
    >({
        queryKey: ["get-account-details", getAccountFromUrl(), getTokenFromURL()],
        queryFn: () => request(),
        enabled: !!getAccountFromUrl(),
        onError:(data)=>{
           data.response?.status === 403 && NotificationManager.showErrorNotification("Unauthorized")
        }
    })
}

/**
 * Custom hook for updating customer details on the server.
 * Uses `useMutation` from react-query to perform the update.
 * @returns The react-query useMutation object.
 */
export const useCustomerUpdate = () => {
    const queryClient = useQueryClient()

    /**
     * Retrieves the token from the URL query parameters.
     * @returns The token value or null if not found.
     */
    function getTokenFromURL(): string | null {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get("token")
    }

    /**
     * Sends a request to update the customer details on the server.
     * @param values - The updated customer details.
     * @returns A Promise that resolves to the updated customer details.
     */
    const request = async (values: { values: CustomerUpdateRequest }) => {
        const data = await axiosInstance.patch(
            `/Customer`,
            {
                customerId: values.values.customerId,
                maritalStatus: values.values.maritalStatus,
                motherMaidenName: values.values.motherMaidenName,
                nextOfKinName: values.values.nextOfKinName,
                nextOfKinPhone: values.values.nextOfKinPhone,
            } as CustomerUpdateRequest,
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromURL()}`,
                },
            }
        )
        return data.data
    }

    return useMutation<
        AxiosResponse<Customer>,
        AxiosError<ApiResponse<null>>,
        CustomerUpdateRequest
    >({
        mutationKey: "patch-account-document", // Updated to a single string value
        mutationFn: (values) => request({ values }),
        onSuccess: () => {
            queryClient.invalidateQueries("get-account-details")
            NotificationManager.showSuccessNotification()
        },
        onError: (err) => {
            NotificationManager.showErrorNotification(
                err.response?.data.responseMessage
            )
        },
    })
}

/**
 * Custom hook for updating contact details on the server.
 * Uses `useMutation` from react-query to perform the update.
 * @returns The react-query useMutation object.
 */
export const useContactDetailsUpdate = () => {
    const queryClient = useQueryClient()

    /**
     * Retrieves the token from the URL query parameters.
     * @returns The token value or null if not found.
     */
    function getTokenFromURL(): string | null {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get("token")
    }

    /**
     * Sends a request to update the contact details on the server.
     * @param values - The updated contact details.
     * @returns A Promise that resolves to the updated contact details.
     */
    const request = async (values: ContactAddressUpdate) => {
        const data = await axiosInstance.patch(
            `/Customer/contact-details`,
            values,
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromURL()}`,
                },
            }
        )
        return data.data
    }

    return useMutation<
        AxiosResponse<ContactAddress>,
        AxiosError<ApiResponse<null>>,
        ContactAddressUpdate
    >({
        mutationKey: "patch-account-document", // Updated to a single string value
        mutationFn: (values) => request(values),
        onSuccess: () => {
            queryClient.invalidateQueries("get-account-details")
            NotificationManager.showSuccessNotification()
        },
        onError: (err) => {
            NotificationManager.showErrorNotification(
                err.response?.data.responseMessage
            )
        },
    })
}

/**
 * Custom hook for updating account documents on the server.
 * Uses `useMutation` from react-query to perform the update.
 * @returns The react-query useMutation object.
 */
export const useDocumentUpdate = () => {
    const queryClient = useQueryClient()

    /**
     * Retrieves the token from the URL query parameters.
     * @returns The token value or null if not found.
     */
    function getTokenFromURL(): string | null {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get("token")
    }

    /**
     * Sends a request to update the account document on the server.
     * @param values - The updated account document details.
     * @returns A Promise that resolves to the updated account document.
     */
    const request = async (values: FormData) => {
       

        const data = await axiosInstance.patch(
            `/Customer/documents`,
            values,
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromURL()}`,
                },
            }
        )
        return data.data
    }

    return useMutation<
        AxiosResponse<AccountDocumentResponse>,
        AxiosError<ApiResponse<null>>,
        FormData
    >({
        mutationKey: "patch-account-document", // Updated to a single string value
        mutationFn: (values) => request(values),
        onSuccess: () => {
            queryClient.invalidateQueries("get-account-details")
            NotificationManager.showSuccessNotification()
        },
        onError: (err) => {
            NotificationManager.showErrorNotification(
                err.response?.data.responseMessage
            )
        },
    })
}
