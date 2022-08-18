import {filter, map, Observable, switchMap, timer} from "rxjs";
import {Step} from "./step";
import {getActiveStep} from "../utils/music.utility";
import {Player} from "./player";
import {TrackData} from "./interfaces";

export class Track {
  name: string = ''
  sample: string = '';
  volume: number = 1;
  duration = 0; // the sample duration
  length = 1; // 0 nothing, 1 full duration
  steps: Step[] = [];
  backupSteps: Step[] = [];
  activeStep$: Observable<number> = new Observable<number>();
  player = new Player();


  constructor(trackData: TrackData, currentStep$: Observable<number> ) {
    const {name, sample, pattern, steps} = trackData;
    this.name = name;
    // create steps
    for (let i = 0; i < steps; i++) {
      const val = pattern[i % pattern.length];
      this.steps.push(new Step(val));
    }
    this.sample = sample;
    this.player = new Player(this.sample);
    this.subscribeToStep(currentStep$);
  }

  /**
   * Todo check if Im not leaving any dead subscribers
   * @param currentStep$ 0 - off, 1 first step
   */
   private async subscribeToStep(currentStep$: Observable<number>){
     this.duration = await this.player.getDuration();
    // subscribe and set active step, based on the sequencer current step number
    // starting at 1, 0 is off.
    this.activeStep$ = currentStep$.pipe(
      map(stepNumber => getActiveStep(stepNumber, this.steps.length)),
    );

    this.activeStep$.subscribe(step => {
      if (step !== 0 && this.steps[step - 1].on ) {
        this.player.play(this.steps[step - 1].velocity, this.volume);
      }
    });
    this.activeStep$
      .pipe(
        filter(step => step !== 0 && this.steps[step - 1].on),
        switchMap( step => timer(this.length * this.duration * 1000))
      )
      .subscribe(_ => {
        console.log('duration: ', this.duration);
        console.log(this.length * this.duration * 1000);

        this.player.stop();
    });
  }


  changePatternLength(length: number) {
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

  /**
   * Change base volume for this track. From 0 to 1.
   * @param volume
   */
  changeVolume(volume: number){
    this.volume = volume;
  }

  changeLength(length: number){
    this.length = length;
  }
}
