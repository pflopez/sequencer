import {Component} from '@angular/core';
import {ClockService} from "./services/clock.service";
import {Track} from "./models/track";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sequencer';

  tracks = [
    new Track('kick', [1, 0, 0, 0], this.clockService.currentStep$, 16),
    new Track('snare', [0, 0, 1, 0], this.clockService.currentStep$, 8),
    new Track('hit-hat', [2, 0, 1, 0], this.clockService.currentStep$, 10),
    new Track('ride', [3, 0, 0, 0, 1, 0, 1, 0], this.clockService.currentStep$),
  ]

  velocity = 1 ;


  constructor(private clockService: ClockService) {
  }
  updateVelocity(velocity: number){
    this.velocity = velocity;
  }

}
