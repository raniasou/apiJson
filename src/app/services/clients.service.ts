import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  newClient$ = new BehaviorSubject<Client>(null);
  editClient$ = new BehaviorSubject<Client>(null);
  deleteClient$ = new BehaviorSubject<number>(null);

  private url = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ){}

  save(client: Client): Observable<Client>{
    return this.http.post<Client>(this.url + 'clients', client);
  }
  getClient(id: number) {
    return this.http.get<Client>(this.url + 'clients/' + id);
  }
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + 'clients');
  }
  editClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.url + 'clients/' + client.id, client);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<Client>(this.url + 'clients/' +id);
  }


}
