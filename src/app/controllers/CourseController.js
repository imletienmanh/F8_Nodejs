const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
  // [GET] /courses/show
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store(req, res, next) {
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch((error) => {});
  }

  // [GET] /courses/edit/:_id
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render('courses/edit', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [PUT] /courses/:_id

  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [DELETE] /courses/:_id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /courses/:_id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /courses/:_id/store
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [POST] /courses/handle-form-actions
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
        .then(() => res.redirect('back'))
        .catch(next);
        break;
      case 'forceDelete':
        Course.deleteMany({_id: { $in: req.body.courseIds } })
        .then(() => res.redirect('back'))
        .catch(next);
        break;        

      default:
        res.status(400).send('Invalid action');
    }
  }
}
module.exports = new CourseController();
