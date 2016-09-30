import {Component} from '@angular/core';
import {AccordionItem} from '../accordion/accordion-item';

@Component({
  selector: 'accordion-list',
  inputs: ['items'],
  templateUrl: 'build/accordion/accordion-list.html'
})
export class AccordionList {

  public items: AccordionItem[];

  constructor() {}

  toggleDetails(item: AccordionItem) {
    if (item.showDetails) {
        item.showDetails = false;
        item.icon = 'ios-add-circle-outline';
    } else {
        item.showDetails = true;
        item.icon = 'ios-remove-circle-outline';
    }
  }
}
