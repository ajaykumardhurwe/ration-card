import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RationCardService } from '../services/ration-card.service';
import { DISTRICTS } from '../data/location-data';
import { District } from '../models/ration-card.model';

@Component({
  selector: 'app-add-ration-card',
  standalone: false,
  templateUrl: './add-ration-card.component.html',
  styleUrls: ['./add-ration-card.component.css'],
})
export class AddRationCardComponent implements OnInit {
  form!: FormGroup;
  districts: District[] = DISTRICTS;
  blocks: string[] = [];
  gramPanchayats: string[] = [];
  maxDate = new Date();
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private service: RationCardService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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

    this.form.get('district')!.valueChanges.subscribe((districtName: string) => {
      const district = this.districts.find((d) => d.name === districtName);
      this.blocks = district ? district.blocks.map((b) => b.name) : [];
      this.gramPanchayats = [];
      this.form.get('block')!.setValue('');
      this.form.get('gramPanchayat')!.setValue('');
      if (district) {
        this.form.get('block')!.enable();
      } else {
        this.form.get('block')!.disable();
        this.form.get('gramPanchayat')!.disable();
      }
    });

    this.form.get('block')!.valueChanges.subscribe((blockName: string) => {
      const district = this.districts.find((d) => d.name === this.form.get('district')!.value);
      const block = district?.blocks.find((b) => b.name === blockName);
      this.gramPanchayats = block ? block.gramPanchayats : [];
      this.form.get('gramPanchayat')!.setValue('');
      if (block) {
        this.form.get('gramPanchayat')!.enable();
      } else {
        this.form.get('gramPanchayat')!.disable();
      }
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

    this.service.createRationCard(payload).subscribe({
      next: () => {
        this.snackBar.open('Ration card created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/list']);
      },
      error: () => {
        this.snackBar.open('Failed to create ration card.', 'Close', { duration: 3000 });
        this.isSubmitting = false;
      },
    });
  }

  onReset(): void {
    this.form.reset();
    this.blocks = [];
    this.gramPanchayats = [];
    this.form.get('block')!.disable();
    this.form.get('gramPanchayat')!.disable();
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













