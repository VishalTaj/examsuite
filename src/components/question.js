import React, { Component } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import QuizService from '../services/quiz.services';
import Answer from '../components/answer';
import EsHeader from './shared/esheader';
import { QuestionContext } from '../context/question.context';

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exam_id: this.props.match.params.id,
      isReady: false,
      questions: [],
      currentQuestion: {},
      difficulty: "",
      type: "single"
    }

    this.loadQuestions = this.loadQuestions.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.loadQuestions();
  }

  nextPage() {
    this.context.setState("currentIndex", this.context.currentIndex + 1);
    this.setState({currentQuestion: this.state.questions[this.context.currentIndex]});
  }

  loadQuestions() {
    if (localStorage.getItem('questions') === null) {
      QuizService.questions(this.state.exam_id).then((data) => {
        this.setState({questions: data});
        localStorage.setItem('questions', JSON.stringify(data));
        this.setState({isReady: true, currentQuestion: this.state.questions[this.context.currentIndex]})
      });
    } else {
      this.setState({questions: JSON.parse(localStorage.getItem('questions'))});
      this.setState({isReady: true, currentQuestion: this.state.questions[this.context.currentIndex]});
    }
    
  }

  renderQuestion() {
    if (this.state.isReady) {
      const { currentQuestion } =  this.state;
      if (currentQuestion) {
        let answers = currentQuestion.answers;
        return(
          <Card className="fullwidth">
            <Card.Header>Question no {this.context.currentIndex + 1}</Card.Header>
            <Card.Body>
              <Card.Title>{currentQuestion.question}</Card.Title>
              <Card.Text>
                  {answers && answers.map((answer, index) => {
                    return <Answer key={index} answer={answer} />
                  })}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={this.nextPage}>Next</Button>
            </Card.Footer>
          </Card>
        )
      } else {
        return(<p>{this.context.currentIndex}</p>)
      }

    } else {
      return null
    }
  }

  render() {
    return(
      <>
        <EsHeader />
        <div className="container">
          <div className="row">
            <QuestionContext.Consumer>
              {(context) => (
                <>
                <div className="col-12 status-badges">
                  <Badge variant="primary">
                    Correct<Badge variant="light">{context.correctAnswer}</Badge>
                  </Badge>
                  <Badge variant="primary">
                    Wrong<Badge variant="light">{context.wrongAnswer}</Badge>
                  </Badge>
                  <Badge variant="primary">
                    Total Question<Badge variant="light">{context.wrongAnswer}</Badge>
                  </Badge>
                </div>
                { this.renderQuestion() }
                </>
              )}
            </QuestionContext.Consumer>
          </div>
        </div>
      </>
    )
   }
}

Question.contextType = QuestionContext;