import {TrackData} from "./models/interfaces";
import {Track} from "./models/track";
import {ClockService} from "./services/clock.service";

export class Sequencer {

  tracks: Track[] = [];
  clock = new ClockService();
  playing$ = this.clock.playing$;

  constructor(tracksData?: TrackData[]) {
    if (tracksData) {
      this.tracks = this.createTracks(tracksData);
    }
  }

  private createTracks(tracksData: TrackData[]): Track[] {
    return tracksData.map(trackData => new Track(trackData, this.clock.currentStep$))
  }

  toggle() {
    this.clock.toggleRun();
  }

}
