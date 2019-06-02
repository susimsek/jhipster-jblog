/* tslint:disable max-line-length */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {JblogTestModule} from '../../../test.module';
import {PostComponent} from 'app/entities/post/post.component';
import {PostService} from 'app/entities/post/post.service';
import {Post} from 'app/shared/model/post.model';

describe('Component Tests', () => {
  describe('Post Management Component', () => {
    let comp: PostComponent;
    let fixture: ComponentFixture<PostComponent>;
    let service: PostService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JblogTestModule],
        declarations: [PostComponent],
        providers: []
      })
        .overrideTemplate(PostComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PostComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PostService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Post(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.posts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
