import { AuModalService } from './modal.service';

import { AfterContentInit, ContentChild, Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuModalComponent } from './au-modal.component';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {
  elements: HTMLBaseElement[];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auModalService: AuModalService
  ) { }


  @Input()
  set auModalOpenOnClick(els) {


    if(els.length) {
      this.elements = els
    } else {
      this.elements = [els];
    }

    this.elements.forEach(el => {
      el.addEventListener('click', this.clickHandler)
    })
  }

  ngOnInit() {
    this.auModalService.close$.subscribe(() => this.viewContainer.clear())
  }

  ngOnDestroy() {
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler))
  }

  clickHandler = (() => {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }).bind(this);


}
