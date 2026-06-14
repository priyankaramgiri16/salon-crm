import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff.html',
  styleUrls: ['./staff.css']
})
export class Staff {

  staffList = [
    {
      id: 1,
      name: 'Riya',
      role: 'Hair Stylist',
      phone: '9876543210'
    },
    {
      id: 2,
      name: 'Pallavi',
      role: 'Beautician',
      phone: '9876543211'
    },
    {
      id: 3,
      name: 'Tejas',
      role: 'Hair Expert',
      phone: '9876543212'
    }
  ];
}