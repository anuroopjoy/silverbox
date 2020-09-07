import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailfolderComponent } from './mailfolder.component';

describe('MailfolderComponent', () => {
  let component: MailfolderComponent;
  let fixture: ComponentFixture<MailfolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailfolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
