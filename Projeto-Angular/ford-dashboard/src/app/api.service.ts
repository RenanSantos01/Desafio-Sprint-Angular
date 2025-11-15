import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // ✔ sua API retorna { vehicles: [...] }
  getVehicles() {
    return this.http.get<any>(`${this.apiUrl}/vehicles`);
  }

  // ❌ sua API NÃO tem /vehicle?model=
  // Então REMOVEMOS essa função
  // e vamos filtrar no próprio Angular.

  // ✔ sua API usa POST /vehicleData
  getVinData(vin: string) {
    return this.http.post<any>(`${this.apiUrl}/vehicleData`, { vin });
  }
}
