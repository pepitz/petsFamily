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
  @Output() sorted = new EventEmitter<{ [key: string]: string }>();

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

  get radioCtrl() {
    return this.sortForm.controls["radio"];
  }

  onRadioInputChange() {
    this.sortForm.valueChanges.subscribe((changes) => {
      console.log("onFormControl update: ", changes);
      console.log("radio selected: ", this.radioCtrl.value);
      this.sorted.emit(this.radioCtrl.value);
    });
  }
}
