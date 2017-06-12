// Dependencies
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

// API
import TimeLineApi from '../stores/TimeLineApi';

// Components
import FotoItem from './FotoItem';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.login = this.props.login;
    this.state = { fotos: [] };
  }

  LoadFotos() {
    let url;
    if (this.login === undefined && localStorage.getItem('auth-token')) {
      url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    } else if (this.login === undefined && !localStorage.getItem('auth-token')) {
      this.props.history.replace('/?msg=Você precisa estar logado para acessar este endereço');
    } else {
      url = `http://localhost:8080/api/public/fotos/${this.login}`;
    }

    this.props.store.dispatch(TimeLineApi.loadFotos(url));
  }

  like(fotoId) {
    this.props.store.dispatch(TimeLineApi.like(fotoId));
  }

  saveComment(comment, fotoId) {
    this.props.store.dispatch(TimeLineApi.saveComment(comment, fotoId));
  }

  componentDidMount() {
    this.LoadFotos();
  }

  componentWillMount() {
    this.props.store.subscribe(() => {
      this.setState({ fotos: this.props.store.getState().timeline });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.login) {
      this.login = nextProps.login;
      this.LoadFotos();
    }
  }

  render() {
    return (
      <div>
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
