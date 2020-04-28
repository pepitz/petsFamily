import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-pets-sort",
  templateUrl: "./pets-sort.component.html",
  styleUrls: ["./pets-sort.component.scss"],
})
export class PetsSortComponent implements OnInit {
  sortForm: FormGroup;
  @Input("options") sortOptions: string[] = [];
  @Input() checkedRadio: string;
  @Output() sorted = new EventEmitter<{ [key: string]: string }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.onRadioInputChange();
  }

  initForm() {
    this.sortForm = this.fb.group({
      radio: [this.checkedRadio || null],
    });
  }

  onRadioInputChange() {
    this.sortForm.valueChanges.subscribe((_: any) => {
      this.sorted.emit(this.radioCtrl.value);
    });
  }

  get radioCtrl() {
    return this.sortForm.controls["radio"];
  }
}
