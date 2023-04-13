import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pms-application';
  isLoading = false;

  constructor(
    public loaderService: LoaderService,
    private cdref: ChangeDetectorRef,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.title = 'pms-application';
    this.loaderService.isLoading.subscribe((isLoad) => {
      this.cdref.detectChanges();

      return (this.isLoading = isLoad);
    });
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang(lang);
  }
}
