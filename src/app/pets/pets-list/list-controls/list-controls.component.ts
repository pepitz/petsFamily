import { EventEmitter } from "@angular/core";
import { Component, OnInit, Input, Output } from "@angular/core";
import { LinkHeader } from "../../link.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-list-controls",
  templateUrl: "./list-controls.component.html",
  styleUrls: ["./list-controls.component.scss"],
})
export class ListControlsComponent implements OnInit {
  @Input() links: { [key: string]: string }[];
  @Output() linkClicked: EventEmitter<string> = new EventEmitter();
  keyValueLinks: Array<any>;
  constructor() {}

  ngOnInit(): void {}

  onLink(linkName: string) {
    this.linkClicked.emit(linkName);
  }
}
