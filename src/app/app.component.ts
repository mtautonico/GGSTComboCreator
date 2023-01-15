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

  async ngOnInit() {
    // Importing the input translations from the JSON file
    let res = await fetch('./assets/input_translation.json');
    this.translations = await res.json();
    console.log(this.translations);
  }
}
