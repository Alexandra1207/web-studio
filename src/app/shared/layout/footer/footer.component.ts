import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RequestModalComponent} from "../../components/request-modal/request-modal.component";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public dialog: MatDialog, private requestService: RequestService) {}

  openModalWithoutSelect() {
    this.requestService.setShowSelectElement(false);
    const dialogRef = this.dialog.open(RequestModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      return;
    });
  }
}
