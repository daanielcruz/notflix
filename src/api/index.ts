interface iNewVideo {
  title: string;
  url: string;
  categoryId: number | string;
}

interface iCategory {
  id?: number;
  title: string;
}

const URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://notflix-fakend.herokuapp.com';

export const getAllCategoriesAsync = async () => {
  const crudeResponse = await fetch(`${URL}/categories`);
  const response = await crudeResponse.json();
  return response;
};

export const getAllCategoriesWithVideosAsync = async () => {
  const crudeResponse = await fetch(`${URL}/categories?_embed=videos`);
  const response = await crudeResponse.json();
  return response;
};

export const registerNewVideoAsync = async (body: iNewVideo) => {
  const crudeResponse = await fetch(`${URL}/categories`);
  const categories = await crudeResponse.json();

  const categoryObject = categories.find((category: iCategory) => {
    return category.title === body.categoryId;
  });

  body.categoryId = categoryObject.id;

  await fetch(`${URL}/videos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export const registerNewCategoryAsync = async (body: iCategory) => {
  await fetch(`${URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
