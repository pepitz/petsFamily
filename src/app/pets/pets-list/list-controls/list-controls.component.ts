import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-list-controls",
  templateUrl: "./list-controls.component.html",
  styleUrls: ["./list-controls.component.scss"],
})
export class ListControlsComponent implements OnInit {
  @Input() links: { [key: string]: string }[];
  @Output() linkClicked: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onLink(linkName: string) {
    this.linkClicked.emit(linkName);
  }
}
