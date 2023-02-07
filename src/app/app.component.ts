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


  processInput() {
    let splitInput = this.userInput.split('>')
    this.processedUserInput = [];
    for (let i = 0; i < splitInput.length; i++) {
      let input = splitInput[i].trim();
      let payload = [];
      // Separates the attack input if present from the rest of the input
      let attack: string;
      if (this.attackInputs.includes(input.charAt(input.length - 1).toUpperCase()) && input.length > 1 && input.length < 8) {
        attack = input.charAt(input.length - 1).toUpperCase();
        input = input.slice(0, input.length - 1);
      }
      // Checks if the input is an aerial
      let aerial: boolean = false;
      if (input.charAt(0).toLowerCase() + input.charAt(1).toLowerCase() === 'j.') {
        aerial = true;
        input = input.slice(2);
      }
      // Checks the inputs for special cases
      switch (input) {
        case '632146':
          payload.push(this.translations['63214']);
          payload.push(this.translations['6']);
          break
        case '236236':
          payload.push(this.translations['236']);
          payload.push(this.translations['236']);
          break
        case '214214':
          payload.push(this.translations['214']);
          payload.push(this.translations['214']);
          break
        case '66':
          payload.push(this.translations['6']);
          payload.push(this.translations['6']);
          break
        default:
          if (this.translations[input] !== undefined) {
            payload.push(this.translations[input]);
          } else {
            payload.push(input)
          }
          break
      }
      // Adds the attack input if present
      // @ts-ignore
      if (attack != null) {
        // Adds the attack icon if the previous portion of the payload is a valid input
        if (payload[0].includes('.png')) {
          payload.push(this.translations[attack]);
        // Adds the attack input if the previous portion of the payload is not an input
        } else {
          payload.push(attack)
        }
      }
      // Pushes the payload for the html to read
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
