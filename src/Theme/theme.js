import {createMuiTheme} from '@material-ui/core/styles';
const background = "#f5f5f5";
const theme = createMuiTheme({
    typography : {
        useNextVariants: true
    },
    palette : {
        primary : {
            main : '#157FD4'
        },
        secondary : {
            main : '#7fd515'
        },
        common : {
            white : '#ffffff'
        },
        
        background : {
            default : background
        }
    },
    spacing : 10    
});
export default theme;