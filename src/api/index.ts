interface iNewVideo {
  id?: number;
  title: string;
  url: string;
  categoryId: number | string;
  categoryName?: string;
  oldCategoryId?: number;
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

export const deleteVideoAsync = async (videoId: number, categoryId: number) => {
  let crudeResponse = await fetch(`${URL}/categories/${categoryId}/videos`);
  let allVideos = await crudeResponse.json();

  if (allVideos.length > 1) {
    await fetch(`${URL}/videos/${videoId}`, {
      method: 'DELETE',
    });
    return false;
  } else {
    await fetch(`${URL}/videos/${videoId}`, {
      method: 'DELETE',
    });
    await fetch(`${URL}/categories/${categoryId}`, {
      method: 'DELETE',
    });

    return true;
  }
};

export const editVideoAsync = async (body: iNewVideo) => {
  let crudeResponse = await fetch(`${URL}/categories`);
  let categories = await crudeResponse.json();

  let categoryObject = categories.find((category: iCategory) => {
    return category.title === body.categoryName;
  });

  const newData = {
    id: body.id,
    categoryId: body.categoryId,
    title: body.title,
    url: body.url,
  };

  let categoryExists;

  if (categoryObject !== undefined) {
    newData.categoryId = categoryObject.id;
    await fetch(`${URL}/videos/${body.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    categoryExists = true;
  } else {
    await fetch(`${URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title: body.categoryName }),
    });

    crudeResponse = await fetch(`${URL}/categories`);
    categories = await crudeResponse.json();
    categoryObject = categories.find((category: iCategory) => {
      return category.title === body.categoryName;
    });
    newData.categoryId = categoryObject.id;

    await fetch(`${URL}/videos/${body.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    categoryExists = false;
  }

  const anotherCrudeResponse = await fetch(
    `${URL}/categories/${body.categoryId}/videos`,
  );
  const allVideos = await anotherCrudeResponse.json();

  let isLast = false;
  if (allVideos.length <= 0) {
    isLast = true;
    await fetch(`${URL}/categories/${body.categoryId}`, {
      method: 'DELETE',
    });
  }

  return { categoryExists, isLast };
};
