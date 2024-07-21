let navigation = [];
let handleLogout = null;
let Link = null;
let NavLink = null;
let useNavigate = null;

const setLink = node => {
  Link = node;
};

const setNavLink = node => {
  NavLink = node;
};

const setNavigation = options => {
  navigation = options;
};

const setUseNavigate = options => {
  navigation = options;
};

const setHandleLogout = func => {
  handleLogout = func;
};

export {
  Link,
  NavLink,
  navigation,
  useNavigate,
  handleLogout,
  setLink,
  setNavLink,
  setNavigation,
  setUseNavigate,
  setHandleLogout
};
