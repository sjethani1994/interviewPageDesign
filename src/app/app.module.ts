import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ErroHandlerInterceptor } from './service/http.interceptor';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [AppComponent, UserListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    Ng2SearchPipeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErroHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
