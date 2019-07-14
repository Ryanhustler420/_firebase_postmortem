import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {tap, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from './../services/courses.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;

  lessons: Lesson[];

  lastPageLoaded = 0;

  loading = false;

  displayedColumns = ['seqNo', 'description', 'duration'];


  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) {


  }

  ngOnInit() {

    this.loading = true;

    this.course = this.route.snapshot.data['course'];

    this.coursesService.findLessons(this.course.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(lessons => this.lessons = lessons);
  }

  loadMore() {
    this.loading = true;
    this.lastPageLoaded++;
    this.coursesService.findLessons(this.course.id, this.lastPageLoaded)
    .pipe(finalize(() => this.loading = false))
    .subscribe(lessons => this.lessons = this.lessons.concat(lessons));
  }


}
