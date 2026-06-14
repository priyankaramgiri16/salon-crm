import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarComponent implements OnInit {

  slots = [
    {
      date: '2026-06-15',
      staff: 'Riya',
      time: '10:00',
      status: 'Available'
    },
    {
      date: '2026-06-16',
      staff: 'Pallavi',
      time: '11:00',
      status: 'Available'
    },
    {
      date: '2026-06-17',
      staff: 'Tejas',
      time: '12:00',
      status: 'Available'
    },
    {
      date: '2026-06-18',
      staff: 'Priya',
      time: '14:00',
      status: 'Available'
    }
  ];

  ngOnInit(): void {

    this.loadSlotStatus();

  }

  loadSlotStatus() {

    const appointments = JSON.parse(
      localStorage.getItem('appointments') || '[]'
    );

    this.slots.forEach(slot => {

      const booked = appointments.some(
        (a: any) =>
          a.date === slot.date &&
          a.time === slot.time
      );

      slot.status = booked
        ? 'Booked'
        : 'Available';

    });
  }

  selectSlot(slot: any) {

    if (slot.status === 'Booked') {

      alert('This slot is already booked');
      return;
    }

    const staffList = [

      {
        name: 'Riya',
        role: 'Hair Stylist'
      },

      {
        name: 'Pallavi',
        role: 'Beautician'
      },

      {
        name: 'Tejas',
        role: 'Hair Expert'
      }

    ];

    const selectedStaff = staffList.find(
      s => s.name === slot.staff
    );

    localStorage.setItem(
      'selectedSlot',
      JSON.stringify({
        ...slot,
        role: selectedStaff?.role
      })
    );

    window.location.href = '/appointments';
  }
}