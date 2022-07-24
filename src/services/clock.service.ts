import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, filter, switchMap, timer} from "rxjs";
import {intervalFromBpm} from "./music.utility";

export type SequencerSubdivision = 2 | 4 | 8 | 16;

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private _playing: boolean = false;
  private _steps: number = 16;
  private _bpm: number = 60;
  private _currentStep: number = 0;
  private _subdivision: SequencerSubdivision = 16;

  private playing = new BehaviorSubject(this._playing);
  private steps = new BehaviorSubject(this._steps);
  private bpm = new BehaviorSubject(this._bpm);
  private currentStep = new BehaviorSubject(this._currentStep);
  private subdivision = new BehaviorSubject(this._subdivision);

  public playing$ = this.playing.asObservable();
  public steps$ = this.steps.asObservable();
  public bpm$ = this.bpm.asObservable();
  public currentStep$ = this.currentStep.asObservable();
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
    if(this._playing){
      this.runner.unsubscribe();
      this.run();
    }
  }

  updateSubdivision(division: SequencerSubdivision){
    this._subdivision = division;
    this.subdivision.next(this._subdivision);
    if(this._playing){
      this.stop();
      this.run();
    }
  }


  setActiveStep(step: number) {
    this._currentStep = step;
    this.currentStep.next(this._currentStep);
  }

  private getRunner() {
    return this.playing$.pipe(
      filter(play => play),
      distinctUntilChanged(),
      switchMap(p => timer(0, intervalFromBpm(this._bpm, this._subdivision)))
    ).subscribe(play => {
      this.setActiveStep(this._currentStep + 1)
    });
  }

}


