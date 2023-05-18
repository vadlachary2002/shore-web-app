export const initialState = {
  isAdmin: false,
  user: false
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
  case 'USER':
    return {
      ...state,
      user: action.payload
    };
  case 'ADMIN':
    return {
      ...state,
      isAdmin: action.payload
    };
  default:
    return state;
  }
};
