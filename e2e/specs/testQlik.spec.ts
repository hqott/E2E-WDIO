import LoginPage from  '../pageobjects/pages/Login';
import { Credentials } from '../../types/qlik';
import HubHome from '../pageobjects/pages/HubHome';

describe('Login to Qlik', () => {
    it('Should login with valid credentials', async () => {
        const loginpage = await LoginPage.visit('/');
        const myLogincredentials: Credentials = { email: 'harley@qlik.example', password: 'Password1!' };
        loginpage.logIn(myLogincredentials);
    });

    it('Logout Qlik App', async () => {
        const hub = new HubHome('/');
        await hub.waitForPageReady();
        await hub.logout();
    });
});


