import { AppHeader } from './js/cmps/AppHeader.jsx';
import { Home } from './js/pages/Home.jsx';
import { About } from './js/pages/About.jsx';

// import { BookApp } from './js/apps/book/pages/BookApp.jsx';
import { BookMain } from './js/apps/book/BookMain.jsx';

import { MailMain } from './js/apps/mail/pages/MailMain.jsx';
import { KeepMain } from './js/apps/keep/KeepMain.jsx';

// import { BookDetails } from './js/apps/book/pages/BookDetails.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <main>
          <Switch>
            {/* <Route component={BookDetails} path='/book/:bookId' /> */}

            {/* <Route component={BookApp} path='/book' /> */}
            <Route component={BookMain} path='/book' />

            <Route component={About} path='/about' />
            <Route component={KeepMain} path='/keep' />
            <Route component={MailMain} path='/mail' />

            <Route component={Home} path='/' />
          </Switch>
        </main>
      </section>
    </Router>
  );
}
