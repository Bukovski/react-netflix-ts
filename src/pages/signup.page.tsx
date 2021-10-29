import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase.context';
import { Form } from '../components';
import { HeaderContainer, FooterContainer } from '../containers/';
import { RouteConstants } from '../types/routes.type';


const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const isInvalid = firstName === '' || password === '' || emailAddress === '';

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    interface IResult {
      user : {
        updateProfile : (arg0 : {
          displayName : string;
          photoURL : number;
        }) => Promise<any>;
      };
    }

    return firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result: IResult) =>
        result.user
          .updateProfile({
            displayName: firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
          })
          .then(() => {
            history.push(RouteConstants.BROWSE);
          })
      )
      // @ts-ignore
      .catch((error) => {
        setFirstName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          { error && <Form.Error>{ error }</Form.Error> }

          <Form.Base onSubmit={ handleSignup } method="POST">
            <Form.Input
              placeholder="First name"
              value={ firstName }
              onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setFirstName(target.value) }
            />
            <Form.Input
              placeholder="Email address"
              value={ emailAddress }
              onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(target.value) }
            />
            <Form.Input
              type="password"
              value={ password }
              autoComplete="off"
              placeholder="Password"
              onChange={ ({ target }: React.ChangeEvent<HTMLInputElement>) => setPassword(target.value) }
            />
            <Form.Submit
              type="submit"
              data-testid="sign-up"
              disabled={ isInvalid }
            >
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
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



export default SignUp;
