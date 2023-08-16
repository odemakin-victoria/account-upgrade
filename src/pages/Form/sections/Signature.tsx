import { Label } from "@/shared/components";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import ImageUpload from "../components/image-upload";

export function SignatureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const { setValue, watch } = useFormContext();

  function handleMouseDown(e: React.MouseEvent) {
    setIsDrawing(true);
    handleClear();
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (isDrawing) {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
      setLastX(e.nativeEvent.offsetX);
      setLastY(e.nativeEvent.offsetY);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    // increase pixel density for sharper signature
    const dpi = window.devicePixelRatio;
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    canvas.width = canvasWidth * dpi;
    canvas.height = canvasHeight * dpi;
    ctx.scale(dpi, dpi);
  }, []);

  function handleMouseUp() {
    setIsDrawing(false);
    handleSave();
  }

  function handleClear() {
    removeImage("signature");
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleSave() {
    const canvas = canvasRef.current;
    canvas?.toBlob(
      (blob: Blob | null) => {
        const pdfFile = new File(
          [(blob as unknown) as Blob],
          `${"signature"}.jpg`,
          {
            type: "image/jpg",
          }
        );
        // Use the PDF file

        setValue("signature", {
          name: "signature.jpg",
          file: pdfFile,
        });
      },
      "image/jpg",
      1
    );
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files;
      setValue("signature", {
        name: "signature.jpg",
        file: file[0],
      });
    }
  };

  function removeImage(fieldName: string) {
    setValue(fieldName, null);
  }
  return (
    <div className="mb-10">
      <Label labelName="Signature" required>Signature</Label>
      <div className="border border-dashed border-x-gray-100  bg-gray-50 p-4">
        <canvas
          className="bg-white"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          id="Signature"
          style={{ width: "100%", height: "300px" }}
        />

        {!watch("signature") && (
          <div className="flex lg:items-center lg:justify-between my-2 flex-col md:flex-row">
            <button
              onClick={handleClear}
              className="bg-gray-100 p-2 rounded hover:bg-gray-200"
            >
              Clear signature
            </button>
            <p className="my-4">
              Unable to sign?{" "}
              <label
                htmlFor="signature"
                className="text-blue-400 inline-block cursor-pointer"
              >
                Click here to Upload a signature
              </label>
            </p>
          </div>
        )}

        {watch("signature") ? (
          <div
            className="bg-blue-200 w-fit border border-blue-300 items-center inline-flex mt-6"
            aria-label="upload-files"
          >
            <span className="inline-flex px-3" aria-label="uploaded-image-name">
              {watch("signature").name}
            </span>
            <button
              className="p-4 bg-white inline-flex h-full justify-center items-center"
              onClick={() => removeImage("signature")}
            >
              <FiTrash2 className="text-red-400" />
            </button>
          </div>
        ) : null}

        {
          <div className="hidden">
            <ImageUpload name="signature" handleChange={onChange} />
          </div>
        }
      </div>
    </div>
  );
}

export default SignatureCanvas;
