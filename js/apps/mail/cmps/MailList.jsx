import { mailService } from '../services/mail.service.js';
import { MailPreview } from './MailPreview.jsx';

export class MailList extends React.Component {
  state = {
    filterBy: null,
    mails: [],
  };

  componentDidMount() {
    this.loadMails();
  }

  loadMails = () => {
    mailService.query().then((mails) => {
      this.setState({ mails });
      console.log(mails);
    });
  };

  deleteMail = (ev, mail) => {
    ev.stopPropagation();
    mailService.deleteMail(mail).then(() => {
      this.loadMails();
    });
  };

  render() {
    const { mails } = this.state;
    return (
      <section className='mail-list'>
        {mails.map((mail) => (
          // console.log('render list', mail);
          // <h4>{mail.subject}</h4>
          <MailPreview key={mail.id} mail={mail} deleteMail={this.deleteMail} />
        ))}
      </section>
    );
  }
}
