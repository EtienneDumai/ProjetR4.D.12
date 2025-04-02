import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJeuxComponent } from './page-jeux.component';

describe('PageJeuxComponent', () => {
  let component: PageJeuxComponent;
  let fixture: ComponentFixture<PageJeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageJeuxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
