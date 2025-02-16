import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarRComponent } from './side-bar-r.component';

describe('SideBarRComponent', () => {
  let component: SideBarRComponent;
  let fixture: ComponentFixture<SideBarRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
