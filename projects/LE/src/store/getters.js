const getters = {
  center: state => state.app.center,
  markerTitle: state => state.app.markerTitle,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles
}
export default getters
