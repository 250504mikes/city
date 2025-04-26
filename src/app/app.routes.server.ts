import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'categoria-vista/:categoria',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { categoria: 'restaurantes' }, // Strings válidos
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
        { 'id_anuncio': '12345' }, // Asegúrate de que los valores sean strings
        { 'id_anuncio': '67890' },
        { 'id_anuncio': 'ABCDE' },
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