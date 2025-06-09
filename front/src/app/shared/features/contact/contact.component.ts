import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MessagesModule} from "primeng/messages";
import {Button} from "primeng/button";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MessagesModule,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  messageSent: boolean = false;
  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(300)]],
  });

  constructor(private readonly fb: FormBuilder) {
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // You could send the form data to a backend here
      this.messageSent = true;
      this.contactForm.reset();
    }
  }
}
