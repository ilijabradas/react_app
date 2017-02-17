import mongoose from 'mongoose';
import database from '../config/database';
import bcrypt from 'bcrypt-nodejs';
mongoose.connect(database.url);
let SALT_WORK_FACTOR = 10;
// define the schema for our user model
let userSchema = mongoose.Schema({

    local: {
        name: String,
        email: {
            type: String,
            index: {
                unique: true
            }
        },
        password: String,
        timezone: String,
        isActive: Number
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// methods ======================
/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
userSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.local.password, callback);
};


// checking if password is valid
/**
 * The pre-save hook method.
 */
userSchema.pre('save', function saveHook(next) {
    const newUser = this;
    // proceed further only if the password is modified or the newUser is new
     if (!newUser.isModified('local.password')) return next();

    return bcrypt.genSalt(SALT_WORK_FACTOR, (saltError, salt) => {
        if (saltError) {
            return next(saltError);
        }
        return bcrypt.hash(newUser.local.password, salt, null, (hashError, hash) => {
            if (hashError) {
                return next(hashError);
            }
            // replace a password string with hash value
            newUser.local.password = hash;

            return next();
        });
    });
});
// create the model for users and expose it
let User = mongoose.model('User', userSchema);
export default User;
