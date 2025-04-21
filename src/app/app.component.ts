import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser'

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

    this.sendEmail(form);
  }

  sendEmail(form: any) {
    const templateParams = {
      to_email: 'test@dn-uk.com',
      user_name: this.user.name,
      user_email: this.user.email,
      user_card: this.user.card
    };

    emailjs
    .send('service_7s8ljg5', 'template_5o1piap', templateParams, '0FWJS1rBZprMLg9cl')
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('✅ Email sent successfully!');
        this.submitted = true;

        // Optional: Clear form after success
        setTimeout(() => {
          this.submitted = false;
          form.resetForm();
        }, 3000);
      },
      (err) => {
        console.error('FAILED...', err);
        alert('❌ Failed to send email.');
      }
    );
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
