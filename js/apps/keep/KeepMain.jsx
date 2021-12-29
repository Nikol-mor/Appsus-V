const { Route, Switch } = ReactRouterDOM;

import { KeepApp } from './pages/KeepApp.jsx';

export function BookMain() {
  return (
    <section className='keep-app'>
      <Switch>
        {/* <Route component={BookDetails} path='/book/:bookId' /> */}
        <Route component={KeepApp} path='/keep' />
      </Switch>
    </section>
  );
}
