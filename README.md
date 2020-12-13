# Auth^2 backend
In order to work, a ssl certificate and key must be in the root of the project. The key must be named `server.key` and the certificate `server.cert`. 

The cookie functionality expects the backend to run on `name.testing.com`, where `name` can be anything. In order to test it with a front end, the fronend needs to be on `name.testing.com:1024`, where `name` can be anything and the port must be `1024`.