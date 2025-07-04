/**
 * app.component.spec.ts
 *
 * Angular 17 + standalone component style
 * ───────────────────────────────────────
 * npm i -D @types/jasmine emailjs-com
 */
import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import emailjs from '@emailjs/browser';

describe('AppComponent – form & logic', () => {
  let fixture: any;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Stand‑alone component, so we IMPORT not DECLARE it
        AppComponent,
        FormsModule,
        CommonModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* ------------------------------------------------------------------------
   * TC001 / TC004 – NAME FIELD
   * ---------------------------------------------------------------------- */
  it('should bind & validate name field (valid → green, invalid → pink)', () => {
    const input: HTMLInputElement =
      fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;

    // VALID
    input.value = 'Tommy Lam';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.user.name).toBe('Tommy Lam');
    expect(input.classList).toContain('ng-valid');

    // INVALID (numbers not allowed by pattern in template)
    input.value = '12345';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.classList).toContain('ng-invalid');
  });

  /* ------------------------------------------------------------------------
   * TC002 / TC005 – EMAIL FIELD
   * ---------------------------------------------------------------------- */
  it('should bind & validate e‑mail field format', () => {
    const input: HTMLInputElement =
      fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;

    // VALID
    input.value = 'user@example.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.user.email).toBe('user@example.com');
    expect(input.classList).toContain('ng-valid');

    // INVALID
    input.value = 'bad-email';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.classList).toContain('ng-invalid');
  });

  /* ------------------------------------------------------------------------
   * TC003 / TC006 / TC013 – CARD FIELD + LUHN
   * ---------------------------------------------------------------------- */
  it('should bind card number and pass the LUHN check', () => {
    const input: HTMLInputElement =
      fixture.debugElement.query(By.css('input[name="card"]')).nativeElement;

    input.value = '378282246310005';   // VISA test number
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.user.card).toBe('378282246310005');
    expect(component.validateLUHN('378282246310005')).toBeTrue();

    expect(component.validateLUHN('1234567890123456')).toBeFalse();
  });

  /* ------------------------------------------------------------------------
   * TC009 – CLIENT‑SIDE ONLY VALIDATION GUARD inside onSubmit
   * ---------------------------------------------------------------------- */
  it('should refuse submission when form.valid === false', () => {
    const dummyForm = { valid: false, resetForm: jasmine.createSpy() } as any;

    spyOn(window, 'alert');
    spyOn(emailjs, 'send');

    component.onSubmit(dummyForm);

    expect(window.alert).toHaveBeenCalledWith(
      'Please complete all fields correctly before submitting.'
    );
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  /* ------------------------------------------------------------------------
   * TC006 / TC013 (invalid LUHN → blocked)
   * ---------------------------------------------------------------------- */
  it('should refuse submission for LUHN‑invalid cards', () => {
    const dummyForm = { valid: true, resetForm: jasmine.createSpy() } as any;

    component.user = {
      name : 'Jane Smith',
      email: 'jane@example.com',
      card : '1234 5678 9012 3456', // invalid LUHN
    };

    spyOn(window, 'alert');
    spyOn(emailjs, 'send');

    component.onSubmit(dummyForm);

    expect(window.alert).toHaveBeenCalledWith(
      'Credit card number is invalid. Please try again.'
    );
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  /* ------------------------------------------------------------------------
   * TC015 – SUCCESS PATH: send email & reset
   * ---------------------------------------------------------------------- */
  it('should call emailjs.send and reset form on success', fakeAsync(() => {
    const dummyForm = { valid: true, resetForm: jasmine.createSpy() } as any;

    component.user = {
      name : 'Tommy',
      email: 'tommy@example.com',
      card : '378282246310005',
    };

    spyOn(emailjs, 'send').and.returnValue(
      Promise.resolve({ status: 200, text: 'OK' })
    );
    spyOn(window, 'alert');

    component.onSubmit(dummyForm);

    /* await emailjs promise */
    flushMicrotasks();

    /* wait for the 3‑second timeout that hides the ✅ banner & resets form */
    tick(3000);

    expect(emailjs.send).toHaveBeenCalledWith(
      'service_7s8ljg5',
      'template_5o1piap',
      jasmine.objectContaining({
        user_name : 'Tommy',
        user_email: 'tommy@example.com',
        user_card : '378282246310005',
      }),
      '0FWJS1rBZprMLg9cl'
    );
    expect(window.alert).toHaveBeenCalledWith('✅ Email sent successfully!');
    expect(dummyForm.resetForm).toHaveBeenCalled();
    expect(component.submitted).toBeFalse();
  }));

  /* ------------------------------------------------------------------------
   * TC012 – SIMPLE SQL‑INJECTION STYLE BLOCK
   * ---------------------------------------------------------------------- */
  it('should mark obvious SQL‑injection strings as invalid name input', () => {
    const input: HTMLInputElement =
      fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;

    input.value = "'; DROP TABLE users;";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.classList).toContain('ng-invalid');
  });

  /* ------------------------------------------------------------------------
   * Remaining UX / A11y / Responsive items
   * ---------------------------------------------------------------------- *
   * TC007 · TC008 · TC010 · TC014
   * ─────────────────────────────
   * These rely on rendered CSS, colour contrast ratios, viewport resizing,
   * or keyboard traversal.  Handle them in Cypress / Playwright E2E suites
   * using lighthouse‑ci, axe‑core, or @angular/e2e’s built‑in helpers.
   * ---------------------------------------------------------------------- */
});
