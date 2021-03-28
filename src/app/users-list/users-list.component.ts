import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from 'src/models/User';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

  @Input() usersList: User[];
  @Output() onUserSelect = new EventEmitter();

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public selectUser(user: User) {
    this.onUserSelect.emit(user);
  }
}
