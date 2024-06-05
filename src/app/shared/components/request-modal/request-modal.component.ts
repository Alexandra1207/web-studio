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

 private selectElement: any;


  constructor(public dialogRef: MatDialogRef<RequestModalComponent>, private fb: FormBuilder, private requestService: RequestService) {
    this.selectedOption = '';
  }

  requestForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern( /^\+(?:[0-9] ?){6,14}[0-9]$/)]],
    service: ['']
  })
  ngOnInit() {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      service: [this.selectedOption]
    });

    const selectedOption = this.requestService.getSelectedOption();
    this.selectedOption = selectedOption;
  }


  get showSelect(): boolean {
    return this.requestService.getShowSelectElement();
  }

  closePopup() {
    this.dialogRef?.close();
    this.showSuccessMessage = false;
  }


  postInfo() {
    if (this.requestForm) {
      if (this.selectedOption) {
        this.requestForm.value.service = this.selectedOption;
      } else {
        this.requestForm.value.service = 'Заявка на созвон';
      }

      this.requestService.postRequest(this.requestForm.value as { name: string, phone: string, service: string}).subscribe((data: DefaultResponseType) => {
        if (!data.error) {
          this.showSuccessMessage = true;
        } else {
          this.failedRequest = true;
        }
      }, error => {
        this.failedRequest = true;
      });

    }
  }

  getSelectedOption(event: any) {
    const serviceControl = this.requestForm.get('service');
    this.selectedOption = event.target.value;
    this.requestForm.patchValue({service: this.selectedOption});
  }

}
