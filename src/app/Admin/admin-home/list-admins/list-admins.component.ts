import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Admin} from '../../../Common/Schemas/classes';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MessageService} from '../../../message.service';
import {AuthenticationService} from '../../../authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {DeletePopupComponent} from '../../../Common/delete-popup/delete-popup.component';
import {AdminPopupComponent} from './admin-popup/admin-popup.component';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.scss']
})
export class ListAdminsComponent implements OnInit {

  displayedColumns: string[] = [          // List of the columns of the table. This list is ordered
    "edit", "delete", "pseudo", "email", "age"
  ];
  dataSourceAdmin = new MatTableDataSource<Admin>();

  @ViewChild('errorMessageComponent') errorMessage;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private msg: MessageService,
              public auth: AuthenticationService,
              public dialog: MatDialog) { }

  // Initialization: retrieve all Admin & sort them alphabetically.
  ngOnInit(): void {
    this.msg.Read('admins', null).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.dataSourceAdmin.data = res.data;
          this.dataSourceAdmin.paginator = this.paginator;
          this.dataSourceAdmin.sort = this.sort;

          this.dataSourceAdmin.data = this.dataSourceAdmin.data.sort((admin1: Admin, admin2: Admin) =>
            admin1.pseudo.localeCompare(admin2.pseudo)
          );
        }
      }
    )
  }

  // Filter function for the datasource.
  filterAdmins(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAdmin.filter = filterValue.trim().toLowerCase();
  }

  // Launch a popup to create a new Admin (with data === null (creation mode).
  // Then, add the new Admin to the datasource & sort it alphabetically (this make it refresh too).
  CreateAdmin() {
    const dialogRef = this.dialog.open(AdminPopupComponent, {
      width: '30%',
      data: null
    });

    dialogRef.afterClosed().subscribe((CreatedAdmin: Admin) => {
      if (CreatedAdmin != undefined) {
        this.dataSourceAdmin.data.push(CreatedAdmin);
        this.dataSourceAdmin.data = this.dataSourceAdmin.data.sort((admin1: Admin, admin2: Admin) =>
          admin1.pseudo.localeCompare(admin2.pseudo)
        );
      }
    });
  }

  // Launch a popup to update a Admin (with data !== null (edition mode)
  // Then, sort alphabetically the datasource
  UpdateAdmin(admin: Admin) {
    const dialogRef = this.dialog.open(AdminPopupComponent, {
      width: '30%',
      data: admin
    });

    dialogRef.afterClosed().subscribe((UpdatedAdmin: Admin) => {
      if (UpdatedAdmin != undefined) {
        this.dataSourceAdmin.data = this.dataSourceAdmin.data.sort((admin1: Admin, admin2: Admin) =>
          admin1.pseudo.localeCompare(admin2.pseudo)
        );
      }
    });
  }

  // Launch the generic DeletePopupComponent to remove a beam.
  // Then, if deleted, remove it from the datasource.
  DeleteAdmin(admin: Admin) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '30%',
      data: {object: admin, type:'admin'}
    });

    dialogRef.afterClosed().subscribe((DeletedAdmin: Admin) => {
      if (DeletedAdmin != undefined) {
        this.dataSourceAdmin.data = this.dataSourceAdmin.data.filter((admin: Admin) =>
          admin._id !== DeletedAdmin._id)
      }
    });
  }

}
