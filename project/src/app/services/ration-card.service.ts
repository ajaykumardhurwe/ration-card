
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RationCard } from '../models/ration-card.model';


@Injectable({
  providedIn: 'root',
})
export class RationCardService {
  private apiUrl = 'http://localhost:5000/api/ration-cards';

  constructor(private http: HttpClient) {}

  getRationCards(): Observable<RationCard[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((rawResponse) => console.log('Raw API Response from backend:', rawResponse)),
      map((response) => {
        // Handle wrapper object { success: true, data: [...] } OR raw array
        const items: any[] = Array.isArray(response)
          ? response
          : response?.data || [];

        return items.map((item) => ({
          id: String(item.id || item._id || ''),
          _id: String(item._id || item.id || ''),
          district: item.district || '',
          block: item.block || '',
          gramPanchayat: item.gram_panchayat || item.gramPanchayat || '',
          rationCardName: item.ration_card_name || item.rationCardName || '',
          dob: item.date_of_birth || item.dob || '',
          gender: item.gender || '',
          mobile: item.mobile_number || item.mobile || '',
          email: item.email_id || item.email || '',
          totalFamilyMembers: Number(item.total_members ?? item.totalFamilyMembers ?? 0),
        }));
      }),
      tap((transformed) => console.log('Transformed records for Angular Table:', transformed))
    );
  }

  getRationCardById(id: string): Observable<RationCard> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        const item = response?.data || response;
        return {
          id: String(item.id || item._id || ''),
          _id: String(item._id || item.id || ''),
          district: item.district || '',
          block: item.block || '',
          gramPanchayat: item.gram_panchayat || item.gramPanchayat || '',
          rationCardName: item.ration_card_name || item.rationCardName || '',
          dob: item.date_of_birth || item.dob || '',
          gender: item.gender || '',
          mobile: item.mobile_number || item.mobile || '',
          email: item.email_id || item.email || '',
          totalFamilyMembers: Number(item.total_members ?? item.totalFamilyMembers ?? 0),
        };
      })
    );
  }

  createRationCard(card: RationCard): Observable<RationCard> {
    return this.http.post<RationCard>(this.apiUrl, this.mapToBackendPayload(card));
  }

  updateRationCard(id: string, card: RationCard): Observable<RationCard> {
    return this.http.put<RationCard>(`${this.apiUrl}/${id}`, this.mapToBackendPayload(card));
  }

  deleteRationCard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapToBackendPayload(card: RationCard): Record<string, any> {
    return {
      district: card.district,
      block: card.block,
      gram_panchayat: card.gramPanchayat,
      ration_card_name: card.rationCardName,
      date_of_birth: card.dob,
      gender: card.gender,
      mobile_number: card.mobile,
      email_id: card.email,
      total_members: card.totalFamilyMembers,
    };
  }
}
















