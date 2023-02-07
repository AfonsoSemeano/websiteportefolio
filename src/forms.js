import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

function LoginBox(props) {
  const [serverFeedback, setServerFeedback] = useState('');
  const [checkBoxClicked, setCheckBoxClicked] = useState(false);
  let { lang } = useParams();

  function translate(text) {
    return props.fullTranslation[text][lang];
  }

  return (
  <div>
    <Formik
    initialValues={{ username: '', password: '' }}
    validate={values => {
      const errors = {};
      if (!values.username) {
        errors.username = translate('required');
      } else if (!/^[A-Za-z0-9_+-]*$/i.test(values.username)) {
        errors.username = translate('invalidusernamecharacters');
      }

      if (!values.password) {
        errors.password = translate('required');
      } else if (!/^[A-Z0-9 _+-]*$/i.test(values.password)) {
        errors.password = translate('invalidpasswordcharacters');
      }

      return errors;
    }}

    onSubmit={(values, { setSubmitting }) => {
      let req = new XMLHttpRequest();
      req.responseType = "text";
      req.onload = function() {
        if (req.status !== 200) { //If server found an error in the user input
          console.log(this.response);
          if (req.status === 406) {
            setServerFeedback(translate("wrongpassword"));
          } else if (req.status === 404) {
            setServerFeedback(translate("usernamenotfound"));
          }
        } else {
          if (checkBoxClicked) {
            Cookies.set('userid', this.response, { expires: 14 });
          } else {
            const in24Hours = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            Cookies.set('userid', this.response, {expires: in24Hours});
          }
          props.closeBoxes();
          props.authenticateCookie();
        }
      }
      req.open('POST', '/credentials/login');
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      req.send(JSON.stringify({
        username: values.username,
        password: values.password
      }));
    }}>
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <Form className={'login-register-box-styling d-flex flex-column align-items-center px-3 pb-2 border-start border-bottom border-end border-primary border-4 me-3 bg-terciary ' + (props.show ? '': 'd-none')}  onSubmit={handleSubmit}>
        <h4 className='fw-bold'>LOGIN</h4>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name='username'
            placeholder="Your username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            isInvalid={touched.username && errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name='password'
            placeholder='Your password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            isInvalid={touched.password && errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label={translate('keepsession')} onChange={() => setCheckBoxClicked(true)} />
        </Form.Group>
        <Form.Text className='mb-1 text-danger'>
          {serverFeedback}
        </Form.Text>
        <Button variant="primary" type="submit" className='text-white fw-semibold'>
          {translate('submit')}
        </Button>
      </Form>
    )}
  </Formik>
  </div>);
}

function RegisterBox(props) {
  const [serverFeedback, setServerFeedback] = useState('');
  const [checkBoxClicked, setCheckBoxClicked] = useState(false);
  let { lang } = useParams();

  function translate(text) {
    return props.fullTranslation[text][lang];
  }

  return (
  <div>
    <Formik
    initialValues={{ username: '', password: '' }}
    validate={values => {
      const errors = {};
      const MIN_USERNAME_LENGTH = 3;
      if (!values.username) {
        errors.username = translate("required");
      } else if (!/^[A-Za-z0-9_+-]*$/i.test(values.username)) {
        errors.username = translate("invalidusernamecharacters");
      } else if (values.username.length < MIN_USERNAME_LENGTH) {
        errors.username = translate("invalidusernamelength") + MIN_USERNAME_LENGTH + translate("characterslong");
      }
      const MIN_PASSWORD_LENGTH = 5;
      if (!values.password) {
        errors.password = translate("required");
      } else if (!/^[A-Z0-9 _+-]*$/i.test(values.password)) {
        errors.password = translate("invalidpasswordcharacters");
      } else if (values.password.length < MIN_PASSWORD_LENGTH) {
        errors.password = translate("invalidpasswordlength") + MIN_PASSWORD_LENGTH + translate("characterslong");
      }

      return errors;
    }}

    onSubmit={(values, { setSubmitting }) => {
      let req = new XMLHttpRequest();
      req.responseType = "text";
      req.onload = function() {
        if (req.status !== 200) { //If server found an error in the user input
          console.log(this.response);
          if (req.status === 409) {
            setServerFeedback(translate("usernamealreadyexists"));
          }
        } else {
          if (checkBoxClicked) {
            Cookies.set('userid', this.response, { expires: 14 });
          } else {
            const in24Hours = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            Cookies.set('userid', this.response, {expires: in24Hours});
          }
          props.closeBoxes();
          props.authenticateCookie();
        }
      }
      req.open('POST', '/credentials/register');
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      req.send(JSON.stringify({
        username: values.username,
        password: values.password
      }));
    }}>
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <Form className={'login-register-box-styling d-flex flex-column align-items-center px-3 pb-2 border-start border-bottom border-end border-primary border-4 me-3 bg-terciary ' + (props.show ? '': 'd-none')}  onSubmit={handleSubmit}>
        <h4 className='fw-bold'>REGISTO</h4>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name='username'
            placeholder="e.g TheRandomPerson123"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            isInvalid={touched.username && errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            isInvalid={touched.password && errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label={translate('keepsession')} onChange={() => setCheckBoxClicked(true)}/>
        </Form.Group>
        <Form.Text className='mb-1 text-danger'>
          {serverFeedback}
        </Form.Text>
        <Button variant="primary" type="submit" className='text-white fw-semibold'>
          {translate('submit')}
        </Button>
      </Form>
    )}
  </Formik>
  </div>);
}

export { LoginBox, RegisterBox };