import { ClientsService } from './../services/clients.service';
import { Client } from './../models/client';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  //  Public Properties
  clients: Client[];
  constructor(
    private clientService: ClientsService,
    private router: NavController) {

  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      }
    );

    this.clientService.newClient$.subscribe(
      newClient$ => {
        if (newClient$) {
          this.clients.push(newClient$);
        }
      }
    );

    this.clientService.editClient$.subscribe(
      editClient => {
        if (editClient) {
          for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id === editClient.id) {
              this.clients[i] = { ...editClient };
            }
          }
        }
      }
    );

    this.clientService.deleteClient$.subscribe(
      toDelete => {

        if (toDelete) {
          this.clients = [...this.arrayRemove(this.clients, 0)];
        }
      }
    )
  }

  addClient() {
    this.router.navigateForward('/add-client');
  }

  edit(id: number) {
    this.router.navigateForward(['update-client/' + id]);
  }


  private arrayRemove(array: Client[], value: number): Client[] {

    return array.filter((element: Client) => {
      return element.id !== value;
    });

  }

}
