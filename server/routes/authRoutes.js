import { validateSignupForm, validateLoginForm } from '../models/validation';
import User from '../models/user'; // load up the user model

let authRoutes = (app, passport) => {
    // =====================================
    // LOGIN ===============================
    // =====================================
    // process the login form
    app.post('/auth/signin', (req, res, next) => {
        const validationResult = validateLoginForm(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }
        return passport.authenticate('local-login', (err, token, userData) => {
            if (err) {
                if (err.name === 'ErrorCredentials') {
                    return res.status(400).json({
                        success: false,
                        message: {
                          style: err.style,
                          text: err.message,
                        },
                        errors:{}
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: {
                      style : 'danger',
                      text: 'Could not process the form.'
                    },
                    errors:{}
                });
            }
            return res.status(200).json({
                success: true,
                errors:{},
                message: {
                  style : 'success',
                  text: 'You have successfully logged in!'
                },
                token,
                user: userData
            });
        })(req, res, next);
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // process the signup form
    app.post('/auth/signup', (req, res, next) => {
      setTimeout(() => {
        const validationResult = validateSignupForm(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }
        return passport.authenticate('local-signup', (err) => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // the 11000 Mongo code is for a duplication email error
                    // the 409 HTTP status code is for conflict error
                    return res.status(409).json({
                        success: false,
                        message: {
                          style : 'danger',
                          text: 'Check the form for errors.'
                        },
                        errors: {
                            email: 'This email is already taken.'
                        }
                    });
                }
                if (err.name === 'ErrorMail') {
                    return res.status(400).json({
                        success: false,
                        message: {
                          style: err.style,
                          text: err.message,
                        },
                        errors:{}
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: {
                      style : 'danger',
                      text: 'Could not process the form.'
                    },
                    errors:{}

                });
            }
            return res.status(200).json({
                success: true,
                errors:{},
                message: {
                  style: 'success',
                  text:  `Activation mail has been sent to ${req.body.email}.
                  Please, verify your account before proceed to login.`
                    }
            });
        })(req, res, next);
      }, 2000);
    });
    app.get('/auth/verify/:token', function(req, res, next) {
        var token = req.params.token;
        User.findOne({'local.verify_token': token}, function(err, user) {
          if (err) {
              if (user.local.verify_token !== token) {
                  return res.status(400).json({
                      message : {
                        style : 'danger',
                        text: 'The token is invalid! We can\'t verify your account.'
                      }
                  });
              }

              return res.status(400).json({
                message : {
                  style : 'danger',
                  text: 'Could not process the form.'
                }
              });
          }
          User.findOneAndUpdate({'local.verify_token': token}, {'local.verified': true, 'local.verify_token': ''}, function(err, res, user) {
            if (err) {
              if (user.local.verify_token == '') {
                  return res.status(400).json({
                      message : {
                        style : 'danger',
                        text: 'You already verified your account.'
                      }
                  });
              }
            }
          });
          return res.status(200).json({
            message : {
              style : 'success',
              text: 'Your account is verified. You may now login.'
            }
          });
        });
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('auth/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();
//
//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }

export default authRoutes;
