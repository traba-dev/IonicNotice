import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaToHeadLines, Article } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apikey = environment.apikey;

const headers = new HttpHeaders({
  'X-Api-key': apikey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  public topHeadLineCount = 0;
  public topHeadLineCategoryCount = 0;
  public categoriaActual = '';
  constructor(private http: HttpClient) { }

  getTopHeadLines() {
    this.topHeadLineCount++;
   // tslint:disable-next-line: max-line-length
    return this.http.get<RespuestaToHeadLines>(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-10-01&sortBy=publishedAt${this.topHeadLineCount}`, {headers});
  }
  getTopHeadLinesCategories(categoria: any) {
    this.topHeadLineCategoryCount++;

    if (this.categoriaActual === categoria) {
        this.topHeadLineCategoryCount++;
      } else {
        this.topHeadLineCategoryCount = 1;
        this.categoriaActual = categoria;
      }
    // tslint:disable-next-line: max-line-length
    return this.http.get<RespuestaToHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&page=${this.topHeadLineCategoryCount}&category=${categoria}`, {headers});
   }

}
