import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { PaymentsComponent } from './components/payments/payments.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MenuComponent, PaymentsComponent]
})
export class CanteenModule { }
