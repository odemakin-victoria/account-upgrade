import { useEffect } from "react"

export default function DocumentDownload({
    name,
    link,
}: {
    name: string
    link: string
}) {
    const init = () => {
        const img = new Image()

        if (!link) {
            return
        }
        img.src = link

        img.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext("2d")
            ctx?.drawImage(img, 0, 0)
            canvas.toBlob(
                (blob: Blob | null) => {
                    const pdfFile = new File(
                        [blob as unknown as Blob],
                        `${name}.pdf`,
                        {
                            type: "application/pdf",
                        }
                    )

                    const pdfURL = URL.createObjectURL(pdfFile)
                    URL.revokeObjectURL(pdfURL)
                    // Use the PDF file
                },
                "application/pdf",
                1
            )
        }
    }
    useEffect(() => {
        init()
    }, [link])

    return (
        <a
            href={link}
            download={`${name}`}
            target="_blank"
            rel="noopener"
            className="flex items-center bg-blue-200 p-4 rounded-md justify-center border border-blue-300"
        >
            <span className="mr-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="none"
                    viewBox="0 0 19 19"
                >
                    <path
                        fill="#243E90"
                        d="M13.175 7.75h-1.258V3.792A.794.794 0 0 0 11.125 3H7.958a.794.794 0 0 0-.791.792V7.75h-1.26c-.704 0-1.06.855-.561 1.354l3.634 3.634a.788.788 0 0 0 1.116 0l3.634-3.634c.498-.499.15-1.354-.555-1.354ZM4 15.667c0 .435.356.791.792.791h9.5a.794.794 0 0 0 .791-.791.794.794 0 0 0-.791-.792h-9.5a.794.794 0 0 0-.792.792Z"
                    />
                </svg>
            </span>
            <span>{name}</span>
        </a>
    )
}
