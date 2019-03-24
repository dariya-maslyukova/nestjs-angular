import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-list-pager',
  templateUrl: './grid-pager.component.html'
})
export class GridPagerComponent {

  @Input() pageSizeOptions = [5, 10, 20];
  @Input() pageSize = 5;

}
