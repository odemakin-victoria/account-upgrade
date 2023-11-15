import React from "react"
import { useFormContext } from "react-hook-form"

import { FileField } from "@/shared/types"


export default function Diaspora() {
    const { setValue, watch, getValues } = useFormContext()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const diasporaDocs = getValues("diasporaDocs")

        if (diasporaDocs?.length === 4) {
            return
        }

        if (
            e.target.files &&
            e.target.files.length > 0 &&
            e.target.files.length <= 4
        ) {
            const files = [...e.target.files]

            const finalFIles = files.map((file) => {
                return {
                    file,
                    name: file.name,
                }
            })

            if (diasporaDocs?.length > 0) {
                setValue("diasporaDocs", diasporaDocs.concat(finalFIles))
            } else {
                setValue("diasporaDocs", finalFIles)
            }
        }
    }

    function removeImage(itemName: string) {
        const diasporaDocs = getValues("diasporaDocs")
        const filteredOocs = [...diasporaDocs].filter(
            (item: FileField) => item?.name !== itemName
        )
        setValue("diasporaDocs", filteredOocs)
    }

    return (
        <div>
         
        </div>
    )
}
