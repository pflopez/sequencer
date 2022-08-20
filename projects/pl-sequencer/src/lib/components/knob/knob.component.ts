import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pl-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements OnInit {

  listening = false;
  initPos = 0;
  rotation = 30;
  initialValue = 0;

  @Input() value = 0;
  @Output() updateValue = new EventEmitter<number>();

  @HostBinding('style.transform') get rotationTransform() {
    return `rotate(${this.rotation}deg)`;
  }
  /** @ignore */
  @HostBinding('class.listening')
  get isListening() {
    return this.listening;
  }

  @HostListener('mousedown', ['$event'])
  handleMouseDown($event: MouseEvent) {

    this.listening = true;
    this.initPos = $event.pageY;
    this.initialValue = this.value;
    $event.preventDefault();
  }

  @HostListener('document:mouseup', ['$event'])
  handleMouseUp($event: MouseEvent) {
    this.listening = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove($event: MouseEvent) {
    if (this.listening) {
      const volume = this.getValueFromKnob(this.initPos - $event.pageY);
      this.calculateRotation(volume);
      this.updateValue.emit(volume);
    }
  }

  constructor() {
  }

  ngOnInit(): void {
    this.calculateRotation(this.value);
  }

  private getValueFromKnob(diffValue: number) {
    diffValue = diffValue / 100 + this.initialValue;
    if (diffValue < 0) {
      return 0;
    }
    if (diffValue > 1) {
      return 1;
    }
    return diffValue;
  }


  // volume is from 0 to 1
  private calculateRotation(value: number) {
    const initialRotation = 30;
    const totalRotation = 360 - initialRotation * 2;
    this.rotation = Math.round(totalRotation * value + initialRotation);
  }

}
