import { faker } from '@faker-js/faker';
import { baseURL } from '@/utils/constants/global';
import { http, HttpResponse } from 'msw';

const url = `${baseURL}/posts`;
export type Post = {
    id: string;
    title: string;
    likes: number;
};
export let posts: Post[] = [
    {
        id: String(faker.number.int(100)),
        title: faker.string.alpha(10),
        likes: faker.number.int(100),
    },
    {
        id: String(faker.number.int(100)),
        title: faker.string.alpha(10),
        likes: faker.number.int(100),
    },
];

export const postHandlers = [
    http.get(url, async () => {
        return HttpResponse.json(posts);
    }),
    http.post(url, async ({ request }) => {
        const newPost = (await request.json()) as Post;
        newPost.id = Date.now().toString();
        posts.push(newPost);
        return HttpResponse.json(newPost, { status: 201 });
    }),
    http.put(`${url}/:id`, async ({ params, request }) => {
        const { id } = params;
        const updatedPost = (await request.json()) as Post;
        const index = posts.findIndex((post) => post.id === id);
        posts[index] = updatedPost;
        return HttpResponse.json(updatedPost, { status: 200 });
    }),
    http.delete(`${url}/:id`, async ({ params }) => {
        const { id } = params;
        posts = posts.filter((post) => post.id !== id);
        return HttpResponse.json(null, { status: 200 });
    }),
];
