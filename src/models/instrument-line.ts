import {map, Observable} from "rxjs";
import {Step} from "./step";

export class InstrumentLine {
  name: string = ''
  sample: string = '';
  volume: number = 1;
  steps: Step[] = [];
  activeStep$: Observable<number>;

  constructor(name: string, pattern: number[], currentStep$: Observable<number>, steps: number = 16) {
    this.name = name;
    // create steps
    for (let i = 0; i < steps; i++) {
      const on = pattern[i % pattern.length] === 1;
      this.steps.push(new Step(on))
    }
    // subscribe and set active step, based on the sequencer current step number
    this.activeStep$ = currentStep$.pipe(
      map(stepNumber => {
        const mod = stepNumber % this.steps.length;
        if (stepNumber === 0) {
          return 0;
        }
        if (mod === 0) {
          console.log(this.steps.length)
          return this.steps.length;
        }
        return mod;
      }),
    );
    this.activeStep$.subscribe();
  }
}
