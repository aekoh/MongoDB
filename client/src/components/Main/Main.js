import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";


class Main extends Component {

    state = {
        topic: "",
        startYear: "",
        endYear: "",
        articles: [],
        saved: []
    };

  // When my component mounts, I will get a list of the saved articles and update this.state.saved
  componentDidMount() {
    this.getSavedArticles()
  }

 // This Method will get all the saved articles from the DataBase
 getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  // This method will render one search for results div per each article
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // This method will render one div per article
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // This code will help keep track of what each user inputs into the topic input, we will then be able to reach the input later on
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  // This code will track what a user types into the Start Year
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  // Keep track of what user types into endYear
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  // When a user submits the search form, the code will then perform NYT api search with user input
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Getting NYT Articles");
    console.log("this.state.topic: ", this.state.topic);
    console.log("this.state.startYear: ", this.state.startYear);
    console.log("this.state.endYear: ", this.state.endYear);
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
        console.log("this.state.articles: ", this.state.articles);
      });
  }

  // When the user clicks the article button, the article will be added to the database
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }

  // When a user clicks the DELETE article button the article will be removed from the DataBase
  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return (

      <div className="main-container">
        <div className="container">
          {/* Jumbotron */}
          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
            <h2 className="text-center">Search for and save articles of interest.</h2>
          </div>
          {/* SEARCH Form and RESULTS Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />
          {/* SAVED Articles Section */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      <strong>
                        <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {this.renderSaved()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
              built using React.js 
            </p>
          </footer>
        </div>
      </div>

    );
  }

}

export default Main;