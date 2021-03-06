import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Bookmark } from '../../models/bookmark';
import { useStyles } from './styles';

interface Props {
    bookmark?: Bookmark;
    onClose: (newBookmark?: Bookmark) => void;
}

export default function EditionDialog({ bookmark, onClose }: Props) {

    const classes = useStyles();
    const input = useRef<HTMLInputElement>();
    const { t } = useTranslation();

    function handleClose() {
        onClose();
    }

    function handleSave() {
        if (bookmark) onClose({ ...bookmark, desc: input.current?.value || '' });
    }

    return (
        <Dialog open={!!bookmark} onClose={handleClose} classes={{ paper: classes.root }}>
            <DialogTitle>{t('edittitle')} <i>{bookmark?.title}</i></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('editinfo')}
                </DialogContentText>
                <TextField
                    inputRef={input}
                    label="Tags"
                    multiline
                    rows={4}
                    defaultValue={bookmark?.desc}
                    variant="outlined"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    {t('cancel')}
                </Button>
                <Button onClick={handleSave} color="primary">
                    {t('save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
