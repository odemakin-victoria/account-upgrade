/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Sequel sans", "system-ui"],
        },
        extend: {
            colors: {
                blue: {
                    100: "#F7F8FC",
                    150: "#DCE8FF",
                    200: "#CCDDFF",
                    300: "#6699FF",
                    400: "#0055FF",
                    500: "#243E90",
                },
                "optimus-green": "#7CE5A8",

                text: {
                    gray: "#272D37",
                },
                secondary: "#0DDE65",
            },
        },
    },
    plugins: [],
}
