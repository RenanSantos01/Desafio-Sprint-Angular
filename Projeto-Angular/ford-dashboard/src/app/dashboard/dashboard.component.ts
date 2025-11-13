import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  vehicles: any[] = [];
  selectedModel: string = '';
  selectedVehicle: any = null;
  vehicleData: any = null;

  vinCode: string = '';
  vinData: any = null;

  constructor(private http: HttpClient) {
    this.loadVehicles();
  }

  // 🔹 Carrega a lista de veículos para o dropdown
  loadVehicles() {
    this.http.get<any[]>('http://localhost:3001/vehicle').subscribe({
      next: (data) => (this.vehicles = data),
      error: (err) => console.error('Erro ao carregar veículos:', err)
    });
  }

  // 🔹 Busca os dados do veículo selecionado no dropdown
  selectVehicle() {
    if (!this.selectedModel) return;

    this.http.get<any[]>(`http://localhost:3001/vehicle?model=${this.selectedModel}`).subscribe({
      next: (data) => {
        this.selectedVehicle = data[0] || null;
        if (this.selectedVehicle) {
          this.http
            .get<any[]>(`http://localhost:3001/vehicleData?code=${this.selectedVehicle.code}`)
            .subscribe((info) => (this.vehicleData = info[0]));
        }
      },
      error: (err) => console.error('Erro ao buscar veículo:', err)
    });
  }

  // 🔹 Busca por código VIN (odômetro, combustível, lat, long)
  searchByVin() {
    if (!this.vinCode) return;

    this.http.get<any[]>(`http://localhost:3001/vehicleVin?code=${this.vinCode}`).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.vinData = data[0];
        } else {
          this.vinData = null;
          alert('Código VIN não encontrado!');
        }
      },
      error: (err) => console.error('Erro ao buscar VIN:', err)
    });
  }
}
