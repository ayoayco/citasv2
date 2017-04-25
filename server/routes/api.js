const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Page = require('../models/pages.js');
const bcrypt = require('bcrypt-nodejs');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api workzzz');
});


// page CREATE
router.post('/pages/add', function(request, response) {
    var page = new Page({
        title: request.body.title,
        url: request.body.url,
        content: request.body.content,
        menuIndex: request.body.menuIndex,
        date: new Date(Date.now())
    });

    page.save(function(err) {
        if (!err) {
            return response.send(200, page);

        } else {
            return response.send(500, err);
        }
    });
});

// page READ
router.get('/pages', function(request, response) {

    return Page.find(function(err, pages) {
        if (!err) {
            return response.send(pages);
        } else {
            return response.send(500, err);
        }
    });
});

// page UPDATE
router.post('/pages/update', function(request, response) {
    var id = request.body._id;

    Page.update({
        _id: id
    }, {
        $set: {
            title: request.body.title,
            url: request.body.url,
            content: request.body.content,
            menuIndex: request.body.menuIndex,
            date: new Date(Date.now())
        }
    }).exec();
    response.send("Page updated");
});

// page DELETE
router.get('/pages/delete/:id', function(request, response) {
    var id = request.params.id;
    Page.remove({
        _id: id
    }, function(err) {
        return console.log(err);
    });
    return response.send('Page id- ' + id + ' has been deleted');
});

// page public VIEW
router.get('/pages/:id', function(request, response) {
    var id = request.params.id;
    Page.findOne({
        _id: id
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});
// page public VIEW
router.get('/pages/:url', function(request, response) {
    var url = request.params.url;
    Page.findOne({
        url: url
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});

// user add
router.post('/users/add', function(request, response) {
    var salt, hash, password;
    password = request.body.password;
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);

    var user = new User({
        username: request.body.username,
        password: hash
    });
    user.save(function(err) {
        if (!err) {
            return response.send('Admin User successfully created');

        } else {
            return response.send(err);
        }
    });
});

// user list
// to do: don't return passwords
router.get('/users', function(request, response) {
    return User.find(function(err, data) {
        if (!err) {
            return response.send(200, data);
        } else {
            return response.send(500, err);
        }
    });
});

// user login
router.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;

    adminUser.findOne({
        username: username
    }, function(err, data) {
        if (err | data === null) {
            return response.send(401, "User Doesn't exist");
        } else {
            var usr = data;

            if (username == usr.username && bcrypt.compareSync(password, usr.password)) {

                request.session.regenerate(function() {
                    request.session.user = username;
                    return response.send(username);
                });
            } else {
                return response.send(401, "Invalid Username or Password");
            }
        }
    });
});

// user logout
router.get('/logout', function(request, response) {
    request.session.destroy(function() {
        return response.send(401, 'User logged out');

    });
});


module.exports = router;