import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { browser } from 'protractor';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatalocalService } from '../../datalocal.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: any;
  @Input() enFavoritos: any;
  constructor(private inappbrowser: InAppBrowser, private actionSheet: ActionSheetController, private socialSharing: SocialSharing,
              private datalocal: DatalocalService) { }

  ngOnInit() {
    console.log(this.enFavoritos);

  }
  abrirNoticia() {
    // tslint:disable-next-line: no-shadowed-variable
    const browser = this.inappbrowser.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let estoyEnFavoritos;

    if (this.enFavoritos) {
      estoyEnFavoritos = {
        text: 'Borrar Favoritos',
        icon: 'trash',
        handler: () => {
          this.datalocal.borrarNoticia(this.noticia);
        }
      };
    } else {
      estoyEnFavoritos = {
        text: 'Favoritos',
        icon: 'star',
        handler: () => {
          this.datalocal.guardarNoticias(this.noticia);
        }
      };
    }



    const actionSheet = await this.actionSheet.create({
      backdropDismiss: false,
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.noticia.title,
                                    this.noticia.source.name,
                                    '',
                                    this.noticia.url);
        }
      }, estoyEnFavoritos, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
