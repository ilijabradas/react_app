import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function allTitleCase(inStr) {
 return inStr.replace(/\w\S*/g, function(tStr) {
 return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
});
}
export function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
    Object.keys(payload).map((f) => {
      if(!payload[f] && typeof(payload[f]) === 'string' && validator.isEmpty(payload[f])) {
        isFormValid = false;
        errors[f] = `${allTitleCase(f)} is required`;
        console.log(`key=${f}  value=${payload[f]}`);
      }
    });
    if (payload.email &&  !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }
    if (payload.password && payload.password.length < 4) {
        isFormValid = false;
        errors.password = 'Password must have at least 4 characters.';
    }
    if (payload.passwordConfirmation && !validator.equals(payload.password, payload.passwordConfirmation)) {
        isFormValid = false;
        errors.password = 'Passwords must match.';
    }
    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
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
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}
