import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/models/config';


import { User } from 'src/models/User';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent implements OnInit {

  @ViewChild("text", { static: true }) nameField: ElementRef;
  @Input() set selectedUser(selectedUser: User) {
    if (selectedUser) {
      this._selectedUser = selectedUser;
      this.setFormInputValue(`@${selectedUser.name} `);
    }
  }

  get selectedUser() {
    return this._selectedUser;
  }

  @Input() config: Config = {
    placeholder: "message",
    buttonLabel: "send"
  };

  @Output() onMessage = new EventEmitter();
  private _selectedUser: User;
  public inputForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  private initForm() {
    const name = this.selectedUser ? `@${this.selectedUser.name} ` : "";
    this.inputForm = this.fb.group({
      text: [name, Validators.required]
    });
  }

  private setFormInputValue(text: string) {
    if (this.inputForm) {
      this.inputForm.patchValue({
        text
      });
      this.nameField.nativeElement.focus();
    }
  }

  public onSubmit() {
    this.onMessage.emit(this.inputForm.value.text);
    this.inputForm.reset();
  }

}
