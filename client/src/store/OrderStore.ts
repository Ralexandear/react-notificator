import { makeAutoObservable } from "mobx";

type OrderType = 'antigen' | 'scooter';

export default class OrderStore {
  private _isReady: boolean;
  private _orderType?: OrderType;

  constructor () {
    this._isReady = false;
    makeAutoObservable(this)
  }
  configureReadyness (bool: boolean) {
    this._isReady = bool;
  }
  setOrderTyoe (orderType: OrderType){
    this._orderType = orderType;
  }
  get isReady() {
    return this._isReady
  }
  get orderType() {
    return this._orderType;
  }
}