const Reducer = (state, action) => {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };

    case "USER_SIGNOUT":
      localStorage.clear();
      return {
        ...state,
        userInfo: null,
        notes: [],
        translations: [],
      };

    // case "ADD_NOTES":
    //   var newNote = [...state.note, action.payload];
    //   console.log(newNote);
    //   return { ...state, newNote };

    // case "ADD_TRANS":
    //   var newtrans = [...state.translations, action.payload];
    //   console.log(newtrans);
    //   return { ...state, newtrans };

    default:
      return state;
  }
};

export default Reducer;
