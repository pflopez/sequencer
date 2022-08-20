import {Component, Inject, Renderer2} from '@angular/core';
import {PlSequencerService, createTrackData} from "pl-sequencer";
import {DOCUMENT} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tracks = this.sequencer.tracks;
  inverted = false;

  constructor(private sequencer: PlSequencerService,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) {

    this.tracks = this.sequencer.createTracks([
      createTrackData('kick', 'assets/sounds/1/kick.wav', [1, 0, 0, 0], 16),
      createTrackData('snare', 'assets/sounds/1/snare.wav', [0, 0, 0, 0, 1, 0, 0, 0], 8),
      createTrackData('hit-hat', 'assets/sounds/1/lev.wav', [3, 3, 1, 3], 16),
      createTrackData('tom', 'assets/sounds/1/odd.wav', [3, 0, 0, 0, 1, 0, 1], 6),
    ])
  }

  invert() {
    this.inverted = !this.inverted;
    if (this.inverted) {
      this.renderer.addClass(this.document.body, 'inverted');
    } else {
      this.renderer.removeClass(this.document.body, 'inverted');
    }

  }
}

