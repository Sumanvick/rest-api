import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import employeeCtrl from '../controllers/employee.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/employees - Get list of employees */
  .get(employeeCtrl.list)

  /** POST /api/employees - Create new employee */
//   .post(validate(paramValidation.createEmployee), employeeCtrl.create);
  .post(employeeCtrl.create);

router.route('/:employeeId')
  /** GET /api/employees/:employeeId - Get employee */
  .get(employeeCtrl.get)

  /** PUT /api/employees/:employeeId - Update employee */
//   .put(validate(paramValidation.updateEmployee), employeeCtrl.update)
  .put(employeeCtrl.update)

  /** DELETE /api/employees/:employeeId - Delete employee */
  .delete(employeeCtrl.remove);

router.route('/:employeeId/address/:addressId')
  .get(employeeCtrl.getAddress);

/** Load employee when API with employeeId route parameter is hit */
router.param('employeeId', employeeCtrl.load);

export default router;
