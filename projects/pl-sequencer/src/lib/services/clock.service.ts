import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, filter, switchMap, timer} from "rxjs";
import {intervalFromBpm} from "../utils/music.utility";
import {SequencerResolution} from "../models/sequencer";


@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private _playing: boolean = false;
  private _bpm: number = 120;
  private _currentStep: number = 0;
  private _resolution: SequencerResolution = 16;

  private playing = new BehaviorSubject(this._playing);
  private bpm = new BehaviorSubject(this._bpm);
  private currentStep = new BehaviorSubject(this._currentStep);
  private resolution = new BehaviorSubject(this._resolution);

  public playing$ = this.playing.asObservable();
  public bpm$ = this.bpm.asObservable();
  public currentStep$ = this.currentStep.asObservable();
  public resolution$ = this.resolution.asObservable();

  private runner = this.getRunner();


  constructor() {

  }

  toggleRun(){
    this._playing? this.stop() : this.run()
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
    if (this._playing) {
      this.runner.unsubscribe();
      this.run();
    }
  }

  updateSubdivision(division: SequencerResolution) {
    this._resolution = division;
    this.resolution.next(this._resolution);
    if (this._playing) {
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
      switchMap(p => timer(0, intervalFromBpm(this._bpm, this._resolution)))
    ).subscribe(play => {
      this.setActiveStep(this._currentStep + 1)
    });
  }

  getIntervalInMs(): number{
    return intervalFromBpm(this._bpm, this._resolution);
  }

}


