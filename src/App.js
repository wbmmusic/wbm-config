import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './Styles/channelstyle.css'
import Header from './Components/layout/header'
import MidiLight from './Components/midiLight/MidiLight'
import MidiGpio from './Components/midiGPIO/midiGpio'
import MidiButton from './Components/midiButton/MidiButton'
import mtcBox from './Components/mtcDisplay/mtcBox'
import midiAB from './Components/midiAB/midiAB'
import DevInfo from './Components/utilities/DevInfo'
import Drag from './Components/utilities/drag/Drag'
import TopMtx2 from './matrix2/TopMtx2';

export class App extends Component {

  render() {
    return (
      <Router data-testId="router">
        <div className="App">
          <div className="container" style={{ userSelect: 'none' }}>
            <Header />
            <Route exact path='/midiLight' component={MidiLight} />
            <Route exact path='/midiGpio' component={MidiGpio} />
            <Route exact path='/midiButton' component={MidiButton} />
            <Route exact path='/mtcDisplay' component={mtcBox} />
            <Route exact path='/midiAB' component={midiAB} />
            <Route exact path='/about' component={TopMtx2} />
            <Route exact path='/drag' component={Drag} />
            <Route exact path='/' component={DevInfo} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

