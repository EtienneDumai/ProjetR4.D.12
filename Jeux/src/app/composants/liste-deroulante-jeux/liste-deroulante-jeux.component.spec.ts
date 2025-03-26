import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDeroulanteJeuxComponent } from './liste-deroulante-jeux.component';

describe('ListeDeroulanteJeuxComponent', () => {
  let component: ListeDeroulanteJeuxComponent;
  let fixture: ComponentFixture<ListeDeroulanteJeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDeroulanteJeuxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeDeroulanteJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
