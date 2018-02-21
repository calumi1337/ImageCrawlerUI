import { ImageService } from '../image.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-url-search',
  templateUrl: './url-search.component.html',
  styleUrls: ['./url-search.component.css']
})
export class UrlSearchComponent implements OnInit {

  @Input() url: string;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
  }

  searchImages() {
    console.info(`search images with url:${this.url}`);
    const fetchedImages = this.imageService.collectImages(this.url);
  }

}
