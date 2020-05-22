import {isValidEmail} from './validators';

// to launch use command 'ng test'

describe('isValidEmail', () => {
  it('should check valid emails', () => {
    expect(isValidEmail('valid@email.com')).toBeTruthy();
    expect(isValidEmail('valid@email.subdomain.com')).toBeTruthy();
    expect(isValidEmail('valid@111.com')).toBeTruthy();
    expect(isValidEmail('111@111.com')).toBeTruthy();
  });

  it('should check valid uppercase emails', () => {
    expect(isValidEmail('Valid@email.com')).toBeTruthy();
    expect(isValidEmail('Valid@Email.com')).toBeTruthy();
    expect(isValidEmail('Valid@Email.Com')).toBeTruthy();
    expect(isValidEmail('asdas@ASDs.com')).toBeTruthy();
  });

  it('should check valid emails - special symbols', () => {
    expect(isValidEmail("special!#$%&'*+/=?^_`{|}~-@symbols.com")).toBeTruthy();
  });

  it('should check invalid emails - empty', () => {
    expect(isValidEmail('')).toBeFalsy();
  });

  it('should check invalid emails - has space', () => {
    expect(isValidEmail(' ')).toBeFalsy();
    expect(isValidEmail(' valid@email.com')).toBeFalsy();
    expect(isValidEmail('valid@email.com ')).toBeFalsy();
    expect(isValidEmail(' valid@email.com ')).toBeFalsy();
  });

  it('should check invalid emails - double dots', () => {
    expect(isValidEmail('double@dots..com')).toBeFalsy();
  });

  it('should check invalid emails - no domain', () => {
    expect(isValidEmail('no@domain')).toBeFalsy();
  });

  it('should check invalid emails - last domain has less 1 symbols', () => {
    expect(isValidEmail('test@test.')).toBeFalsy();
  });

  // oficially there are only 2+ symbols in Top Level Domains
  // http://data.iana.org/TLD/tlds-alpha-by-domain.txt
  it('should check invalid emails - last domain has less 2 symbols', () => {
    expect(isValidEmail('test@test.a')).toBeFalsy();
  });

  it('should check invalid emails - not only letters in last domain', () => {
    expect(isValidEmail('test@test.111aaa')).toBeFalsy();
  });
});
