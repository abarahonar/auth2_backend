let options;
const domain = process.env.DOMAIN || 'testing.com';
const production = process.env.PRODUCTION || 'no';

if (production == 'yes') {
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
        origin: [`https://1.front.${ domain }:1024`, `https://2.front.${ domain }:1024`, `https://auth.${ domain }:1024`],
        credentials: true
    }
}

module.exports = options;