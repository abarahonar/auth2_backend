# Auth^2 backend
In order to work, a ssl certificate and key must be in the `src/assets` folder, . The key must be named `server.key` and the certificate `server.cert`. In order to coonect to firebase, a service account file named `key.json` must be placed in the same folder.

The program can be configured through the following environmental variables:
* `DOMAIN`, if not given, it'll default to `testing.com`.
* `PORT`, if not given, it'll default to `3000`.
* `PRODUCTION`

In order to make the cookie aspect of the program work as intended, both the backend and the frontend must be accessible through the specified domain or a sub domain of it. The cookie is available through https connections only, it's not accessible through Javascript, last for 5 days .

If the `PRODUCTION` variable exists and is not empty, the frontend is spected to be run on the default https port (`443`), otherwise the port must be `1024`.

By default the server runs on the port `3000`, but this can be changed using the environmental variable `PORT`.
