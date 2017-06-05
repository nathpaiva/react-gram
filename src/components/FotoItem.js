import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';

class FotoAtualizacoes extends Component {

  constructor(props) {
    super(props);
    // só pode mostrar que está com link caso o login que esteja logado na app esteja na lista de likers
    this.state = { likeada: this.props.foto.likeada };
  }

  likar(e) {
    e.preventDefault();

    fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Não foi possível dar lile');
        }
      })
      .then(liker => {
        this.setState({ likeada: !this.state.likeada });
        Pubsub.publish('refresh-liker', { fotoId: this.props.foto.id, liker });
      });
  }

  saveComment(e) {
    e.preventDefault();
    console.log('this', this.comment.value);
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ texto: this.comment.value }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    }
    fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('response', response);
          throw new Error('Não foi possível fazer um comentário');
        }
      })
      .then(comment => {
        this.comment.value = '';
        Pubsub.publish('new-comment', { fotoId: this.props.foto.id, comment });
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.likar.bind(this)} className={this.state.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</a>
        <form onSubmit={this.saveComment.bind(this)} className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comment = input} />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    );
  }
}

class FotoInfo extends Component {

  constructor(props) {
    super(props);
    this.state = { likers: this.props.foto.likers, comments: this.props.foto.comentarios };
    console.log('this.props.foto.comentarios', this.props.foto.comentarios);
  }

  componentWillMount() {
    Pubsub.subscribe('refresh-liker', (topic, infoliker) => {
      if (this.props.foto.id === infoliker.fotoId) {
        const checkLiker = this.state.likers.find(likes => likes.login === infoliker.liker.login);

        if (checkLiker === undefined) {
          const newLiker = this.state.likers.concat(infoliker.liker);
          this.setState({ likers: newLiker });
        } else {
          const removeLiker = this.state.likers.filter(liker => liker.login !== infoliker.liker.login);
          this.setState({ likers: removeLiker });
        }
      }
    });

    Pubsub.subscribe('new-comment', (topic, commentInfo) => {
      if (this.props.foto.id === commentInfo.fotoId) {
        const newComment = this.state.comments.concat(commentInfo.comment);
        this.setState({ comments: newComment });
      }
    })
  }

  render() {
    return (
      <div className="foto-in fo">
        <div className="foto-info-likes">
          {
            this.state.likers.map((liker, i) => {
              return (<Link to={`/timeline/${liker.login}`} key={`${liker}${i}`}>{liker.login},</Link>)
            })
          }
          curtiram
        </div>

        <p className="foto-info-legenda">
          <a className="foto-info-autor">autor</a> {this.props.foto.comentario}
        </p>

        <ul className="foto-info-comentarios">
          {
            this.state.comments.map((comment, i) => {
              return (
                <li key={i} className="comentario" >
                  <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor">{comment.login} </Link> {comment.texto}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

class FotoHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
          <figcaption className="foto-usuario">
            <Link to={`/timeline/${this.props.foto.loginUsuario}`}>{this.props.foto.loginUsuario}</Link>
          </figcaption>
        </figure>
        <time className="foto-data">{this.props.foto.horario}</time>
      </header>
    );
  }
}

class FotoItem extends Component {
  render() {
    return (
      <div className="foto">
        <FotoHeader foto={this.props.foto} />
        <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
        <FotoInfo foto={this.props.foto} />
        <FotoAtualizacoes foto={this.props.foto} />
      </div>
    );
  }
}

export default FotoItem;
