import React, { Component } from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';
import { CSSTransitionGroup } from 'react-transition-group';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: '',
      questionsCount: 10,
      quizzTitle: 'Qim Quizz'
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const questions = this.shuffleArray(quizQuestions)
    const shuffledAnswerOptions = questions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: questions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < this.state.questionsCount) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    return answersCount.correct >= (this.state.questionsCount / 2 ) ? 'win' : 'lost'
  }

  setResults(result) {
    this.setState({ result: result });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.questionsCount}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result {...this.state} quizResult={this.state.result} />;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2 style={{color: "#CFDE00"}}> { this.state.quizzTitle }</h2>
          </div>
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
        <Switch>
          <Route path='/winners' component={Winners} />
        </Switch>
      </Router>
    );
  }
}

function renderWinnersEmails(email, index) {
  return (
    <p key={index}>{email}</p>
  );
}

class Winners extends Component {
  render() {
    let div;
    const storedEmails = JSON.parse(localStorage.getItem("emails"));
    if (!storedEmails) {
      div= (<p>No winners to display</p>)
    } 
    if (storedEmails) {
      div = storedEmails.map(renderWinnersEmails)
    }
    return (
      <CSSTransitionGroup
        className="container result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
        >
          <h2>Winners</h2>
          {div}
      </CSSTransitionGroup>
    );
  }
}

export default App;
