import {Injectable} from '@angular/core';
import {TrackData} from "./models/interfaces";
import {Track} from "./models/track";
import {ClockService} from "./services/clock.service";

@Injectable({
  providedIn: 'root'
})
export class PlSequencerService {

  tracks: Track[] = [];

  constructor(private clock: ClockService) {
  }

  createTracks(tracksData: TrackData[]): Track[] {
    this.tracks = tracksData.map(trackData => new Track(trackData, this.clock.currentStep$))
    return this.tracks;
  }
}
