import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../Common/Schemas/classes';
import {MatPaginator} from '@angular/material/paginator';
import {MessageService} from '../../../message.service';
import {AuthenticationService} from '../../../authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {UserPopupComponent} from './user-popup/user-popup.component';
import {DeletePopupComponent} from '../../../Common/delete-popup/delete-popup.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = [          // List of the columns of the table. This list is ordered
    "edit", "delete", "pseudo", "email", "age"
  ];
  dataSourceUser = new MatTableDataSource<User>();

  @ViewChild('errorMessageComponent') errorMessage;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private msg: MessageService,
              public auth: AuthenticationService,
              public dialog: MatDialog) { }

  // Initialization: retrieve all User & sort them alphabetically.
  ngOnInit(): void {
    this.msg.Read('users', null).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.dataSourceUser.data = res.data;
          this.dataSourceUser.paginator = this.paginator;
          this.dataSourceUser.sort = this.sort;

          this.dataSourceUser.data = this.dataSourceUser.data.sort((user1: User, user2: User) =>
            user1.pseudo.localeCompare(user2.pseudo)
          );
        }
      }
    )
  }

  // Filter function for the datasource.
  filterUsers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }

  // Launch a popup to create a new User (with data === null (creation mode).
  // Then, add the new User to the datasource & sort it alphabetically (this make it refresh too).
  CreateUser() {
    const dialogRef = this.dialog.open(UserPopupComponent, {
      width: '30%',
      data: null
    });

    dialogRef.afterClosed().subscribe((CreatedUser: User) => {
      if (CreatedUser != undefined) {
        this.dataSourceUser.data.push(CreatedUser);
        this.dataSourceUser.data = this.dataSourceUser.data.sort((user1: User, user2: User) =>
          user1.pseudo.localeCompare(user2.pseudo)
        );
      }
    });
  }

  // Launch a popup to update a User (with data !== null (edition mode)
  // Then, sort alphabetically the datasource
  UpdateUser(user: User) {
    const dialogRef = this.dialog.open(UserPopupComponent, {
      width: '30%',
      data: user
    });

    dialogRef.afterClosed().subscribe((UpdatedUser: User) => {
      if (UpdatedUser != undefined) {
        this.dataSourceUser.data = this.dataSourceUser.data.sort((user1: User, user2: User) =>
          user1.pseudo.localeCompare(user2.pseudo)
        );
      }
    });
  }

  // Launch the generic DeletePopupComponent to remove a beam.
  // Then, if deleted, remove it from the datasource.
  DeleteUser(user: User) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '30%',
      data: {object: user, type:'user'}
    });

    dialogRef.afterClosed().subscribe((DeletedUser: User) => {
      if (DeletedUser != undefined) {
        this.dataSourceUser.data = this.dataSourceUser.data.filter((user: User) =>
          user._id !== DeletedUser._id)
      }
    });
  }

}

