import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {JblogSharedModule} from 'app/shared';
import {
  PostComponent,
  PostDeleteDialogComponent,
  PostDeletePopupComponent,
  PostDetailComponent,
  postPopupRoute,
  postRoute,
  PostUpdateComponent
} from './';

const ENTITY_STATES = [...postRoute, ...postPopupRoute];

@NgModule({
  imports: [JblogSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PostComponent, PostDetailComponent, PostUpdateComponent, PostDeleteDialogComponent, PostDeletePopupComponent],
  entryComponents: [PostComponent, PostUpdateComponent, PostDeleteDialogComponent, PostDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JblogPostModule {}
