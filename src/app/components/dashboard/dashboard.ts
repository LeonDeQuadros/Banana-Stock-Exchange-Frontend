import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { Stock } from '../../services/stock';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  stocks=  signal<any[]>([]);

  constructor(private router: Router, private stockService: Stock){}

  ngOnInit(): void{
    this.loadStocks();
  }

  loadStocks(){
    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.stocks.set(data);
        console.log("stocks loaded");
        console.log(this.stocks);
      },
      error: (error) => {
        console.error("Error loading stocks", error);
      }
    })
  }

  purchaseStock (symbol: string, quantity: number){
    
    console.log(`symbol: ${symbol}, quantity: ${quantity}`);

    this.stockService.buyStocks(symbol, quantity).subscribe({
      next: (res)=>{
        alert(`Succesfully purchased ${quantity} shares of ${symbol}`);
        this.loadStocks();
      },
      error: (error) => {
        console.error("Error purchasing stocks", error);
        alert("Failed to purchase stocks");
      }
    })
  }
  

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
