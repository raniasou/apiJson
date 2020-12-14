import { ClientsService } from './../services/clients.service';
import { Client } from './../models/client';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.page.html',
  styleUrls: ['./update-client.page.scss'],
})
export class UpdateClientPage implements OnInit {

  // Public Properties

  clients: Client[] = [];
  client: Client;
  clientForm = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });
  constructor(
    private clientService: ClientsService,
    private router: NavController,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params) {
        this.clientService.getClient(params['id']).subscribe(
          data => {
            if (data) {
              this.client = data;
              this.clientForm.patchValue(this.client);
            }
          }
        );
      }
    });
  }

  edit() {
    const client = this.clientForm.value;

    this.clientService.editClient(client).subscribe(
      newClient$ => {
        this.clientForm.reset();
        this.clientService.editClient$.next(newClient$);
        this.router.pop();
      }
    );
  }

  toDelete() {

    this.clientService.delete(this.client.id).subscribe(deleted => {
      if (deleted) {

        this.clientService.delete(this.client.id);
        this.router.pop();
      }
    });
  }

}
