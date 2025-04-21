import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
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

  submitted=false;

  onSubmit(form: any) {
    if (!form.valid) {
      alert('Please complete all fields correctly before submitting.');
      return;
    }
  
    if (!this.validateLUHN(this.user.card)) {
      alert('Credit card number is invalid. Please try again.');
      return;
    }
  
    const emailBody = `Name: ${this.user.name}\nEmail: ${this.user.email}\nCard: ${this.user.card}`;
    window.location.href = `mailto:test@dn-uk.com?subject=Form Submission&body=${encodeURIComponent(emailBody)}`;
  
    this.submitted = true;
  
    // Optional: Clear form after sending
    setTimeout(() => {
      this.submitted = false;
      form.resetForm();
    }, 3000);
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
