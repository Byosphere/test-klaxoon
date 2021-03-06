export interface Bookmark {
    id: number;
    url: string;
    title: string;
    author: string;
    desc?: string;
    addedDate: Date;
    width?: number;
    height?: number;
    duration?: number;
    type?: 'photo' | 'video'
}