import React, { Component } from "react";
import { render } from "react-dom";

import "./style.css";
import Grid from "@material-ui/core/Grid";
import MainPage from "./MainPage";
import MarkdownEditor from "./MarkdownEditor";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ShowArticle from "./ShowArticle";
import TestTest from "./TestTest";
import SigninAddArticle from "./SigninAddArticle";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Helmet } from 'react-helmet';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  componentDidMount() {
    document.title = 'Nitisit\'s blog';
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <AppBar
              position="static"
              style={{ background: "#1976D2", height: "200px" }}
            >

              <Toolbar>
                <Typography variant="h5" noWrap>
                  &nbsp;
                  <br />
                  &nbsp;
                  <br />
                  &nbsp;
                  <br />
                  ...Just Note and Share... &nbsp;
                  <br />
                  &nbsp;
                  <br />
                  &nbsp;
                  <br />
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <Grid container spacing={1}>
            <Grid item lg={1} />

            <Grid item sm={12} lg={10}>
              <Helmet>
                <title>Nitisit's software dev blog</title>
                <meta charSet="utf-8" />
                <meta name="description" content="software dev blog" />
                <meta name="keywords" content="coding, react, blog, reactjs, js, sofware, engineer, java, front-end" />
                <meta http-equiv="content-language" content="en"/>
                <meta name="revisit-after" content="7 days"/>
                <meta name="robots" content="index, follow" />
              </Helmet>

              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/showArticle/:id" component={ShowArticle} />
                <Route exact path="/addArticle" component={MarkdownEditor} />
                <Route exact path="/testtest999" component={TestTest} />
                <Route exact path="/signin" component={SigninAddArticle} />
              </Switch>
            </Grid>

            <Grid item lg={1} />
          </Grid>
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
