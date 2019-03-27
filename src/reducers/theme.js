export const initialState = { 
  primary: 'green' 
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        primary: action.newTheme
      };

    default:
      return state;
  }
};
