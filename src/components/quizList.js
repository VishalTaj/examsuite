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
        <div className="container" style={{marginTop: '20px'}}>
          
          <ListGroup className="row">
            { exams && exams.map((exam, index) => {
              return (
                  <ListGroup.Item key={exam.id} className="col-md-3 text-center">
                    <Link to={`/quizes/${exam.id}`}>
                      <img src={exam.icon} alt={exam.name} className="img-thumbnail"/>
                      {exam.name}
                    </Link>
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
