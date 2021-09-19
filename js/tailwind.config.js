const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit",
    // important: true,
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#313638",
                orange: "#F75E2F",
                "orange-light": "#fc754d",
            },
            fontSize: {
                title: "15rem",
            },
            fontFamily: {
                sans: [
                    "Monserrat",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "Noto Sans",
                    "sans-serif",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                    "Segoe UI Symbol",
                    "Noto Color Emoji",
                ],
                comic: [
                    "Anton",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "Noto Sans",
                    "sans-serif",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                    "Segoe UI Symbol",
                    "Noto Color Emoji",
                ],
            },
            typography: {
                DEFAULT: {
                    css: {},
                },
            },
        },
    },
    variants: {
        extend: {
            borderStyle: ["responsive", "hover"],
            borderWidth: ["responsive", "hover"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
