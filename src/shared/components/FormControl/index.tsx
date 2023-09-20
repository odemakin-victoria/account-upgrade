import ImageUpload from "@/pages/Form/components/image-upload"
import { Input, Select,  } from "@/shared/components"
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


// function CheckboxInput({
//     checked,
//     className,
//     fieldName,
//     label, // Include the label prop
//     onChange, // Include the onChange prop
//     ...props
// }: Omit<IFormInputProps, "onChange" | "onBlur" | "variant"> & {
//     label: string;
//     //onChange: (isChecked: boolean) => void;
//     onChange : any;
// }) {
//     const { control } = useFormContext();
  
//     return (
//       <div style={{ flex: 1 }}>
//         <Controller
//           control={control}
//           render={({ field: { value, ...fieldProps }, fieldState }) => (
//             <div className="flex flex-col">
//               <Checkbox
//                 fieldName={fieldName} // Pass the fieldName
//                 {...props}
//                 {...fieldProps}
//                 checked={value}
//                 label={label} // Pass the label
//                 onChange={(isChecked: boolean) => {
//                   fieldProps.onChange(isChecked);
//                   onChange(isChecked);
//                 }}
//                 className={`text-sm mb-2 h-14 placeholder:text-gray-400 placeholder:font-normal transition-all ${className || ''} ${fieldState.error && fieldState.error.message
//                   ? 'border border-red-400'
//                   : ''}`} />
  
//               {fieldState.error && fieldState.error.message && (
//                 <p className="text-red-400 text-base" aria-label="error message">
//                   {fieldState.error.message}
//                 </p>
//               )}
//             </div>
//           )}
//           name={fieldName}
//         />
//       </div>
//     );
//   }






  
function AgeDatePicker({
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



function DatePicker({
    fieldName,
    placeholder,
}: Omit<IFormInputProps, "onBlur" | "variant">) {
    const { control } = useFormContext()

    const isAgeAboveThirteen = (dateString: string | number | Date) => {
        // Calculate the age based on the provided date string
        const dateOfBirth = new Date(dateString)
        const today = new Date()
        const age = today.getFullYear() - dateOfBirth.getFullYear()
        const monthDiff = today.getMonth() - dateOfBirth.getMonth()
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
        ) {
            return age - 1
        }
        return age
    }

    return (
        <div style={{ flex: 1 }}>
            <Controller
                control={control}
                render={({ field: { value, ...rest }, fieldState }) => {
                    const age = value ? isAgeAboveThirteen(value) : null
                    const errorMessage =
                        age !== null && age < 13
                            ? "Next of kin must be 13 years and above"
                            : null

                    return (
                        <div className="flex flex-col">
                            <DatePickerInput
                                allowDeselect
                                {...rest}
                                placeholder={placeholder}
                                value={value ? new Date(value) : null}
                                classNames={{
                                    input: `bg-white text-sm mb-2 h-14 placeholder:text-gray-400 placeholder:font-normal transition-all ${
                                        fieldState.error &&
                                        fieldState.error.message
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

                            {errorMessage && (
                                <p
                                    className="text-red-400 text-base mt-4"
                                    aria-label="error message"
                                >
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                    )
                }}
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
        case "AgeDatePicker":
            return <AgeDatePicker {...otherProps} />

        default:
            return null
    }
}

export { FormControl }
