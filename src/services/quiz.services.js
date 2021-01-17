import firebase from '../config/firebase_config';

const db = firebase.firestore().collection("/exams");

class QuizService {
  getAll() {
    return db;
  }

  create(tutorial) {
    return db.add(tutorial);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new QuizService();