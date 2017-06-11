class TimeLineApi {
  static loadFotos(url) {
    return dispatch => {
      fetch(url)
        .then(resove => resove.json())
        .then(fotos => {
          dispatch({ type: 'LOADFOTOS', fotos });
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
          dispatch({ type: 'LIKE', liker, fotoId })
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
          dispatch({ type: 'COMMENT', comment, fotoId });
          return comment;
        })
        .catch(err => {
          console.log('err', err);
        })
    }
  }
}

export default TimeLineApi;
