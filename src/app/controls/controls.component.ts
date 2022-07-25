import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClockService, SequencerSubdivision} from "../../services/clock.service";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  bpm$ = this.clockService.bpm$;
  duration$ = this.clockService.subdivision$;

  @Output() updateVelocity = new EventEmitter<number>();

  constructor(private clockService: ClockService) { }

  ngOnInit(): void {
  }

  play() {
    this.clockService.run();
  }

  stop() {
    this.clockService.stop();
  }

  changeBpm(bpm: string) {
    const num = Number(bpm);
    this.clockService.updateBpm(num);
  }

  changeDuration(duration: string){
    this.clockService.updateSubdivision(duration as unknown as SequencerSubdivision)
  }

  changeVelocity(velocity: string){
    this.updateVelocity.emit(Number(velocity));
  }
}
