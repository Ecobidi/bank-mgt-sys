const FeedbackModel = require('../models/feedback')

class FeedbackService {
  
  static async findBySender(sender_id) {
    return FeedbackModel.find({from: sender_id})
  }

  static async findById(id) {
    return FeedbackModel.findById(id)
  }
  
  static async findAll() {
    return FeedbackModel.find()
  }

  static async save(dao) {
    return FeedbackModel.create(dao)
  }

  static async removeOne(id) {
    return FeedbackModel.findByIdAndRemove(id)
  }

}

module.exports = FeedbackService