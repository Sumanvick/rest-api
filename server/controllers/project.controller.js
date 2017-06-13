import Project from '../models/project.model';
import ProjectData from '../../bulk_data/project-data';

/**
 * Load project and append to req.
 */
function load(req, res, next, id) {
  Project.get(id)
    .then((project) => {
      req.project = project; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get project
 * @returns {Project}
 */
function get(req, res) {
  return res.json(req.project);
}

/**
 * Create new project
 * @property {string} req.body.projectId - The projectId of project.
 * @property {string} req.body.title - The title of project.
 * @property {string} req.body.subTitle - The subTitle of project.
 * @property {string} req.body.description - The description of project.
 * @property {string} req.body.status - The status of project.
 * @property {string} req.body.startDate - The startDate of project.
 * @returns {Project}
 */
function create(req, res, next) {
  const project = new Project({
    projectId: req.body.projectId,
    title: req.body.title,
    subTitle: req.body.subTitle,
    description: req.body.description,
    status: req.body.status,
    startDate: req.body.startDate
  });

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

/**
 * Update existing project
 * @property {string} req.body.projectId - The projectId of project.
 * @property {string} req.body.title - The title of project.
 * @property {string} req.body.subTitle - The subTitle of project.
 * @property {string} req.body.description - The description of project.
 * @property {string} req.body.status - The status of project.
 * @property {string} req.body.startDate - The startDate of project.
 * @returns {Project}
 */
function update(req, res, next) {
  const project = req.project;
  project.projectId = req.body.projectId;
  project.title = req.body.title;
  project.subTitle = req.body.subTitle;
  project.description = req.body.description;
  project.status = req.body.status;
  project.startDate = req.body.startDate;

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

/**
 * Get project list.
 * @property {number} req.query.skip - Number of projects to be skipped.
 * @property {number} req.query.limit - Limit number of projects to be returned.
 * @returns {Project[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Project.list({ limit, skip })
    .then(projects => res.json(projects))
    .catch(e => next(e));
}

/**
 * Delete project.
 * @returns {Project}
 */
function remove(req, res, next) {
  const project = req.project;
  project.remove()
    .then(deletedProject => res.json(deletedProject))
    .catch(e => next(e));
}

/**
 * Get member in projects.
 */
function getMember(req, res) {
  const project = req.project;
  res.json(project.members);
}

/**
 * Add member in projects.
 * @returns {Project.members}
 */
function addMember(req, res, next) {
  const project = req.project;
  project.members = [];
  project.save();
  req.body.members.forEach((element, index) => {
    project.members.push(element);
    if (index === req.body.members.length - 1) {
      project.save()
        .then(savedProject => res.json(savedProject))
        .catch(e => next(e));
      res.send(project.members);
    }
  });
}

/**
 * Add bulk projects.
 */
function addBulkProject(req, res, next) {
  ProjectData.forEach((element) => {
    const project = new Project({
      projectId: element.projectId,
      title: element.title,
      subTitle: element.subTitle,
      description: element.description,
      status: element.status,
      startDate: element.startDate
    });
    project.save()
        .catch(e => next(e));
  }, () => { res.send('All DOne..'); }, this);
}

export default { load, get, create, update, list, remove, addBulkProject, getMember, addMember };
