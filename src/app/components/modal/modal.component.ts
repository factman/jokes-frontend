import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  jokeForm = new FormGroup({
    jokeTitle: new FormControl('', [Validators.required, Validators.minLength(3)]),
    jokeCategory: new FormControl('', Validators.required),
    jokeBody: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.dialogRef.close(this.jokeForm.value);
  }

}
