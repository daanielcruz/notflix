import React, { useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault';
import FormField from '../../components/FormField';
import {
  Title,
  Form,
  Button,
  Loading,
  Container,
  TitleCategories,
  Ul,
  Categories,
  GoBack,
} from './styles';

const NewCategory = () => {
  interface iCategories {
    title: string;
    videos: Array<Object>;
  }

  const [newCategory, setNewCategory] = useState<string>('');
  const [categories, setCategories] = useState<iCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const catchData = async () => {
      const crudeResponse = await fetch(
        'https://notflix-fakend.herokuapp.com/categories',
      );
      const response = await crudeResponse.json();
      setCategories([...response]);
      setIsLoading(false);
    };
    catchData();
  }, []);

  return (
    <PageDefault>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Title> Type your new category: </Title>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              setCategories([
                ...categories,
                { title: newCategory, videos: [] },
              ]);
              setNewCategory('');
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

          <GoBack to="/register/video">GO BACK</GoBack>
        </Container>
      )}
    </PageDefault>
  );
};

export default NewCategory;
