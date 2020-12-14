import { ClientsService } from './../services/clients.service';
import { Client } from './../models/client';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {
 clients: Client[]= [];
 clientForm = this.FormBuilder.group({
   firstName: [ '', Validators.required],
   lastName: ['', Validators.required],
 });
  constructor(public FormBuilder: FormBuilder, private ClientsService: ClientsService ,
    private router: NavController) { //formbuiller intermédaire entre le formgroup et le forme control name
   
  }

  ngOnInit() {
  }

  save() {
    console.log('hello')
    const client = this.clientForm.value ;
    console.log('form', client)
    this.ClientsService.save(client).subscribe(
      newClient => {
        this.clients.push(newClient);
        this.clientForm.reset();
        this.ClientsService.newClient$.next(newClient);
        this.router.navigateForward('clients');
      }
    )
  }

  }

