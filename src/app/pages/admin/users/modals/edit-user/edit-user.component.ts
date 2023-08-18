import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(form: any): void {
    this.http
      .put(`http://localhost:3000/api/user/${this.data.user._id}`, form.value)
      .subscribe((response) => {
        console.log('User data updated successfully', response);
        this.dialogRef.close(); 
      });
  }
}
