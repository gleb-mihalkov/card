import React from 'react';
import Page from '../App/Page.jsx';
import Card from '../App/Card.jsx';
import './Home.scss';

/**
 * Home page component.
 */
export default class HomePage extends Page {

  /**
   * Returns URL of API with home models.
   * @return {String} URL.
   */
  getUrl() {
    return '/content/home.json';
  }

  /**
   * Renders model.
   * @return {*}
   */
  renderModel() {
    let name = this.model.name;
    let post = this.model.post;

    return (
      <Card centred={true}>
        <article className="home">
          <h1 className="home_heading">{name}</h1>
          <p className="home_subheading">{post}</p>
        </article>
      </Card>
    );
  }
}
