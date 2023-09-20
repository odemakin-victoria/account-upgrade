// types.ts
export interface ICheckboxInputProps {
 label: string;
 checked: boolean;
 onChange: (checked: boolean) => void | undefined;
 className?: string; // Add className prop
 fieldName: string; // Include the name prop

}