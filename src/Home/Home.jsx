import React from 'react';
import Page from '../App/Page/Page.jsx';
import Card from '../App/Card/Card.jsx';
import './Home.scss';

/**
 * Home page component.
 */
export default class Home extends Page {

  /**
   * Returns URL of API with home models.
   * @return {String} URL.
   */
  getUrl() {
    return 'content/home.json';
  }

  /**
   * Renders model.
   * @return {*}
   */
  renderModel() {
    let name = this.model.name;
    let post = this.model.post;

    return (
      <article className="home">
        <div className="home_inner">
          <h1 className="home_heading">{name}</h1>
          <p className="home_subheading">{post}</p>
        </div>
      </article>
    );
  }
}
