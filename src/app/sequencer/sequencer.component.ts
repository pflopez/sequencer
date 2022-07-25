import {Component, Input, OnInit} from '@angular/core';
import {ClockService} from "../../services/clock.service";
import {Track} from "../../models/track";
import {Step} from "../../models/step";


@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Input() tracks: Track[] = [];
  @Input() velocity = 1;

  activeStep$ = this.sequencer.currentStep$;
  numberSteps = new Array(32).fill(1);

  clickStepTarget: any;
  adding = false;

  constructor(private sequencer: ClockService) { }

  ngOnInit(): void {
  }

  clickStep(event: MouseEvent, step: Step){
    this.clickStepTarget = (event.target as HTMLElement).parentElement
    if(!step.on || step.velocity == this.velocity){
      step.on = !step.on;
    }
    step.velocity = this.velocity;
    this.adding = step.on;
  }

  hoverStep(event: MouseEvent, step: Step){
    const fromSameTarget = event.relatedTarget === this.clickStepTarget;
    if(event.buttons && fromSameTarget){
      step.velocity = this.velocity;
      step.on = this.adding;
    }
  }

  endClick(){
    // remove saved initial target ref.
    this.clickStepTarget = null;
  }

  changeInstrumentLength(instrument: Track, length: string){
    instrument.changeLength(Number(length));
  }


}
