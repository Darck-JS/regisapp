import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAsistenciaPage } from './listado-asistencia.page';
import { ConsumoapiService } from '../service/consumoapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';

describe('ListadoAsistenciaPage', () => {
  let component: ListadoAsistenciaPage;
  let fixture: ComponentFixture<ListadoAsistenciaPage>;
  let ConsumoapiServiceSpy: jasmine.SpyObj<ConsumoapiService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async() => {
    ConsumoapiServiceSpy = jasmine.createSpyObj('ConsumoapiService', ['getalumnXprofe']);
    ConsumoapiServiceSpy.getalumnXprofe.and.returnValue(of([]));
    mockRouter = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
    mockRouter.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          nombre: 'Curso de Prueba',
          id: '321',
          codigo: '123',
          seccion: '01',
        },
      },
    } as any);

    await TestBed.configureTestingModule({
      declarations: [ListadoAsistenciaPage],
      imports: [
        IonicModule,
      ],
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
    expect(component.codigoClase).toBe('123');
    expect(component.seccionClase).toBe('01');
  });

  // tercer test
  it('should load students when motrarAlumno is called', () => {
    component.idUsu = 1;
    component.idClase = 1;
    const mockStudents = [
      { id: 1, nombre: 'Luis', status: 0 },
      { id: 2, nombre: 'María', status: 0 },
    ];

    ConsumoapiServiceSpy.getalumnXprofe.and.returnValue(of(mockStudents));

    component.obtenerAlumnos();

    expect(ConsumoapiServiceSpy.getalumnXprofe).toHaveBeenCalledWith(1, 1);
    expect(component.alumnos).toEqual(mockStudents);
  });

  // cuarto test
  it('should generate QR code correctly', () => {
    component.idClase = '123';
    component.codigoClase = 'ABC123';
    component.seccionClase = '01';

    component.generaQR();

    expect(component.qrDataURL).toContain('data:image/gif;base64');
    expect(component.qrDataURL).toBeTruthy();
  });


});