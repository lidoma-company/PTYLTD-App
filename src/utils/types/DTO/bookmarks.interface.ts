import { Blog } from './blogs.interface';

export interface AddBookmarkReq {
    blog_id: number;
}

export interface BookmarksList {
    blog: Blog;
}
