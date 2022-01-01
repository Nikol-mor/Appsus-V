import { AppHeader } from "../cmps/AppHeader";
export class About extends React.Component {
  gInterval;

  componentDidMount() {
    this.gInterval = setInterval(() => {
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.gInterval);
  }

  render() {
    return (
      <div>
        <AppHeader />
        <section className="about">
          <h1>We're all about books...</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
            quidem deserunt ut, placeat adipisci totam quo dignissimos vel
            deleniti, earum facilis saepe modi tempora distinctio corporis nulla
            alias in perspiciatis molestiae quae impedit soluta odit error.
            Molestiae, dolor.
          </p>
        </section>
      </div>
    );
  }
}
