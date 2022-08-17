import {Component, EventEmitter, Output} from '@angular/core';
import {SequencerResolution, SequencerResolutions, SequencerVelocities} from "../../models/sequencer";
import {ClockService} from "../../services/clock.service";

@Component({
  selector: 'pl-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent{

  bpm$ = this.clockService.bpm$;
  playing$ = this.clockService.playing$;
  resolution$ = this.clockService.resolution$;

  resolutions = {
    keys: Object.keys(SequencerResolutions) ,
    values: Object.values(SequencerResolutions)
  };

  velocities = {
    keys: Object.keys(SequencerVelocities),
    values: Object.values(SequencerVelocities)
  }

  @Output() updateVelocity = new EventEmitter<number>();

  constructor(private clockService: ClockService) {
  }

  toggle(){
    this.clockService.toggleRun();
  }

  changeBpm(bpm: string) {
    this.clockService.updateBpm(Number(bpm));
  }

  changeDuration(resolution: string) {
    this.clockService.updateSubdivision(resolution as unknown as SequencerResolution)
  }

  changeVelocity(velocity: string) {
    this.updateVelocity.emit(Number(velocity));

  }
}
