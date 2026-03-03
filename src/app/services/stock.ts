import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Stock {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient){}

  getStocks(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/stocks`);
  }

  getPortfolio(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  buyStocks(stockSymbol: string, quantity: number): Observable<any>{
    const body = {
      symbol: stockSymbol, 
      quantity: quantity
    };
    return this.http.post(`${this.apiUrl}/trades/buy`, body, {responseType: 'text'});
  }
}
