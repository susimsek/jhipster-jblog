import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import {IPost} from 'app/shared/model/post.model';
import {AccountService} from 'app/core';
import {PostService} from './post.service';

@Component({
  selector: 'jhi-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {
  posts: IPost[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected postService: PostService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

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
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPosts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPost) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInPosts() {
    this.eventSubscriber = this.eventManager.subscribe('postListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
