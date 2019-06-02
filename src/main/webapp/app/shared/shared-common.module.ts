import { NgModule } from '@angular/core';

import { JblogSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [JblogSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [JblogSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JblogSharedCommonModule {}
