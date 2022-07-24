import {Component, Input, OnInit} from '@angular/core';
import {ClockService} from "../../services/clock.service";
import {InstrumentLine} from "../../models/instrument-line";

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Input() instruments: InstrumentLine[] = [];

  activeStep$ = this.sequencer.currentStep$;

  constructor(private sequencer: ClockService) { }

  ngOnInit(): void {
  }

}
