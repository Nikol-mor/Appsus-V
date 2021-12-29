// const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { BookApp } from './pages/BookApp.jsx';
import { BookDetails } from './pages/BookDetails.jsx';

export function BookMain() {
  return (
    <section className='book-app'>
      <Switch>
        <Route component={BookDetails} path='/book/:bookId' />
        <Route component={BookApp} path='/book' />
      </Switch>
    </section>
  );
}
