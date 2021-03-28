import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Config } from 'src/models/config';

@Component({
  selector: 'chat-name-popup',
  templateUrl: './chat-name-popup.component.html',
  styleUrls: ['./chat-name-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatNamePopupComponent implements OnInit {

  constructor() { }
  @Output() onUserNameChange = new EventEmitter();
  public config: Config ;

  public handleUserName(name: string) {
    this.onUserNameChange.emit(name);
  }
  ngOnInit(): void {
  }

}
