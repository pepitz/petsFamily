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
  @Output() sorted = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.onRadioInputChange();
  }

  initForm() {
    this.sortForm = this.fb.group({
      radio: [null],
    });
  }

  onRadioInputChange() {
    this.sortForm.valueChanges.subscribe((changes) => {
      console.log("onFormControl update: ", changes);
      this.sorted.emit(this.radio.value);
    });
  }

  get radio() {
    return this.sortForm.controls["radio"];
  }
}
