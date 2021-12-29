const { Route, Switch } = ReactRouterDOM;

import { MailList } from '../cmps/MailList.jsx';

export function MailMain() {
  return (
    <section className='mail-main'>
      <Switch>
        {/* <MailFilter /> */}
        {/* <MailNav /> */}
        <Route component={MailList} path='/mail' />
      </Switch>
    </section>
  );
}
