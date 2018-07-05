module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/vue-spotify/'
        : '/',

    devServer: {
        port: 8080
    },
};
