import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  resultSearch: string = '';
  form = new FormGroup({
    searchResult: new FormControl<string>(''),
  });

  sendSearchResultToHome() {
    return (this.resultSearch = this.form.controls.searchResult.value ?? '');
  }
}
