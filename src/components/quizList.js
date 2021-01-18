import React from 'react';
import {Link} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import QuizService from '../services/quiz.services';
import EsHeader from './shared/esheader';


export default class QuizList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      exams: [],
      isReady: false
    }
    this.examList = this.examList.bind(this);
  }

  componentDidMount() {
    QuizService.getAll().then((data) => {
      this.setState({exams: data, isReady: true});
    });
  }

  examList() {
    if (this.state.isReady) {
      const { exams } = this.state;
      return (
        <div className="container">
          
          <ListGroup>
            { exams && exams.map((exam, index) => {
              return (
                  <ListGroup.Item key={exam.id}>
                    <Link to={`/quizes/${exam.id}`}>{exam.name}</Link>
                  </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>
      )
    } else {return null}
  }


  render() {
    return(
      <>
        <EsHeader />
        {this.examList()}
      </>  
    )
  }

}
