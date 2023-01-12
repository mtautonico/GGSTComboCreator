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
  realComboList: any = [];


  // This portion is for translating the input
  translateInput() {
    for (let i = 0; i < this.realComboList.length; i++) {
      let input = this.translations[this.realComboList[i]];
      if (input !== undefined) {
        this.realComboList[i][0] = [this.translations[this.realComboList[i][0]]];
      }
    }
  }

  processChange() {
    this.combo_list = this.combo.split('>')
    for (let i = 0; i < this.combo_list.length; i++) {
      // This is to reset the list because im using .push()
      this.realComboList = []
      // Remove the unnecessary characters from the input
      this.combo_list[i] = this.combo_list[i].trim();
      console.log(this.combo_list);
      this.realComboList.push([[this.combo_list[i]]]);
    }
    this.translateInput();
    console.log(this.realComboList);
  }

  async ngOnInit() {
    // Importing the input translations from the JSON file
    let res = await fetch('./assets/input_translation.json');
    this.translations = await res.json();
    console.log(this.translations);
  }
}
