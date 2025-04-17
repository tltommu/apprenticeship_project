import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- This is needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Apprenticeship_Project';
  user = {
    name: '',
    email: '',
    card: ''
  };

  onSubmit() {
    if (this.validateLUHN(this.user.card)) {
      const emailBody = `Name: ${this.user.name}\nEmail: ${this.user.email}\nCard: ${this.user.card}`;
      window.location.href = `mailto:test@dn-uk.com?subject=Form Submission&body=${encodeURIComponent(emailBody)}`;
    } else {
      alert('Credit card number is invalid. Please try again.');
    }
  }

  validateLUHN(card: string): boolean {
    let sum = 0;
    let shouldDouble = false;
    for (let i = card.length - 1; i >= 0; i--) {
      let digit = parseInt(card.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }
}
