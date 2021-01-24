import React, { createRef } from 'react';
import { Form } from 'react-bootstrap';

export default class Answer extends React.Component {
  constructor(props) {
    super(props);
    const { answer } = this.props;
    this.answerRef = createRef();
    this.state = {
      answer: answer.answer,
      is_correct: answer.is_correct
    }

    this.checkAnswers = this.checkAnswers.bind(this);
  }

  checkAnswers() {

   return true;
  }

  render() {
   return( <>
   <Form.Group>
    <Form.Check inline label={this.state.answer} type='radio' name="answer" data-result={this.state.is_correct} />
   </Form.Group>
     
    </>)
  }
}