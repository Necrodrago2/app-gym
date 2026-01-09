import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs'; // Añadimos map
import { tap } from 'rxjs/operators';
import { User } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/api/users';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                this.currentUserSubject.next(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('currentUser');
            }
        }
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    // CORRECCIÓN DEL ERROR TS2322: Usamos map para devolver solo un User
    login(email: string, password: string): Observable<User> {
        return this.http.get<User[]>(this.apiUrl).pipe(
            map(users => {
                const user = users.find(u => u.email === email);
                if (!user) throw new Error('Usuario no encontrado');
                return user;
            }),
            tap(user => this.setCurrentUser(user))
        );
    }

    register(user: User): Observable<User> {
        return this.createUser(user).pipe(
            tap(newUser => this.setCurrentUser(newUser))
        );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private setCurrentUser(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }

    isAdmin(): boolean {
        const user = this.currentUserSubject.value;
        return user?.role === 'admin';
    }
}