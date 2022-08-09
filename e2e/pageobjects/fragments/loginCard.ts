import PageFragment from '../pageFragment';
import { Credentials } from '../../../types/qlik'

class LoginCard extends PageFragment {
  readonly email: PageFragment;
  readonly password: PageFragment;
  readonly submitButton: PageFragment;

  constructor(selector) {
    super(selector);
    this.email = new PageFragment(() => this.$email);
    this.password = new PageFragment(() => this.$password);
    this.submitButton = new PageFragment(() => this.$submitButton);
  }

  private get $email() {
    return $("input[name='email']");
  }

  private get $password() {
    return $("input[name='password']");
  }

  private get $submitButton() {
    return $("button[name='submit']");
  }

  async waitForLoaded() {
    return browser.waitUntil(
      async () => 
        (await this.$root.isDisplayed()) ===true &&
        (await this.email.isDisplayed()) === true && 
        (await this.password.isDisplayed()) === true && 
        (await this.submitButton.isDisplayed()) === true,
        {timeout: 30000, timeoutMsg: 'The login card did not display'}
    );
  }

  private async attemptToLogIn(credentials: Credentials){
    await this.email.setValue(credentials.email);
    await this.password.setValue(credentials.password);
    await this.submitButton.clickWhenClickable();
    return this.submitButton.waitForExist({ reverse: true });
  }

  async logIn(credentials: Credentials) {
    await this.attemptToLogIn(credentials);
  }
}

export default LoginCard;
