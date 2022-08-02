import {map, Observable} from "rxjs";
import {Step} from "./step";
import {getActiveStep} from "../utils/music.utility";

export class Track {
  name: string = ''
  sample: string = '';
  volume: number = 1;
  steps: Step[] = [];
  backupSteps: Step[] = [];
  activeStep$: Observable<number> = new Observable<number>();


  constructor(name: string, pattern: number[], steps: number = 16) {
    this.name = name;
    // create steps
    for (let i = 0; i < steps; i++) {
      const val = pattern[i % pattern.length];
      this.steps.push(new Step(val));
    }
  }

  /**
   * Todo check if Im not leaving any dead subscribers
   * @param currentStep$
   */
  subscribeToStep(currentStep$: Observable<number>){
    // subscribe and set active step, based on the sequencer current step number
    // starting at 1, 0 is off.
    this.activeStep$ = currentStep$.pipe(
      map(stepNumber => getActiveStep(stepNumber, this.steps.length)),
    );

    this.activeStep$.subscribe(step => {
      if (step !== 0) {
        this.steps[step - 1].play();
      }
    });
  }


  changeLength(length: number) {
    // if new length is shorter than current length, just trim
    if (length <= this.steps.length) {
      this.saveBackupSteps();
      this.steps = this.steps.slice(0, length);
      return;
    }
    this.steps = this.getSteps(length);
  }

  // save a backup, using the new one plus the backup, where not provided.
  private saveBackupSteps() {
    const newLength = this.steps.length > this.backupSteps.length ? this.steps.length : this.backupSteps.length;
    this.backupSteps = this.getSteps(newLength)
  }

  private getSteps(length: number) {
    const steps = [];
    let backupStep;
    for (let i = 0; i < length; i++) {
      // I either have it on the current steps, or on the backup
      backupStep = this.steps[i] || this.backupSteps[i];
      steps.push(backupStep || new Step(0));
    }
    return steps;
  }
}
