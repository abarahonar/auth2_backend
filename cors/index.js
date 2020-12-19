let options;
if (process.env.PRODUCTION) {
    options = {
        origin: (origin, callback) => {
            if (origin.endsWith('testing.com:1024')) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    }
} else {
    options = {
        origin: ['https://1.front.testing.com:1024', 'https://2.front.testing.com:1025', 'https://auth.testing.com:1024'],
        credentials: true
    }
}

module.exports = options;