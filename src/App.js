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


const theme = createMuiTheme();

const styles = theme => ({
  container: {
    marginTop: 60
  },
  topDrawerButton: {
    marginTop: 20
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    let holes = Helper.getStoredScorecard();
    this.state = { holes, open: false };
  }

  handleUpdate({ id, field, value }) {
    let holes = this.state.holes.slice();
    let item = holes[id];
    item[field] = value;
    this.updateScorecard(holes);
  }

  updateScorecard(holes) {
    this.setState({ holes });
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
        <Header onClick={() => this.toggleDrawer(true)} />
        <div className={this.props.classes.container}>
          {this.state.holes.map(item => (
            <ScorecardItem key={item.id} id={item.id} name={item.name} par={item.par} score={item.score} onChange={update => this.handleUpdate(update)} />
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
