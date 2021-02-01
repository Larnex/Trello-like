// angular firebase has its own service to allow to interact with a DB but it's often useful to create own methods that are more descriptive and more specialized
// goal of this service is to create separation of concerns between back-end DB work and from front-end UI component

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from './board.model';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  // CREATE A NEW BOARD assosiated with currently logged in user
  // takes Board as argument
  async createBoard(data: Board) {
    // before create await for current user's user id
    const user = await this.afAuth.currentUser;
    // make reference to the 'boards' collection using this.db.collection('boards') and add 'add' method to add new document to DB
    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      // setting up default values for any properties that aren't explicitly passed in. In this case for tasks property
      tasks: [{description: 'Hello!', label: 'yellow'}]
    })
  }


  // DELETE BOARD
  deleteBoard(boardId: string) {
    // takes the board id as a string then it references the boards collection then it references document based on that document id then calls delete which is remove specific board from the database
    return this.db.collection('boards').doc(boardId).delete();
  }

  // UPDATE THE TASKS ON BOARD
  updateTasks(boardId: string, tasks: Task[]) {
    // words similar as deleteBoard method for referencing document
    return this.db.collection('boards').doc(boardId).update({tasks})
  }

  // DELETE SPECIFIC TASK ON BOARD
  removeTask(boardId: string, task: Task) {
    // firestore has a special type of update that will do a deep check on an object in a database and remove it accordingly
    return this.db.collection('boards').doc(boardId).update({
      // find that specific task (as an argument) in an array and remove it
      // this method is efficient and useful when remove item from array of items
      tasks: firebase.default.firestore.FieldValue.arrayRemove(task)
    })
  }

  // GET ALL BOARDS OWNED BY CURRENT USER
  getUserBoards() {
    // need to sort those boards based on priority number
    // for sorting user's id is needed and be sure that everything is updated in real time

    // get current user object as an observable which we can use to make a request to the DB with the current user's ID
    return this.afAuth.authState.pipe(
      switchMap(user => {
        // get user object if user's logged in
        if (user) {
          // Second argument is the firestore query to that collection
          return this.db.collection<Board>('boards', ref =>
            // make reference where the user id is equal to the user id of currently logged in user
            // orderBy('priority') method for sorting by property field
            ref.where('uid', '==', user.uid).orderBy('priority')
            // call valueChanges for returning this query as an observable
            // idField: 'id' add document id to document itself. Name of key which contains doc id in this case will be 'id'
          ).valueChanges({idField: 'id'})
        }
        // If user's not logged in return an empty array
        else {
          return [];
        }

      })
    )
  }

  // SORT BOARDS ON DRAG
  sortBoards(boards: Board[]) {
    // each board is an individual document in firestore when the user changes the order - need to iterate over all of those boards and figure out what the new ordering is
    // The easiest way to do that is to figure out what the intended ordering is based on the user's interaction in the front-end and then send that entire array of boards to firestore and update the priority on each one

    const db = firebase.default.firestore();
    const batch = db.batch();

    // reference all the documents that need to be updated
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, {priority: idx}))

    // write all these rights together as a single transaction
    batch.commit();
  }
}
