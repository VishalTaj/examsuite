import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import QuizService from '../services/quiz.services';
import EsHeader from './shared/esheader';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam_id: this.props.match.params.id,
      isReady: false,
      question: []
    }

    this.loadQuestions = this.loadQuestions.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    this.loadQuestions();
  }

  loadQuestions() {
    if (this.state.exam_id) {
      QuizService.questions(this.state.exam_id).then((data) => {
        this.setState({isReady: true, questions: data})
      });
      
    }
  }

  renderList() {
    if (this.state.isReady) {
      const { questions } =  this.state;
      return(
        <div className="container">
          
          <ListGroup>
            { questions && questions.map((question, index) => {
              return (

                  <ListGroup.Item key={question.id}>
                    <p>{question.id}</p>
                  </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>
      );
    } else { return null;}
  }

  render() {
    
    return(
      <>
        <EsHeader />
        {this.renderList()}
      </>
    )
   }
}
export default Question;