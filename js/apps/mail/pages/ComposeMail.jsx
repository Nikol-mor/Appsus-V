import { mailService } from '../services/mail.service.js';
import { MailNav } from '../cmps/MailNav.jsx';

export class ComposeMail extends React.Component {
  state = {
    mail: {
      subject: '',
      to: '',
      text: '',
    },
  };

  // draftInterval;

  // componentDidMount() {
  //   // console.log('params', this.props);
  //   // this.setInput();
  //   this.draftInterval = setInterval(this.saveDraft(), 5000);
  // }

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
  //   // clearTimeout(this.timeOutId);
  //   clearInterval(tihs.draftInterval);
  // }

  sendMail = (ev) => {
    ev.preventDefault();
    mailService.sendMail(this.state.mail).then(() => {
      this.setState({ mail: { subject: '', to: '', cc: '', text: '' } });
      this.props.onToggleComposeModal();
    });
    // mailService.query().then((data) => {
    //   console.log('new array post sending', data);
    // });
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
        <div
          className={`composing ${this.state.isOpen ? 'open' : ''}`}
          onClick={this.onBack}></div>
        <section className='compose-container'>
          {/* <div className='compose-header'>
            New:
            <button onClick={this.onBack} className='back-mail-btn'>
              Back
            </button>
          </div> */}
          <form onSubmit={this.sendMail}>
            <div className='compose-header'>
              New:
              <button onClick={this.onBack} className='back-mail-btn'>
                <i class='fas fa-times'></i>
              </button>
            </div>
            <label htmlFor='by-subject' className='label-subject'></label>
            <input
              type='text'
              placeholder='subject'
              name='subject'
              id='by-subject'
              onChange={this.handleChange}
              placeholder='Subject'
            />
            <label htmlFor='by-to' className='label-to'></label>
            <input
              type='text'
              id='by-to'
              name='to'
              onChange={this.handleChange}
              placeholder='To'
            />
            {/* <label htmlFor='by-cc'>cc:</label>
            <input
              type='text'
              id='by-cc'
              name='cc'
              onChange={this.handleChange}
            /> */}
            <label htmlFor='by-text' className='labelbody'></label>
            <textarea
              name='text'
              id='by-txt'
              cols='30'
              rows='10'
              value={text}
              onChange={this.handleChange}
              placeholder='Body'
            />

            <button className='send-mail-btn'>
              <i class='fas fa-paper-plane'></i>
            </button>
          </form>
        </section>
      </section>
    );
  }
}
