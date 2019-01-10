import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-add-work-done',
  templateUrl: './add-work-done.component.html',
  styleUrls: ['./add-work-done.component.scss']
})
export class AddWorkDoneComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<AddWorkDoneComponent>,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) {}

  contactForm: FormGroup;
  message = new ReactiveMessage();
  selectedValue = "Nowa instalacja";
  loading = false;

  closeForm(): void {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit() {
    if (this.data.edit) {
      this.selectedValue = this.data.data.typeOfWork;
    }
    this.contactForm = new FormGroup({
      workName: new FormControl(null, [Validators.required]),
      workAddress: new FormControl(null, [Validators.required]),
      clientData: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
      typeOfWork: new FormControl(null, [Validators.required]),
      devices: new FormArray([new FormControl(null)])
    });

  }

  addDevice() {
    const arr = <FormArray>this.contactForm.get('devices');
    arr.push(new FormControl(null));
  }

  updateData(data: any, dataId: string) {
    this.loading = true;
    let dataToFire = {
      workName: data.workName,
      workAddress: data.workAddress,
      clientData: data.clientData,
      startDate: data.startDate,
      endDate: data.endDate,
      message: data.message,
      typeOfWork: data.typeOfWork,
      devices: data.devices,
    };
    this.afs.collection('data')
      .doc(dataId)
      .set(dataToFire)
      .then(() => {
        this.snackBar.open('Dane zostały poprawnie zaktualizowane', '',{
          duration: 2000,
        });
        this.closeForm();
        this.onReset();
        this.loading = false;
      })
      .catch(() => {
        this.snackBar.open('Wystąpił bład, dane nie zostały zapisane', '',{
          duration: 2000,
        });
        this.onReset();
        this.closeForm();
        this.loading = false;
      })

  }


  saveData(data) {
    this.loading = true;
    let dateOfConservation = moment(data.endDate, 'YYYY-MM-DD').add('month', 6).format('YYYY-MM-DD');
    let dataToFire = {
      workName: data.workName,
      workAddress: data.workAddress,
      clientData: data.clientData,
      startDate: data.startDate,
      endDate: data.endDate,
      message: data.message,
      typeOfWork: data.typeOfWork,
      devices: data.devices,
      nextConservationDate: dateOfConservation,
    };
    this.afs.collection('data')
      .add(dataToFire)
      .then(() => {
        this.snackBar.open('Dane zostały zapisane poprawnie', '',{
          duration: 2000,
        });
        this.onReset();
        this.closeForm();
        this.loading = false;
      })
      .catch(() => {
        this.snackBar.open('Wystąpił bład, dane nie zostały zapisane', '',{
          duration: 2000,
        });
        this.onReset();
        this.closeForm();
        this.loading = false;
      })
  }

  onSubmit() {
    if(this.data.edit) {
      this.message.workName = this.contactForm.get('workName').value || this.data.data.workName;
      this.message.workAddress = this.contactForm.value.workAddress || this.data.data.workAddress;
      this.message.clientData = this.contactForm.value.clientData || this.data.data.clientData;
      this.message.startDate = this.data.data.startDate;
      this.message.endDate = this.data.data.endDate;
      this.message.message = this.contactForm.value.message || this.data.data.message;
      this.message.typeOfWork = this.contactForm.value.typeOfWork || this.data.data.typeOfWork;
      this.message.devices = this.data.data.devices;
      this.updateData(this.message, this.data.data.id);
    } else {
      this.message.workName = this.contactForm.get('workName').value;
      this.message.workAddress = this.contactForm.value.workAddress;
      this.message.clientData = this.contactForm.value.clientData;
      this.message.startDate = this.contactForm.value.startDate;
      this.message.endDate = this.contactForm.value.endDate;
      this.message.message = this.contactForm.value.message;
      this.message.typeOfWork = this.contactForm.value.typeOfWork;
      this.message.devices = this.contactForm.value.devices;
      this.saveData(this.message);
    }
  }

  onReset() {
    this.contactForm.reset();
  }
}

class ReactiveMessage {
  constructor(
    public workName?: string,
    public workAddress?: string,
    public clientData?: string,
    public startDate?: object,
    public endDate?: object,
    public message?: string,
    public typeOfWork?: string,
    public devices?: object,
  ) {}
}
