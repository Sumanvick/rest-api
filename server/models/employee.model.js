import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Address Schema
 */
const AddressSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  }
});

/**
 * Employee Schema
 */
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  avatarSrc: {
    type: String
  },
  addresses: AddressSchema,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
EmployeeSchema.method({
});

/**
 * Statics
 */
EmployeeSchema.statics = {
  /**
   * Get employee
   * @param {ObjectId} id - The objectId of employee.
   * @returns {Promise<employee, APIError>}
   */
  get(id) {
    return this.findById(id)
        .exec()
        .then((employee) => {
          if (employee) {
            return employee;
          }
          const err = new APIError('No such employee exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
  },

  /**
   * List employees in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of employees to be skipped.
   * @param {number} limit - Limit number of employees to be returned.
   * @returns {Promise<employee[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
  }
};

/**
 * @typedef Employee
 */
export default mongoose.model('Employee', EmployeeSchema);
