import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase.context';
import { Form } from '../components';
import { HeaderContainer, FooterContainer } from '../containers';
import { RouteConstants } from '../types/routes.type';


const SignIn = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const isInvalid = password === '' || emailAddress === '';

  const handleSignin = (event: React.FormEvent) => {
    event.preventDefault();

    return firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push(RouteConstants.BROWSE);
      })
      // @ts-ignore
      .catch((error) => {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          { error && <Form.Error data-testid="error">{ error }</Form.Error> }

          <Form.Base onSubmit={ handleSignin } method="POST">
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              value={ password }
              autoComplete="off"
              placeholder="Password"
              onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setPassword(target.value) }
            />
            <Form.Submit disabled={isInvalid} type="submit" data-testid="sign-in">
              Sign In
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}


export default SignIn;
