import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FotoAtualizacoes extends Component {

  constructor(props) {
    super(props);
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
        console.log('liker', liker);
      });
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={this.likar.bind(this)} className={this.state.likeada ? "fotoAtualizacoes-like-ativo" : "fotoAtualizacoes-like"}>Likar</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    );
  }
}

class FotoInfo extends Component {
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
            this.props.foto.comentarios.map((comentario, i) => {
              <li key={i} className="comentario">
                <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor">{comentario.login} </Link> {comentario.texto}
              </li>
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
