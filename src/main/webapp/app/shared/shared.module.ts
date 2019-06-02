import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JblogSharedLibsModule, JblogSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [JblogSharedLibsModule, JblogSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [JblogSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JblogSharedModule {
  static forRoot() {
    return {
      ngModule: JblogSharedModule
    };
  }
}
