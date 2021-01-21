import React, {Component, createContext} from 'react';

export const QuestionContext = createContext();

export class QuestionProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      correctAnswer: 0,
      wrongAnswer: 0,
      totalQuestion: 0,
      attemptedQuestion: 0
    }
    this.updateState = this.updateState.bind(this);
  }

  updateState(key, value) {
    this.setState({[key]: value});
  }

  render() {
    return(
      <QuestionContext.Provider value={{...this.state, setState: this.updateState}} >
        {this.props.children}
      </QuestionContext.Provider>
    );
  }
}