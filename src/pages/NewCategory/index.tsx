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

const NewCategory = () => {
  interface iCategory {
    id: number;
    title: string;
  }

  const [newCategory, setNewCategory] = useState<string>('');
  const [categories, setCategories] = useState<iCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
                    alert('Success!');
                    history.push('/');
                  });
                } else {
                  alert('Invalid category!');
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
            </Form>
            <Categories>
              <TitleCategories>Last 3 added categories: </TitleCategories>
              <Ul>
                {categories.slice(0, 3).map((category, index) => {
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
