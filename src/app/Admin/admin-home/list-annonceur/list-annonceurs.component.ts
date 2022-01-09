import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Annonceur} from '../../../Common/Schemas/classes';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MessageService} from '../../../message.service';
import {AuthenticationService} from '../../../authentication.service';
import {MatDialog} from '@angular/material/dialog';
import {DeletePopupComponent} from '../../../Common/delete-popup/delete-popup.component';
import {AnnonceurPopupComponent} from './annonceur-popup/annonceur-popup.component';

@Component({
  selector: 'app-list-annonceurs',
  templateUrl: './list-annonceurs.component.html',
  styleUrls: ['./list-annonceurs.component.scss']
})
export class ListAnnonceursComponent implements OnInit {

  displayedColumns: string[] = [          // List of the columns of the table. This list is ordered
    "edit", "delete", "pseudo", "email"
  ];
  dataSourceAnnonceur = new MatTableDataSource<Annonceur>();

  @ViewChild('errorMessageComponent') errorMessage;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private msg: MessageService,
              public auth: AuthenticationService,
              public dialog: MatDialog) { }

  // Initialization: retrieve all Annonceur & sort them alphabetically.
  ngOnInit(): void {
    this.msg.Read('annonceurs', null).subscribe(
      res => {
        if (res.status === 'error') {
          this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.dataSourceAnnonceur.data = res.data;
          this.dataSourceAnnonceur.paginator = this.paginator;
          this.dataSourceAnnonceur.sort = this.sort;

          this.dataSourceAnnonceur.data = this.dataSourceAnnonceur.data.sort((annonceur1: Annonceur, annonceur2: Annonceur) =>
            annonceur1.pseudo.localeCompare(annonceur2.pseudo)
          );
        }
      }
    )
  }

  // Filter function for the datasource.
  filterAnnonceurs(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAnnonceur.filter = filterValue.trim().toLowerCase();
  }

  // Launch a popup to create a new Annonceur (with data === null (creation mode).
  // Then, add the new Annonceur to the datasource & sort it alphabetically (this make it refresh too).
  CreateAnnonceur() {
    const dialogRef = this.dialog.open(AnnonceurPopupComponent, {
      width: '30%',
      data: null
    });

    dialogRef.afterClosed().subscribe((CreatedAnnonceur: Annonceur) => {
      if (CreatedAnnonceur != undefined) {
        this.dataSourceAnnonceur.data.push(CreatedAnnonceur);
        this.dataSourceAnnonceur.data = this.dataSourceAnnonceur.data.sort((annonceur1: Annonceur, annonceur2: Annonceur) =>
          annonceur1.pseudo.localeCompare(annonceur2.pseudo)
        );
      }
    });
  }

  // Launch a popup to update a Annonceur (with data !== null (edition mode)
  // Then, sort alphabetically the datasource
  UpdateAnnonceur(annonceur: Annonceur) {
    const dialogRef = this.dialog.open(AnnonceurPopupComponent, {
      width: '30%',
      data: annonceur
    });

    dialogRef.afterClosed().subscribe((UpdatedAnnonceur: Annonceur) => {
      if (UpdatedAnnonceur != undefined) {
        this.dataSourceAnnonceur.data = this.dataSourceAnnonceur.data.sort((annonceur1: Annonceur, annonceur2: Annonceur) =>
          annonceur1.pseudo.localeCompare(annonceur2.pseudo)
        );
      }
    });
  }

  // Launch the generic DeletePopupComponent to remove a beam.
  // Then, if deleted, remove it from the datasource.
  DeleteAnnonceur(annonceur: Annonceur) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '30%',
      data: {object: annonceur, type:'annonceur'}
    });

    dialogRef.afterClosed().subscribe((DeletedAnnonceur: Annonceur) => {
      if (DeletedAnnonceur != undefined) {
        this.dataSourceAnnonceur.data = this.dataSourceAnnonceur.data.filter((annonceur: Annonceur) =>
          annonceur._id !== DeletedAnnonceur._id)
      }
    });
  }

}
