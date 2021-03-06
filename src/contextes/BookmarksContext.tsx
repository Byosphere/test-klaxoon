import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { Bookmark } from '../models/bookmark';

interface BookmarksContextProps {
    bookmarksList: Bookmark[];
    addElement: (el: Bookmark) => void;
    removeElement: (id: number) => void;
    updateTags: (id: number, tags: string) => void;
}

const BookmarksContext = createContext<BookmarksContextProps>({
    bookmarksList: [],
    addElement: () => undefined,
    removeElement: () => undefined,
    updateTags: () => undefined
});

interface Props {
    children: ReactNode;
}

export function BookmarksContextProvider({ children }: Props) {

    const [bookmarksList, setBookmarksList] = useState<Bookmark[]>([{
        id: 1,
        author: 'fdfsdf',
        title: 'frdqsfsd',
        url: 'http://fdsfsdfsf.dfds',
        addedDate: new Date(),
        desc: 'qsd qs, dqs dsq, dsq ds,dsqd ,dqsd',
        type: 'photo'
    }]);

    const addElement = useCallback((el: Bookmark) => {
        let newId = bookmarksList.reduce((max, el) => (el.id > max ? el.id : max), bookmarksList[0]?.id || 0);
        setBookmarksList([
            ...bookmarksList,
            {
                ...el,
                id: newId+1,
                addedDate: new Date()
            }
        ]);
    }, [bookmarksList]);

    const removeElement = useCallback((id: number) => {
        setBookmarksList([...bookmarksList.filter((el) => el.id !== id)]);
    }, [bookmarksList]);

    const updateTags = useCallback((id: number, tags: string) => {
        let editedElement = bookmarksList.find((b) => b.id === id);
        if (editedElement) {
            editedElement.desc = tags;
        }
        setBookmarksList([...bookmarksList]);
    }, [bookmarksList]);

    return (
        <BookmarksContext.Provider value={{ bookmarksList, addElement, removeElement, updateTags }}>
            {children}
        </BookmarksContext.Provider>
    )
}

export default BookmarksContext;