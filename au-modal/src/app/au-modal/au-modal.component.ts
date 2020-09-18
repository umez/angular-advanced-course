import { EventManager } from '@angular/platform-browser';
import { AuModalService } from './modal.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent implements OnInit {

  @Input()
  modalBody: TemplateRef<any>

  @Input()
  context: any;

  @Input()
  hideOnEsc: boolean;

  @Input()
  hideOnClickOutside: boolean;

  constructor(
    private auModalService: AuModalService,
    private eventManager: EventManager
  ) { }

  ngOnInit() {
    this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
      if (this.hideOnEsc) {
        this.closeModal();
      }
    })
  }

  onClickOutsideModal() {
    if(this.hideOnClickOutside) {
      this.closeModal();
    }
  }

  closeModal() {
    this.auModalService.close();
  }



  cancelEvent(evt: KeyboardEvent) {
    evt.preventDefault();
   evt.stopPropagation();
  }

}
