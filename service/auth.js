// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id, user) {
//   return sessionIdToUserMap.set(id);
// }

const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  // Changed from set() to get()
  return sessionIdToUserMap.get(id);
}

// Optional: Add some utility functions
function removeUser(id) {
  return sessionIdToUserMap.delete(id);
}

function getAllActiveUsers() {
  return [...sessionIdToUserMap.values()];
}

module.exports = {
  setUser,
  getUser,
  removeUser,
  getAllActiveUsers
};

