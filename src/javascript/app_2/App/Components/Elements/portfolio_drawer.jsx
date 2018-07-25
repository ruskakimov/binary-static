// import { PropTypes as MobxPropTypes } from 'mobx-react';
import moment                         from 'moment';
import PropTypes                      from 'prop-types';
import React                          from 'react';
import { connect }                    from '../../../Stores/connect';
import { localize }                   from '../../../../_common/localize';

class PortfolioDrawer extends React.Component {
    state = { is_open: true, width: window.innerWidth };
    portfolios = [
        {
            transaction_id: 32355620467,
            contract_id   : 478981052055,
            payout        : 10,
            expiry_time   : 1522886399,
            longcode      : 'Win payout if AUD/JPY is strictly higher than entry spot at close on 2018-04-04.',
            shortcode     : 'CALL_FRXAUDJPY_10_1520263325_1522886399_S0P_0',
            currency      : 'USD',
            buy_price     : 1.06,
            app_id        : 1,
            symbol        : 'AUD/JPY',
        },
        {
            transaction_id: 47272620508,
            contract_id   : 432523746528,
            payout        : 10,
            expiry_time   : 15234686345,
            longcode      : 'Win payout if AUD/JPY is strictly higher than entry spot at close on 2018-05-04.',
            shortcode     : 'CALL_FRXAUDJPY_10_1520263325_1522886399_S0P_0',
            currency      : 'USD',
            buy_price     : -55.25,
            app_id        : 1,
            symbol        : 'Australian Index',
        },
    ];

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleVisibility = () => {
        this.setState({ is_open: !this.state.is_open });
    };

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    // TODO: returning correct indicative price & currency
    getIndicative = (v) => {
        const sign = v > 0 ? '+' : '-';
        return {
            value  : v,
            display: `${sign}$S${Math.abs(v)}`,
        };
    };

    // TODO: calculate remaining time and render
    getRemainingTime = (epoch) => {
        const time_left = parseInt(moment.unix(epoch) - this.props.server_time.unix());
        return time_left;
    };

    render() {

        return (
            <div className='offset-container desktop-only'>
                <div className='portfolio-drawer'>
                    <div className='portfolio-drawer-header'>
                        <span className='ic-portfolio' />
                        <p>{localize('Portfolio Quick Menu')}</p>
                        <a
                            href='javascript:;'
                            className='ic-close'
                            onClick={this.props.toggleDrawer}
                        />
                    </div>
                    <div className='portfolio-list'>
                        {this.portfolios.map((portfolio, idx) => (
                            <div key={idx} className='portfolio'>
                                <span className='ic-portfolio' />
                                <div className='asset'>
                                    <span className='symbol'>{portfolio.symbol}</span>
                                    <span className={`indicative-${this.getIndicative(portfolio.buy_price).value > 0 ? 'positive' : 'negative'}`}>
                                        {this.getIndicative(portfolio.buy_price).display}
                                    </span>
                                    <span className='remaining-time'>{moment(this.getRemainingTime(portfolio.expiry_time)).format('HH:mm:ss')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

PortfolioDrawer.propTypes = {
    alignment   : PropTypes.string,
    server_time : PropTypes.object,
    toggleDrawer: PropTypes.func,
};

export default connect(
    ({ common, ui }) => ({
        server_time : common.server_time,
        toggleDrawer: ui.togglePortfolioDrawer,
    })
)(PortfolioDrawer);
