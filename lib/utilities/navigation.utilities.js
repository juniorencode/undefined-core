let systemName = 'Undefined';
let navigation = [];
let handleLogout = null;

const setSystemName = name => {
  systemName = name;
};

const setNavigation = options => {
  navigation = options;
};

const setHandleLogout = func => {
  handleLogout = func;
};

export {
  systemName,
  navigation,
  handleLogout,
  setSystemName,
  setNavigation,
  setHandleLogout
};
