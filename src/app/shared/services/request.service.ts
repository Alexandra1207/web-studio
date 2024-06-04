import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  selectedOption: string = '';

  constructor(private http: HttpClient) {

  }

  showSelectElement: boolean = true;

  postRequest(data: {name: string, phone: string, service: string}): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests',  {
      ...data,
      type: "order"
    });
  }




  setSelectedOption(option: string) {
    this.selectedOption = option;
  }

  getSelectedOption() {
    return this.selectedOption;
  }

  setShowSelectElement(value: boolean) {
    this.showSelectElement = value;
  }

  getShowSelectElement() {
    return this.showSelectElement;

  }
}
