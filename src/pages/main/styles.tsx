import { makeStyles } from "@material-ui/core";
import theme from "../../theme";

const PAGE_WIDTH = 1100

export const useStyles = makeStyles({
    page: {
        maxWidth: PAGE_WIDTH,
        width: '100%',
        height: '100%',
        margin: '8px auto'
    },
    bookmarkName: {
        marginLeft: theme.spacing(1)
    },
    date: {
        marginLeft: theme.spacing(2)
    },
    url: {
        opacity: 0.6,
        marginLeft: theme.spacing(0.5),
        flexGrow: 1
    },
    author: {
        marginRight: theme.spacing(2)
    },
    link: {
        marginLeft: theme.spacing(2)
    },
    footer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
    },
    chip: {
        marginLeft: theme.spacing(1)
    },
    tagList: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    details: {
        flexDirection: 'column'
    }
});