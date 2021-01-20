/**
 * @file Encargado de verificación de CORS.
 * 
 * En caso de estar en modo producción, se verifica que la dirección de origen
 * sea un subdominio de domain, En caso de no estar en modo produccion, se
 * verifica que la dirección de orige sea un subdominio de domain y que se
 * esté ejecutándose en los puertos indicados
 * @author Alan Barahona
 */

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
        origin: [`https://1.front.${ domain }:1025`, `https://2.front.${ domain }:1025`, `https://auth.${ domain }:1025`],
        credentials: true
    }
}

module.exports = options;