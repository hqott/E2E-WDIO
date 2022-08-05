import LoginPage from '../pageobjects/pages/Login';
import {Credentials} from '../../types/qlik';


export async function Login(credentials: any = undefined) {
    const loginpage = await LoginPage.visit('/');
    if (!credentials){
        const defaultLogincredentials: Credentials = {email: 'harley@qlik.example', password: 'Password1!' };
        await loginpage.logIn(defaultLogincredentials);
    } else {
        await loginpage.logIn(credentials);
    }
}