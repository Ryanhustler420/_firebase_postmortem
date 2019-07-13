import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first, take } from 'rxjs/operators';
import { Course } from '../model/course';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) { }

  loadAllCourses(): Observable<Course[]>  {
    // return this.db.collection('courses', ref => ref.orderBy('seqNo')).snapshotChanges()

    // return this.db.collection('courses', ref => ref.where('seqNo', '==', 2))

    // return this.db.collection('courses', ref =>
    //   ref
    //     .where('seqNo', '>', 2)
    //     .where('seqNo', '<=', 5)
    // )

    // this below is same as above code

    // return this.db.collection('courses', ref =>
    //   ref.orderBy('seqNo')
    //   // .startAt(0).endAt(5)
    //   .startAfter(0).endAt(5)
    // )

    // Array Filtering
    // return this.db.collection('courses', ref =>
    //   ref.where('categories', 'array-contains', 'BEGINNER')
    // )

    return this.db.collection('courses', ref =>
      ref.orderBy('seqNo')
    )

    .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map(snap => {
            return <Course> {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            };
          });
          // first will prevent real time data update.
      }),
        first(),
      // take()
      );
  }
}
