import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer, SimpleChanges} from '@angular/core';

@Directive({selector: '[cooTableLoading]'})
export class CooTableLoadingDirective implements OnInit, OnChanges {
  @Input() loading: boolean;

  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setLoading(changes['loading'].currentValue);
  }

  ngOnInit(): void {
    this.setLoading(this.loading);
  }

  setLoading(onOffSwitch: boolean): void {
    if (onOffSwitch) {
      this.renderer.setElementClass(this.el.nativeElement, 'loading', true);
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'loading', false);
    }
  }
}
