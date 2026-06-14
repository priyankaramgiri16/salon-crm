import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings {

  salonName = 'Salon CRM';
  phone = '9876543210';

  saveSettings() {

    localStorage.setItem('salonName', this.salonName);
    localStorage.setItem('salonPhone', this.phone);

    alert('Settings Saved');
  }

}