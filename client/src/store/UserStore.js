import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor () {
    this._isAuth = false;
    this._username = 'Ralexandear'
    makeAutoObservable(this)
  }
  setAuth(bool) {
    this._isAuth = bool
  }
  setUser(user){
    this._user = user
  }
  get isAuth() {
    return this._isAuth
  }
  get username() {
    return this._username
  }
}