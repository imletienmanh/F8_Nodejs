module.exports = {
  multipleMongooseToObject: function (mongooses) {
    return Array.isArray(mongooses)
      ? mongooses.map((mongoose) => mongoose.toObject())
      : []; // Trả về mảng rỗng nếu không phải là mảng
  },

  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : null; // Trả về null thay vì mongoose nếu không tìm thấy
  },
};
