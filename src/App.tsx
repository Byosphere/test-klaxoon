import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Bookmarks } from '@material-ui/icons';
import { useStyles } from './styles';
import Main from './pages/main/Main';
import { useTranslation } from 'react-i18next';
import CreationDialog from './components/creation-dialog/CreationDialog';

function App() {

    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();
    const { t } = useTranslation();

    function handleClose() {
        setOpen(false);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Bookmarks />
                    <Typography variant="h6" className={classes.title}>
                        {t('maintitle')}
                    </Typography>
                    <Button color="inherit" onClick={() => setOpen(true)}>{t('addlink')}</Button>
                </Toolbar>
            </AppBar>
            <Main />
            <CreationDialog open={open} onClose={handleClose} />
        </div>
    );
}

export default App;
