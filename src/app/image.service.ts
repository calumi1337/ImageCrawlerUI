import {HttpHeaders} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/subject';
import {Observable} from 'rxjs/observable';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
};

@Injectable()
export class ImageService {

  private resourceUrl = 'http://localhost:1337/imagecrawler/';

  private collectedImages = new Subject<string[]>();

  constructor(private http: HttpClient) {}

  collectImages(url: string) {

    const params = new HttpParams()
      .set('url', url);

    this.http.post<string[]>(`${this.resourceUrl}/crawlUrl`, httpOptions, {params}).subscribe(result => this.collectedImages.next(result));
  }

  observeCollectedImages(): Subject<string[]> {
    return this.collectedImages;
  }

  getImage(imageName: string): Observable<Blob> {
    const url = `${this.resourceUrl}/image/${imageName}`;
    return this.http.get<Blob>(url);
  }

}
