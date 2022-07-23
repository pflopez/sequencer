export class Step {
  on = false;
  length = 1;
  constructor(on: boolean) {
    this.on = on;
  }
}

export class InstrumentLine {
  name: string = ''
  sample: string = '';
  volume: number = 1;
  steps: Step[] = [];

  constructor(name: string, pattern: number[], steps: number = 16) {
    this.name = name;
    for(let i = 0; i < steps ; i++){
      const on = pattern[i % pattern.length] === 1;
      this.steps.push(new Step(on))
    }
  }
}
