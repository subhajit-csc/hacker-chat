import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Message } from 'src/models/Message';
import { User } from 'src/models/User';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {

  @Input() messages: Message[];
  @Input() selectedUser: User;
  @Output() onMessage = new EventEmitter();

  public handleMessage(message: string) {
    this.onMessage.emit(message);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
