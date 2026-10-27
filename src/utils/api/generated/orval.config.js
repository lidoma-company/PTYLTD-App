module.exports = {
    endpoints: {
        input: {
            target: './api.yaml',
        },
        output: {
            mode: 'split',
            target: './endpoints.ts',
            client: 'react-query',
            baseUrl: 'https://petstore.swagger.io/v2',
            mock: true,
        },
    },
};
