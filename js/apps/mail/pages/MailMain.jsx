const { Route, Switch } = ReactRouterDOM;

import { MailList } from '../cmps/MailList.jsx';
import { MailNav } from '../cmps/MailNav.jsx';
import { ComposeMail } from './ComposeMail.jsx';
import { MailFilter } from '../cmps/MailFilter.jsx';
import { AppHeader } from '../../../cmps/AppHeader.jsx';
// mail details

export class MailMain extends React.Component {
  state = {
    isComposeModalShown: false,
  };

  onToggleComposeModal = () => {
    console.log('state modal', this.state.isComposeModalShown);
    this.setState({ isComposeModalShown: !this.state.isComposeModalShown });
  };

  render() {
    return (
      <div>
        <AppHeader />
        <section className='mail-main'>
          <MailFilter />
          <MailNav onToggleComposeModal={this.onToggleComposeModal} />
          {/* <Route component={MailDetails} path='/mail/:mailId' /> */}
          {/* <Route component={MailList} path='/mail' /> */}
          <MailList />
          {this.state.isComposeModalShown && <ComposeMail />}
          {/* <ComposeMail /> */}
        </section>
      </div>
    );
  }
}
