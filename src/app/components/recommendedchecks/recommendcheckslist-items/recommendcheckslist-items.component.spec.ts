import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendcheckslistItemsComponent } from './recommendcheckslist-items.component';

describe('RecommendcheckslistItemsComponent', () => {
  let component: RecommendcheckslistItemsComponent;
  let fixture: ComponentFixture<RecommendcheckslistItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendcheckslistItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendcheckslistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
