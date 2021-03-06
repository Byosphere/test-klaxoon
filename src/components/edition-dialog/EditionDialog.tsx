import { Dialog } from '@material-ui/core';
import { Bookmark } from '../../models/bookmark';
import { useStyles } from './styles';

interface Props {
    bookmark?: Bookmark;
    onClose: (newBookmark?: Bookmark) => void;
}

export default function EditionDialog({ bookmark, onClose }: Props) {

    const classes = useStyles();

    function handleClose() {

    }
    if (!!bookmark) return (
        <Dialog open={true} onClose={handleClose} classes={{ paper: classes.root }}>

        </Dialog>
    );
    else return <div />;
}
