import { List } from 'immutable';

function _changeFoto(list, fotoId, callbackProperties) {
  const oldStateFoto = list.find(foto => foto.id === fotoId);

  const newProperties = callbackProperties(oldStateFoto);

  const newStateFoto = Object.assign({}, oldStateFoto, newProperties);

  const indiceList = list.findIndex(foto => foto.id === fotoId);
  return list.set(indiceList, newStateFoto);
}

export function timeline(state = new List(), action) {

  if (action.type === 'LOADFOTOS') {

    return new List(action.fotos);
  }

  if (action.type === 'COMMENT') {

    return _changeFoto(state, action.fotoId, oldStateFoto => {
      const newComments = oldStateFoto.comentarios.concat(action.comment);
      return { comentarios: newComments };
    });
  }

  if (action.type === 'LIKE') {

    return _changeFoto(state, action.fotoId, oldStateFoto => {
      const likeada = !oldStateFoto.likeada;

      const liker = action.liker;
      const checkLiker = oldStateFoto.likers.find(foto => foto.login === liker.login);

      let newLikers;
      if (checkLiker === undefined) {
        newLikers = oldStateFoto.likers.concat(liker);
      } else {
        newLikers = oldStateFoto.likers.filter(foto => foto.login !== liker.login);
      }
      return { likeada, likers: newLikers };
    });
  }

  return state;
}
