
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

