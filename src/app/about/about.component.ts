import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Course } from '../model/course';

const config = {
  apiKey: "AIzaSyCcAvM_lC8amyB4m_K5zjcf5b7b-IEr_CA",
  authDomain: "fir-scratch-board.firebaseapp.com",
  databaseURL: "https://fir-scratch-board.firebaseio.com",
  projectId: "fir-scratch-board",
  storageBucket: "fir-scratch-board.appspot.com",
  messagingSenderId: "917473423866",
  appId: "1:917473423866:web:a169e59090eb92f7"
}

firebase.initializeApp(config);

const db = firebase.firestore();

// dont need to set these settings

// const settings = {
//   timestampsInSnapshots: true
// };

// db.settings(settings);

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    db.collection('courses').get()
      .then(snaps => {
        const courses: Course[] = snaps.docs.map(snap => {
          return <Course>{
            id: snap.id,
            ...snap.data()
          };
        });
        console.log(courses);
      });
  }

}
