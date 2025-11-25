import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';   
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule], 
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

  loadVehicles() {
    this.api.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data.vehicles;
      },
      error: (err) => console.error('Erro ao carregar veículos:', err)
    });
  }

  selectVehicle() {
    if (!this.selectedModel) return;
    this.selectedVehicle = this.vehicles.find(v => v.vehicle === this.selectedModel) || null;
  }

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
