import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from './interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DatalocalService {
  noticias: Article[] = [];
  constructor(private storage: Storage, private toastController: ToastController ) {
    this.cargarNoticias();
   }

   async presenToast(message: string) {
     const toast = await this.toastController.create({
       message,
       duration: 2000
     });
     toast.present();
   }

  guardarNoticias(noticia: Article) {
    const exists = this.noticias.find(noti => noti.title === noticia.title);

    if (!exists) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presenToast('Noticia agregada a favoritos');
    }
  }
  async cargarNoticias() {
    const favoritos = await this.storage.get('favoritos');
    return this.noticias = favoritos;
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presenToast('Noticia eliminada de favoritos');
  }
}
