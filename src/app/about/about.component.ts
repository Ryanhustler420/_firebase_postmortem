import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from './../model/course';
import { of } from 'rxjs';


const config = {
  apiKey: "AIzaSyCcAvM_lC8amyB4m_K5zjcf5b7b-IEr_CA",
  authDomain: "fir-scratch-board.firebaseapp.com",
  databaseURL: "https://fir-scratch-board.firebaseio.com",
  projectId: "fir-scratch-board",
  storageBucket: "fir-scratch-board.appspot.com",
  messagingSenderId: "917473423866",
  appId: "1:917473423866:web:a169e59090eb92f7"
}


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    const courseRef = this.db.doc('/courses/5SceXGmXKGV757Glmlzs')
      .snapshotChanges()
      .subscribe(snap => {
        const course: any = snap.payload.data();
        console.log(course.relatedCourseRef);
      });
      // this below path string is been copied from the devtools of console log
      const ref = this.db.doc('courses/2LVjB3tcSVQ8iYD5pkID')
      .snapshotChanges()
      .subscribe(doc => console.log('ref', doc.payload.ref));
  }

  save() {
    const firebaseCourseRef =
        this.db.doc('/courses/9PgriYBTRB5SHss6KbGV').ref;

    const angularMaterialCourseRef =
        this.db.doc('/courses/OCbPS4gdiyWO9by3G04z').ref;

    const batch = this.db.firestore.batch();

    batch.update(firebaseCourseRef, {titles: {
      description: 'Firebase Course'
    }});

    batch.update(angularMaterialCourseRef, {titles: {
      description: 'Matarial Course'
    }});

    const batch$ = of(batch.commit());

    batch$.subscribe();
  }

  async runTransaction() {
    const newCounter = await this.db.firestore.runTransaction(async transaction => {
      console.log('Runnig transaction...');
      const courseRef = this.db.doc('/courses/9PgriYBTRB5SHss6KbGV').ref;
      const snap = await transaction.get(courseRef);
      const course = <Course> snap.data();
      // the idea is that when this transaction is running
      // no concurrent request will modify the data.
      // so, you have a snapshop of the data

      const lessonsCount = course.lessonsCount + 1;
      transaction.update(courseRef, {lessonsCount});

      // you sould return value if you want to, but dont declare lessonsCount
      // variable outside the function! BAD PRACTICE
      return lessonsCount;

      // NOTE:- never modify any component variables using this transaction
      // never!
    });

    console.log('Result lessons count = ', newCounter);

  }

}
