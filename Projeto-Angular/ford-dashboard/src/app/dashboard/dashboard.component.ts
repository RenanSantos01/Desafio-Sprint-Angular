import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchModel: string = '';
  selectedVehicle: any = null;
  vehicleData: any = null;

  constructor(private http: HttpClient) {}

  // 🔹 Simula a busca no back-end
  selectVehicle(vehicle: any) {
    if (!vehicle.model) return;

    // Busca no endpoint da API fake (ajuste se precisar)
    this.http.get<any>(`http://localhost:3001/vehicle?model=${vehicle.model}`).subscribe({
      next: (data) => {
        this.selectedVehicle = data[0] || null;

        // Depois, busca os dados detalhados
        if (this.selectedVehicle) {
          this.http
            .get<any>(`http://localhost:3001/vehicleData?code=${this.selectedVehicle.code}`)
            .subscribe((info) => {
              this.vehicleData = info[0];
            });
        }
      },
      error: (err) => console.error('Erro ao buscar veículo:', err)
    });
  }
}
