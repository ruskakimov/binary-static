import React               from 'react';
import { Route, NavLink }  from 'react-router-dom';
import PropTypes           from 'prop-types';

import Client              from '../_common/base/client_base';
import { redirectToLogin } from '../_common/base/login';
import { localize }        from '../_common/localize';

import Settings            from './pages/settings/settings.jsx';
import Statement           from './pages/statement/statement.jsx';
import TradeApp            from './pages/trading/trade_app.jsx';

// Settings Routes
import AccountPassword        from './pages/settings/sections/AccountPassword.jsx';
import ApiToken               from './pages/settings/sections/ApiToken.jsx';
import AuthorizedApplications from './pages/settings/sections/AuthorizedApplications.jsx';
import CashierPassword        from './pages/settings/sections/CashierPassword.jsx';
import FinancialAssessment    from './pages/settings/sections/FinancialAssessment.jsx';
import Limits                 from './pages/settings/sections/Limits.jsx';
import LoginHistory           from './pages/settings/sections/LoginHistory.jsx';
import PersonalDetails        from './pages/settings/sections/PersonalDetails.jsx';
import SelfExclusion          from './pages/settings/sections/SelfExclusion.jsx';

const sections = [
    {
        title    : 'Personal Details',
        component: PersonalDetails,
        path     : '/personal', // To-do: Redirect to personal Details
        src      : 'images/settings/ic-personal-details.svg',
        content  : 'View your personal information.',
    },
    {
        title    : 'Financial Assessment',
        component: FinancialAssessment,
        path     : '/financial',
        src      : 'images/settings/ic-financial-assesment.svg',
        content  : 'View your financial assessment settings',
    },
    {
        title    : 'Account Password',
        component: AccountPassword,
        path     : '/account_password',
        src      : 'images/settings/ic-account-password.svg',
        content  : 'Change your main login password.',
    },
    {
        title    : 'Cashier Password',
        component: CashierPassword,
        path     : '/cashier_password',
        src      : 'images/settings/ic-personal-details.svg',
        content  : 'Change the password used for deposits and withdrawals',
    },
    {
        title    : 'Self Exclusion',
        component: SelfExclusion,
        path     : '/exclusion',
        src      : 'images/settings/ic-self-exclusion.svg',
        content  : 'Facility that allows you to set limits on your account.',
    },
    {
        title    : 'Limits',
        component: Limits,
        path     : '/limits',
        src      : 'images/settings/ic-limits.svg',
        content  : 'View your trading and withdrawal limits',
    },
    {
        title    : 'Login History',
        component: LoginHistory,
        path     : '/history',
        src      : 'images/settings/ic-login-history.svg',
        content  : 'View your login history',
    },
    {
        title    : 'API Token',
        component: ApiToken,
        path     : '/token',
        src      : 'images/settings/ic-api-token.svg',
        content  : 'API token for third party applications',
    },
    {
        title    : 'Authorized Applications',
        component: AuthorizedApplications,
        path     : '/apps',
        src      : 'images/settings/ic-authorised-applications.svg',
        content  : 'Manage your authorised applications',
    },
];

const routes = [
    { path: '/',          component: TradeApp, exact: true },
    { path: '/statement', component: Statement, is_authenticated: true },
    { path: '/settings',  component: Settings, sections },
];

const RouteWithSubRoutes = route => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => (
            (route.is_authenticated && !Client.isLoggedIn()) ? // TODO: update styling of the message below
                <a href='javascript:;' onClick={redirectToLogin}>{localize('Please login to view this page.')}</a> :
                <route.component {...props} routes={route.routes} sections={route.sections} />
        )}
    />
);

export const BinaryRoutes = () => (
    routes.map((route, idx) => (
        <RouteWithSubRoutes key={idx} {...route} />
    ))
);

const normalizePath = (path) => /^\//.test(path) ? path : `/${path || ''}`; // Default to '/'

const getRouteInfo = (path) => routes.find(r => r.path === normalizePath(path));

export const isRouteVisible = (path, route = getRouteInfo(path)) =>
    !(route && route.is_authenticated && !Client.isLoggedIn());

export const BinaryLink = ({ to, children, ...props }) => {
    const path  = normalizePath(to);
    const route = getRouteInfo(path);

    if (!route) {
        throw new Error(`Route not found: ${to}`);
    }

    return (
        to ?
            <NavLink to={path} activeClassName='active' exact={route.exact} {...props}>
                {children}
            </NavLink>
        :
            <a href='javascript:;' {...props}>
                {children}
            </a>
    );
};

BinaryLink.propTypes = {
    children: PropTypes.object,
    to      : PropTypes.string,
};
