import {Component} from '@angular/core';
import {Track} from "pl-sequencer";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tracks = [
    new Track('kick', 'assets/sounds/1/kick.wav', [1, 0, 0, 0], 16),
    new Track('snare','assets/sounds/1/shot_mud.wav',  [0, 0, 1, 0], 8),
    new Track('hit-hat', 'assets/sounds/1/hat.wav',[2, 0, 1, 0], 10),
    new Track('ride', 'assets/sounds/1/lev.wav', [3, 0, 0, 0, 1, 0, 1, 0]),
  ]
}
