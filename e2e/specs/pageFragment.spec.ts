import HubHome from '../pageobjects/pages/HubHome';
import {Login} from '../utils/testhelpers';
import {Credentials} from '../../types/qlik';
import ConsoleAssignment from '../pageobjects/pages/ConsoleAssignment'

describe('Login to Qlik as rootadmin', async () => {
    it('Should login with valid credentials', async () => {
        const myLogincredentials: Credentials = {email: 'rootadmin@qlik.example', password: 'Password1!' };
        await Login(myLogincredentials);
    });

    it('Go to console/assignment page', async () => {
        const consoleAssignment = new ConsoleAssignment();
        await ConsoleAssignment.visit(consoleAssignment);
        await consoleAssignment.addAddEntitlement();

    });
});


