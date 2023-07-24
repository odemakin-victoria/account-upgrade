import ImageUpload from "@/pages/Form/components/image-upload"
import { Input, Select } from "@/shared/components"
import { DatePickerInput } from "@mantine/dates"
import { Controller, useFormContext } from "react-hook-form"
import { IFormInputProps } from "./types"

function TextInput({
    fieldName,
    ...props
}: Omit<IFormInputProps, "onChange" | "onBlur" | "variant">) {
    const { control } = useFormContext()
    return (
        <div
            style={{
                flex: 1,
            }}
        >
            <Controller
                control={control}
                render={({ field: { value, ...fieldProps }, fieldState }) => (
                    <div className="flex flex-col">
                        <Input
                            {...props}
                            {...fieldProps}
                            value={value}
                            className={`text-sm mb-2 h-14 placeholder:text-gray-400 placeholder:font-normal transition-all ${
                                props.className
                            }  ${
                                fieldState.error && fieldState.error.message
                                    ? "border border-red-400"
                                    : ""
                            }`}
                        />

                        {fieldState.error && fieldState.error.message && (
                            <p
                                className="text-red-400 text-base"
                                aria-label="error message"
                            >
                                {fieldState.error?.message}
                            </p>
                        )}
                    </div>
                )}
                name={fieldName}
            />
        </div>
    )
}
function SelectInput({
    fieldName,
    options,
    ...props
}: Omit<IFormInputProps, "onChange" | "onBlur" | "variant">) {
    const { control } = useFormContext()

    return (
        <div
            style={{
                flex: 1,
            }}
        >
            <Controller
                control={control}
                render={({ field: { value, ...fieldProps }, fieldState }) => (
                    <div className="flex flex-col">
                        <Select
                            {...props}
                            {...fieldProps}
                            value={value}
                            options={options}
                            className={`text-sm mb-2 h-14 placeholder:text-gray-400 placeholder:font-normal transition-all ${
                                props.className
                            } ${
                                fieldState.error && fieldState.error.message
                                    ? "border border-red-400"
                                    : ""
                            }`}
                        />

                        {fieldState.error && fieldState.error.message && (
                            <p
                                className="text-red-400 text-base"
                                aria-label="error message"
                            >
                                {fieldState.error?.message}
                            </p>
                        )}
                    </div>
                )}
                name={fieldName}
            />
        </div>
    )
}
function FileInput({
    fieldName,
    multiple,
    accept,
    removeImage,
    ...props
}: Omit<IFormInputProps, "onBlur" | "variant">) {
    const { control, trigger } = useFormContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e)
        trigger(fieldName)
    }
    return (
        <div
            style={{
                flex: 1,
            }}
        >
            <Controller
                control={control}
                render={({ fieldState }) => (
                    <div className="flex flex-col">
                        <ImageUpload
                            name={fieldName.split(".")[0]}
                            multiple={multiple}
                            handleChange={handleChange}
                            accept={accept}
                        />

                        {fieldState.error && fieldState.error?.message && (
                            <p
                                className="text-red-400 text-base mt-4"
                                aria-label="error message"
                            >
                                {fieldState.error?.message}
                            </p>
                        )}
                    </div>
                )}
                name={fieldName}
            />
        </div>
    )
}

function DatePicker({
    fieldName,
    placeholder,
}: Omit<IFormInputProps, "onBlur" | "variant">) {
    const { control } = useFormContext()

    return (
        <div
            style={{
                flex: 1,
            }}
        >
            <Controller
                control={control}
                render={({ field: { value, ...rest }, fieldState }) => (
                    <div className="flex flex-col">
                        <DatePickerInput
                            allowDeselect
                            {...rest}
                            placeholder={placeholder}
                            value={value ? new Date(value) : null}
                            classNames={{
                                input: `bg-white text-sm mb-2 h-14 placeholder:text-gray-400 placeholder:font-normal transition-all ${
                                    fieldState.error && fieldState.error.message
                                        ? "border border-red-400"
                                        : ""
                                }`,
                            }}
                        />

                        {fieldState.error && fieldState.error?.message && (
                            <p
                                className="text-red-400 text-base mt-4"
                                aria-label="error message"
                            >
                                {fieldState.error?.message}
                            </p>
                        )}
                    </div>
                )}
                name={fieldName}
            />
        </div>
    )
}

export default function FormControl(props: IFormInputProps) {
    const { variant, options = [], ...otherProps } = props

    switch (variant) {
        case "input":
            return <TextInput {...otherProps} />
        case "select":
            return <SelectInput {...otherProps} options={options} />
        case "image":
            return <FileInput {...otherProps} />
        case "DatePicker":
            return <DatePicker {...otherProps} />

        default:
            return null
    }
}
export { FormControl }
