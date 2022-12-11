const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// const customerAuthMiddleware = require('./customerauth');
const auth = require('./adminauth');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/role/verify/:email/:role', auth.authMiddleware, (req, res) => {
    dal.verifyRole(req.params.email, req.params.role)
    .then((result) => {
        console.log('Verify role ' + result);
        res.send(result);
    })
});

app.get('/account/create/:name/:email/:password/:role', auth.adminAuthMiddleware, (req, res) => {
    dal.create(req.params.name, req.params.email, req.params.password, req.params.role)
    .then((user) => {
        console.log('create sucessfully');
        res.send(user);
    })
});

app.get('/account/find/:email', auth.authMiddleware, (req, res) => {
    dal.find(req.params.email)
    .then((user) => {
        console.log('Find account sucessfully');
        res.send(user);
    })
});

app.get('/account/update/balance/:email/:balance', auth.customerAuthMiddleware, (req, res) => {
    dal.updateBalance(req.params.email, req.params.balance)
    .then((result) => {
        console.log('Update balance sucessfully');
        res.send(result);
    })
});

app.get('/account/all', auth.adminAuthMiddleware, (req, res) => {
    dal.all()
    .then((users) => {
        console.log('Get all successfully');
        res.send(users);
    })
});

const port = 3001;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});