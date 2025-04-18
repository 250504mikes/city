import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpLaravelService } from "../../../http.service";
import { Lugar } from './lugar.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home-anunciante',
  standalone: false,
  templateUrl: './home-anunciante.component.html',
  styleUrls: ['./home-anunciante.component.scss']
})
export class HomeAnuncianteComponent implements OnInit {

  lugares: Lugar[] = [];
  isLoading = true;
  errorMessage = '';
  idUsuario: number = 0;  // Asignar un valor por defecto

  constructor(
    private router: Router,
    private httpLaravelService: HttpLaravelService,
    private route: ActivatedRoute // Para leer los parámetros de la URL
  ) {}

  ngOnInit(): void {
    // Obtener el id_usuario desde la URL
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id_usuario'));

    if (isNaN(this.idUsuario)) {
      console.error('ID de usuario inválido en la URL');
      return;
    }

    this.loadLugares();
  }

  loadLugares(): void {
    this.httpLaravelService.Service_Get('lugar', '').subscribe(
      (data: Lugar[]) => {
        // Filtrar los lugares solo para el usuario con el id_usuario obtenido
        this.lugares = data.filter(lugar => lugar.id_usuario === this.idUsuario);
        console.log('Lugares del usuario:', this.lugares);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al cargar los lugares, por favor intente nuevamente.';
        console.error(error);
      }
    );
  }

  crearAnuncio() {
    this.router.navigate(['/crear-actualizar-anuncio']);
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

  vistaDetalladaAnuncio(id: number | string) {
    const idEntero = parseInt(id.toString(), 10);
  
    if (isNaN(idEntero)) {
      console.error('ID inválido:', id);
      return;
    }
  
    this.router.navigate(['/vista-detallada-anuncio', idEntero]);
  }
}
