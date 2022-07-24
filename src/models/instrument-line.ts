import {map, Observable} from "rxjs";
import {Step} from "./step";

export class InstrumentLine {
  name: string = ''
  sample: string = '';
  volume: number = 1;
  steps: Step[] = [];
  activeStep$: Observable<number> = new Observable<number>();


  constructor(name: string, pattern: number[], currentStep$: Observable<number>, steps: number = 16) {
    this.name = name;
    // create steps
    for (let i = 0; i < steps; i++) {
      const on = pattern[i % pattern.length] === 1;
      this.steps.push(new Step(on))
    }
    // subscribe and set active step, based on the sequencer current step number
    // starting at 1, 0 is off.
    this.activeStep$ = currentStep$.pipe(
      map(stepNumber => {
        const mod = stepNumber % this.steps.length;
        if (stepNumber === 0) {
          return 0;
        }
        if (mod === 0) {
          return this.steps.length;
        }
        return mod;
      }),
    );

    this.activeStep$.subscribe(step => {
      if (step !== 0) {
        this.steps[step - 1].play();
      }
    });
  }
}
