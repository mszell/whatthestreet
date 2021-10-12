import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import About from './sections/About';
import Legal from './sections/Legal';

class AboutPage extends Component {

  render() {
    return (
      <div>
        <About />
        <Legal cities={this.props.availableCities} />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    availableCities: state.city.get('availableCities').toJS()
  }
})(AboutPage)
