import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/layout/header'
import midiLight from './Components/midiLight/midiLight'
import midiGpio from './Components/midiGPIO/midiGpio'
import midiButton from './Components/midiButton/midiButton'
import mtcDisplay from './Components/mtcDisplay/mtcDisplay'
import midiAB from './Components/midiAB/midiAB'
import About from './Components/layout/about'
//import Matraces from './Components/matrix/matraces'
import Files from './Components/utilities/Files'

export class App extends Component {
  state = {
    todos: []
  }

  render() {
    return (
      <Router>
        <div className="App" style={{ height: "70vh" }}>
          <div className="container">
            <Header />
            <Route exact path='/midiLight' component={midiLight} />
            <Route exact path='/midiGpio' component={midiGpio} />
            <Route exact path='/midiButton' component={midiButton} />
            <Route exact path='/mtcDisplay' component={mtcDisplay} />
            <Route exact path='/midiAB' component={midiAB} />
            <Route exact path='/files' component={Files} />
            <Route exact path='/' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

