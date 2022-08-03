export class Step {
  on = false;
  velocity = 1;
  length = 1;

  constructor(velocity: number) {
    this.on = velocity > 0 ;
    this.velocity = velocity;
  }

  get velocityText(){
    if(this.on){
      return 'vel-'+ this.velocity;
    }
    return '';
  }
}


