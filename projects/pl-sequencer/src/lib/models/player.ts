import {Howl} from 'howler';


export class Player {
  track: Howl | null = null;

  constructor(sample?: string) {
    if(sample){
      this.track = _howl(sample);
    }
  }

  play(volume: number, trackVolume: number) {
    if (this.track) {
      this.track.stop();
      this.track.seek()
      this.track.volume(trackVolume / volume)
      this.track.play();
    }
  }

  stop(note: string) {
    if (this.track) {
      // this.selectedPack.sounds[note].stop();
      this.track.stop();
    }
  }


}

function _howl(file: string) {
  return new Howl({
    src: [file],
    volume: 1
  })
}
