import express from 'express';
import userRoutes from './user.route';
import employeeRoutes from './employee.route';
import projectRoutes from './project.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/check-api', (req, res) =>
  res.send("It's working...")
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount employee routes at /employees
router.use('/employees', employeeRoutes);

// mount project routes at /projects
router.use('/projects', projectRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
