import Page from '../page';
import PageFragment from '../pageFragment';
import LoginCard from '../fragments/loginCard';
import { Credentials } from '../../../types/qlik'

class Login extends Page {
  loginCard: LoginCard;

  constructor(redirectURL) {
    super(redirectURL)

    this.loginCard = new LoginCard(() => this.$loginCard);
  }

  private get $loginCard() {
    return $('.login-card');
  }

  async waitForPageReady() {
    await this.loginCard.waitForLoaded();
  }

  async logIn(credentials: Credentials) {
    return this.loginCard.logIn(credentials);
  }
}

export default Login;
