import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { AddWorkDoneComponent } from "../add-work-done/add-work-done.component";

@Component({
  selector: 'app-list-of-works',
  templateUrl: './list-of-works.component.html',
  styleUrls: ['./list-of-works.component.scss']
})
export class ListOfWorksComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet) {}

  addWorkFormOpen(): void {
    this.bottomSheet.open(AddWorkDoneComponent, {
      data: {
        edit: false,
      }
    });
  }

  ngOnInit() {
  }

}
