# Auth^2 backend
In order to work, a ssl certificate and key must be in the `src/assets` folder, . The key must be named `server.key` and the certificate `server.cert`. In order to coonect to firebase, a service account file named `key.json` must be placed in the same folder.

The cookie functionality expects the backend to run on `name.testing.com`, where `name` can be anything. In order to test it with a frontend, the frontend needs to be on `name.testing.com:xxxx`, where `name` can be anything and the port must be `1024` or `1025`. If the PRODUCTION environmental variable is set anything, the port must `443` or `80`.

By default the server runs on the port `3000`, but this can be changed using the environmental variable `PORT`.
