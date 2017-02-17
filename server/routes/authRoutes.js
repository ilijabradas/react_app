import {
    validateSignupForm,
    validateLoginForm
} from '../models/validation';

let authRoutes = (app, passport) => {
    // =====================================
    // LOGIN ===============================
    // =====================================
    // process the login form
    app.post('/auth/login', (req, res, next) => {
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
                if (err.name === 'IncorrectCredentialsError') {
                    return res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }
            return res.json({
                success: true,
                message: 'You have successfully logged in!',
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
                        message: 'Check the form for errors.',
                        errors: {
                            email: 'This email is already taken.'
                        }
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }
            return res.status(200).json({
                success: true,
                errors:{},
                message: 'You have successfully signed up! Now you should be able to log in.'
            });
        })(req, res, next);
      }, 3000);
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
