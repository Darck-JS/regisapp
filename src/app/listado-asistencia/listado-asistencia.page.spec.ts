import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAsistenciaPage } from './listado-asistencia.page';
import { ConsumoapiService } from '../service/consumoapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('ListadoAsistenciaPage', () => {
  let component: ListadoAsistenciaPage;
  let fixture: ComponentFixture<ListadoAsistenciaPage>;
  let ConsumoapiServiceSpy: jasmine.SpyObj<ConsumoapiService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async() => {
    ConsumoapiServiceSpy = jasmine.createSpyObj('ConsumoapiService', ['getalumnXprofe']);
    mockRouter = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
    mockRouter.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          nombre: 'curso de prueba',
          id: '123',
          codigo: 'ABC123',
          seccion: '01V',
        },
      },
    } as any);

    await TestBed.configureTestingModule({
      declarations: [ListadoAsistenciaPage],
      providers: [
        { provide: ConsumoapiService, useValue: ConsumoapiServiceSpy},
        { provide: Router, useValue: mockRouter},
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({})},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoAsistenciaPage);
    component = fixture.componentInstance;
  });

  // primer test
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // segundo test
  it('should initialize with course data from router state', () => {
    fixture.detectChanges();
    expect(component.nombreClase).toBe('Curso de Prueba');
    expect(component.idClase).toBe('123');
    expect(component.codigoClase).toBe('ABC123');
    expect(component.seccionClase).toBe('01');
  });

  // tercer test
  it('should load students when motrarAlumno is called', () => {
    const mockStudents = [
      { id: 1, nombre: 'Luis', status: 0 },
      { id: 2, nombre: 'María', status: 0 },
    ];

    ConsumoapiServiceSpy.getalumnXprofe.and.returnValue(of(mockStudents));

    component.obtenerAlumnos();

    expect(ConsumoapiServiceSpy.getalumnXprofe).toHaveBeenCalledWith(0, 1);
    expect(component.alumnos).toEqual(mockStudents);
  });

  // cuarto test
  it('should generate QR code correctly', () => {
    component.idClase = '123';
    component.codigoClase = 'ABC123';
    component.seccionClase = '01';

    component.generaQR();

    expect(component.qrDataURL).toContain('data:image/png;base64'); 
    expect(component.qrDataURL).toBeTruthy();
  });


});
