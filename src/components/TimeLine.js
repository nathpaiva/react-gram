import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import TimeLineLogica from '../stores/TimeLineLogica';

import Header from './Header';
import FotoItem from './FotoItem';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = { fotos: [] };

    this.TimeLineLogica = new TimeLineLogica([]);
  }

  LoadFotos() {
    console.log(this.props)
    const { login } = this.props.match.params;

    let url;
    if (login === undefined && localStorage.getItem('auth-token')) {
      url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    }
    else if (login === undefined && !localStorage.getItem('auth-token')) {
      this.props.history.replace('/?msg=Você precisa estar logado para acessar este endereço');
    }
    else {
      url = `http://localhost:8080/api/public/fotos/${login}`;
    }
    this.TimeLineLogica.loadFotos(url);
  }

  like(fotoId) {
    this.TimeLineLogica.like(fotoId)
  }

  saveComment(comment, fotoId) {
    this.TimeLineLogica.saveComment(comment, fotoId);
  }

  componentDidMount() {
    this.LoadFotos();
  }


  componentWillMount() {
    this.TimeLineLogica.subscribe(fotos => {
      this.setState({ fotos });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined) {
      this.login = nextProps.match.params.login;
      this.LoadFotos();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="fotos container">
          <ReactCSSTransitionGroup
            transitionName="timeline"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {
              this.state.fotos.map((foto, i) =>
                <FotoItem key={i} foto={foto} like={this.like.bind(this)} saveComment={this.saveComment.bind(this)} />
              )
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default TimeLine;
