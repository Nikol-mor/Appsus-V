import { mailService } from '../services/mail.service.js';
import { LongTxt } from './LongTxt.jsx';
import { MailDetails } from '../pages/MailDetails.jsx';

export class InitialPreview extends React.Component {
  state = {
    isHover: false,
    isExpand: false,
    // txtLength: 40,
  };

  // componentDidMount() {
  //   window.addEventListener('resize', this.getTextLength);
  //   this.getTextLength();
  // }

  // getTextLength = () => {
  //   let length = this.getWindowSize();
  //   this.setState({ txtLength: length });
  // };

  // getWindowSize = () => {
  //   const windowSize = window.innerWidth;
  //   if (windowSize > 1600) return 70;
  //   if (windowSize > 1400) return 50;
  //   if (windowSize > 1200) return 40;
  //   if (windowSize > 1000) return 30;
  //   if (windowSize > 900) return 20;
  //   if (windowSize > 800) return 10;
  //   if (windowSize > 620) return 70;
  //   if (windowSize > 520) return 50;
  //   if (windowSize > 420) return 30;
  //   return 15;
  // };

  render() {
    const { isHover, txtLength, isExpand } = this.state;
    const {
      mail,
      deleteMail,
      toggleMailPreview,
      toggleRead,
      toggleStarred,
      expandMail,
      replyMail,
    } = this.props;

    return (
      <section
        className={`mail-init-preview ${mail.isRead ? 'read' : ''}`}
        onClick={(ev) => {
          // toggleMailPreview();
          toggleRead(ev, mail, true);
        }}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}>
        {/* <button
          className={`star ${!mail.isStarred ? 'fas' : 'far'}fa-star`}
          onClick={(ev) => {
            console.log('mail.isStarred', mail.isStarred);
            starredMail(ev, mail);
          }}></button> */}

        <button
          onClick={() => toggleStarred(mail.id, 'isStarred')}
          className='star-btn'>
          <i
            className={`star ${
              !mail.isStarred ? ' far ' : ' fas '
            } fa-star`}></i>
        </button>

        <p className='from'>{mail.from}</p>

        <div className='mail-info'>
          <p>{mail.subject}</p>
          <p>
            <LongTxt txt={mail.text} txtLength={txtLength} />
          </p>
        </div>

        <div className='mail-preview-right'>
          {!isHover && (
            <h1 className='date-in-preview'>
              {mailService.getDate(1640869935914)}
            </h1>
          )}
          {isHover && (
            <div className='buttons'>
              <button
                className='read-btn'
                onClick={(ev) => toggleRead(ev, mail, !mail.isRead)}>
                <i className='far fa-envelope'></i>
              </button>
              <button
                className='delete-btn'
                onClick={(ev) => deleteMail(ev, mail)}>
                <i className='far fa-trash-alt'></i>
              </button>
              <button
                onClick={() => {
                  this.setState({ isExpand: !this.state.isExpand });
                  // expandMail(mail.id);
                }}>
                <i className='fas fa-expand-alt'></i>
              </button>
              <button
                onClick={() => {
                  expandMail(mail.id);
                }}>
                <i className='fas fa-expand'></i>
              </button>
              <button onClick={() => replyMail(mail.id)}>
                <i className='fas fa-reply'></i>
              </button>
            </div>
          )}
        </div>
        {isExpand && <MailDetails mailId={mail.id} />}
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
