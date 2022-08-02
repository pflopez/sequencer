import {Component} from '@angular/core';
import {Track} from "pl-sequencer";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tracks = [
    new Track('kick', [1, 0, 0, 0], 16),
    new Track('snare', [0, 0, 1, 0], 8),
    new Track('hit-hat', [2, 0, 1, 0], 10),
    new Track('ride', [3, 0, 0, 0, 1, 0, 1, 0]),
  ]
}
