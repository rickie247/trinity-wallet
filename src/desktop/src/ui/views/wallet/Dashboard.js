/* global Electron */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSeed } from 'libs/crypto';
import { capitalize } from 'libs/helpers';

import { getAccountInfo, byteTritCheck, byteTritSweep } from 'actions/accounts';

import { getSelectedAccountName } from 'selectors/accounts';

import Modal from 'ui/components/modal/Modal';
import Icon from 'ui/components/Icon';
import List from 'ui/components/List';
import Chart from 'ui/components/Chart';
import Balance from 'ui/components/Balance';
import Button from 'ui/components/Button';

import Receive from 'ui/views/wallet/Receive';
import Send from 'ui/views/wallet/Send';

import css from './dashboard.scss';

/**
 * Wallet dashboard component
 */
class Dashboard extends React.PureComponent {
    static propTypes = {
        /** @ignore */
        getAccountInfo: PropTypes.func.isRequired,
        /** @ignore */
        accountName: PropTypes.string.isRequired,
        /** @ignore */
        accountNames: PropTypes.array.isRequired,
        /** @ignore */
        password: PropTypes.object,
        /** @ignore */
        isDeepLinkActive: PropTypes.bool,
        /** @ignore */
        location: PropTypes.object,
        /** @ignore */
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
        /** @ignore */
        byteTritStatus: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
        /** @ignore */
        byteTritCheck: PropTypes.func.isRequired,
        /** @ignore */
        byteTritSweep: PropTypes.func.isRequired,
        /** @ignore */
        t: PropTypes.func.isRequired,
    };

    state = {
        isSweeping: false,
    };

    componentWillMount() {
        if (this.props.isDeepLinkActive) {
            this.props.history.push('/wallet/send');
        }
        if (!this.props.byteTritStatus) {
            this.byteTritAction();
        }
    }

    byteTritAction = (e) => {
        if (e) {
            e.preventDefault();
        }
        const { byteTritStatus, accountNames, password } = this.props;

        if (byteTritStatus) {
            this.setState({
                isSweeping: true,
            });
            return this.props.byteTritSweep(byteTritStatus, Electron.genFn, Electron.powFn);
        }

        const accounts = byteTritStatus
            ? byteTritStatus
            : accountNames.map(async (accountName) => {
                  const seed = await getSeed(password, accountName);
                  return {
                      accountName,
                      seed,
                  };
              });

        Promise.all(accounts).then((accounts) => {
            this.props.byteTritCheck(accounts, Electron.genFn);
        });
    };

    updateAccount = async () => {
        const { password, accountName } = this.props;

        const seed = await getSeed(password, accountName, true);

        this.props.getAccountInfo(seed, accountName, null, Electron.genFn, Electron.notify);
    };

    render() {
        const { byteTritStatus, t, history, location } = this.props;
        const { isSweeping } = this.state;

        const route = location.pathname.split('/')[2] || '/';
        const subroute = location.pathname.split('/')[3] || null;

        const balanceOpen = ['send', 'receive'].indexOf(route) > -1;
        const sendOpen = ['send'].indexOf(route) > -1;
        const historyOpen = ['history'].indexOf(route) > -1;

        const os = Electron.getOS();

        return (
            <div className={classNames(css.dashboard, os === 'win32' ? css.windows : null)}>
                <div className={balanceOpen ? css.balanceOpen : null}>
                    <section className={css.balance}>
                        <Balance />
                        <div className={balanceOpen ? css.openMid : null}>
                            <a onClick={() => history.push('/wallet/receive')}>
                                <div>
                                    <Icon icon="receive" size={24} />
                                </div>
                                <p>{capitalize(t('home:receive'))}</p>
                            </a>
                            <div>
                                <Balance />
                            </div>
                            <a onClick={() => history.push('/wallet/send')}>
                                <div>
                                    <Icon icon="send" size={24} />
                                </div>
                                <p>{capitalize(t('home:send'))}</p>
                            </a>
                        </div>
                        <div className={sendOpen ? css.openRight : balanceOpen ? css.openLeft : css.close}>
                            <Switch location={location}>
                                <Route path="/wallet/send" component={Send} />
                                <Route path="/wallet/receive" component={Receive} />
                            </Switch>
                        </div>
                    </section>
                </div>
                <div className={historyOpen || balanceOpen ? css.history : null}>
                    <section>
                        <List
                            updateAccount={() => this.updateAccount()}
                            setItem={(item) =>
                                item !== null ? history.push(`/wallet/history/${item}`) : history.push('/wallet/')
                            }
                            currentItem={subroute}
                        />
                    </section>
                    <section>
                        <Chart />
                    </section>
                </div>
                {typeof byteTritStatus === 'object' ? (
                    <Modal isOpen onClose={() => {}}>
                        <div>
                            <h1>{t('bytetrit:title')}</h1>
                            <p>
                                <strong>{byteTritStatus.map((account) => account.accountName)}</strong>{' '}
                                {t('bytetrit:explanation')}.
                            </p>
                            <Button loading={isSweeping} onClick={this.byteTritAction}>
                                {!isSweeping ? t('continue') : t('pleaseWait')}
                            </Button>
                        </div>
                    </Modal>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    accountName: getSelectedAccountName(state),
    accountNames: state.accounts.accountNames,
    password: state.wallet.password,
    isDeepLinkActive: state.wallet.deepLinkActive,
    byteTritStatus: state.settings.byteTritStatus,
});

const mapDispatchToProps = {
    getAccountInfo,
    byteTritCheck,
    byteTritSweep,
};

export default translate()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
