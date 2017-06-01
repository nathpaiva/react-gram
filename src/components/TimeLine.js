import React, { Component } from 'react';
import FotoItem from './FotoItem';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = { fotos: [] };
  }

  componentDidMount() {
    // fetch('http://localhost:8080/api/public/fotos/vitor')
    fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
      .then(resove => resove.json())
      .then(fotos => this.setState({ fotos: fotos }));
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.fotos.map((foto, i) => <FotoItem key={i} foto={foto} />)
        }
      </div>
    );
  }
}

export default TimeLine;
