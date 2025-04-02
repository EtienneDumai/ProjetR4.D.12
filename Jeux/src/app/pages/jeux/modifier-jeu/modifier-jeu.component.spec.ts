import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierJeuComponent } from './modifier-jeu.component';

describe('ModifierJeuComponent', () => {
  let component: ModifierJeuComponent;
  let fixture: ComponentFixture<ModifierJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierJeuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
