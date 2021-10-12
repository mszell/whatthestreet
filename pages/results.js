import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Header from '../app/shared/components/Header';
import ResultsPage from '../app/results/ResultsPage';

import { CityActions, GuessActions } from '../app/statemanagement/actions';
import { setBaseUrl, initRouterWatcher } from '../app/statemanagement/AppStateManagement';

import { getBaseUrl } from '../app/shared/utils/url';

class Results extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req, res } = params;
    console.log('Results page render');
    // If not Server Side rendered, do not need to fetch everything again
    if (isServer) {
      const baseUrl = getBaseUrl(req);
      await store.dispatch(setBaseUrl(baseUrl));
      await store.dispatch(CityActions.loadCities());
      // Select city from url
      // Todo handle city do not exists
      if(req && req.params.cityName) {
        await store.dispatch(CityActions.selectCity(req.params.cityName));
      }
      if(req && req.query.bike && req.query.rail && req.query.car) {
        await store.dispatch(GuessActions.setOwnGuess({
          bike: parseFloat(req.query.bike),
          rail: parseFloat(req.query.rail),
          car: parseFloat(req.query.car)
        }));
      } else {
        // Redirect to home
        res.writeHead(302, { Location: `/${req.params.cityName}` })
        res.end()
      }
    }
    return;
  }

  componentDidMount() {
    // Triggered on client
    this.props.dispatch(initRouterWatcher());
  }

  render() {
    return (
      <Layout>
        <Header title="What the Street!?" />
        <ResultsPage />
      </Layout>
    )
  }
}

export default withRedux(initStore)(Results);
