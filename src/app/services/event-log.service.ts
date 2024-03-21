import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:3000/data';

  getEventLogs(): any {
    return this.http.get(this.configUrl)
  }
}
