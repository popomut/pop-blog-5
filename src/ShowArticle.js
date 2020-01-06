import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-mde/lib/styles/css/react-mde-all.css";
import firebase from "./firebase/Firebase";
import MarkdownRenderer from "./MarkdownRenderer";
import Grid from "@material-ui/core/Grid";

import loading_placeholder from "./images/loading_placeholder.png";
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

//source page: https://www.npmjs.com/package/react-mde
//https://codesandbox.io/s/vm1k17ymq0

const initialState = {
  value: "",
  coverImageURL: loading_placeholder,
  title: "",
  coverFileName: ""
};

class ShowArticle extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.getCoverImage = this.getCoverImage.bind(this);
    this.initializeReactGA = this.initializeReactGA.bind(this);
  }

  initializeReactGA() {

    ReactGA.initialize('UA-155056511-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  getData(e) {
    var stateObject = this;
    var id = this.props.match.params.id;



    //anonymouse authentication
    firebase
      .auth()
      .signInAnonymously()
      .then(function() {
        firebase
          .database()
          .ref("myblog/" + id)
          .once("value")
          .then(snapshot => {
            const key = snapshot.key;
            const val = snapshot.val();


            stateObject.setState({
              value: val.value,
              coverFileName: val.coverFileName,
              title: val.title
            });

            stateObject.getCoverImage(stateObject.state.coverFileName);
          })
          .catch(e => {
            console.log("Error fetching data", e);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("login error");
        console.log(errorCode);
        console.log(errorMessage);
      });

  }

  async getCoverImage(coverFileName) {
    var stateObject = this;
    var storage = firebase.storage();

    storage
      .ref("cover_images/" + coverFileName)
      .getDownloadURL()
      .then(function(url) {
        stateObject.setState({
          coverImageURL: url
        });

        //var coverImageRef = document.getElementById("coverImage");
        //coverImageRef.src = url;
      })
      .catch(function(error) {
        console.log(error);
        // Handle any errors
      });
  }

  componentDidMount() {
    this.initializeReactGA();
    this.getData();
  }

  render() {
    //classes = useStyles();

    return (
      <div>
        <Helmet>
                <title>{this.state.title}</title>
                <meta charSet="utf-8" />
                <meta name="description" content="software dev blog" />
                <meta name="keywords" content={this.state.title} />
                <meta http-equiv="content-language" content="en"/>
                <meta name="revisit-after" content="7 days"/>
                <meta name="robots" content="index, follow" />
        </Helmet>
        <br />
        <div id="coverImage" align="center">
          <img
            src={this.state.coverImageURL}
            class="coverImage"
            alt="Cover Image"
          />
        </div>

        <div id="articleContent" class="imageResponsiveInArticle">
          <Grid container spacing={1}>
            <Grid item lg={2} />

            <Grid item sm={12} lg={8}>
              <br />

              <h1>{this.state.title}</h1>

              <MarkdownRenderer data={this.state.value} />
            </Grid>

            <Grid item lg={2} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default ShowArticle;
