import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public readonly isLoading = this._isLoading.asObservable();
  show() {
    this._isLoading.next(true);
  }
  hide() {
    this._isLoading.next(false);
  }

  constructor() {}
}
