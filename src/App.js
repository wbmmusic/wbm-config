import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/layout/header'
import midiLight from './Components/midiLight/midiLight'
import midiGpio from './Components/midiGPIO/midiGpio'
import midiButton from './Components/midiButton/midiButton'
import mtcBox from './Components/mtcDisplay/mtcBox'
import midiAB from './Components/midiAB/midiAB'
import About from './Components/layout/about'
import DevInfo from './Components/utilities/DevInfo'
import inputCommandPicker from './Components/utilities/inputCommandPicker';
import Drag from './Components/utilities/Drag.js'


export class App extends Component {

  render() {
    return (
      <Router data-testId="router">
        <div className="App" style={{ height: "70vh" }}>
          <div className="container">
            <Header />
            <Route exact path='/midiLight' component={midiLight} />
            <Route exact path='/midiGpio' component={midiGpio} />
            <Route exact path='/midiButton' component={midiButton} />
            <Route exact path='/mtcDisplay' component={mtcBox} />
            <Route exact path='/midiAB' component={midiAB} />
            <Route exact path='/about' component={About} />
            <Route exact path='/drag' component={Drag} />
            <Route exact path='/inputPicker' component={inputCommandPicker} />
            <Route exact path='/' component={DevInfo} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

