import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, filter, switchMap, timer} from "rxjs";

export type SequencerSubdivision = 2 | 4 | 8 | 16;

@Injectable({
  providedIn: 'root'
})
export class SequencerService {
  private _playing: boolean = false;
  private _steps: number = 16;
  private _bpm: number = 60;
  private _activeStep: number = 0;
  private _subdivision: SequencerSubdivision = 4; //

  private playing = new BehaviorSubject(this._playing);
  private steps = new BehaviorSubject(this._steps);
  private bpm = new BehaviorSubject(this._bpm);
  private activeStep = new BehaviorSubject(this._activeStep);
  private subdivision = new BehaviorSubject(this._subdivision);

  public playing$ = this.playing.asObservable();
  public steps$ = this.steps.asObservable();
  public bpm$ = this.bpm.asObservable();
  public activeStep$ = this.activeStep.asObservable();
  public subdivision$ = this.subdivision.asObservable();

  private runner = this.getRunner();



  constructor() {

  }

  stop() {
    this._playing = false;
    this.playing.next(this._playing);
    this.setActiveStep(0);
    this.runner.unsubscribe();
  }

  run() {
    this._playing = true;
    this.playing.next(this._playing);
    if (this.runner.closed) {
      this.runner = this.getRunner();
    }
  }

  updateBpm(bpm: number) {
    this._bpm = bpm;
    this.bpm.next(this._bpm);
    this.runner.unsubscribe();
    this.run();
  }


  setActiveStep(step: number) {
    this._activeStep = step;
    this.activeStep.next(this._activeStep);
  }

  private getRunner() {
    return this.playing$.pipe(
      filter(play => play),
      distinctUntilChanged(),
      switchMap(p => timer(0, this.intervalFromBpm()))
    ).subscribe(play => {
      this.setActiveStep((this._activeStep) % 16 + 1)
    });
  }

  private intervalFromBpm(){
    return (60 / this._bpm) / this._subdivision * 1000;
  }

}


