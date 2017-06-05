import React, { Component } from 'react';

import Header from './Header';
import FotoItem from './FotoItem';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = { fotos: [] };
    this.login = this.props.match.params.login;
  }

  buildFotos() {
    let url;
    if (this.login === undefined) {
      url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else {
      url = `http://localhost:8080/api/public/fotos/${this.login}`;
    }

    fetch(url)
      .then(resove => resove.json())
      .then(fotos => this.setState({ fotos: fotos }));
  }

  componentDidMount() {
    this.buildFotos();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if (nextProps !== undefined) {
      this.login = nextProps.match.params.login;
      this.buildFotos();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="fotos container">
          {
            this.state.fotos.map((foto, i) => <FotoItem key={i} foto={foto} />)
          }
        </div>
      </div>
    );
  }
}

export default TimeLine;
