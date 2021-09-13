
import { Switch, Route, Redirect } from 'react-router-dom';
import ContactList from './components/contacts/contact-list/ContactList';
import ContactDetails from './components/contacts/contact-details/ContactDetails';
import Login from './components/auth/Login';
import Header from './components/misc/Header';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/guards/PrivateRoute';
import GoogleCallback from './components/auth/GoogleCallback';

function App() {
  return (
    <>
      <Header/>

      <div className="container py-5">
        <Switch>
          <PrivateRoute exact path="/" component={ContactList} />
          <PrivateRoute exact path="/contacts/:id" component={ContactDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/google/cb" component={GoogleCallback} />
          <Redirect to="/"/>
        </Switch>
      </div>
    </>
  );
}

export default App;
