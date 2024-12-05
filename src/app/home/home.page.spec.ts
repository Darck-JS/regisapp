import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ConsumoapiService } from '../service/consumoapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let ConsumoapiServiceSpy: jasmine.SpyObj<ConsumoapiService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    ConsumoapiServiceSpy = jasmine.createSpyObj('ConsumoapiService', ['GetCursoXprofe']);
    ConsumoapiServiceSpy.GetCursoXprofe.and.returnValue(of([]));
    mockRouter = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
    mockRouter.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          id: 321,
          nombre: 'jorge',
          correo: 'giorgio@dc.cl',
        },
      },
    } as any);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: ConsumoapiService, useValue: ConsumoapiServiceSpy },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({}) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });




  // primer test
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // segundo test
  it('should initialize with course data from router state', () => {
    fixture.detectChanges();
    expect(component.Usuario).toBe('jorge');
    expect(component.id).toBe(321);
    expect(component.correo).toBe('giorgio@dc.cl');
  });

  // tercer test
  it('should populate cursos array when obtenerCursos is called', () => {
    const mockCourses = [
      { id: 1, nombre: 'Course A', codigo: 'ABC001', seccion: 'S1', hora: '10:00' },
      { id: 2, nombre: 'Course B', codigo: 'ABC002', seccion: 'S2', hora: '12:00' },
    ];
    ConsumoapiServiceSpy.GetCursoXprofe.and.returnValue(of(mockCourses));
    component.obtenerCursos();

    expect(component.cursos).toEqual(mockCourses);
  });

  // cuarto test
  it('should initialize Usuario and id from navigation extras', () => {
    expect(component.Usuario).toBe('jorge');
    expect(component.id).toBe(321);
  });


});
