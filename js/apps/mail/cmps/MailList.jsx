import { mailService } from '../services/mail.service.js';
import { MailPreview } from './MailPreview.jsx';
import { eventBusService } from '../../../../services/event-bus.service.js';

export class MailList extends React.Component {
  state = {
    // filterBy: null,
    mails: [],
    // isComposeModalShown : false
  };

  removeEventBus;

  componentDidMount() {
    this.loadMails();
    this.removeEventBus = eventBusService.on('set-folder', () => {
      this.loadMails();
    });
  }

  loadMails = () => {
    mailService.query().then((mails) => {
      this.setState({ mails });
      console.log(mails);
    });
  };

  componentWillUnmount() {
    this.removeEventBus();
  }

  deleteMail = (mail) => {
    mailService.deleteMail(mail).then(() => {
      this.loadMails();
    });
  };

  starredMail = (mail) => {
    mailService.toggleStarred(mail.id).then(() => this.loadMails());
  };

  toggleRead = (mail, isRead) => {
    mailService.toggleRead(mail.id, isRead);
    this.loadMails();
  };

  render() {
    const { mails } = this.state;
    return (
      <section className='mail=list'>
        {!mails.length && <div>You don't have mails</div>}
        {mails.map((mail) => (
          <MailPreview
            key={mail.id}
            mail={mail}
            deleteMail={this.deleteMail}
            toggleRead={this.toggleRead}
            toggleStarred={this.toggleStarred}
            loadMails={this.loadMails}
          />
        ))}
      </section>
      // <section className='mail-list'>
      //   {mails.map((mail) => (
      //     console.log('render list', mail)
      //     <h4>{mail.subject}</h4>
      //     <MailPreview key={mail.id} mail={mail} deleteMail={this.deleteMail} />
      //   ))}
      // </section>
    );
  }
}
