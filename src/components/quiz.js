import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: this.props.exam
    }


  }
  render() {
    const exam  = this.state.exam;
    return (
        <ListGroup.Item>
          <p>{exam.name}</p>
        </ListGroup.Item>
    )
   }
}
export default Quiz;