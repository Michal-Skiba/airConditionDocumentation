import { Component, OnInit } from '@angular/core';
import { map } from "rxjs/operators";
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs/internal/Observable";
import * as moment from 'moment';

interface Data {
  clientData: string;
  devices: object;
  endData: object;
  startData: object;
  message: string;
  typeOfWork: string;
  workAddress: string;
  workName: string;
}

@Component({
  selector: 'app-conservation',
  templateUrl: './conservation.component.html',
  styleUrls: ['./conservation.component.scss']
})
export class ConservationComponent implements OnInit {

  workData: AngularFirestoreCollection<Data>;
  worksData: Observable<Data[]>;
  formatedDataArr: any;

  constructor(
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
  ) { }

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
          if(res.nextConservationDate) {
            formatedData.push(res)
          }
        }
        formatedData.sort((a, b) => {
          return moment(a.nextConservationDate).diff(moment(b.nextConservationDate))
        });
        this.formatedDataArr = formatedData;
      });
  }

  deleteFromConservation(data: object, dataId: string): void {
    let dataToFire = {
      workName: data.workName,
      workAddress: data.workAddress,
      clientData: data.clientData,
      startDate: data.startDate,
      endDate: data.endDate,
      message: data.message,
      typeOfWork: data.typeOfWork,
      devices: data.devices,
      nextConservationDate: false,
    };
    this.afs.collection('data')
      .doc(dataId)
      .set(dataToFire)
      .then(() => {
        this.snackBar.open('Dane zostały poprawnie zaktualizowane', '',{
          duration: 2000,
        });
      })
      .catch(() => {
        this.snackBar.open('Wystąpił bład, dane nie zostały zapisane', '',{
          duration: 2000,
        });
      })
  }

  conservationDone(data: object, dataId: string): void {
    let dataToFire = {
      workName: data.workName,
      workAddress: data.workAddress,
      clientData: data.clientData,
      startDate: data.startDate,
      endDate: data.endDate,
      message: data.message,
      typeOfWork: data.typeOfWork,
      devices: data.devices,
      nextConservationDate: moment(data.nextConservationDate, 'YYYY-MM-DD').add('month', 6).format('YYYY-MM-DD')
    };
    this.afs.collection('data')
      .doc(dataId)
      .set(dataToFire)
      .then(() => {
        this.snackBar.open('Dane zostały poprawnie zaktualizowane', '',{
          duration: 2000,
        });
      })
      .catch(() => {
        this.snackBar.open('Wystąpił bład, dane nie zostały zapisane', '',{
          duration: 2000,
        });
      })
  }
}
