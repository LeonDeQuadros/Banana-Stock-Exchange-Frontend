import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(
    private auth: Auth,
    private router: Router
  ){}

  credentials = {
    username: '',
    password: ''
  };

  onSubmit(){
    this.auth.login(this.credentials).subscribe({
      next: (response)=> {
        console.log('Login succesful!', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error)=> {
        console.error('Login failed', error);
      }
    })
  }

}
