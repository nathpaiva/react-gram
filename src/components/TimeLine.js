import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import PubSub from 'pubsub-js';

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

  likar(fotoId) {
    fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Não foi possível dar lile');
        }
      })
      .then(liker => {
        PubSub.publish('refresh-liker', { fotoId: fotoId, liker });
      });
  }

  saveComment(comment, fotoId) {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ texto: comment }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    }
    fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('response', response);
          throw new Error('Não foi possível fazer um comentário');
        }
      })
      .then(comment => {
        PubSub.publish('new-comment', { fotoId: fotoId, comment });
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  componentDidMount() {
    this.buildFotos();
  }

  componentWillMount() {

    PubSub.subscribe('refresh-liker', (topic, infoLiker) => {
      const findFoto = this.state.fotos.find(foto => foto.id === infoLiker.fotoId);
      const checkLiker = findFoto.likers.find(liker => liker.login === infoLiker.liker.login);
      findFoto.likeada = !findFoto.likeada;

      if (checkLiker === undefined) {
        findFoto.likers.push(infoLiker.liker);
      } else {
        const newLike = findFoto.likers.filter(liker => liker.login !== infoLiker.liker.login);
        findFoto.likers = newLike;
      }
      this.setState({ fotos: this.state.fotos });
    });

    PubSub.subscribe('new-comment', (topic, commentInfo) => {
      const findFoto = this.state.fotos.find(foto => foto.id === commentInfo.fotoId);
      const newComment = findFoto.comentarios.push(commentInfo.comment);
      this.setState({ comments: newComment });
    });

    PubSub.subscribe('timeline', (topic, fotos) => {
      this.setState({ fotos });
    });
  }

  componentWillReceiveProps(nextProps) {
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
          <ReactCSSTransitionGroup
            transitionName="timeline"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {
              this.state.fotos.map((foto, i) =>
                <FotoItem key={i} foto={foto} likar={this.likar} saveComment={this.saveComment} />
              )
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default TimeLine;
