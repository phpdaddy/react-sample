import {createMuiTheme} from "material-ui"

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ff64d9',
            main: '#ffafdb',
            dark: '#bd2ec7',
            contrastText: '#000000',
        },
        secondary: {
            light: '#ff523c',
            main: '#d40511',
            dark: '#9a0000',
            contrastText: '#ffffff',
        },
    },
    status: {
        danger: 'orange',
    },
})

export default theme