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

}
