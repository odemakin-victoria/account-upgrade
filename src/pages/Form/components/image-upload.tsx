import { Label } from "@/shared/components";
import React, { useState } from "react";

export default function ImageUpload({
  multiple,
  name = "image-upload",
  handleChange,
  accept,
  onBlur,
}: {
  multiple?: boolean;
  accept?: string;
  name?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];
      const invalidFiles = Array.from(selectedFiles).filter(
        (file) =>
          !allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      );

      if (invalidFiles.length > 0) {
        setError("File must be either .pdf, .jpg, .jpeg, or .png.");
      } else {
        setError(null);
        handleChange(e); // Pass the event to the parent component
      }
    }
  };

  return (
    <div className="w-full border border-dashed border-gray-800">
      <Label
        labelName={name}
        className="bg-gray-100 p-4 border border-dashed w-full cursor-pointer inline-block text-center"
      >
        Choose File{multiple && "(s)"}
      </Label>
      <input
        type="file"
        id={name}
        className="hidden"
        multiple={multiple}
        accept={accept}
        name={name}
        onChange={handleFileChange}
        onBlur={onBlur}
      />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
