import {Component, Input, OnInit} from '@angular/core';
import {map} from "rxjs";
import {getActiveStep} from "../../utils/music.utility";
import {Track} from "../../models/track";
import {ClockService} from "../../services/clock.service";
import {Step} from "../../models/step";

@Component({
  selector: 'pl-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  @Input() tracks: Track[] = [];
  @Input() velocity = 1;

  activeStep$ = this.sequencer.currentStep$;
  numberSteps = new Array(32).fill(1);
  maxLength = 0;
  maxActiveStep$ = this.activeStep$.pipe(
    map(stepNumber => getActiveStep(stepNumber, this.maxLength))
  )


  clickStepTarget: any;
  adding = false;

  constructor(private sequencer: ClockService) {
  }

  ngOnInit(): void {
    this.maxLength = this.getMaxTrackLength();
  }

  clickStep(event: MouseEvent, step: Step) {
    this.clickStepTarget = (event.target as HTMLElement).parentElement
    if (!step.on || step.velocity == this.velocity) {
      step.on = !step.on;
    }
    step.velocity = this.velocity;
    this.adding = step.on;
  }

  hoverStep(event: MouseEvent, step: Step) {
    const fromSameTarget = event.relatedTarget === this.clickStepTarget;
    if (event.buttons && fromSameTarget) {
      step.velocity = this.velocity;
      step.on = this.adding;
    }
  }

  endClick() {
    // remove saved initial target ref.
    this.clickStepTarget = null;
  }

  changeInstrumentLength(instrument: Track, length: string) {
    const legthNmb = Number(length);
    instrument.changeLength(legthNmb)
    this.maxLength = this.getMaxTrackLength(legthNmb);
  }

  private getMaxTrackLength(legthNmb = 0) {
    if (legthNmb > this.maxLength) {
      return legthNmb;
    } else {
      return this.tracks.reduce((prev, current) => {
        let prevSteps = prev.steps.length;
        let currentSteps = current.steps.length;
        return currentSteps > prevSteps ? current : prev;
      }).steps.length;
    }
  }

}
