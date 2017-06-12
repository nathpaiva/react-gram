// Dependencies
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { connect } from 'react-redux';


// API
import TimeLineApi from '../stores/TimeLineApi';

// Components
import FotoItem from './FotoItem';

class TimeLine extends Component {

  constructor(props) {
    super(props);
    this.login = this.props.login;
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

    this.props.list(url);
  }

  componentDidMount() {
    this.LoadFotos();
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
              this.props.fotos.map((foto, i) =>
                <FotoItem key={i} foto={foto} like={this.props.like} saveComment={this.props.saveComment} />
              )
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { fotos: state.timeline }
};

const mapDispatchToProps = dispatch => {
  return {
    like: (fotoId) => {
      dispatch(TimeLineApi.like(fotoId));
    },
    saveComment: (fotoId, textoComentario) => {
      dispatch(TimeLineApi.saveComment(fotoId, textoComentario))
    },
    list: (urlPerfil) => {
      dispatch(TimeLineApi.loadFotos(urlPerfil));
    }

  }
}

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(TimeLine);

export default TimelineContainer;
