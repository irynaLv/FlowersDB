var Document = require('../models/document'),
    User = require('../models/user'),
    Product = require('../models/products'),
    Shop = require('../models/shop'),
    Goods = require('../models/goods');

module.exports = function (app, passport) {
    app.get('/api/products', function(req, res) {
        var query = Product.find({});
        query.exec(function (err, doc) {
            res.json(doc);
        });
    });



    app.get('/api/shops', function(req, res) {
        var query = Shop.find({});
        query.exec(function (err, doc) {
            res.json(doc);
        });
    });

    app.get('/api/documents', function(req, res) {
        var query = Document.find({});
        query.exec(function (err, doc) {
            res.json(doc);
        });
    });

    app.get('/api/document/:id', function(req, res) {
        Document.findById(req.params.id, function (err, doc) {
            if (!err && doc) {
                res.json(doc);
            } else {
                res.status(404);
                res.send();
            }
        });
    });
    app.post('/api/document', function(req, res) {
        var body = req.body,
            obj = {
                title: body.title || 'No title',
                owner: body.owner || 'No owner',
                accessLayer: body.accessLayer || 0,
                description: body.description || 'No description',
                fileName: body.fileName || 'Test.txt',
                uploadDate: new Date(),
                updateDate: new Date(),
                tags: body.tags || ['doc'],
                type: body.type || 'doc'
            },
            doc = new Document(obj);
        doc.save(function (err, doc) {
            if (!err && doc) {
                res.json(doc);
            } else {
                res.status(404);
                res.send();
            }
        });
    });

    app.post('/api/newgoods', function(req, res) {
        var length = parseInt(req.body.quantity);
        for(var i=0; i<length; i++){
            var body = req.body,
                obj = {
                    shopId: body.shopId,
                    productId: body.productId,
                    price: body.price,
                    status: body.status,
                    incomeDate: new Date()
                };
                var doc = new Goods(obj);
            doc.save(function (err, doc) {
                if (!err && doc) {
                    res.json(doc);
                } else {
                    res.status(404);
                    res.send();
                }
            });
        }


    });
    app.post('/api/document/:id', function(req, res) {
        Document.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
            if (!err && doc) {
                res.json(doc);
            } else {
                res.status(404);
                res.send();
            }
        });
    });

    app.post('/api/product', function(req, res) {
        var body = req.body,
            obj = {
                category: body.category || 'No category',
                subcategory: body.subcategory || 'No subcategory',
                name: body.name || null,
                type: body.type || null,
                description: body.description || null,
                photoId: null
            },
            doc = new Product(obj);
        doc.save(function (err, doc) {
            if (!err && doc) {
                res.json(doc);
            } else {
                res.status(404);
                res.send();
            }
        });
    });
    app.post('/api/product/:id', function(req, res) {
        Product.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
            if (!err && doc) {
                res.json(doc);
            } else {
                res.status(404);
                res.send();
            }
        });
    });

    app.get('/api/documents', function(req, res) {
        function escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        var query = Document.find({});
        query.select('-md5 -MIMEType -binaryFile');
        if (req.query.from) {
            query.where('uploadDate').gte(req.query.from - 0);
        }

        if (req.query.to) {
            query.where('uploadDate').lte(req.query.to - 0);
        }

        if (req.query.types) {
            query.where('type').in(req.query.types);
        }

        if (req.query.owner) {
            var str = escapeRegExp(req.query.owner),
                regex = new RegExp('.*' + str + '.*');
            query.where('owner').regex(regex);
        }

        if (req.query.fileName) {
            var str = escapeRegExp(req.query.fileName),
                regex = new RegExp('.*' + str + '.*');
            query.where('fileName').regex(regex);
        }

        query.exec(function (err, doc) {
            console.log(err);
            res.json(doc);
        });
    });

    app.delete('/api/document/:id', function(req, res) {
        Document.findByIdAndRemove(req.params.id, function () {
            res.send();
        });
    });

    app.get('/api/users', function(req, res) {
        var query = User.find({});
        query.exec(function (err, doc) {
            res.json(doc);
        });
    });

// normal routes ===============================================================

    // PROFILE SECTION =========================
    app.get('/api/profile', isLoggedIn, function (req, res) {
//        res.render('profile.ejs', {
//            user: req.user
//        });
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // process the login form
    app.post('/login', function(req, res, next){
        passport.authenticate('local-login', function (err, user, message) {
            if(!user){
                res.json({msg: message});
                return;
            }
            res.json(user);
        })(req, res, next);
    });




//        passport.authenticate('local-login'), function(err, user){
//        return user;
//    });

    // SIGNUP =================================

    // process the signup form
    app.post('/signup', function(req, res, next){
        passport.authenticate('local-signup', function(err, user){
            if(err){
                res.json(err);
            }
            res.json(user);
        })(req, res, next)
    });

    app.get('/users', function (req, res) {

    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}



