export default function(state = {}, action) {
  switch (action.type) {
    case 'GET_ARTIST':
      return { ...state, artist: action.payload }
  }
  return state
}
