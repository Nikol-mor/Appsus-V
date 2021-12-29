import { mailService } from '../services/mail.service.js';
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
    });
  };

  render() {
    return <h1>Mail</h1>;
  }
}
