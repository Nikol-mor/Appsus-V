import { mailService } from '../services/mail.service.js';
import { LongTxt } from './LongTxt.jsx';

export class InitialPreview extends React.Component {
  state = {
    isHover: false,
    txtLength: 40,
  };

  render() {
    const { isHover, txtLength } = this.state;
    const { mail, deleteMail, toggleMailPreview, toggleRead, toggleStarred } =
      this.props;

    return (
      <section
        className={`mail-init-preview ${mail.isRead ? 'read' : ''}`}
        onClick={(ev) => {
          toggleMailPreview();
          toggleRead(mail, true);
        }}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}>
        <div
          className={`star ${!mail.isStarred ? 'star' : 'not-star'}`}
          onClick={(ev) => toggleStarred(mail)}></div>

        <h1 className='from'>{mail.from}</h1>

        <div className='mail-info'>
          <h1>{mail.subject}</h1>
          <p>
            <LongTxt txt={mail.text} txtLength={txtLength} />
          </p>
        </div>

        {!isHover && (
          <h1 className='date'>{mailService.getDate(1640869935914)}</h1>
        )}
        {isHover && (
          <div className='buttons'>
            <button
              className='read-btn'
              onClick={(ev) => toggleRead(mail, !mail.isRead)}>
              read/unred
            </button>
            <button className='delete-btn' onClick={(ev) => deleteMail(mail)}>
              delete
            </button>
          </div>
        )}
      </section>
      // <section
      //   className='mail-init-preview'
      //   onClick={(ev) => {
      //     toggleMailPreview();
      //   }}
      //   onMouseEnter={() => this.setState({ isHover: true })}
      //   onMouseLeave={() => this.steState({ isHover: false })}
      // >
      //   <h4 className='mail-from'>From: {mail.from}</h4>
      //   <div className='mail-info'>
      //     <h4>Subject: {mail.subject} </h4>
      //     <p>
      //       <LongTxt txt={mail.text} txtLength={txtLength} />
      //     </p>
      //   </div>
      //   {isHover && (
      //     <div className='buttons'>
      //       <button className='read-btn'>read</button>
      //       <button className='delete-btn' onClick={() => deleteMail(mail.id)}>
      //         delete
      //       </button>
      //     </div>
      //   )}
      //   {
      //     <div className='buttons'>
      //       <button className='read-btn'>read</button>
      //       <button
      //         className='delete-btn'
      //         onClick={() => mailService.deleteMail(mail.id)}>
      //         delete
      //       </button>
      //     </div>
      //   }
      //   {!isHover && <h3 className='mail-date'>date</h3>}
      // </section>
    );
  }
}
