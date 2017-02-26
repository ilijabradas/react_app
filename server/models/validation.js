import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
export function validateSignupForm(payload) {
    const errors = {};
    const message = {};
    if (validator.isEmpty(payload.name)) {
        errors.name = 'Name is required';
    }
    if (validator.isEmpty(payload.email)) {
        errors.email = 'Email is required';
    }
    if (validator.isEmpty(payload.password)) {
        errors.password = 'Password is required';
    }
    if (validator.isEmpty(payload.passwordConfirmation)) {
        errors.passwordConfirmation = 'Password confirmation is required';
    }
    if (validator.isEmpty(payload.timezone)) {
        errors.timezone = 'Timezone is required';
    }
    if (payload.email && !validator.isEmail(payload.email)) {
        errors.email = 'Please provide a correct email address.';
    }
    if (payload.password && payload.password.length < 4) {
        errors.password = 'Password must have at least 4 characters.';
    }
    if (payload.passwordConfirmation && !validator.equals(payload.password, payload.passwordConfirmation)) {
        errors.password = 'Passwords must match.';
    }
    if (!isEmpty(errors)) {
        message.style = 'danger';
        message.text = 'Check the form for errors.';
    }

    return {
        success: isEmpty(errors),
        message,
        errors
    };
}
/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
export function validateLoginForm(payload) {
    const errors = {};
    const message = {};


    if (validator.isEmpty(payload.email)) {
        errors.email = 'Email is required';
    }
    if (validator.isEmpty(payload.password)) {
        errors.password = 'Password is required';
    }
    if (payload.email && !validator.isEmail(payload.email)) {
        errors.email = 'Please provide a correct email address.';
    }
    if (!isEmpty(errors)) {
        message.style = 'danger';
        message.text = 'Check the form for errors.';
    }

    return {
        success: isEmpty(errors),
        message,
        errors
    };
}
