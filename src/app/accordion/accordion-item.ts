import { Component } from '@angular/core';

@Component({
  selector: 'item'
})
export class AccordionItem {

  constructor(public title: string, public details: string, public icon: string, public showDetails: boolean) {}
}
