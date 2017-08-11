import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '../models/club';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.component.html',
  styleUrls: ['./register-club.component.css']
})
export class RegisterClubComponent implements OnInit {
    club: Club;
    message: string = '';

  constructor(private authService: AuthService, private router: Router) {
      this.club = new Club;
  }
    
    registerClub(club) {
        this.authService.registerClub(club).subscribe( (res) => {
            if( res['success'] == true ) {
                this.authService.setUser(res['user']);
                this.router.navigate(['']);
            } else {
                this.message = res['message'];
            }
        });
    }

  ngOnInit() {
  }

}
