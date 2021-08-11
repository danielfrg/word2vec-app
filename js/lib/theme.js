import { createTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createTheme({
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    palette: {
        background: {
            default: "#fc5726",
        },
        text: {
            primary: "#313638",
        },
    },
});

export default theme;
