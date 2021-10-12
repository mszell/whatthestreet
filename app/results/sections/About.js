import React from 'react';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';
import { prefixURL } from '../../../utils/url';

class AboutSection extends React.PureComponent {

  render() {
    return (
      <div className="AboutSection">
        <div className="Wrapper">
          <h2 className="Title">
            About
          </h2>
          <div className="Container">
            <p className="Text">
              What the Street!? was derived out of the question “How do new and old mobility concepts change our cities?”. It was raised by Michael Szell and Stephan Bogner during their residency at moovel lab in 2016. With support of the lab team they set out to wrangle data of cities around the world to develop and design this unique mobility space report.
            </p>
            <p className="Text">
              What the Street!? was made out of open-source software and resources. Thanks to the OpenStreetMap contributors and many other pieces we put together the puzzle of urban mobility space seen above.
            </p>
            <p className="Text">
              Read more about the technical details behind What the Street!? on our blog:
            </p>
            <p className="Text">
              <a href="https://move-lab.space/blog/about-what-the-street" target="_blank">https://move-lab.space/blog/about-what-the-street</a>
            </p>
            <p className="Text">
              <a href={prefixURL("/static/presskit/WhatTheStreet_presskit.zip")} target="_blank">Download the Press Kit</a>
            </p>

            <h3 className="Title">
            2021 Reboot with critical comments
            </h3>
            <p className="Text">
              What the Street!? was first made public in summer 2017. After some unfortunate downtime from 2020, we rebooted What the Street!? in 2021. Since the project’s beginning a lot has happened:
              <ul>
                <li>The original place of creation, moovel, was rebranded into move-lab in 2019, then ceased existing in 2020. This was the reason for the downtime.</li>
                <li>What the Street!? got added into the permanent exhibition of <a href="https://futurium.de/">Futurium</a> in 2019. Check it out if you are in Berlin!</li>
                <li>What the Street!? won the <a href="https://www.cityvis.io/competition.php?year=2018">City Vis 2018 award</a> in the Art & Advocacy category.</li>
                <li>Michael wrote a <a href="https://www.cogitatiopress.com/urbanplanning/article/view/1209/">scientific paper</a> in 2018 with many technical comments.</li>
              </ul>
            </p>
            <p className="Text">
              In these years we got many inquiries about the data and the accuracy of the project. Most of this is covered in section 6 of the paper, but we would like to highlight the biggest caveats below, prioritized by estimated largest inaccuracies first:
              <ul>
                <li>What the Street!? Is based on data from <a href="https://www.openstreetmap.org/">OpenStreetMap</a>. By design this data set does not cover almost any on-street (curbside) parking, only off-street parking. Therefore, What the Street!? is likely <i>severely underestimating</i> the amount of car parking. It is unclear by how much, but depending on the city, the real space for car parking could be easily more than double than reported.</li>
                <li>Data for modal shares comes from surveys by local governments without standardized methods. Comparing modal shares between different cities must proceed with caution.</li>
                <li>Most areas for streets and bicycle tracks were calculated with rough estimates for average widths in case of missing width values.</li>
                <li>OpenStreetMap data itself is quite accurate in most western countries, but not perfect. Especially bicycle facilities might be underreported.</li>
                <li>The running version of What the Street!? is using OpenStreetMap data from 2016. These data may have become outdated and/or updated in the meanwhile. Further, OpenStreetMap data can be quite incomplete in non-western countries.</li>
              </ul>
            </p>
            <p className="Text">
              In summary, What the Street!? should not be mistaken for a scientifically accurate report on mobility space distributions. It rather is a playful, interactive data visualization platform using rough estimates via imperfect data to create awareness of a general issue. Nevertheless, the magnitude of the problem holds without any doubt - there is by far too much parking and street space for cars, and this is destroying our cities and planet.
            </p>
          </div>
        </div>
        <style jsx>{`
          .AboutSection {
            background-color: ${COLORS.AboutSectionBackgroundColor};
            color: ${COLORS.ColorForegroundText};
            display: flex;
            justify-content: center;
          }

          .Wrapper {
            width: ${METRICS.MetricsContentWidth};
            padding: ${METRICS.MetricsContentPadding};
            display: flex;
          }

          .Container {
            flex-basis: 66.666666%;
          }

          .Title {
            font-size: 47px;
            line-height: 47px;
            font-weight: 500;
            margin: 0;
            flex-basis: 33.333333%;
          }

          .Text {
            font-size: 21px;
            line-height: 27px;
            margin: 0 0 30px 0;
          }

          .Text:last-child {
            margin: 0;
          }

        `}</style>
      </div>
    );
  }
}

export default AboutSection;
