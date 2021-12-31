import { mailService } from '../services/mail.service.js';
import { MailNav } from '../cmps/MailNav.jsx';

export class ComposeMail extends React.Component {
  state = {
    mail: {
      subject: '',
      to: '',
      cc: '',
      text: '',
    },
  };

  // timeOutId;
  // draftInterval;

  componentDidMount() {
    console.log('params', this.props);
    // this.timeOutId = setTimeout(() => this.setState({ isOpen: true }), 0);
    // this.setInput();
    // this.draftInterval = setInterval(this.saveDraft(), 5000);
  }

  // setInput = () => {
  //   const { emailId, action } = this.props.params;
  //   if (action === 'new') {
  //     this.setState({
  //       mail: {
  //         subject: '',
  //         to: '',
  //         cc: '',
  //         text: '',
  //       },
  //     });
  //   } else {
  //     mailService.getMailById(emailId).then((mail) => {
  //       let { subject, from, cc, text } = mail;
  //       if (mail.isDraft) {
  //         this.setState((prevState) => ({
  //           mail: { ...prevState.mail, subject: subject, to: from, text, cc },
  //         }));
  //         return;
  //       }
  //       if (action === 'reply') subject = 'Re : ' + subject;
  //       else {
  //         subject = 'Forwarded : ' + subject;
  //         from = '';
  //       }
  //       this.setState((prevState) => ({
  //         mail: { ...prevState.mail, subject: subject, to: from, text, cc },
  //       }));
  //     });
  //   }
  // };

  // componentWillUnmount() {
  //   clearTimeout(this.timeOutId);
  //   clearInterval(tihs.draftInterval);
  // }

  sendMail = (ev) => {
    ev.preventDefault();
    mailService.sendMail(this.state.mail).then(() => {
      this.setState({ mail: { subject: '', to: '', cc: '', text: '' } });
    });
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      mail: { ...prevState.mail, [field]: value },
    }));
  };

  onBack = (ev) => {
    ev.preventDefault();
    this.props.history.goBack();
    mailService.setDraft();
  };

  saveDraft = () => {
    mailService.saveDraft(this.state.mail);
  };

  render() {
    const { subject, to, cc, text } = this.state.mail;
    console.log('render in compose mail');
    return (
      <section className='compose-mail'>
        <MailNav />
        <div
          className={`composing ${this.state.isOpen ? 'open' : ''}`}
          onClick={this.onBack}></div>
        <section className='compose-container'>
          <div className='compose-header'>New:</div>
          <form onSubmit={this.sendMail}>
            <label htmlFor='by-subject'>Subject:</label>
            <input
              type='text'
              placeholder='subject'
              name='subject'
              id='by-subject'
              onChange={this.handleChange}
            />
            <label htmlFor='by-to'>To:</label>
            <input
              type='text'
              id='by-to'
              name='to'
              onChange={this.handleChange}
            />
            <label htmlFor='by-cc'>cc:</label>
            <input
              type='text'
              id='by-cc'
              name='cc'
              onChange={this.handleChange}
            />
            <textarea
              name='txt'
              id='by-txt'
              cols='30'
              rows='10'
              value={text}
              onChange={this.handleChange}></textarea>
            <button>Send mail</button>
          </form>
        </section>
        <button onClick={this.onBack}>Back</button>
      </section>
    );
  }
}
