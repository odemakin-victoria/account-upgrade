import { useState, ChangeEvent } from "react"
import { FormControl, Label } from "@/shared/components"
import LabelDecor from "../components/label-decor"
import SectionContainer from "../components/section"

export default function AccountDetails() {
    const [accountNumber, setAccountNumber] = useState("")
    const [bvn, setBvn] = useState("")
    const [accountNumberError, setAccountNumberError] = useState("")
    const [bvnError, setBvnError] = useState("")

    const handleAccountNumberChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const input = event.target.value
        if (/^\d{10}$/.test(input)) {
            setAccountNumber(input)
            setAccountNumberError("") // Clear any previous error
        } else {
            setAccountNumber("")
            setAccountNumberError("Account number must be exactly 10 digits")
        }
    }

    const handleBvnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value
        if (/^\d{11}$/.test(input)) {
            setBvn(input)
            setBvnError("") // Clear any previous error
        } else {
            setBvn("")
            setBvnError("BVN must be exactly 11 digits")
        }
    }

    return (
        <SectionContainer>
            <h2 className="text-lg mb-8 heading">
                <LabelDecor text="1" /> Account Details
            </h2>
            <div className="md:flex justify-between">
                <div className="mb-6 mr-10 w-full">
                    <Label
                        labelName="account-number"
                        aria-label="account number"
                        required
                    >
                        Account Number
                    </Label>
                    <FormControl
                        fieldName="accountNumber"
                        variant="input"
                        id="account-number"
                        placeholder="Enter your Account Number"
                        className="focus:shadow-lg"
                        maxLength={10}
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                    />
                    {accountNumberError && (
                        <p className="text-red-500">{accountNumberError}</p>
                    )}
                </div>

                <div className="mb-10 w-full">
                    <Label labelName="bvn" required>
                        BVN
                    </Label>
                    <FormControl
                        fieldName="bvn"
                        variant="input"
                        id="bvn"
                        type="text"
                        placeholder="Enter your BVN"
                        maxLength={11}
                        value={bvn}
                        onChange={handleBvnChange}
                    />
                    {bvnError && (
                        <p className="text-red-500">{bvnError}</p>
                    )}
                </div>
                
            </div>
        </SectionContainer>
    )
}
