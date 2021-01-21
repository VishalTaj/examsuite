import { db } from '../config/firebase_config';

const collection = db.collection("/exams");

class QuizService {
  getAll = async () =>  {
    var data = [];
    await collection.get().then((snapshot) => {
      snapshot.forEach((exam) => {
        data.push({id: exam.id, name: exam.get('Name'), icon: exam.get('Icon')});
      });
    })
    return data;
  }

  questions = async (exam_id) => {
    var questionsArr = [];
    await collection.doc(exam_id).collection('/questions').get().then((snapshot) => {
      snapshot.forEach((question) => {
        questionsArr.push({id: question.id, question: question.get('question'),answers: question.get('answers'), difficulty: question.get('difficulty'),
      type: question.get('type') });
      });
    })
    return questionsArr;
  }

  // create(tutorial) {
  //   return db.add(tutorial);
  // }

  // update(id, value) {
  //   return db.doc(id).update(value);
  // }

  // delete(id) {
  //   return db.doc(id).delete();
  // }
}

export default new QuizService();