import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FotoAtualizacoes extends Component {

  likar(e) {
    e.preventDefault();
    this.props.like(this.props.foto.id);
  }

  saveComment(e) {
    e.preventDefault();
    this.props.saveComment(this.comment.value, this.props.foto.id);
    this.comment.value = '';
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.likar.bind(this)} className={this.props.foto.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</a>
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
  }

  render() {
    return (
      <div className="foto-in fo">
        <div className="foto-info-likes">
          {
            this.props.foto.likers.map((liker, i) => {
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
            this.props.foto.comentarios.map((comment, i) => {
              return (
                <li key={i} className="comentario" >
                  <Link to={`/timeline/${comment.login}`} className="foto-info-autor">{comment.login} </Link> {comment.texto}
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
        <FotoAtualizacoes {...this.props} />
      </div>
    );
  }
}

export default FotoItem;
