import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:8080/api/orders';

    constructor(private http: HttpClient) { }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    getOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${id}`);
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiUrl, order);
    }

    downloadOrderPdf(id: number): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/${id}/pdf`, {
            responseType: 'blob'
        });
    }

    sendOrderEmail(id: number): Observable<string> {
        return this.http.post(`${this.apiUrl}/${id}/email`, {}, {
            responseType: 'text'
        });
    }
}