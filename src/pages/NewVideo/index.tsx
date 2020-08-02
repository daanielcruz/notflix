import React, { useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault';
import { registerNewVideoAsync, getAllCategoriesAsync } from '../../api';
import {
  MainContainerFlix,
  FormContainer,
  Title,
  Form,
  Button,
  Loading,
} from '../../styles/global';
import { EndBox, BackLink, Hr } from './styles';
import FormField from '../../components/FormField';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const NewVideo = () => {
  interface iNewVideo {
    title: string;
    url: string;
    categoryId: string;
  }

  interface iCategory {
    id: number;
    title: string;
  }

  const initialValues = {
    title: '',
    url: '',
    categoryId: '',
  };

  const [values, setValues] = useState<iNewVideo>(initialValues);
  const [categories, setCategories] = useState<iCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorSnackShow, setErrorSnackShow] = useState(false);
  const [successSnackShow, setSuccessSnackShow] = useState(false);
  const [redirectSnackShow, setRedirectSnackShow] = useState(false);

  const history = useHistory();

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const errorSnackClose = () => {
    setErrorSnackShow(false);
  };

  const redirectBack = () => {
    history.push('/');
  };

  const successSnackClose = () => {
    setSuccessSnackShow(false);
    setRedirectSnackShow(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    const catchData = async () => {
      try {
        const data = await getAllCategoriesAsync();
        setCategories(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        alert('Error at API =/');
      }
    };
    catchData();
  }, []);

  return (
    <PageDefault>
      <MainContainerFlix>
        {isLoading ? (
          <Loading />
        ) : (
          <FormContainer>
            <Title> Register your new video: </Title>
            <Form
              onSubmit={(event) => {
                event.preventDefault();

                const categoryObject = categories.find(
                  (category: iCategory) => {
                    return category.title === values.categoryId;
                  },
                );

                registerNewVideoAsync(values).then(() => {
                  setValues(initialValues);
                  setSuccessSnackShow(true);
                });
              }}
            >
              <FormField
                label="Video title"
                type="text"
                name="title"
                value={values.title}
                onChange={(e) => handleInputChange(e)}
              />
              <FormField
                label="Url"
                type="url"
                name="url"
                value={values.url}
                onChange={(e) => handleInputChange(e)}
              />

              <FormField
                label="Category"
                type="list"
                name="categoryId"
                value={values.categoryId}
                onChange={(e) => handleInputChange(e)}
                suggestions={categories}
              />

              <Button type="submit">Submit</Button>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={errorSnackShow}
                autoHideDuration={2000}
                onClose={errorSnackClose}
              >
                <Alert severity="error">Category doesn't exists!</Alert>
              </Snackbar>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={successSnackShow}
                autoHideDuration={1000}
                onClose={successSnackClose}
              >
                <Alert severity="success">Success!</Alert>
              </Snackbar>
              <Snackbar
                open={redirectSnackShow}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={redirectBack}
              >
                <Alert severity="info">Redirecting you back to home...</Alert>
              </Snackbar>
            </Form>
            <EndBox>
              <span>
                GO
                <BackLink to="/"> BACK</BackLink>.
              </span>
              <Hr />
              <div
                style={{
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                <BackLink to="/admin">ADMIN AREA</BackLink>
              </div>
            </EndBox>
          </FormContainer>
        )}
      </MainContainerFlix>
    </PageDefault>
  );
};

export default NewVideo;
