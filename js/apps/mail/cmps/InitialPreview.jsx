import { mailService } from '../services/mail.service.js';
import { LongTxt } from './LongTxt.jsx';

export class InitialPreview extends React.Component {
  state = {
    isHover: false,
    txtLength: 40,
  };

  render() {
    const { isHover, txtLength } = this.state;
    const { mail, deleteMail, toggleMailPreview } = this.props;

    return (
      <section
        className='mail-init-preview'
        onClick={(ev) => {
          toggleMailPreview();
        }}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.steState({ isHover: false })}>
        <h4 className='mail-from'>From: {mail.from}</h4>
        <div className='mail-info'>
          <h4>Subject: {mail.subject} </h4>
          <p>
            <LongTxt txt={mail.text} txtLength={txtLength} />
          </p>
        </div>
        {isHover && (
          <div className='buttons'>
            <button className='read-btn'>read</button>
            <button className='delete-btn' onClick={() => deleteMail(mail.id)}>
              delete
            </button>
          </div>
        )}
        {!isHover && <h3 className='mail-date'>date</h3>}
      </section>
    );
  }
}
