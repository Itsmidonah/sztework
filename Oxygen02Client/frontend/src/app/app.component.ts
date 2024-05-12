import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LogoComponent, FormsModule,LoginComponent,CartComponent,
        OrderComponent,UserComponent,ProductComponent],
    providers: [AuthService]
})
export class AppComponent {
submitForm() {
throw new Error('Method not implemented.');
}
  title = 'O2 General Phones & Accesories';
confirmPassword: any;
}

/* 
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'mobilephones-webshop';
}
*/