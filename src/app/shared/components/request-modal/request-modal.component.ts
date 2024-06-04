import {Component, ElementRef, Input, ViewChild} from '@angular/core';
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

  showSelectElement: boolean = false;

  // postRequest() {
  //   // Здесь добавьте логику для отправки заявки
  //   this.showSuccessMessage = true;
  // }
  //
  // closePopup() {
  //   this.showSuccessMessage = false;
  // }

  private selectElement: any;


  constructor(public dialogRef: MatDialogRef<RequestModalComponent>, private fb: FormBuilder, private requestService: RequestService) {
    this.selectedOption = '';
  }

  requestForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    service: ['']
    // service: [this.selectedOption]
    // service: this.showSelect ? '' : 'Сервис не указан'
    // service: '' as string
    // service: this.showSelect ? null : 'Сервис не указан' as string | null
    // service: (this.showSelect ? ['', Validators.required] : 'Сервис не указан')
    // phone: ['', [Validators.required, Validators.pattern( /^\+(?:[0-9] ?){6,14}[0-9]$/)]],
    // service: [null, Validators.required],
    // service: ['Сервис не указан'],
  })
  ngOnInit() {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      service: [this.selectedOption]
    });

    const selectedOption = this.requestService.getSelectedOption();
    this.selectedOption = selectedOption;
    console.log(selectedOption);
    // const selectedOption = this.requestService.getSelectedOption();
    // console.log(selectedOption);
  }

  // onOptionChange() {
  //   //   const serviceControl = this.requestForm.get('service');
  //   //   serviceControl?.setValue(this.selectedOption);;
  //   //   // this.requestService.setSelectedOption(this.selectedOption);
  //   // }


  onOptionChange(event: any) {
    this.selectedOption = event.target.value;
    this.requestForm.patchValue({service: this.selectedOption});
  }

  get showSelect(): boolean {
    console.log(this.requestService.getShowSelectElement());
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
          console.log(data.message);
        }
      }, error => {
        this.failedRequest = true;
        console.log(error.message);
      });

      console.log(this.requestForm.value);
    }
  }

  // postInfo() {
  //
  //   if (this.requestForm) {
  //     if (this.selectedOption) {
  //       this.requestForm.value.service = this.selectedOption;
  //     } else {
  //       this.requestForm.value.service = 'Сервис не указан';
  //     }
  //     this.requestService.postRequest(this.requestForm.value as { name: string, phone: string, service: string}).subscribe((data: DefaultResponseType) => {
  //       if (!data.error) {
  //         this.showSuccessMessage = true;
  //       }
  //       if (data.error) {
  //         this.failedRequest = true;
  //         // throw new Error(data.message);
  //       }
  //     })
  //     console.log(this.requestForm.value);
  //   }
  //   // if (this.requestForm && this.requestForm.get('service')) {
  //   //   this.requestForm.value.service = this.selectedOption;
  //   //   console.log(this.requestForm.value);
  //   // }
  //   // const serviceControl = this.requestForm.get('service');
  //   // if (serviceControl) {
  //   //   serviceControl.setValue(this.selectedOption);
  //   //   console.log(this.requestForm.value);
  //   // }
  //   // const serviceControl = this.requestForm.get('service');
  //   // if (serviceControl) { // Проверка на null
  //   //   serviceControl.setValue(this.selectedOption);
  //   //   console.log(this.requestForm.value);
  //   // }
  //   // this.requestForm.get('service').setValue(this.selectedOption);
  //   // console.log(this.requestForm.value);
  //   // const selectedValue = this.selectElement.nativeElement.value;
  //   // const serviceControl = this.requestForm.get('service');
  //   // this.selectedOption = serviceControl?.value ?? '';
  //   // console.log(this.selectedOption);
  //   // console.log(this.requestForm.value);
  //   // console.log(selectedValue);
  //   // if (this.requestForm.valid) {
  //   //   const value = this.requestForm.value;
  //   //   value.service = this.showSelect ? value.service : 'Сервис не указан';
  //   //
  //     this.requestService.postRequest(this.requestForm.value as { name: string, phone: string, service: string}).subscribe((data: DefaultResponseType) => {
  //       if (!data.error) {
  //         this.showSuccessMessage = true;
  //       }
  //       if (data.error) {
  //         throw new Error(data.message);
  //       }
  //     })
  //   // }
  // }

  getSelectedOption(event: any) {
    const serviceControl = this.requestForm.get('service');
    // this.selectedOption = serviceControl?.value ?? '';
    console.log(serviceControl);
    this.selectedOption = event.target.value;
    this.requestForm.patchValue({service: this.selectedOption});
  }
  //   if (this.requestForm.valid) {
  //     console.log(this.requestForm.value);
  //     this.requestService.postRequest(this.requestForm.value as { name: string, phone: string, service: string}).subscribe((data: DefaultResponseType) => {
  //       if (!data.error) {
  //         this.showSuccessMessage = true;
  //       }
  //       if (data.error) {
  //         throw new Error(data.message);
  //       }
  //     })
  //   }
  // }
}
