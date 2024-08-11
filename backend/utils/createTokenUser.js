const createTokenUser = (user) => {
  return { Id: user._id, name: user.name, role: user.role };
};

module.exports = createTokenUser;