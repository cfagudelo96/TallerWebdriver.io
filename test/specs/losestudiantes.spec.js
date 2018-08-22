var assert = require('assert');

describe('los estudiantes login', function() {
    it('should visit los estudiantes and failed at log in', function () {
        browser.url('https://losestudiantes.co');
        if (browser.isVisible('button=Cerrar')) {
            browser.click('button=Cerrar');
        }
        browser.waitForVisible('button=Ingresar', 10000);

        // Toca esperar el fade
        browser.pause(1000);

        browser.click('button=Ingresar');

        // Toca esperar que salga el modal
        browser.pause(1000);

        var cajaLogIn = browser.element('.cajaLogIn');
        var mailInput = cajaLogIn.element('input[name="correo"]');

        mailInput.click();
        mailInput.keys('wrongemail@example.com');

        var passwordInput = cajaLogIn.element('input[name="password"]');

        passwordInput.click();
        passwordInput.keys('1234');

        cajaLogIn.element('button=Ingresar').click()
        browser.waitForVisible('.aviso.alert.alert-danger', 10000);

        var alertText = browser.element('.aviso.alert.alert-danger').getText();
        expect(alertText).toBe('Upss! El correo y la contraseña que ingresaste no figuran en la base de datos. Intenta de nuevo por favor.');
    });
});

describe('los estudiantes sign up failed', function() {
    it('should visit los estudiantes and falied to sign up', function() {
        browser.url('https://losestudiantes.co');

        if (browser.isVisible('button=Cerrar')) {
            browser.click('button=Cerrar');
        }

        browser.waitForVisible('button=Ingresar', 10000);

        // Toca esperar el fade
        browser.pause(1000);
        
        browser.click('button=Ingresar');

        // Toca esperar que salga el modal
        browser.pause(1000);

        var cajaSignUp = browser.element('.cajaSignUp');

        var nombreInput = cajaSignUp.element('input[name="nombre"]');
        nombreInput.click();
        nombreInput.keys('Carlos Felipe');
        
        var apellidoInput = cajaSignUp.element('input[name="apellido"]');
        apellidoInput.click();
        apellidoInput.keys('Agudelo Ospina');

        var mailInput = cajaSignUp.element('input[name="correo"]');
        mailInput.click();
        mailInput.keys('cf.agudelo12@uniandes.edu.co');

        var programaInput = cajaSignUp.element('select[name="idPrograma"]');
        programaInput.selectByValue('12');

        var passwordInput = cajaSignUp.element('input[name="password"]');
        passwordInput.click();
        passwordInput.keys('1234567890');

        var aceptaCheckbox = cajaSignUp.element('input[name="acepta"]');
        aceptaCheckbox.click();

        cajaSignUp.element('button[type="submit"]').click()
        browser.waitForVisible('.sweet-alert', 50000);

        var alertText = browser.element('.text-muted.lead').element('div').getText();
        expect(alertText).toBe('Error: Ya existe un usuario registrado con el correo \'cf.agudelo12@uniandes.edu.co\'');
    });
});

describe('Los estudiantes go to teacher page', function() {
    it('should visit los estudiantes and go to a teacher page', function() {
        browser.url('https://losestudiantes.co');

        if (browser.isVisible('button=Cerrar')) {
            browser.click('button=Cerrar');
        }
        
        browser.waitForVisible('.profesor', 10000);

        browser.element('.profesor').click();
        browser.waitForVisible('.boton.btn.btn-primary', 10000);
        var buttonText = browser.element('.boton.btn.btn-primary').getText();
        expect(['Califica a este profesor', 'Califica a esta profesora']).toContain(buttonText);
    })
})
