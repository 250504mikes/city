import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private idUsuario: number = 0;

  constructor() {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('id_usuario');
      this.idUsuario = id ? Number(id) : 0;
    }
  }

  getToken(): string | null {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      console.log('🔐 Token obtenido desde localStorage:', token);
      return token;
    }
    return null; // Si no estamos en el navegador, retornamos null
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const isAuth = !!token;
    console.log('🧠 ¿Está autenticado?', isAuth);
    return isAuth;
  }

  logout(): void {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_usuario');
      this.idUsuario = 0;
      console.log('🚪 Token e ID eliminados, sesión cerrada.');
    }
  }

  setIdUsuario(id: number): void {
    this.idUsuario = id;
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('id_usuario', id.toString());
    }
  }

  getIdUsuario(): number {
    return this.idUsuario;
  }

  clear(): void {
    this.idUsuario = 0;
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('id_usuario');
    }
  }
}