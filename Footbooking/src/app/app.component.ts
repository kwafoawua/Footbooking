import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './models/user';
import { Subscription } from 'rxjs/Subscription';
import { Club } from './models/club';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers : [AuthService]
})
export class AppComponent implements OnInit, OnDestroy {
    user: User;
    club: Club;
    message: String;
    subscription: Subscription;
    
constructor( private authService: AuthService) {
    this.subscription = authService.user$.subscribe( (user) => this.user = user );
}
  title = 'app works!';

ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    
    //example of verification
        this.authService.verify().subscribe( (res) => this.message = res['message']);
    
}
    logout() {
    this.authService.logout();
    this.user = null;
    this.message = "Logged out";
  }
    ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}

/*
A few things to note here, we’ll be building a authService, and subscribing to the user$ Observable. This is a way for components to pass data around. Basically, when we register a user in the register component, we want to pass the user back up to this app component. That way we can pass the user around anywhere in the app, block routes, etc. Also, we create a logout function, which also hits the auth service we will be building.*/
