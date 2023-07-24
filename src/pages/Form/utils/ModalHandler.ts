export const initialState: State = {
    openValidateModal: false,
    openOtpRequestModal: false,
}

// Define action types
export type ActionType =
    | "OPEN_VALIDATE_MODAL"
    | "OPEN_OTP_REQUEST_MODAL"
    | "CLOSE"

// Define state type
type State = {
    openValidateModal: boolean
    openOtpRequestModal: boolean
}

// Define action type
type Action = {
    type: ActionType
    payload: boolean
}

export const formModalReducer = (state: State, action: Action): State => {
    console.log(action)
    switch (action.type) {
        case "OPEN_VALIDATE_MODAL":
            return {
                openOtpRequestModal: false,
                openValidateModal: action.payload,
            }
        case "OPEN_OTP_REQUEST_MODAL":
            return {
                ...state,
                openOtpRequestModal: action.payload,
            }

        case "CLOSE":
            return {
                openOtpRequestModal: false,
                openValidateModal: false,
            }
        default:
            return state
    }
}
