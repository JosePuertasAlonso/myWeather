import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-weatherhour',
  templateUrl: './card-weatherhour.component.html',
  styleUrls: ['./card-weatherhour.component.scss']
})
export class CardWeatherhourComponent {
  @Input() weather: any;
  @Input() icon: string = "";
  @Input() hour: any;
  @Input() temp: string = "";

}
