import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';
import {IPost, Post} from 'app/shared/model/post.model';
import {PostService} from './post.service';

@Component({
  selector: 'jhi-post-update',
  templateUrl: './post-update.component.html'
})
export class PostUpdateComponent implements OnInit {
  post: IPost;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    body: [null, [Validators.required]],
    author: [null, [Validators.required]]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected postService: PostService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ post }) => {
      this.updateForm(post);
      this.post = post;
    });
  }

  updateForm(post: IPost) {
    this.editForm.patchValue({
      id: post.id,
      title: post.title,
      body: post.body,
      author: post.author
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const post = this.createFromForm();
    if (post.id !== undefined) {
      this.subscribeToSaveResponse(this.postService.update(post));
    } else {
      this.subscribeToSaveResponse(this.postService.create(post));
    }
  }

  private createFromForm(): IPost {
    const entity = {
      ...new Post(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      body: this.editForm.get(['body']).value,
      author: this.editForm.get(['author']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPost>>) {
    result.subscribe((res: HttpResponse<IPost>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
