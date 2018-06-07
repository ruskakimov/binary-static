import AccountPassword        from './sections/AccountPassword.jsx';
import ApiToken               from './sections/ApiToken.jsx';
import AuthorizedApplications from './sections/AuthorizedApplications.jsx';
import CashierPassword        from './sections/CashierPassword.jsx';
import FinancialAssessment    from './sections/FinancialAssessment.jsx';
import Limits                 from './sections/Limits.jsx';
import LoginHistory           from './sections/LoginHistory.jsx';
import PersonalDetails        from './sections/PersonalDetails.jsx';
import SelfExclusion          from './sections/SelfExclusion.jsx';

export const sections = [
    {
        title    : 'Personal Details',
        component: PersonalDetails,
        path     : '/personal',
    },
    {
        title    : 'Financial Assessment',
        component: FinancialAssessment,
        path     : '/financial',
    },
    {
        title    : 'Account Password',
        component: AccountPassword,
        path     : '/account_password',
    },
    {
        title    : 'Cashier Password',
        component: CashierPassword,
        path     : '/cashier_password',
    },
    {
        title    : 'Self Exclusion',
        component: SelfExclusion,
        path     : '/exclusion',
    },
    {
        title    : 'Limits',
        component: Limits,
        path     : '/limits',
    },
    {
        title    : 'Login History',
        component: LoginHistory,
        path     : '/history',
    },
    {
        title    : 'API Token',
        component: ApiToken,
        path     : '/token',
    },
    {
        title    : 'Authorized Applications',
        component: AuthorizedApplications,
        path     : '/apps',
    },
];
