// const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { AppHeader } from '../../cmps/AppHeader.jsx';
import { BookApp } from './pages/BookApp.jsx';
import { BookDetails } from './pages/BookDetails.jsx';

export function BookMain() {
  return (
    <section className='book-app'>
      <AppHeader />
      <Switch>
        <Route component={BookDetails} path='/book/:bookId' />
        <Route component={BookApp} path='/book' />
      </Switch>
    </section>
  );
}
