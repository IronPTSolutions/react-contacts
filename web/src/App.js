
import { Switch, Route, Redirect } from 'react-router-dom';
import ContactList from './components/contacts/contact-list/ContactList';
import ContactDetails from './components/contacts/contact-details/ContactDetails';
import Login from './components/auth/Login';
import Header from './components/misc/Header';
import SignUp from './components/auth/SignUp';

function App() {
  return (
    <>
      <Header/>

      <div className="container py-5">
        <Switch>
          <Route exact path="/" component={ContactList} />
          <Route exact path="/contacts/:id" component={ContactDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Redirect to="/"/>
        </Switch>
      </div>
    </>
  );
}

export default App;
