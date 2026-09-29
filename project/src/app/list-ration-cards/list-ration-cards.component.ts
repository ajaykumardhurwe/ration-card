
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatTableDataSource } from '@angular/material/table'; // 1. Import MatTableDataSource
// import { RationCardService } from '../services/ration-card.service';
// import { RationCard } from '../models/ration-card.model';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

// @Component({
//   selector: 'app-list-ration-cards',
//   standalone: false,
//   templateUrl: './list-ration-cards.component.html',
//   styleUrls: ['./list-ration-cards.component.css'],
// })
// export class ListRationCardsComponent implements OnInit {
//   // 2. Initialize dataSource with MatTableDataSource
//   dataSource = new MatTableDataSource<RationCard>([]);
  
//   displayedColumns = [
//     'rationCardName',
//     'district',
//     'block',
//     'gramPanchayat',
//     'gender',
//     'mobile',
//     'email',
//     'totalFamilyMembers',
//     'actions',
//   ];
//   isLoading = true;

//   constructor(
//     private service: RationCardService,
//     private router: Router,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.loadRecords();
//   }

//   loadRecords(): void {
//     this.isLoading = true;
//     this.service.getRationCards().subscribe({
//       next: (data) => {
//         // 3. Update the data property of MatTableDataSource
//         this.dataSource.data = data || [];
//         this.isLoading = false;
//       },
//       error: () => {
//         this.snackBar.open('Failed to load records.', 'Close', { duration: 3000 });
//         this.isLoading = false;
//       },
//     });
//   }

//   onEdit(id: string): void {
//     this.router.navigate(['/edit', id]);
//   }

//   onDelete(card: RationCard): void {
//     const cardId = card._id || card.id || '';
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '360px',
//       data: { name: card.rationCardName },
//     });

//     dialogRef.afterClosed().subscribe((confirmed: boolean) => {
//       if (confirmed) {
//         this.service.deleteRationCard(cardId).subscribe({
//           next: () => {
//             this.snackBar.open('Record deleted successfully!', 'Close', { duration: 3000 });
//             this.loadRecords();
//           },
//           error: () => {
//             this.snackBar.open('Failed to delete record.', 'Close', { duration: 3000 });
//           },
//         });
//       }
//     });
//   }

//   onAdd(): void {
//     this.router.navigate(['/add']);
//   }
// }


















import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table'; // 1. Import MatTableDataSource
import { RationCardService } from '../services/ration-card.service';
import { RationCard } from '../models/ration-card.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-ration-cards',
  standalone: false,
  templateUrl: './list-ration-cards.component.html',
  styleUrls: ['./list-ration-cards.component.css'],
})
export class ListRationCardsComponent implements OnInit {
  // 2. Initialize dataSource with MatTableDataSource
  dataSource = new MatTableDataSource<RationCard>([]);
  
  displayedColumns = [
    'rationCardName',
    'district',
    'block',
    'gramPanchayat',
    'gender',
    'mobile',
    'email',
    'totalFamilyMembers',
    'actions',
  ];
  isLoading = true;

  constructor(
    private service: RationCardService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.isLoading = true;
    this.service.getRationCards().subscribe({
      next: (data) => {
        // 3. Update the data property of MatTableDataSource
        this.dataSource.data = data || [];
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load records.', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
    });
  }

  onEdit(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  onDelete(card: RationCard): void {
    const cardId = card._id || card.id || '';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: { name: card.rationCardName },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteRationCard(cardId).subscribe({
          next: () => {
            this.snackBar.open('Record deleted successfully!', 'Close', { duration: 3000 });
            this.loadRecords();
          },
          error: () => {
            this.snackBar.open('Failed to delete record.', 'Close', { duration: 3000 });
          },
        });
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['/add']);
  }
}
