let options;
const domain = process.env.DOMAIN || 'testing.com';

if (process.env.PRODUCTION) {
    options = {
        origin: (origin, callback) => {
            if (origin.endsWith(domain)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    }
} else {
    options = {
        origin: [`https://1.front.${ domain }:1025`, `https://2.front.${ domain }:1025`, `https://auth.${ domain }:1025`],
        credentials: true
    }
}

module.exports = options;