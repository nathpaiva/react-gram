export function loadFotos(fotos) {
  return { type: 'LOADFOTOS', fotos };
}

export function like(liker, fotoId) {
  return { type: 'LIKE', liker, fotoId };
}

export function newComment(comment, fotoId) {
  return { type: 'COMMENT', comment, fotoId };
}

export function notification(msg) {
  return { type: 'ALERT', msg };
}
