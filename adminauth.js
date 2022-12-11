var dal = require('./dal.js');
var admin = require("firebase-admin");
var serviceAccount = require("./bankapp-mern-firebase-adminsdk-o8i7c-aa614c92cf.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authMiddleware = async (req, res, next) => {
    try {
        // read token from header
        const idToken = req.headers.authorization;
        if (!idToken) throw new Error('You must send an Authorization header');
        console.log('idToken:', idToken);

        // verify token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('decodedToken:', decodedToken);

        next();
    } catch (error) {
        next(error.message)
    }
}

const adminAuthMiddleware = async (req, res, next) => {
    try {
        // read token from header
        const idToken = req.headers.authorization;
        if (!idToken) throw new Error('You must send an Authorization header');
        console.log('idToken:', idToken);

        // verify token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('decodedToken:', decodedToken);

        const verifyRole = await dal.verifyRole(decodedToken.email, "admin");
        if (!verifyRole) throw new Error("You have no authorization of admin.");

        next();
    } catch (error) {
        next(error.message)
    }
}

const customerAuthMiddleware = async (req, res, next) => {
    try {
        // read token from header
        const idToken = req.headers.authorization;
        if (!idToken) throw new Error('You must send an Authorization header');
        console.log('idToken:', idToken);

        // verify token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('decodedToken:', decodedToken);

        const verifyRole = await dal.verifyRole(decodedToken.email, "customer");
        if (!verifyRole) throw new Error("You have no authorization of customer.");

        next();
    } catch (error) {
        next(error.message)
    }
}

module.exports = {authMiddleware, adminAuthMiddleware, customerAuthMiddleware}