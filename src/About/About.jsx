import React from 'react';
import Page from '../App/Page.jsx';
import Card from '../App/Card.jsx';
import LazyImage from '../App/LazyImage.jsx';
import './About.scss';

/**
 * About page component.
 */
export default class AboutPage extends Page {

  /**
   * Returns URL of API with models.
   * @return {String} URL.
   */
  getUrl() {
    return 'content/about.json';
  }

  /**
   * Renders model.
   * @return {*}
   */
  renderModel() {
    let imageTitle = 'Прошу прощения, я не нашел нормальных фотографий себя.';
    let image = this.model.image;
    let education = this.model.education;
    let work = this.model.work;

    let techs = this.model.techs.map((item, index) => (
      <span className="about_techWrapper" key={index}>
        <span className="about_tech">{item}</span>
      </span>
    ));

    return (
      <Card fullheight={true}>
        <article className="about">
          <div className="about_main">
            <h2 className="about_heading">Образование</h2>
            <p className="about_text">{education}</p>
            <h2 className="about_heading">Опыт работы</h2>
            <p className="about_text">{work}</p>
            <h2 className="about_heading">Технологии</h2>
            <p className="about_techs">
              <span className="about_techsInner">{techs}</span>
            </p>
          </div>
          <span className="about_aside" title={imageTitle}>
            <LazyImage src={image} />
          </span>
        </article>
      </Card>
    );
  }
}
