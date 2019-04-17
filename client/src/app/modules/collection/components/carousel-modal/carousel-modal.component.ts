import { Component, OnInit } from '@angular/core';
import { Modal } from '../../classes/modal.class';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-carousel-modal',
  templateUrl: './carousel-modal.component.html',
})
export class CarouselModalComponent extends Modal implements OnInit {

  images;
  isLoading = true;
  slideId: number;
  activeSlide: number;

  constructor(
    mr: BsModalRef,
  ) {
    super(mr);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.activeSlide = this.slideId;
      this.isLoading = false;
    }, 200);
  }

  onClose(): void {
    return;
  }

}
