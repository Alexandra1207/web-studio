import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ɵElement,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  selectedOption: string = '';

  constructor(private http: HttpClient) {

  }

  showSelectElement: boolean = true;

  postRequest(data: ɵTypedOrUntyped<{ [K in keyof { phone: (string | (((control: AbstractControl) => (ValidationErrors | null)) | ValidatorFn)[])[]; service: string[]; name: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] }]: ɵElement<{ phone: (string | (((control: AbstractControl) => (ValidationErrors | null)) | ValidatorFn)[])[]; service: string[]; name: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] }[K], null> }, ɵFormGroupValue<{ [K in keyof { phone: (string | (((control: AbstractControl) => (ValidationErrors | null)) | ValidatorFn)[])[]; service: string[]; name: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] }]: ɵElement<{ phone: (string | (((control: AbstractControl) => (ValidationErrors | null)) | ValidatorFn)[])[]; service: string[]; name: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] }[K], null> }>, any>): Observable<DefaultResponseType> {
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
