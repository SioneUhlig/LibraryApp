require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'localhost'
const isDevelopment = process.env.ENV === 'development';
const schema = isDevelopment ? 'http' : 'https';
const host = isDevelopment ? `${domain}:${port}` : `${domain}`;

console.log('ENV:', process.env.ENV, '| isDevelopment:', isDevelopment);
const doc = {
    info: {
        title: 'Library API',
        description: 'This API is a ...'
    },
    host: host,
    schemes: [schema],
    definitions: {
        // TODO: Create our own definitions
        // CreateUpdateBurialRecord: {
        //     $firstName: 'Margaret',
        //     $lastName: 'Thatcher',
        //     dateOfBirth: '1928-04-15',
        //     $dateOfDeath: '2023-11-02',
        //     intermentDate: '2023-11-08',
        //     $cemeteryName: 'Rosewood Cemetery',
        //     $section: 'Heritage Row',
        //     $block: 'C',
        //     lotNumber: 154,
        //     graveNumber: 4,
        //     lat: 1.123,
        //     lng: -1.232
        // },
    }
}

const outputFile = './swagger.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen(outputFile, routes, doc);