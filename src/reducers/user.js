export const initialState = {
  name: 'cm' 
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'changeUser':
      return {
        ...state,
        name: action.payload.name
      };

    default:
      return state;
  }
};
