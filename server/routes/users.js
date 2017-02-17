import express from 'express';
import isEmpty from 'lodash/isEmpty';
import User from '../models/user';

let router = express.Router();

// function validateInput(data) {
//   let errors = {};
//
//   if (validator.isEmpty(data.email)) {
//     errors.email = 'This field is required';
//   }
//   if(!validator.isEmpty(data.email) && !validator.isEmail(data.email)) {
//       errors.email = 'Email is invalid';
//   }
//   if (validator.isEmpty(data.password)) {
//     errors.password = 'This field is required';
//   }
//   if (validator.isEmpty(data.passwordConfirmation)) {
//     errors.passwordConfirmation = 'This field is required';
//   }
//   if (!validator.equals(data.password, data.passwordConfirmation)) {
//     errors.passwordConfirmation = 'Passwords must match';
//   }
//   if (validator.isEmpty(data.timezone)) {
//     errors.timezone = 'This field is required';
//   }
//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// }
router.route('/')
    .get(function(req, res, next) {
        var response = {};
        User.find({}, function(err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {
                    'error': true,
                    'message': 'Error fetching data'
                };
            }
            else {
                response = {
                    'error': false,
                    'data': data
                };
            }
            res.json(response);
        });
    })
    .post(function(req, res, next) {
        /*eslint-disable */
        var db = new User();
        /*eslint-enable */
        var response = {};
        // fetch all data from REST request.
        db.username = req.body.username;
        db.email = req.body.email;
        db.password = req.body.password;
        db.timezone = req.body.timezone;
        db.is_Active = req.body.is_Active;
        db.save(function(err, data) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = {
                    'error': true,
                    'message': 'Error adding data'
                };
            }
            else {
                response = {
                    'error': false,
                    'message': `Email is been sent at ${req.body.email}. Please check inbox!`
                };
            }
            res.json(response);
        });
    });

router.route('/:id')
    .get(function(req, res, next) {

    })
    .put(function(req, res, next) {

    })
    .delete(function(req, res, next) {
        var response = {};
        // find the data
        User.findById(req.params.id, function(err, data) {
            if (err) {
                response = {
                    'error': true,
                    'message': 'Error fetching data'
                };
            }
            else {
                // data exists, remove it.
                User.remove({
                    _id: req.params.id
                }, function(err) {
                    if (err) {
                        response = {
                            'error': true,
                            'message': 'Error deleting data'
                        };
                    }
                    else {
                        response = {
                            'error': true,
                            'message': 'Data associated with ' + req.params.id + 'is deleted'
                        };
                    }
                    res.json(response);
                });
            }
        });
    });

export default router;
