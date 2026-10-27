 export const getEmbedUrl = (url: string) => {
        if (!url) return '';
        const videoId = url.split('/').pop()?.split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    };
