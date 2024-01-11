import { makeAutoObservable } from "mobx";

export type OrderType = 'antigen' | 'scooter';

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
  setOrderType (orderType: OrderType){
    this._orderType = orderType;
  }
  get isReady() {
    return this._isReady
  }
  get orderType() {
    return this._orderType;
  }
}