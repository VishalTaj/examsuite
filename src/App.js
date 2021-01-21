import './App.css';
import QuizList from './components/quizList';
import Question from './components/question';
import Error404 from './components/error404';
import { QuestionProvider } from './context/question.context';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <QuestionProvider>
      <Switch>
        <Route exact path={["/", "/quizes"]} component={QuizList} />
        <Route path='/quizes/:id' name="questions" component={Question} />
        <Route path="*" component={Error404} />
      </Switch>
    </QuestionProvider>
  );
}

export default App;
