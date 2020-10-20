import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Note } from '../modal/note';
import {AngularFirestore, AngularFirestoreCollection,DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private notes: Observable<Note[]>;
  private noteCollection: AngularFirestoreCollection<Note>;

  constructor(private afs: AngularFirestore) {
    //define the collection
    this.noteCollection = this.afs.collection<Note>('notes');
    //here we get the collection, snapshot for getting the exact value
    this.notes = this.noteCollection.snapshotChanges().pipe(
      //available collection
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }
//configure the methods by defining getnotes method
  getNotes(): Observable<Note[]> {
    //return notes instead of getnotes function
    return this.notes;
  }
//gettting a single note
  getNote(id: string): Observable<Note> {
    return this.noteCollection.doc<Note>(id).valueChanges().pipe(
        take(1),
        map(note => {
          note.id = id;
          return note;
        })
    );
  }

  //here we create a new note
  addNote(note: Note): Promise<DocumentReference> {
    return this.noteCollection.add(note);
  }

  //here we update the note 
  updateNote(note: Note): Promise<void> {
    return this.noteCollection.doc(note.id).update({ title: note.title, content: note.content });
  }
//here we just delete
  deleteNote(id: string): Promise<void> {
    return this.noteCollection.doc(id).delete();
  }
}
