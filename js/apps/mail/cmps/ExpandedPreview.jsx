import { mailService } from '../services/mail.service.js';
const { Link } = ReactRouterDOM;

export function ExpandedPreview({
  mail,
  deleteMail,
  toggleMailPreview,
  toggleRead,
  toggleStarred,
}) {
  return (
    <section
      className='expanded-preview'
      onClick={(ev) => {
        toggleMailPreview();
        toggleRead(mail, true);
      }}>
      <button
        className={`star ${!mail.isStarred ? 'star' : 'not-star'}`}
        onClick={(ev) => toggleStarred(mail)}>
        star
      </button>

      <div className='buttons'>
        <Link to={`mail/${mail.id}`}>
          <button>Pop up</button>
        </Link>

        <button
          className='read-btn'
          onClick={(ev) => {
            toggleMailPreview();
            toggleRead(mail, !mail.isRead);
          }}>
          read / unread
        </button>

        <button
          className='delete-btn'
          onClick={(ev) => {
            deleteMail(mail);
          }}>
          delete
        </button>
      </div>
      <h1>{mail.subject}</h1>
      <h2>{mail.from}</h2>
      <p className='mail-body'>{mailService.getMailBody(mail.text)}</p>
    </section>
  );
}
