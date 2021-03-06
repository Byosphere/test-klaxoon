import { Accordion, AccordionDetails, AccordionSummary, Typography, AccordionActions, Button, Divider, Chip } from '@material-ui/core';
import { ExpandMore, InsertPhoto, VideoLibrary } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditionDialog from '../../components/edition-dialog/EditionDialog';
import { MAX_ITEM_PER_PAGE } from '../../constants';
import BookmarksContext from '../../contextes/BookmarksContext';
import { Bookmark } from '../../models/bookmark';
import { useStyles } from './styles';

export default function Main() {

    const classes = useStyles();
    const { bookmarksList, removeElement, updateTags } = useContext(BookmarksContext);
    const [editingBookmark, setEditingBookmark] = useState<Bookmark | undefined>();
    const [page, setPage] = useState<number>(0);
    const { t } = useTranslation();

    function handlePageChange(event: React.ChangeEvent<unknown>, page: number) {
        setPage(page);
    }

    function handleEdit(bookmark: Bookmark) {
        return () => {
            setEditingBookmark(bookmark);
        }
    }

    function handleDelete(id: number) {
        return () => {
            removeElement(id);
        }
    }

    function handleSave(bookmark?: Bookmark) {
        if (bookmark) {
            updateTags(bookmark.id, bookmark.desc || '');
            setEditingBookmark(undefined);
        } else {
            setEditingBookmark(undefined);
        }
    }

    return (
        <div className={classes.page}>
            {bookmarksList.slice((page - 1) * MAX_ITEM_PER_PAGE).slice(0, MAX_ITEM_PER_PAGE).map((bookmark: Bookmark, key: number) => (
                <Accordion key={key}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        {bookmark.type === 'photo' && <InsertPhoto color='primary' />}
                        {bookmark.type === 'video' && <VideoLibrary color='primary' />}
                        <Typography className={classes.bookmarkName}>{bookmark.title} - </Typography>
                        <Typography className={classes.url}>{bookmark.url}</Typography>
                        <Typography className={classes.author}>{bookmark.author}</Typography>
                    </AccordionSummary>
                    <Typography className={classes.date} component='div' variant='caption'>{bookmark.addedDate.toLocaleString()}</Typography>
                    <a className={classes.link} href={bookmark.url}>{bookmark.url}</a>
                    {bookmark.desc && <Typography component='div' className={classes.tagList}>
                        <b>{t('tags')} :</b> {bookmark.desc?.split(',').map((s, k) => <Chip key={k} label={s.trim()} className={classes.chip} />)}
                        </Typography>}
                    <AccordionDetails className={classes.details}>
                        <Typography><b>{t('largeur')} :</b> {bookmark.width}px</Typography>
                        <Typography><b>{t('hauteur')} :</b> {bookmark.height}px</Typography>
                        {bookmark.type === 'video' && <Typography><b>{t('duree')} :</b> {bookmark.duration}s</Typography>}
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                        <Button size="small" onClick={handleEdit(bookmark)}>{t('edit')}</Button>
                        <Button size="small" onClick={handleDelete(bookmark.id)} color="primary">{t('delete')}</Button>
                    </AccordionActions>
                </Accordion>
            ))}
            <footer className={classes.footer}>
                <Pagination
                    disabled={bookmarksList.length <= MAX_ITEM_PER_PAGE}
                    onChange={handlePageChange}
                    page={page}
                    count={Math.ceil(bookmarksList.length / MAX_ITEM_PER_PAGE)}
                    color="primary"
                />
            </footer>
            <EditionDialog bookmark={editingBookmark} onClose={handleSave} />
        </div>
    );
}
