import React from 'react';
import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';
import { prefixURL } from '../../../utils/url';

const CatImage = prefixURL('/static/images/Illustration_Cat@2x.png');

class Demand extends React.PureComponent {

  render() {
    return (
      <section className="DemandSection">
        <div className="Wrapper">
          <h2 className="Title">
            Demand<br />better mobility
          </h2>
          <p className="Text">
            You can change how your city looks by holding accountable your elected officials to implement policies and laws towards a fairer distribution of transport space. Citizen demand, human-centric urban policy and planning for more public transport, walking and cycling, and for less cars can transform how you get from A to B and how livable your city becomes. With this project we contribute in understanding and analyzing mobility infrastructure around the globe.
          </p>
          <p className="Text">
            You are not stuck in traffic. You are traffic.
          </p>
          <img className="Image" alt="Cat" src={CatImage} />
        </div>
        <style jsx>{`
          .DemandSection {
            background-color: ${COLORS.DemandSectionBackgroundColor};
            color: ${COLORS.ColorForegroundText};
          }

          .Wrapper {
            margin: 0 auto;
            width: ${METRICS.MetricsContentWidth};
            padding-left: ${METRICS.MetricsContentPadding};
            padding-right: ${METRICS.MetricsContentPadding};
            padding-top: ${METRICS.MetricsSectionPadding};
          }

          .Title {
            font-size: 47px;
            line-height: 56px;
            font-weight: 500;
            width: 320px;
            margin: 0 0 ${METRICS.MetricsSectionPadding} 0;
          }

          .Text {
            font-size: 21px;
            line-height: 27px;
            margin: 0 0 25px 0;
            width: 560px;
            }

          .Image {
            width: 700px;
            display: block;
            margin: 0 auto;
          }
        `}</style>
      </section>
    );
  }
}

export default Demand;
