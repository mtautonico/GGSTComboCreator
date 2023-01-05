import {Component, OnInit} from '@angular/core';
import {ProcessInputService} from './services/processInput/process-input.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private processInputService: ProcessInputService) {
  }

  translations: any;
  combo: string = '';
  combo_list: Array<string> = [];

  // This portion is for translating the input
  translateInput() {
    for (let i = 0; i < this.combo_list.length; i++) {
      this.combo_list[i] = this.combo_list[i].trim();
      let input = this.translations[this.combo_list[i]];
      if (input !== undefined) {
        this.combo_list[i] = this.translations[this.combo_list[i]];
      }
    }
  }

  processChange() {
    this.combo_list = this.combo.split('>')
    this.translateInput();
    console.log(this.combo_list);
  }

  async ngOnInit() {
    // Importing the input translations from the JSON file
    let res = await fetch('./assets/input_translation.json');
    this.translations = await res.json();
    console.log(this.translations);
  }
}
