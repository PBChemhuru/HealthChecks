import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendcheckslistComponent } from './recommendcheckslist.component';

describe('RecommendcheckslistComponent', () => {
  let component: RecommendcheckslistComponent;
  let fixture: ComponentFixture<RecommendcheckslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendcheckslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendcheckslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
