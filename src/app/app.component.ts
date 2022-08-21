import {Component, Inject, Renderer2} from '@angular/core';
import {createTrackData, TrackData, Sequencer} from "pl-sequencer";
import {DOCUMENT} from "@angular/common";

const DEMO_TRACKS_1 = [
  createTrackData('kick', 'assets/sounds/1/kick.wav', [1, 3, 0, 0], 4),
  createTrackData('snare', 'assets/sounds/1/snare.wav', [0, 0, 0, 0, 1, 0, 0, 0], 8),
  createTrackData('hit-hat', 'assets/sounds/1/lev.wav', [1, 0, 1, 0], 4),
];

const DEMO_TRACKS_MAIN = [
  createTrackData('kick', 'assets/sounds/1/kick.wav', [1, 0, 0, 0], 16),
  createTrackData('snare', 'assets/sounds/1/snare.wav', [0, 0, 0, 0, 1, 0, 0, 0], 8),
  createTrackData('hit-hat', 'assets/sounds/1/lev.wav', [3, 3, 1, 3], 16),
  createTrackData('tom', 'assets/sounds/1/odd.wav', [3, 0, 0, 0, 1, 0, 1], 6),
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tracksData: TrackData[] = DEMO_TRACKS_MAIN;
  simpleSequencer = new Sequencer(DEMO_TRACKS_1);

  // theme
  inverted = false;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {
  }

  invert() {
    this.inverted = !this.inverted;
    if (this.inverted) {
      this.renderer.addClass(this.document.body, 'inverted');
    } else {
      this.renderer.removeClass(this.document.body, 'inverted');
    }
  }

  play() {
    this.simpleSequencer.toggle();
  }
}

