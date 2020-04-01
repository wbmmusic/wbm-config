import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/layout/header'
import Todos from './Components/Todos'
import AddTodo from './Components/AddTodo'
import midiLight from './Components/midiLight/midiLight'
import midiGpio from './Components/midiGPIO/midiGpio'
import midiButton from './Components/midiButton/midiButton'
import mtcDisplay from './Components/mtcDisplay/mtcDisplay'
import midiAB from './Components/midiAB/midiAB'
import About from './Components/layout/about'
import Download from './Components/utilities/download'
import Matraces from './Components/utilities/matraces'

import axios from 'axios';

export class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  //Toggle Complete 
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    });
  }

  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  //Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  render() {
    return (
      <Router>
        <div className="App" style={{height: "70vh"}}>
          <div className="container">
            <Header />
            <Route exact path="/todo" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                  delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route exact path='/midiLight' component={midiLight} />
            <Route exact path='/midiGpio' component={midiGpio} />
            <Route exact path='/midiButton' component={midiButton} />
            <Route exact path='/mtcDisplay' component={mtcDisplay} />
            <Route exact path='/midiAB' component={midiAB} />
            <Route exact path='/about' component={About} />
            <Route exact path='/'>
              <Download />
              <br />
              <Matraces cols="5" rows="4" />
            </Route>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

