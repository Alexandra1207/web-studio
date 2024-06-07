import {Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {DefaultResponseType} from "../../../../types/default-response.type";


@Component({
  selector: 'request-modal',
  templateUrl: './request-modal.component.html',
  styleUrl: './request-modal.component.scss'
})
export class RequestModalComponent {

  @Input() selectedOption: string = '';
  showSuccessMessage: boolean = false;
  failedRequest: boolean = false;


  constructor(public dialogRef: MatDialogRef<RequestModalComponent>, private fb: FormBuilder, private requestService: RequestService) {
    this.selectedOption = '';
  }

  requestForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^(?:\+)?(?:[0-9] ?){6,14}[0-9]$/)]],
    service: [this.selectedOption]
  })

  ngOnInit() {
    const selectedOption = this.requestService.getSelectedOption();
    const serviceControl = this.requestForm.get('service');

    if (serviceControl !== null) {
      serviceControl.setValue(selectedOption || 'Заявка на созвон');
    } else {
      console.log("'service' не определен в форме.");
    }
  }


  get showSelect(): boolean {
    return this.requestService.getShowSelectElement();
  }

  closePopup() {
    this.dialogRef?.close();
    this.showSuccessMessage = false;
  }


  postInfo() {
    if (this.requestForm.valid) {

      this.requestService.postRequest(this.requestForm.value).subscribe(
        (data: DefaultResponseType) => {
          if (!data.error) {
            console.log(data);
            this.showSuccessMessage = true;
          } else {
            this.failedRequest = true;
          }
        },
        error => {
          this.failedRequest = true;
        }
      );
    }

  }

}
