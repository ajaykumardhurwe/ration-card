// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { RationCardService } from '../services/ration-card.service';
// import { DISTRICTS } from '../data/location-data';
// import { District } from '../models/ration-card.model';

// @Component({
//   selector: 'app-edit-ration-card',
//   standalone: false,
//   templateUrl: './edit-ration-card.component.html',
//   styleUrls: ['./edit-ration-card.component.css'],
// })
// export class EditRationCardComponent implements OnInit {
//   form!: FormGroup;
//   cardId = '';
//   districts: District[] = DISTRICTS;
//   blocks: string[] = [];
//   gramPanchayats: string[] = [];
//   maxDate = new Date();
//   isSubmitting = false;
//   isLoading = true;

//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     private service: RationCardService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.cardId = this.route.snapshot.paramMap.get('id') || '';

//     this.form = this.fb.group({
//       district: ['', Validators.required],
//       block: [{ value: '', disabled: true }, Validators.required],
//       gramPanchayat: [{ value: '', disabled: true }, Validators.required],
//       rationCardName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
//       dob: ['', Validators.required],
//       gender: ['', Validators.required],
//       mobile: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
//       email: ['', [Validators.required, Validators.email]],
//       totalFamilyMembers: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
//     });

//     this.form.get('district')!.valueChanges.subscribe((districtName: string) => {
//       const district = this.districts.find((d) => d.name === districtName);
//       this.blocks = district ? district.blocks.map((b) => b.name) : [];
//       this.gramPanchayats = [];
//       this.form.get('block')!.setValue('');
//       this.form.get('gramPanchayat')!.setValue('');
//       if (district) {
//         this.form.get('block')!.enable();
//       } else {
//         this.form.get('block')!.disable();
//         this.form.get('gramPanchayat')!.disable();
//       }
//     });

//     this.form.get('block')!.valueChanges.subscribe((blockName: string) => {
//       const district = this.districts.find((d) => d.name === this.form.get('district')!.value);
//       const block = district?.blocks.find((b) => b.name === blockName);
//       this.gramPanchayats = block ? block.gramPanchayats : [];
//       this.form.get('gramPanchayat')!.setValue('');
//       if (block) {
//         this.form.get('gramPanchayat')!.enable();
//       } else {
//         this.form.get('gramPanchayat')!.disable();
//       }
//     });

//     this.loadCard();
//   }

//   private loadCard(): void {
//     this.service.getRationCardById(this.cardId).subscribe({
//       next: (card) => {
//         this.form.patchValue({
//           district: card.district,
//           block: card.block,
//           gramPanchayat: card.gramPanchayat,
//           rationCardName: card.rationCardName,
//           dob: card.dob ? new Date(card.dob) : '',
//           gender: card.gender,
//           mobile: card.mobile,
//           email: card.email,
//           totalFamilyMembers: card.totalFamilyMembers,
//         });

//         // Enable dependent dropdowns based on loaded values
//         const district = this.districts.find((d) => d.name === card.district);
//         if (district) {
//           this.blocks = district.blocks.map((b) => b.name);
//           this.form.get('block')!.enable();
//           const block = district.blocks.find((b) => b.name === card.block);
//           if (block) {
//             this.gramPanchayats = block.gramPanchayats;
//             this.form.get('gramPanchayat')!.enable();
//           }
//         }

//         this.isLoading = false;
//       },
//       error: () => {
//         this.snackBar.open('Failed to load record.', 'Close', { duration: 3000 });
//         this.router.navigate(['/list']);
//       },
//     });
//   }


//   onSubmit(): void {
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       this.snackBar.open('Please fix the errors in the form.', 'Close', { duration: 3000 });
//       return;
//     }

//     this.isSubmitting = true;
//     const payload = {
//       ...this.form.getRawValue(),
//       dob: this.formatDate(this.form.get('dob')!.value),
//       totalFamilyMembers: Number(this.form.get('totalFamilyMembers')!.value),
//     };

//     this.service.updateRationCard(this.cardId, payload).subscribe({
//       next: () => {
//         this.snackBar.open('Ration card updated successfully!', 'Close', { duration: 3000 });
//         this.router.navigate(['/list']);
//       },
//       error: () => {
//         this.snackBar.open('Failed to update ration card.', 'Close', { duration: 3000 });
//         this.isSubmitting = false;
//       },
//     });
//   }

