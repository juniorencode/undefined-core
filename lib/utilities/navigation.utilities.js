let navigation = [];
let handleLogout = null;

const setNavigation = options => {
  navigation = options;
};

const setHandleLogout = func => {
  handleLogout = func;
};

export { navigation, handleLogout, setNavigation, setHandleLogout };
