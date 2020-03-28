export default class UserService {
  static hasRole(role) {
    return window.currentUser.roles.includes(role);
  }
}