//   goBack(): void {
//     this.router.navigate(['/list']);
//   }

//   private formatDate(date: Date): string {
//     if (!date) return '';
//     const d = new Date(date);
//     const month = ('0' + (d.getMonth() + 1)).slice(-2);
//     const day = ('0' + d.getDate()).slice(-2);
//     return `${d.getFullYear()}-${month}-${day}`;
//   }
// }













import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RationCardService } from '../services/ration-card.service';
import { DISTRICTS } from '../data/location-data';
import { District } from '../models/ration-card.model';

@Component({
  selector: 'app-edit-ration-card',
  standalone: false,
  templateUrl: './edit-ration-card.component.html',
  styleUrls: ['./edit-ration-card.component.css'],
})
export class EditRationCardComponent implements OnInit {
  form!: FormGroup;
  cardId = '';
  districts: District[] = DISTRICTS;
  blocks: string[] = [];
  gramPanchayats: string[] = [];
  maxDate = new Date();
  isSubmitting = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: RationCardService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cardId = this.route.snapshot.paramMap.get('id') || '';

    this.form = this.fb.group({
      district: ['', Validators.required],
      block: [{ value: '', disabled: true }, Validators.required],
      gramPanchayat: [{ value: '', disabled: true }, Validators.required],
      rationCardName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      totalFamilyMembers: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
    });

    // Handle user manual changes to District
    this.form.get('district')!.valueChanges.subscribe((districtName: string) => {
      if (this.isLoading) return; // Prevent interference while loadCard() populates initial data

      const district = this.districts.find((d) => d.name === districtName);
      this.blocks = district ? district.blocks.map((b) => b.name) : [];
      this.gramPanchayats = [];
      this.form.get('block')!.setValue('', { emitEvent: false });
      this.form.get('gramPanchayat')!.setValue('', { emitEvent: false });

      if (district) {
        this.form.get('block')!.enable();
      } else {
        this.form.get('block')!.disable();
        this.form.get('gramPanchayat')!.disable();
      }
    });

    // Handle user manual changes to Block
    this.form.get('block')!.valueChanges.subscribe((blockName: string) => {
      if (this.isLoading) return; // Prevent interference while loadCard() populates initial data

      const district = this.districts.find((d) => d.name === this.form.get('district')!.value);
      const block = district?.blocks.find((b) => b.name === blockName);
      this.gramPanchayats = block ? block.gramPanchayats : [];
      this.form.get('gramPanchayat')!.setValue('', { emitEvent: false });

      if (block) {
        this.form.get('gramPanchayat')!.enable();
      } else {
        this.form.get('gramPanchayat')!.disable();
      }
    });

    this.loadCard();
  }

  private loadCard(): void {
    this.service.getRationCardById(this.cardId).subscribe({
      next: (card) => {
        // 1. Populate options arrays first
        const district = this.districts.find((d) => d.name === card.district);
        if (district) {
          this.blocks = district.blocks.map((b) => b.name);
          this.form.get('block')!.enable();

          const block = district.blocks.find((b) => b.name === card.block);
          if (block) {
            this.gramPanchayats = block.gramPanchayats;
            this.form.get('gramPanchayat')!.enable();
          }
        }

        // 2. Patch form values without triggering valueChanges loop
        this.form.patchValue(
          {
            district: card.district,
            block: card.block,
            gramPanchayat: card.gramPanchayat,
            rationCardName: card.rationCardName,
            dob: card.dob ? new Date(card.dob) : '',
            gender: card.gender,
            mobile: card.mobile,
            email: card.email,
            totalFamilyMembers: card.totalFamilyMembers,
          },
          { emitEvent: false }
        );

        // 3. Mark loading complete so subscription handlers resume normally
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load record.', 'Close', { duration: 3000 });
        this.router.navigate(['/list']);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fix the errors in the form.', 'Close', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;
    const payload = {
      ...this.form.getRawValue(),
      dob: this.formatDate(this.form.get('dob')!.value),
      totalFamilyMembers: Number(this.form.get('totalFamilyMembers')!.value),
    };

    this.service.updateRationCard(this.cardId, payload).subscribe({
      next: () => {
        this.snackBar.open('Ration card updated successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/list']);
      },
      error: () => {
        this.snackBar.open('Failed to update ration card.', 'Close', { duration: 3000 });
        this.isSubmitting = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }
}