import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ConsumoapiService } from '../service/consumoapi.service';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import { of, throwError } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let ConsumoapiServiceSpy: jasmine.SpyObj<ConsumoapiService>;
  let mockAuthService: jasmine.SpyObj<AuthserviceService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthserviceService', ['login']);
    ConsumoapiServiceSpy = jasmine.createSpyObj('ConsumoapiService', ['postLogin']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthserviceService, useValue: mockAuthService },
        { provide: ConsumoapiService, useValue: ConsumoapiServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to /home-profesor for profile type 1', () => {
    const mockResponse = { tipoPerfil: 1, id: 1, nombre: 'John', correo: 'john@example.com' };
    ConsumoapiServiceSpy.postLogin.and.returnValue(of(mockResponse));
    component.usuario.setValue({ user: 'prof', pass: '1234' });

    component.login();

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home-profesor'], {
      state: {
        id: 1,
        nombre: 'John',
        correo: 'john@example.com',
        perfil: 1,
      },
    });
  });

  it('should navigate to /foto-registro for profile type 2', () => {
    const mockResponse = { tipoPerfil: 2, id: 2, nombre: 'Jane', correo: 'jane@example.com' };
    ConsumoapiServiceSpy.postLogin.and.returnValue(of(mockResponse));
    component.usuario.setValue({ user: 'alumn', pass: '1234' });

    component.login();

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/foto-registro'], {
      state: {
        id: 2,
        nombre: 'Jane',
        correo: 'jane@example.com',
        perfil: 2,
      },
    });
  });

  it('should show error alert on failed login', () => {
    ConsumoapiServiceSpy.postLogin.and.returnValue(throwError(() => new Error('Login failed')));
    spyOn(component, 'alertaError'); // Spy to verify alertaError is called
    component.usuario.setValue({ user: 'invalid', pass: '1234' });

    component.login();

    expect(component.alertaError).toHaveBeenCalledWith('ERROR', 'Usuario o contraseña Incorrecto ');
    expect(mockAuthService.login).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});