import React, { useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault';
import { getAllCategoriesAsync, registerNewCategoryAsync } from '../../api';
import {
  Loading,
  MainContainerFlix,
  FormContainer,
  Title,
  Form,
  Button,
} from '../../styles/global';
import FormField from '../../components/FormField';
import { TitleCategories, Ul, Categories, EndBox, BackLink } from './styles';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const NewCategory = () => {
  interface iCategory {
    id: number;
    title: string;
  }

  const [newCategory, setNewCategory] = useState<string>('');
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
    history.push('/register/video');
  };

  const successSnackClose = () => {
    setSuccessSnackShow(false);
    setRedirectSnackShow(true);
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
            <Title> Type your new category: </Title>
            <Form
              onSubmit={(event) => {
                event.preventDefault();

                const categoryObject = categories.find(
                  (category: iCategory) => {
                    return category.title === newCategory;
                  },
                );

                if (categoryObject === undefined) {
                  registerNewCategoryAsync({ title: newCategory }).then(() => {
                    setSuccessSnackShow(true);
                  });
                } else {
                  setErrorSnackShow(true);
                }
              }}
            >
              <FormField
                label="Name of category"
                type="text"
                name="name"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
              />

              <Button type="submit">Submit</Button>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={errorSnackShow}
                autoHideDuration={2000}
                onClose={errorSnackClose}
              >
                <Alert severity="error">Category already exists!</Alert>
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
                <Alert severity="info">Redirecting you back...</Alert>
              </Snackbar>
            </Form>
            <Categories>
              <TitleCategories>Last 3 added categories: </TitleCategories>
              <Ul>
                {categories
                  .slice(Math.max(categories.length - 3, 0))
                  .reverse()
                  .map((category, index) => {
                    return <li key={index}>{category.title}</li>;
                  })}
              </Ul>
            </Categories>

            <EndBox>
              <span>
                If you want you can{' '}
                <BackLink to="/register/video"> go back</BackLink> or
                <BackLink to="/"> go home</BackLink>.
              </span>
            </EndBox>
          </FormContainer>
        )}
      </MainContainerFlix>
    </PageDefault>
  );
};

export default NewCategory;
