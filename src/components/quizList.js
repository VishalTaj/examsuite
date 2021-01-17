import React from 'react';
import firebase from '../config/firebase_config';
import ListGroup from 'react-bootstrap/ListGroup'
import Quiz from './quiz';


export default class QuizList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      exams: [],
      isReady: false
    }
    this.fetchQuiz.bind(this);
    this.examList = this.examList.bind(this);
  }

  db = firebase.firestore();

  fetchQuiz = async () => {
    const response = this.db.collection("/exams");
    await response.get().then((snapshot) => {
      snapshot.forEach((exam) => {
        this.state.exams.push({id: exam.id, name: exam.get('Name'), icon: exam.get('Icon')});
      });
      this.setState({isReady: true});
    })
  }

  componentDidMount() {
    this.fetchQuiz();
  }

  examList() {
    if (this.state.isReady) {
      const { exams } = this.state;
      return <div className="container">
        <ListGroup>
          { exams && exams.map((exam, index) => {
            return <Quiz exam={ exam } key={exam.id} />
          })}
        </ListGroup>
      </div>
    } else {return null}
  }


  render() {
    return(this.examList())
  }

}
