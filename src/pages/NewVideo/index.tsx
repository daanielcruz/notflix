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
import { EndBox, BackLink } from './styles';
import FormField from '../../components/FormField';
import { useHistory } from 'react-router-dom';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const history = useHistory();

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

                if (categoryObject === undefined) {
                  alert('Invalid category!');
                } else {
                  registerNewVideoAsync(values).then(() => {
                    alert('Success!');
                    history.push('/');
                  });
                }
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
            </Form>
            <EndBox>
              <span>
                Register{' '}
                <BackLink to="/register/category"> new category</BackLink> or
                <BackLink to="/"> go back</BackLink>.
              </span>
            </EndBox>
          </FormContainer>
        )}
      </MainContainerFlix>
    </PageDefault>
  );
};

export default NewVideo;
