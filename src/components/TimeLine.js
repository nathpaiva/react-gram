// Dependencies
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from '../reducers/timeline';

// API
import TimeLineApi from '../stores/TimeLineApi';

// Components
import Header from './Header';
import FotoItem from './FotoItem';

const store = createStore(timeline, applyMiddleware(thunkMiddleware));

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = { fotos: [] };
    const { login } = this.props.match.params;
    this.login = login;
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

    store.dispatch(TimeLineApi.loadFotos(url));
  }

  like(fotoId) {
    store.dispatch(TimeLineApi.like(fotoId));
  }

  saveComment(comment, fotoId) {
    store.dispatch(TimeLineApi.saveComment(comment, fotoId));
  }

  componentDidMount() {
    this.LoadFotos();
  }


  componentWillMount() {
    store.subscribe(() => {
      this.setState({ fotos: store.getState() });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.login !== this.login) {
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
