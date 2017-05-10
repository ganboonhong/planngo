"use strict";
const
Global          = require('../../src/components/Global'),
crypto          = require('crypto'),
User        = require('../mongo/models/user'),
cookieLife      = Global.cookieLife,

let Result = {success: false, msg: '', msgBsStyle: ''},
Body       = {};

module.exports = (app) => {

    app.post('/join', function(req, res){
        
        const Body = req.body;

        User.find({email: Body.email}, (err, user) => {

            if(!Object.keys(user).length) {

                Body.password = crypto.createHmac('sha256', Body.password).digest('hex');
                let user = new User(Body);

                user.save((err, user) => {
                    if(err) throw err;

                    res.cookie('email' , user.email, {expire : new Date() + cookieLife});
                    Result.success    = true;
                    Result.msg        = 'Congratulations, '+ user.name +' ! You\'ve signed up successfully.'
                    Result.msgBsStyle = 'success';
                    res.send(Result);
                })

            }else{
                Result.msg        = 'This email has been used.'
                Result.msgBsStyle = 'danger';
                Result.success    = false;
                res.send(Result);
            }
        })

    }); // eo post join

    app.post('/login', (req, res) => {

        const User = models.User;
        Body     = req.body;

        if(req.cookies.email){
            Result.msg = 'you\'ve already signed in.';
            Result.msgBsStyle = 'danger';
            res.send(Result);
        }else{

            User.findOne({where: {
                        email: Body.email,
                        password: crypto.createHmac('sha256', Body.password).digest('hex'),
                    }
                }
            ).then(
                (user) => {
                    if(user){
                        const tmpUser         = user.get({plain: true});
                        Result.msg          = 'Login successfully! Welcome back ' + tmpUser.name + '.';
                        Result.msgBsStyle   = 'success';
                        Result.success      = true;

                        res.cookie('email' , tmpUser.email, {expire : new Date() + cookieLife});
                        res.send(Result);
                    }else{
                        Result.msg        = 'Wrong email or password.'
                        Result.msgBsStyle = 'danger';
                        Result.success    = false;
                        res.send(Result);
                    }
                }
            );
        }
    }) // eo post login

    app.get('/logout', (req, res) => {
        res.cookie('email', '', {expires: new Date(0)});
        res.redirect('./login');
    })
}