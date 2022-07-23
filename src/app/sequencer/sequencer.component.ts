import {Component, Input, OnInit} from '@angular/core';
import {InstrumentLine} from "../../models/step";
import {SequencerService} from "../../services/sequencer.service";

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Input() instruments: InstrumentLine[] = [];

  activeStep$ = this.sequencer.activeStep$;

  constructor(private sequencer: SequencerService) { }

  ngOnInit(): void {
  }

}
