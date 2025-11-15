import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';

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

  vinCode: string = '';
  vinData: any = null;

  constructor(private api: ApiService) {
    this.loadVehicles();
  }

  // ✔ sua API retorna { vehicles: [...] }
  loadVehicles() {
    this.api.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data.vehicles; // PEGA O ARRAY CERTO
      },
      error: (err) => console.error('Erro ao carregar veículos:', err)
    });
  }

  // ✔ filtra no frontend (já que sua API NÃO tem /vehicle?model=)
  selectVehicle() {
    if (!this.selectedModel) return;

    this.selectedVehicle = this.vehicles.find(
      v => v.vehicle === this.selectedModel
    ) || null;
  }

  // ✔ VIN usa POST (como na sua API)
  searchByVin() {
    if (!this.vinCode) return;

    this.api.getVinData(this.vinCode).subscribe({
      next: (data) => {
        this.vinData = data;
      },
      error: () => {
        this.vinData = null;
        alert("Código VIN não encontrado!");
      }
    });
  }
}
