import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { MatBottomSheet } from '@angular/material';
import { AddWorkDoneComponent } from "../add-work-done/add-work-done.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

interface Data {
  clientData: string;
  devices: object;
  endData: object;
  startData: object;
  message: string;
  typeOfWork: string;
  workAddress: string;
  workName: string;
  nextConservationDate: string;
}

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-works-done',
  templateUrl: './works-done.component.html',
  styleUrls: ['./works-done.component.scss']
})
export class WorksDoneComponent implements OnInit {

  workData: AngularFirestoreCollection<Data>;
  worksData: Observable<Data[]>;
  formatedDataArr: any;

  constructor(
    private afs: AngularFirestore,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    let formatedData = [];
    this.workData = this.afs.collection<Data>('data');
    this.worksData = this.workData.valueChanges();
    this.afs
      .collection<Data>('data')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data(),
          }
        })
      }))
      .subscribe(result => {
        formatedData = [];
        for (const res of result) {
          formatedData.push(res)
        }
        this.formatedDataArr = formatedData;
      });

  }



  editModalOpen(data): void{
    this.bottomSheet.open(AddWorkDoneComponent, {
      data: {
        data,
        edit: true,
      }
    });
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmModal, {
      width: '250px',
      data: id,
    });
    dialogRef.afterClosed().subscribe()
  }
}


@Component({
  selector: 'app-works-done-confirm',
  templateUrl: 'works-done-confirm.component.html',
})

export class ConfirmModal {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickDelete(dataId: string): void {
    this.afs.collection('data')
      .doc(dataId)
      .delete()
      .then(() => {
        this.snackBar.open('Dane zostały poparwnie usuniętę', '',{
          duration: 2000,
        });
      })
      .catch(() => {
        this.snackBar.open('Podczas usuwania danych wystąpił błąd', '',{
          duration: 2000,
        });
      });
    this.dialogRef.close();
  }

}
