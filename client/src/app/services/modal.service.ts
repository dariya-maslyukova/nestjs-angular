import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';

import { CarouselModalComponent } from '../modules/collection/components/carousel-modal/carousel-modal.component';
import { ModalType } from '../enums/modal-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalConfig: ModalOptions = {
    animated: true,
    class: ''
  };

  constructor(private bms: BsModalService) {
  }

  /* tslint:disable cyclomatic-complexity */
  showModal(modalType: ModalType, initialState: object = {}, modalOptions: object = {}): BsModalRef {
    this.modalConfig = { ...this.modalConfig, ...modalOptions };
    const options: ModalOptions = { initialState, ...this.modalConfig };

    switch (modalType) {
      case ModalType.CAROUSEL:
        return this.bms.show(
          CarouselModalComponent,
          {
            ...options,
            ...{ class: 'carousel-modal full-size-modal' }
          }
        );
      default:
        return;
    }
  }

  /* tslint:enable cyclomatic-complexity*/
}
