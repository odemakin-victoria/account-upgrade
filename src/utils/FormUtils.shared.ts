import { ApiResponse } from "@/shared/types"
import { NotificationManager } from "@/utils/ResponseHandler.shared"
import { AxiosError } from "axios"

export function errorResponse<T>(error: unknown) {
    const errorResponse = error as AxiosError<ApiResponse<T>>

    NotificationManager.showErrorNotification(
        errorResponse.response?.data.responseMessage
    )

    return {
        responseCode: (error as ApiResponse<T>).responseCode,
        responseMessage:
            errorResponse.response?.data.responseMessage ?? "An Error occurred",
    }
}



export function mapItemName(itemName:string) {
    const mapping:{[key:string]:string} = {
      IDENTIFICATION: 'National ID',
      PROOFOFADDRESS: 'Proof of Address',
      SIGNATURE: 'Signature',
      CUSTOMERPHOTO: 'Photo'
    };
  
    return mapping[itemName] || itemName;
  }