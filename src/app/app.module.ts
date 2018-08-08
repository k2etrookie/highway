import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { QualityComponent } from './management/quality/quality.component';
import { ProgressComponent } from './management/progress/progress.component';
import { SafetyComponent } from './management/safety/safety.component';
import { ProjectComponent } from './project/project.component';
import { DivisionComponent } from './management/division/division.component';
import { AuthorityComponent } from './management/authority/authority.component';
import { DatamngComponent } from './management/datamng/datamng.component';
import { UserComponent } from './user/user.component';
import { EarlywarnComponent } from './earlywarn/earlywarn.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    QualityComponent,
    ProgressComponent,
    SafetyComponent,
    ProjectComponent,
    DivisionComponent,
    AuthorityComponent,
    DatamngComponent,
    UserComponent,
    EarlywarnComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
