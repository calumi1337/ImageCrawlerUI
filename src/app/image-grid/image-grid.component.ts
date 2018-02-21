import {ImageService} from '../image.service';
import {Component, OnInit, NgZone} from '@angular/core';

const expectedTileWidth = 300;

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {

  columnCount = 6;

  tileHeight = 300;

  gridHeight = 0;

  tiles = [];

  constructor(private imageService: ImageService) {
    imageService.observeCollectedImages().subscribe(images => this.loadImages(images));
  }

  ngOnInit() {
  }

  private loadImages(imageNames: string[]) {
    this.clearTiles();
    this.adjustSizeForTileCount(imageNames.length);
    this.addTilesWithDelay(imageNames);
  }

  private addTilesWithDelay(imageNames: string[]) {
    const theLoop: (i: number, delay?) => void = (i: number, delay = 100) => {
      if (i % 2 === 0) {
        delay = 50;
      }

      setTimeout(() => {
        this.addTile(imageNames[i]);
        if (--i) {
          theLoop(i);
        }
      }, delay);
    };

    theLoop(imageNames.length);
  }

  private clearTiles() {
    this.tiles = [];
  }

  private adjustSizeForTileCount(tileCount: number) {
    const allRowsFull = tileCount % this.columnCount === 0;
    const actualRows = Math.floor(tileCount / this.columnCount) + (allRowsFull ? 0 : 1);
    this.gridHeight = actualRows * (this.tileHeight + 1);
  }

  private addTile(name: string) {
    this.tiles.push({text: `http://localhost:1337/imagecrawler/image/${name}`, cols: 1, rows: 1, color: '#fafafa'});
  }

  presentImage(name: string) {
      console.info(name);
  }

  onResize(event) {
    const gridWidth = event.target.innerWidth;
    this.columnCount = Math.floor(gridWidth / expectedTileWidth);
  }

}
