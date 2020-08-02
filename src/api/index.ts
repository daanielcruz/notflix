interface iNewVideo {
  id?: number;
  title: string;
  url: string;
  categoryId: number | string;
}

interface iCategory {
  id?: number;
  title: string;
}

interface ObjectToDelete {
  videoId: number;
  categoryId: number;
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
  let crudeResponse = await fetch(`${URL}/categories`);
  let categories = await crudeResponse.json();

  let categoryObject = categories.find((category: iCategory) => {
    return category.title === body.categoryId;
  });

  if (categoryObject !== undefined) {
    body.categoryId = categoryObject.id;
  } else {
    await fetch(`${URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title: body.categoryId }),
    });

    crudeResponse = await fetch(`${URL}/categories`);
    categories = await crudeResponse.json();
    categoryObject = categories.find((category: iCategory) => {
      return category.title === body.categoryId;
    });
    body.categoryId = categoryObject.id;
  }

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

export const deleteVideoAsync = async (id: number | ObjectToDelete) => {
  if (typeof id === 'number') {
    await fetch(`${URL}/videos/${id}`, {
      method: 'DELETE',
    });
  } else {
    await fetch(`${URL}/categories/${id.categoryId}`, {
      method: 'DELETE',
    });

    await fetch(`${URL}/videos/${id.videoId}`, {
      method: 'DELETE',
    });
  }
  return;
};

export const editVideoAsync = async (body: iNewVideo) => {
  await fetch(`${URL}/videos/${body.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
