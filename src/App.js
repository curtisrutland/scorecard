import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from "material-ui/styles";
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add';
import Drawer from 'material-ui/Drawer';
import Header from "./components/Header";
import ScorecardItem from "./components/ScorecardItem";
import * as Helper from "./helpers/scorecardHelper";
import './App.css';
import 'typeface-roboto';

function makeTheme(dark) {
  if (dark) {
    return createMuiTheme({ palette: { type: 'dark' } });
  } else {
    return createMuiTheme({});
  }
}

let theme = makeTheme(false);

const styles = theme => ({
  container: {
    marginTop: 56
  },
  topDrawerButton: {
    marginTop: 20
  }
});

function calculateScore(holes) {
  let par = holes.map(h => h.par).reduce((a, b) => a + b, 0);
  let score = holes.map(h => h.score).reduce((a,b) => a + b, 0);
  let absScore = par + score;
  return { par, score, absScore };
}

class App extends Component {
  constructor(props) {
    super(props);
    let holes = Helper.getStoredScorecard();
    let scores = calculateScore(holes);
    this.state = { holes, open: false, ...scores };
    console.log(this.state);
  }

  handleItemUpdate({ id, field, value }) {
    let holes = this.state.holes.slice();
    let item = holes[id];
    item[field] = value;
    this.updateScorecard(holes);
  }

  updateScorecard(holes) {
    let newState = {holes, ...calculateScore(holes)};
    this.setState(newState);
    console.log(newState);
    Helper.storeScorecard(holes);
  }

  toggleDrawer(open) {
    this.setState({ open });
  }

  newScorecard() {
    let holes = Helper.createNewScorecard();
    this.updateScorecard(holes);
  }

  renderDrawer() {
    return (
      <Drawer anchor="left" open={this.state.open} onRequestClose={() => this.toggleDrawer(false)}>
        <div tabIndex={0} role="button" onClick={() => this.toggleDrawer(false)}>
          <div>
            <ListItem button className={this.props.classes.topDrawerButton} onClick={() => this.newScorecard()}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New Scorecard" />
            </ListItem>
          </div>
        </div >
      </Drawer >
    );
  }

  renderRoot() {
    return (
      <div className="App">
        <Header onClick={() => this.toggleDrawer(true)} par={this.state.par} score={this.state.score} absScore={this.state.absScore} />
        <div className={this.props.classes.container}>
          {this.state.holes.map(item => (
            <ScorecardItem key={item.id} id={item.id} name={item.name} par={item.par} score={item.score} onChange={update => this.handleItemUpdate(update)} />
          ))}
        </div>
        {this.renderDrawer()}
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.renderRoot()}
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App);
