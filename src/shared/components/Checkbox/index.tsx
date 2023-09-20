// Checkbox.js

import { ICheckboxInputProps } from "./types";

export default function Checkbox({ label, checked, onChange }: ICheckboxInputProps) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox text-indigo-600 h-6 w-6"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
