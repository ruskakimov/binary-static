import React from 'react';
import PerfectScrollbar    from 'react-perfect-scrollbar';
import { localize }        from '../../../_common/localize';
import { DrawerItems, DrawerItem }         from '../elements/drawer/index.jsx';
import LanguageSwitcher    from '../elements/language_switcher.jsx';

export const MenuDrawer = () => (
    <div className='drawer-items-container'>
        <PerfectScrollbar>
            <div className='list-items-container'>
                <DrawerItems
                    text={localize('Account Settings')}
                    items={[
                        { text: localize('Personal Detail'), link_to: '/settings/personal' },
                        { text: localize('Account Authentication') },
                        { text: localize('Financial Assessment'), link_to: '/settings/financial' },
                        { text: localize('Professional Trader') },
                    ]}
                />
                <DrawerItems
                    text={localize('Security Settings')}
                    items={[
                        { text: localize('Self Exclusion'), link_to: '/settings/exclusion' },
                        { text: localize('Trading Limits') },
                        { text: localize('Authorised Applications'), link_to: '/settings/apps'},
                        { text: localize('API Token'), link_to: '/settings'},
                    ]}
                />
                <DrawerItems
                    text={localize('Trading History')}
                    items={[
                        { text: localize('Portfolio') },
                        { text: localize('Profit Table') },
                        { text: localize('Statement'), link_to: '/statement' },
                    ]}
                />
                <DrawerItem text={localize('Cashier')} />
                <hr />
                <DrawerItem text={localize('Forgot Password')}/>
                <DrawerItem text={localize('Manage Password')} />
                <DrawerItem text={localize('Useful Resources')}/>
                <DrawerItem text={localize('Login History')}/>
                <hr />
                <LanguageSwitcher />
            </div>
        </PerfectScrollbar>
    </div>
);
