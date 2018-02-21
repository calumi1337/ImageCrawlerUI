import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlSearchComponent } from './url-search.component';

describe('UrlSearchComponent', () => {
  let component: UrlSearchComponent;
  let fixture: ComponentFixture<UrlSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
