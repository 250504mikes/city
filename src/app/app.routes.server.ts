import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'categoria-vista/:categoria',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { categoria: 'restaurantes' },
        { categoria: 'hoteles' },
        { categoria: 'parques' },
      ];
    },
  },
  {
    path: 'vista-detallada-anuncio/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { id: '123' },
        { id: '456' },
        { id: '789' },
      ];
    },
  },
  {
    path: 'pagar-anuncio/:id_anuncio',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { id_anuncio: 'A123' },
        { id_anuncio: 'B456' },
        { id_anuncio: 'C789' },
      ];
    },
  },
  // Agrega más rutas dinámicas según sea necesario

  // Para rutas estáticas o comodines, usa RenderMode.Server o RenderMode.Client
  {
    path: '**',
    renderMode: RenderMode.Server, // Cambia a Server si prefieres SSR para rutas no especificadas
  },
];