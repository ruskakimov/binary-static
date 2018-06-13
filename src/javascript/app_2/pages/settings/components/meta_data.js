export const metaData = {
    // Financial Assessment
    income_source: {
        type: 'text', label_name: 'Income Source', helper: 'dropdown',
    },
    employment_status: {
        type: 'text', label_name: 'Employment Status', helper: 'dropdown',
    },
    employment_industry: {
        type: 'text', label_name: 'Industry of Employment', helper: 'dropdown',
    },
    occupation: {
        type: 'text', label_name: 'Occupation', helper: 'dropdown',
    },
    source_of_wealth: {
        type: 'text', label_name: 'Source of Wealth', helper: 'dropdown',
    },
    education_level: {
        type: 'text', label_name: 'Level of Education', helper: 'dropdown',
    },
    net_income: {
        type: 'text', label_name: 'Net Annual Income', helper: 'dropdown',
    },
    estimated_worth: {
        type: 'text', label_name: 'Estimated Net Worth', helper: 'dropdown',
    },
    account_turnover: {
        type: 'text', label_name: 'Anticipated Account Turnover', helper: 'dropdown',
    },
    // Account password
    current_password: {
        type: 'password', label_name: 'Current Password', helper: 'pw',
    },
    new_password: {
        type: 'password', label_name: 'New Password', helper: 'pw',
    },
    verified_password: {
        type: 'password', label_name: 'Verified Password', helper: 'pw',
    },
    // Cashier Password
    cashier_pw: {
        type: 'password', label_name: 'Current Password', helper: 'pw',
    },
    verified_cashier_pw: {
        type: 'password', label_name: 'New Password', helper: 'pw',
    },
    // Self Exclusion
    max_balance: {
        type: 'number', label_name: 'Maximum Account Cash Balance', helper: 'dollar',
    },
    max_turnover: {
        type: 'number', label_name: 'Daily turnover limit', helper: 'dollar',
    },
    max_losses: {
        type: 'number', label_name: 'Daily limit on losses', helper: 'dollar',
    },
    max_7day_turnover: {
        type: 'number', label_name: '7-day turnover limit', helper: 'dollar',
    },
    max_7day_losses: {
        type: 'number', label_name: '7-day limit on losses', helper: 'dollar',
    },
    max_30day_turnover: {
        type: 'number', label_name: '30-day turnover limit', helper: 'dollar',
    },
    max_30day_losses: {
        type: 'number', label_name: '30-day limit on losses', helper: 'dollar',
    },
    max_open_bets: {
        type: 'number', label_name: 'Maximum number of open positions', helper: 'dollar',
    },
    session_duration_limit: {
        type: 'number', label_name: 'Session duration limit, in minutes', helper: 'dollar',
    },
    time_out_until: {
        type: 'text', label_name: 'Time out until', helper: 'dollar',
    },
    exclude_until: {
        type: 'text', label_name: 'Exclude me from the website until', helper: 'dollar',
    },
    token_name: {
        type: 'text', label_name: 'Choose Token Name',
    }
}
