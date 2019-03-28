import { ChangeDetectorRef, Component } from '@angular/core';
import { FilterSidebarService } from '../../services/filter-sidebar.service';
import { SidebarState } from '../../enums/sidebar-state.enum';

import { ActivatedRoute, Router } from '@angular/router';
import { DetailsPageLayoutService } from '../../services/details-page-layout.service';
import { UtilsService } from '../../services/utils.service';
import { CollectionLayoutClass } from '../../modules/collection/classes/collection-layout.class';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-collection-layout',
  templateUrl: './collection-layout.component.html',
})
export class CollectionLayoutComponent extends CollectionLayoutClass {

   constructor(
     private fss: FilterSidebarService,
     cs: CategoryService,
     ar: ActivatedRoute,
     r: Router,
     us: UtilsService,
     cdr: ChangeDetectorRef,
     dpls: DetailsPageLayoutService
  ) {
     super(cs, ar, r, us, cdr, dpls);
  }

  // get sectionLabel(): string {
  //   return this.fss.currentSectionName;
  // }

  get isSidebarCollapsed(): boolean {
    return this.fss.state === SidebarState.CLOSED_COLLAPSED;
  }

  // protected loadSidebarInfo(): void {
  //   this.fss.headerTitle = this.itemLabel;
  // }
  //
  // protected loadSidebarNav(id: string): void {
  //   this.fss.isDisabled = false;
  //   this.fss.sidebarGroups = this.getSidebarGroups(id);
  // }

}
