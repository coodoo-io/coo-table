import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {ListingMetadata} from './../../model/listing-metadata';

@Component({
  selector: 'coo-table-counter',
  templateUrl: './coo-table-counter.component.html',
  styleUrls: ['./coo-table-counter.component.css']
})
export class CooTableCounterComponent {
  @Input() metadata: ListingMetadata;
  fromPage: number = 0;
  toPage: number = 0;
}
