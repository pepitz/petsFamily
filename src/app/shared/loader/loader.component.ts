import { LoaderService } from "./loader.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  isLoading$: Observable<boolean> = this.LoaderService.isLoading;
  constructor(private LoaderService: LoaderService) {}

  ngOnInit(): void {}
}
