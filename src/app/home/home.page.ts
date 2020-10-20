import { Component, OnInit } from '@angular/core';

//important
import {Observable} from 'rxjs';
import {Note} from '../modal/Note';
import {FirebaseService} from '../services/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  //hhere configure properties
   public notes: Observable<Note[]>;
  //store all notes and 
  constructor(private fbService: FirebaseService) {}

  ngOnInit(): void {
    //load note data inside
    this.notes = this.fbService.getNotes();
  }
}
