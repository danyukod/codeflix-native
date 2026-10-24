import type {CatalogVideo} from '../types/catalog';

// Substitua pelo endereço acessível pelo dispositivo/emulador quando a API estiver pronta.
const API_URL = 'http://localhost:8080';

export async function listVideos(): Promise<CatalogVideo[]> {
  const response = await fetch(`${API_URL}/videos`);
  if (!response.ok) throw new Error(`Falha ao carregar vídeos: ${response.status}`);
  return response.json();
}
