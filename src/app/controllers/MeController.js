const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] me/stored/courses
  storedCourses(req, res, next) {

    Promise.all([
        Course.find({}).sortable(req), 
        Course.findDeleted({ deleted: true })]
      )
        .then(([courses, deletedCount]) =>
            res.render('me/stored_courses', {
            deleteCount: deletedCount.filter((course) => course.deleted).length,
            courses: multipleMongooseToObject(courses),
            }),
          )
        .catch(next);
  }

  // [GET] me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) =>
        res.render('me/trash_courses', {
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }
}
module.exports = new MeController();
