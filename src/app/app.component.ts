import {Component, OnInit} from '@angular/core';
import {ProcessInputService} from './services/processInput/process-input.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  translations: any;
  userInput: string = '';
  processedUserInput: [] = [];
  attackInputs: Array<string> = ['H', 'S', 'P', 'K', 'D']

  getArrayLength(array: Array<any>) {
    return array.length;
  }

  processInput() {
    let splitInput = this.userInput.split('>')
    this.processedUserInput = [];
    for (let i = 0; i < splitInput.length; i++) {
      let input = splitInput[i].trim();
      let payload = [];
      let attack: string;
      let aerial: boolean = false;
      if (this.attackInputs.includes(input.charAt(input.length - 1).toUpperCase())) {
        payload.push(this.translations[input.slice(0, -1)]);
        payload.push(this.translations[input.charAt(input.length - 1).toUpperCase()]);
      } else if (this.translations[input] !== undefined) {
        payload.push(this.translations[input]);
      } else {
        if (input.length === 6 || input.length === 7) {
          if (this.attackInputs.includes(input.charAt(input.length - 1).toUpperCase())) {
            attack = input.charAt(input.length - 1).toUpperCase();
            input = input.slice(0, -1);
          }
          if (input.charAt(0).toLowerCase() + input.charAt(1).toLowerCase() === 'j.') {
            aerial = true;
            input = input.slice(2);
          }
          switch (input) {
            // TODO: Fix undefined error when adding an attack
            case '632146':
              payload.push(this.translations['63214']);
              payload.push(this.translations['6']);
              // @ts-ignore
              if (attack !== '') {
                // @ts-ignore
                payload.push(this.translations[attack])
              }
              break;
            case '236236':
              payload.push(this.translations['236']);
              payload.push(this.translations['236']);
              // @ts-ignore
              if (attack !== '') {
                // @ts-ignore
                payload.push(this.translations[attack])
              }
              break;
            case '214214':
              payload.push(this.translations['214']);
              payload.push(this.translations['214']);
              // @ts-ignore
              if (attack !== '') {
                // @ts-ignore
                payload.push(this.translations[attack])
                break;
              }
          }
        } else {
          payload.push(input);
        }
      }
      // @ts-ignore
      this.processedUserInput.push(payload);
    }
    console.log(this.processedUserInput);
  }


  async ngOnInit() {
    // Importing the input translations from the JSON file
    let res = await fetch('./assets/input_translation.json');
    this.translations = await res.json();
    console.log(this.translations);
  }
}
