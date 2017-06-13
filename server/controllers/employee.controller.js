import Employee from '../models/employee.model';

/**
 * Load employee and append to req.
 */
function load(req, res, next, id) {
  Employee.get(id)
    .then((employee) => {
      req.employee = employee; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get employee
 * @returns {Employee}
 */
function get(req, res) {
  return res.json(req.employee);
}

/**
 * Create new employee
 * @property {string} req.body.name - The name of employee.
 * @property {string} req.body.mobileNumber - The mobileNumber of employee.
 * @returns {Employee}
 */
function create(req, res, next) {
  const employee = new Employee({
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    addresses: req.body.addresses
  });

  employee.save()
    .then(savedEmployee => res.json(savedEmployee))
    .catch(e => next(e));
}

/**
 * Update existing employee
 * @property {string} req.body.name - The name of employee.
 * @property {string} req.body.mobileNumber - The mobileNumber of employee.
 * @returns {Employee}
 */
function update(req, res, next) {
  const employee = req.employee;
  employee.name = req.body.name;
  employee.mobileNumber = req.body.mobileNumber;
  employee.email = req.body.email;

  // let doc = employee.addresses.id('592fff31e31bce4bd7bd8085');
  // doc.place = 'Miyapur111';
  employee.save()
    .then(savedEmployee => res.json(savedEmployee))
    .catch(e => next(e));
}

/**
 * Get employee list.
 * @property {number} req.query.skip - Number of employees to be skipped.
 * @property {number} req.query.limit - Limit number of employees to be returned.
 * @returns {Employee[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Employee.list({ limit, skip })
    .then(employees => res.json(employees))
    .catch(e => next(e));
}

/**
 * Get employee address list.
 * @property {number} req.query.skip - Number of employees to be skipped.
 * @property {number} req.query.limit - Limit number of employees to be returned.
 * @returns {Employee[]}
 */
function getAddress(req, res) {
  const address = req.employee.addresses.id(req.params.addressId);
  return res.json(address);
}

/**
 * Delete employee.
 * @returns {Employee}
 */
function remove(req, res, next) {
  const employee = req.employee;
  employee.remove()
    .then(deletedEmployee => res.json(deletedEmployee))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getAddress };
