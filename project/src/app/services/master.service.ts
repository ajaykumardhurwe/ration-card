import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MasterService {

  private apiUrl = 'http://localhost:5000/api/master';

  constructor(private http: HttpClient) {}


  // GET ALL DISTRICTS
  getDistricts(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/districts`).pipe(

      tap((rawResponse) =>
        console.log('Raw District API Response:', rawResponse)
      ),

      map((response) => {

        const items: any[] = Array.isArray(response)
          ? response
          : response?.data || [];

        return items.map((item) => ({
          id: Number(item.id),
          districtName: item.district_name || '',
          isActive: item.is_active,
          createdAt: item.created_at
        }));

      }),

      tap((transformed) =>
        console.log('Transformed Districts:', transformed)
      )
    );
  }


  // GET BLOCKS BY DISTRICT
  getBlocksByDistrict(districtId: number): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/districts/${districtId}/blocks`)
      .pipe(

        tap((rawResponse) =>
          console.log('Raw Block API Response:', rawResponse)
        ),

        map((response) => {

          const items: any[] = Array.isArray(response)
            ? response
            : response?.data || [];

          return items.map((item) => ({
            id: Number(item.id),
            districtId: Number(item.district_id),
            blockName: item.block_name || '',
            isActive: item.is_active,
            createdAt: item.created_at
          }));

        }),

        tap((transformed) =>
          console.log('Transformed Blocks:', transformed)
        )
      );
  }


  // GET GRAM PANCHAYATS BY BLOCK
  getGramPanchayatsByBlock(blockId: number): Observable<any[]> {
    return this.http
      .get<any>(
        `${this.apiUrl}/blocks/${blockId}/gram-panchayats`
      )
      .pipe(

        tap((rawResponse) =>
          console.log('Raw Gram Panchayat API Response:', rawResponse)
        ),

        map((response) => {

          const items: any[] = Array.isArray(response)
            ? response
            : response?.data || [];

          return items.map((item) => ({
            id: Number(item.id),
            blockId: Number(item.block_id),
            gramPanchayatName:
              item.gram_panchayat_name || '',
            isActive: item.is_active,
            createdAt: item.created_at
          }));

        }),

        tap((transformed) =>
          console.log(
            'Transformed Gram Panchayats:',
            transformed
          )
        )
      );
  }
}