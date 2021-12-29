import { InitialPreview } from './InitialPreview.jsx';

export class MailPreview extends React.Component {
  state = {
    isClicked: false,
  };

  toggleMailPreview = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  render() {
    const { mail, deleteMail } = this.props;
    const { isClicked, toggleMailPreview } = this.state;

    return (
      <section className='mail-preview'>
        {/* <h4>{mail.subject}</h4> */}
        {!isClicked && (
          <InitialPreview
            mail={mail}
            deleteMail={deleteMail}
            toggleMailPreview={toggleMailPreview}
          />
        )}
        {/* {isClicked && (
          <ExpandedPreview
            mail={mail}
            deleteMail={deleteMail}
            toggleMailPreview={toggleMailPreview}
          />
        )} */}
      </section>
    );
  }
}
