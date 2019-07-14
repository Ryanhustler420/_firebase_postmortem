import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first, take } from 'rxjs/operators';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { convertSnaps } from './db-utils';
import { Lesson } from './../model/lesson';

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
        // this quere requires an inedx. so gives an error along with a link

        // https://console.firebase.google.com/project/fir-scratch-board/database/firestore/indexes?create_
        // composite=ClFwcm9qZWN0cy9maXItc2NyYXRjaC1ib2FyZC9kYXRhYmFzZXMvKGRlZmF1
        // bHQpL2NvbGxlY3Rpb25Hcm91cHMvY291cnNlcy9pbmRleGVzL18QARoJCgVzZXFObxABGhAKDGxlc3NvbnNDb3VudBABGgwKCF9fbmFtZV9fEAE

        // grab this link and create an index
    )

    // throw an error because its not possible by the indexing order
    // return this.db.collection('courses', ref =>
    //   ref
    //     .where('seqNo', '>=', 5)
    //     .where('lessonsCount', '>=', 10)

    // this is also not valid. for this to work we have to make
    // index lessionCount and seqNo instead of seqNo and lessionCount.
    //     .where('seqNo', '>=', 5)
    //     .where('lessonsCount', '==', 10)

    // )

    .snapshotChanges()
      .pipe(
        map((snaps) => {
          return convertSnaps<Course>(snaps);
          // first will prevent real time data update.
      }),
        first(),
      // take()
      );
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.collection('courses',
        ref => ref.where('url', '==', courseUrl))
        .snapshotChanges()
        .pipe(map(snaps => {
          const courses = convertSnaps<Course>(snaps);
          return courses.length === 1 ? courses[0] : undefined;
        }), first());
    }

    findLessons(courseId: string, pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
      return this.db.collection(`courses/${courseId}/lessons`,
        ref => ref.orderBy('seqNo', 'asc')
                  .limit(pageSize)
                  .startAfter(pageNumber * pageSize))
        .snapshotChanges()
        .pipe(map(snaps => convertSnaps<Lesson>(snaps)), first());
    }

}
