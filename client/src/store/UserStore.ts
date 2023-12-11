import { makeAutoObservable } from "mobx";

export default class UserStore {
  private _isAuth: boolean;
  private _username: string | undefined;
  
  constructor () {
    this._isAuth = false;
    this._username = 'Ralexandear'
    makeAutoObservable(this)
  }
  setAuth(bool) {
    this._isAuth = bool
  }
  get isAuth() {
    return this._isAuth
  }
  get username() {
    return this._username
  }
}