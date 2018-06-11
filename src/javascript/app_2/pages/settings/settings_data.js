import AccountPassword        from './sections/AccountPassword.jsx';
import ApiToken               from './sections/ApiToken.jsx';
import AuthorizedApplications from './sections/AuthorizedApplications.jsx';
import CashierPassword        from './sections/CashierPassword.jsx';
import FinancialAssessment    from './sections/FinancialAssessment.jsx';
import Limits                 from './sections/Limits.jsx';
import LoginHistory           from './sections/LoginHistory.jsx';
import PersonalDetails        from './sections/PersonalDetails.jsx';
import SelfExclusion          from './sections/SelfExclusion.jsx';

export const data = [
    {
        title: 'Profile',
        items: [
            {
                title    : 'Personal Details',
                content  : 'View your personal information.',
                img_src  : 'images/settings/ic-personal-details.svg',
                path     : '/personal',
                Component: PersonalDetails,
            },
            {
                title    : 'Financial Assessment',
                content  : 'View your financial assessment settings',
                img_src  : 'images/settings/ic-financial-assesment.svg',
                path     : '/financial',
                Component: FinancialAssessment,
            },
        ],
    },
    {
        title: 'Security & Limits',
        items: [
            {
                title    : 'Account Password',
                content  : 'Change your main login password.',
                img_src  : 'images/settings/ic-account-password.svg',
                path     : '/account_password',
                Component: AccountPassword,
            },
            {
                title    : 'Cashier Password',
                content  : 'Change the password used for deposits and withdrawals',
                img_src  : 'images/settings/ic-personal-details.svg',
                path     : '/cashier_password',
                Component: CashierPassword,
            },
            {
                title    : 'Self Exclusion',
                content  : 'Facility that allows you to set limits on your account.',
                img_src  : 'images/settings/ic-self-exclusion.svg',
                path     : '/exclusion',
                Component: SelfExclusion,
            },
            {
                title    : 'Limits',
                content  : 'View your trading and withdrawal limits',
                img_src  : 'images/settings/ic-limits.svg',
                path     : '/limits',
                Component: Limits,
            },
            {
                title    : 'Login History',
                content  : 'View your login history',
                img_src  : 'images/settings/ic-login-history.svg',
                path     : '/history',
                Component: LoginHistory,
            },
            {
                title    : 'API Token',
                content  : 'API token for third party applications',
                img_src  : 'images/settings/ic-api-token.svg',
                path     : '/token',
                Component: ApiToken,
            },
            {
                title    : 'Authorized Applications',
                content  : 'Manage your authorised applications',
                img_src  : 'images/settings/ic-authorised-applications.svg',
                path     : '/apps',
                Component: AuthorizedApplications,
            },
        ],
    },
];

export default data;