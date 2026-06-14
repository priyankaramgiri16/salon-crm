import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {

  services: any[] = [];

  ngOnInit(): void {

    const savedServices =
      localStorage.getItem('services');

    if (savedServices) {

      this.services =
        JSON.parse(savedServices);

    } else {

      this.services = [

        {
          name: 'Hair Cutting',
          price: 500,
          duration: '30 Min'
        },

        {
          name: 'Facial',
          price: 1200,
          duration: '60 Min'
        },

        {
          name: 'Hair Spa',
          price: 1500,
          duration: '90 Min'
        }

      ];

      this.saveServices();
    }
  }

  addService() {

    const name =
      prompt('Enter Service Name');

    if (!name) return;

    const price =
      prompt('Enter Service Price');

    if (!price) return;

    const duration =
      prompt('Enter Duration');

    if (!duration) return;

    this.services.push({
      name,
      price: Number(price),
      duration
    });

    this.saveServices();

    alert('Service Added Successfully');
  }

  editService(index: number) {

    const service =
      this.services[index];

    const name = prompt(
      'Edit Service Name',
      service.name
    );

    if (!name) return;

    const price = prompt(
      'Edit Price',
      service.price
    );

    if (!price) return;

    const duration = prompt(
      'Edit Duration',
      service.duration
    );

    if (!duration) return;

    this.services[index] = {
      name,
      price: Number(price),
      duration
    };

    this.saveServices();

    alert('Service Updated');
  }

  deleteService(index: number) {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this service?'
      );

    if (confirmDelete) {

      this.services.splice(index, 1);

      this.saveServices();

      alert('Service Deleted');
    }
  }

  saveServices() {

    localStorage.setItem(
      'services',
      JSON.stringify(this.services)
    );

  }

}