import PubSub from 'pubsub-js';

class TimeLineLogical {
  constructor(fotos) {
    this.fotos = fotos;
  }

  loadFotos(url) {
    fetch(url)
      .then(resove => resove.json())
      .then(fotos => {
        this.fotos = fotos;
        PubSub.publish('timeline', this.fotos);
      });
  }

  like(fotoId) {
    fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Não foi possível dar lile');
        }
      })
      .then(liker => {
        const findFoto = this.fotos.find(foto => foto.id === fotoId);
        const checkLiker = findFoto.likers.find(likerAtual => likerAtual.login === liker.login);
        findFoto.likeada = !findFoto.likeada;

        if (checkLiker === undefined) {
          findFoto.likers.push(liker);
        } else {
          const newLike = findFoto.likers.filter(likerAtual => likerAtual.login !== liker.login);
          findFoto.likers = newLike;
        }
        PubSub.publish('timeline', this.fotos);
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
          throw new Error('Não foi possível fazer um comentário');
        }
      })
      .then(comment => {
        PubSub.publish('new-comment', { fotoId: fotoId, comment });
        const findFoto = this.fotos.find(foto => foto.id === fotoId);
        findFoto.comentarios.push(comment);
        PubSub.publish('timeline', this.fotos);
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  subscribe(callback) {
    PubSub.subscribe('timeline', (topic, fotos) => {
      callback(fotos);
    });
  }
}

export default TimeLineLogical;
