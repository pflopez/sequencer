export class Step {
  on = false;
  length = 1;

  constructor(on: boolean) {
    this.on = on;
  }

  play(){
    if(this.on){
     console.log('play');
    }
  }
}


