import { loadFotos, like, newComment, notification } from '../actions/actionCreator';

class TimeLineApi {
  static loadFotos(url) {
    return dispatch => {
      fetch(url)
        .then(resove => resove.json())
        .then(fotos => {
          dispatch(loadFotos(fotos));
          return fotos;
        });
    }
  }

  static like(fotoId) {
    return dispatch => {
      fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Não foi possível dar lile');
          }
        })
        .then(liker => {
          dispatch(like(liker, fotoId));
          return liker;
        });
    }
  }

  static saveComment(comment, fotoId) {
    return dispatch => {
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
          dispatch(newComment(comment, fotoId));
          return comment;
        })
        .catch(err => {
          console.log('err', err);
        })
    }
  }

  static searchUser(login) {
    return dispatch => {
      fetch(`http://localhost:8080/api/public/fotos/${login}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return [];
          }
        })
        .then(fotos => {
          if (fotos.length === 0) {
            dispatch(notification('usuário não encontrado'));
          } else {
            dispatch(notification('usuário encontrado'));
            dispatch(loadFotos(fotos));
          }
          return fotos;
        });
    }
  }
}

export default TimeLineApi;
