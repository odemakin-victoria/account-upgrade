import { axiosInstance } from "@/config/api"
import { AxiosError, AxiosResponse } from "axios"
import { useMutation } from "react-query"
import { NotificationManager } from "@/utils/ResponseHandler.shared"
import { ApiResponse } from "@/shared/types"

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
                    "Account Upgrade Request submitted successfully"
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
