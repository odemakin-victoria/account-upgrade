
export type IFormInputProps = {
  variant: 'input' | 'textarea' | 'select'|'image'|'DatePicker'|'AgeDatePicker';
  fieldName: string,
  removeImage?:(args:string)=>void

  options?: {
    label: string;
    value: string;
  }[];
} & React.HTMLProps<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
