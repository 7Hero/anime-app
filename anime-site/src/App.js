import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Frontpage from "./components/NAVIGATIONBAR/Navbar";
import Popular from "./components/FRONTPAGE/Popular/Popular"
import Animelist from "./components/FRONTPAGE/Animelist/Animelist"
import Homepage from "./components/FRONTPAGE/Homepage/Homepage"
import ThisSeason from "./components/FRONTPAGE/ThisSeason/thisSeason"
class App extends Component {
  render() {
    return (
      <Router>
      <body>
        <div className="App">
          <Frontpage />
          <Route exact path="/" component={Homepage}/>
          <Route path="/thisseason" component={ThisSeason}/>
          <Route path="/animelist" component={Animelist}/>
          <Route path="/popular" component={Popular}/>
        </div>
        </body>
      </Router>
    );
  }
}

export default App;
