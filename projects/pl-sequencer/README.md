# PlSequencer

Sequencer library and component
- Bpm, resolution, 3 velocity settings per step
- Each track can have 1 to 32 steps, individually.
- Themeable UI with dark mode.

## How to use
Add your `<sequencer>` element and provide an array of tracks.
```html
<pl-sequencer [tracks]="tracks"></pl-sequencer>
```
To create the tracks for the sequencer, use `PlSequencerService.createTracks()` method and provide `TrackData` objects.
```typescript
this.tracks = this.plSequencerService.createTracks([
  {
    name: 'kick', 
    sample : 'assets/sounds/1/kick.wav' , 
    pattern: [1, 0, 0, 0] , 
    steps: 16
  },
  //...
]);
```

You can use the `createTrackData` function to simplify the process 
```typescript
this.tracks = this.plSequencerService.createTracks([
      createTrackData('kick', 'assets/sounds/1/kick.wav', [1, 0, 0, 0], 16),
      createTrackData('snare', 'assets/sounds/1/shot_mud.wav', [0, 0, 1, 0], 8),
      createTrackData('hit-hat', 'assets/sounds/1/hat.wav', [2, 0, 1, 0], 10),
      createTrackData('ride', 'assets/sounds/1/lev.wav', [3, 0, 0, 0, 1, 0, 1, 0]),
    ])
```

Additionally, you can provide additional configuration to show or hide the track name, the track length dropdown, and the active step indicator on the step.

```html
<pl-sequencer [tracks]="tracks"
              [showTrackName]="true"
              [showTrackLength]="true"
              [showActiveStepBar]="true"
></pl-sequencer>
```

---------------
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.
