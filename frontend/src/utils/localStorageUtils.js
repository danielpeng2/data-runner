const LOCAL_LOGGED_IN_USER = 'dataRunnerLoggedInUser'

const getLoggedInUser = () => {
  let userJSON = window.localStorage.getItem(LOCAL_LOGGED_IN_USER)
  if (userJSON) {
    return JSON.parse(userJSON)
  }
  return null
}

const removeLoggedInUser = () => {
  window.localStorage.removeItem(LOCAL_LOGGED_IN_USER)
}

const saveLoggedInUser = (user) => {
  window.localStorage.setItem(LOCAL_LOGGED_IN_USER, JSON.stringify(user))
}

export default { 
  getLoggedInUser,
  removeLoggedInUser,
  saveLoggedInUser,
}