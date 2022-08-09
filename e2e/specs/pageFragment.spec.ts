import HubHome from '../pageobjects/pages/HubHome';
import {Login} from '../utils/testhelpers';
import {Credentials} from '../../types/qlik';
import ConsoleAssignment from '../pageobjects/pages/ConsoleAssignment';
import SpaceMember from '../pageobjects/pages/SpaceMember'

describe('Login to Qlik as rootadmin', async () => {
    it('Should login with valid credentials', async () => {
        const myLogincredentials: Credentials = {email: 'rootadmin@qlik.example', password: 'Password1!' };
        await Login(myLogincredentials);
    });

    it('Go to console/assignment page', async () => {
        const consoleAssignment = await ConsoleAssignment.visit([]);
        await consoleAssignment.addAddEntitlement("Harley Kiffe", consoleAssignment.$analyzerSubmenu);
    });

    it('Go to space member', async () => {
        let spaceMemberpage = await SpaceMember.visit(["62291d9d07f4bed5df1c9500"]);
        await spaceMemberpage.addMember("Nicole Ward", ["member-role-facilitator"]);
    });
});

