import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';

import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TabsModule,
  ModalModule,
  TooltipModule,
  CollapseModule,
  AccordionModule,
  BsDropdownModule,
  PaginationModule,
  DatepickerModule,
  ProgressbarModule,
  TypeaheadModule
} from 'ngx-bootstrap';

import { GravatarDirective } from './directives/gravatar';

import { SessionService } from './services/session';
import { LocalService } from './services/local';

import { TrimPipe } from './pipes/trim';
import { CapitalizePipe } from './pipes/capitalize';
import { CharactersPipe } from './pipes/characters';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  declarations: [
    TrimPipe,
    CapitalizePipe,
    CharactersPipe,
    GravatarDirective
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    TooltipModule,
    ProgressbarModule,
    PaginationModule,
    TabsModule,
    ModalModule,
    CollapseModule,
    AccordionModule,
    BsDropdownModule,
    DatepickerModule,
    TypeaheadModule,
    TrimPipe,
    CapitalizePipe,
    CharactersPipe,
    GravatarDirective
  ],
  providers: [
    SessionService,
    TranslateService
  ]
})
export class SharedModule {}
