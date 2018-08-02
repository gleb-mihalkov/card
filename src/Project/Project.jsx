import React from 'react';
import Page from '../App/Page.jsx';
import Card from '../App/Card.jsx';
import './Project.scss';

/**
 * About page component.
 */
export default class ProjectPage extends Page {

  /**
   * Returns URL of API with models.
   * @return {String} URL.
   */
  getUrl() {
    return 'content/projects.json';
  }

  /**
   * Renders model.
   * @return {*}
   */
  renderModel() {
    let image = {backgroundImage: `url(${this.model.image})`};
    let link = this.model.link;
    let name = this.model.name;
    let text = this.model.text;
    let number = this.index + 1;
    let count = this.count;

    let title = 'Перейти на сайт';

    return (
      <Card fullheight={true}>
        <article className="project">
          <a className="project_aside" title={title} style={image} href={link} target="_blank" rel="nofollow"></a>
          <div className="project_main">
            <h2 className="project_heading">
              <a href={link} title={title} target="_blank" rel="nofollow">{name}</a>
            </h2>
            <p className="project_text">{text}</p>
          </div>
          <div className="project_position">
            <span className="project_number">{number}</span>
            <span className="project_slash">/</span>
            <span className="project_count">{count}</span>
          </div>
        </article>
      </Card>
    );
  }
}
