import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatBottomSheetModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavigationComponent } from './navigation/navigation.component';
import { ListOfWorksComponent } from './list-of-works/list-of-works.component';
import { ConservationComponent } from './conservation/conservation.component';
import { WorksDoneComponent, ConfirmModal } from './works-done/works-done.component';
import { AddWorkDoneComponent } from './add-work-done/add-work-done.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabaseModule } from 'angularfire2/database';


const config = {
  apiKey: "AIzaSyBrCMMHzR4MXlj2zSUoUYPxyCSJ50OnqOg",
  authDomain: "klima-project.firebaseapp.com",
  databaseURL: "https://klima-project.firebaseio.com",
  projectId: "klima-project",
  storageBucket: "klima-project.appspot.com",
  messagingSenderId: "1073147389049"
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ListOfWorksComponent,
    ConservationComponent,
    WorksDoneComponent,
    AddWorkDoneComponent,
    ConfirmModal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    AddWorkDoneComponent,
    ListOfWorksComponent,
    ConfirmModal,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }

