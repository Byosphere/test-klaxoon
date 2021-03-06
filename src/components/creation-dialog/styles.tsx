import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

export const useStyles = makeStyles({
    dialogContent: {
        padding: theme.spacing(1)
    },
    root: {
        maxWidth: '1000px',
        width: '100%'
    }
});