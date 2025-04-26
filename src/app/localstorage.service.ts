import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  /**
   * Almacena un valor en localStorage.
   * @param key Clave bajo la cual se almacenará el valor.
   * @param value Valor a almacenar (se convierte a string).
   */
  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error('Error al guardar en localStorage:', error);
      }
    }
  }

  /**
   * Obtiene un valor de localStorage.
   * @param key Clave del valor a recuperar.
   * @returns El valor almacenado, o null si no existe.
   */
  getItem<T = any>(key: string): T | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Error al obtener de localStorage:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Limpia todo el contenido de localStorage.
   */
  clean(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  /**
   * Elimina un elemento específico de localStorage.
   * @param key Clave del elemento a eliminar.
   */
  cleanItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}