import {Component, Input, OnInit} from '@angular/core';
import {ClockService} from "../../services/clock.service";
import {InstrumentLine} from "../../models/instrument-line";
import {Step} from "../../models/step";


@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Input() instruments: InstrumentLine[] = [];

  activeStep$ = this.sequencer.currentStep$;

  lineLength = [].constructor(10);

  numberSteps = new Array(32).fill(1);

  clickStepTarget: any;

  // show or hide numberSteps selector

  constructor(private sequencer: ClockService) { }

  ngOnInit(): void {
  }

  clickStep(event: MouseEvent, step: Step){
    this.clickStepTarget = (event.target as HTMLElement).parentElement
    step.on = !step.on;
  }

  hoverStep(event: MouseEvent, step: Step){
    const fromSameTarget = event.relatedTarget === this.clickStepTarget;
    if(event.buttons && fromSameTarget){
      step.on = !step.on;
    }
  }

  endClick(){
    // remove saved initial target ref.
    this.clickStepTarget = null;
  }

  changeInstrumentLength(instrument: InstrumentLine, length: string){
    console.log(instrument, length);
    instrument.changeLength(Number(length));
  }


}
