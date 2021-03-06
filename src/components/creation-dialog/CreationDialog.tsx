import { Button, Dialog, InputAdornment, TextField } from '@material-ui/core';
import { Bookmark } from '@material-ui/icons';
import Axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CORS_BRIDGE, FLICKR_PATH, VIMEO_PATH } from '../../constants';
import BookmarksContext from '../../contextes/BookmarksContext';
import { useStyles } from './styles';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreationDialog({ open, onClose }: Props) {

    const classes = useStyles();
    const input = useRef<HTMLInputElement>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { addElement } = useContext(BookmarksContext);
    const { t } = useTranslation();

    async function handleAdd() {
        const value = input.current?.value;
        let oEmbedUrl = '';
        setError('');
        if (value) {
            if (value.search('vimeo') > -1) oEmbedUrl = VIMEO_PATH;
            if (value.search('flickr') > -1) oEmbedUrl = FLICKR_PATH;
            if (oEmbedUrl) {
                setLoading(true);
                const result = await Axios.get(CORS_BRIDGE + oEmbedUrl + value);
                if (result && result.data) {
                    addElement({
                        id: 0,
                        ...result.data,
                        author: result.data.author_name,
                        url: result.data.type === 'video' ? result.data.provider_url.slice(0, -1) + result.data.uri : result.data.url
                    });
                } else {
                    setError(t("errorapi"));
                }
                setLoading(false);
            } else {
                setError(t('errorlink'));
            }
        }
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.root }}>
            <div className={classes.dialogContent}>
                <TextField
                    inputRef={input}
                    autoFocus
                    margin='none'
                    label={t('link')}
                    type="text"
                    fullWidth
                    variant='outlined'
                    placeholder={t('createplaceholder')}
                    disabled={loading}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Bookmark /></InputAdornment>,
                        endAdornment: <InputAdornment position="end"><Button color='primary' disabled={loading} onClick={handleAdd}>{t('add')}</Button></InputAdornment>
                    }}
                    error={!!error}
                    helperText={error}
                />
            </div>
        </Dialog>
    );
}

