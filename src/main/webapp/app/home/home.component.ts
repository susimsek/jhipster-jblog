import { Component, OnInit } from '@angular/core';
import { IPost } from 'app/shared/model/post.model';
import { PostService } from 'app/entities/post';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  posts: IPost[];
  constructor(private postService: PostService) {}

  loadAll() {
    this.postService
      .query()
      .pipe(
        filter((res: HttpResponse<IPost[]>) => res.ok),
        map((res: HttpResponse<IPost[]>) => res.body)
      )
      .subscribe(
        (res: IPost[]) => {
          this.posts = res;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
  }
  ngOnInit() {
    this.loadAll();
  }
}
