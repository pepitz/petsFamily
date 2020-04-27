import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-favorite-pet',
  templateUrl: './favorite-pet.component.html',
  styleUrls: ['./favorite-pet.component.scss']
})
export class FavoritePetComponent implements OnInit {

  constructor() { }
  @Input() pets: any;
  
  ngOnInit(): void {
  }

}
