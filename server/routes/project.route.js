import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import projectCtrl from '../controllers/project.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/projects - Get list of projects */
  .get(projectCtrl.list)

  /** POST /api/projects - Create new project */
//   .post(validate(paramValidation.createProject), projectCtrl.create);
  .post(projectCtrl.create);

router.route('/bulky')
    /** ADD BULK PROJECT /api/projects/bulky */
   .get(projectCtrl.addBulkProject);

router.route('/:projectId')
  /** GET /api/projects/:projectId - Get project */
  .get(projectCtrl.get)

  /** PUT /api/projects/:projectId - Update project */
//   .put(validate(paramValidation.updateProject), projectCtrl.update)
  .put(projectCtrl.update)

  /** DELETE /api/projects/:projectId - Delete project */
  .delete(projectCtrl.remove);

router.route('/:projectId/members')
      .get(projectCtrl.getMember)
      .post(projectCtrl.addMember);
/** Load project when API with projectId route parameter is hit */
router.param('projectId', projectCtrl.load);

export default router;
