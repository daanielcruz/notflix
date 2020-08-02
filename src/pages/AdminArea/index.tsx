import React, { useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault';
import {
  getAllCategoriesWithVideosAsync,
  deleteVideoAsync,
  editVideoAsync,
} from '../../api';
import { Loading, MainContainerFlix } from '../../styles/global';
import { FormContainer, EndBox, BackLink } from './styles';
// @ts-ignore
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const AdminArea = () => {
  interface iVideos {
    id: number;
    categoryId: number;
    title: string;
    url: string;
    isEditMode?: boolean;
    categoryName?: string;
    oldCategoryId?: number;
  }

  interface iCategories {
    id: number;
    title: string;
    videos: iVideos[];
  }

  interface ObjectToDelete {
    videoId: number;
    categoryId: number;
  }

  const [data, setData] = useState<iCategories[]>();
  const [rows, setRows] = useState<iVideos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(0);
  const [successSnackShow, setSuccessSnackShow] = useState(false);
  const [createdCategorySnackShow, setCreatedCategorySnackShow] = useState(
    false,
  );
  const [deletedCategorySnackShow, setDeletedCategorySnackShow] = useState(
    false,
  );

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  useEffect(() => {
    /* setIsLoading(true); */
    const catchData = async () => {
      try {
        const data = await getAllCategoriesWithVideosAsync();
        setData(data);
      } catch (e) {
        console.log(e);
        alert('Error at API =/');
      }
    };
    catchData();
  }, [isEdited]);

  useEffect(() => {
    if (data !== undefined) {
      const arrayOfVideos: iVideos[] = [];
      data.map((category) => {
        category.videos.map((video) => {
          arrayOfVideos.push({
            ...video,
            isEditMode: false,
            categoryName: category.title,
          });
          return null;
        });
        return null;
      });
      setRows(arrayOfVideos);
      setIsLoading(false);
    }
  }, [data]);

  const createdCategorySnackClose = () => {
    setCreatedCategorySnackShow(false);
    setIsEdited(isEdited + 1);
  };
  const deletedCategorySnackClose = () => {
    setDeletedCategorySnackShow(false);
    setIsEdited(isEdited + 1);
  };

  const successSnackClose = () => {
    setSuccessSnackShow(false);
  };

  const deleteTheVideo = async (videoId: number, categoryId: number) => {
    const isLastItem = await deleteVideoAsync(videoId, categoryId);

    if (!isLastItem) {
      setSuccessSnackShow(true);
    } else {
      setSuccessSnackShow(true);
      setTimeout(() => setDeletedCategorySnackShow(true), 1000);
    }
  };

  const editTheVideo = async (newData: iVideos) => {
    const { categoryExists, isLast } = await editVideoAsync(newData);

    console.log(categoryExists + ' ' + isLast);
    if (categoryExists && isLast) {
      setSuccessSnackShow(true);
      setTimeout(() => setDeletedCategorySnackShow(true), 1000);
    } else if (categoryExists && !isLast) {
      setSuccessSnackShow(true);
    } else if (!categoryExists && !isLast) {
      setSuccessSnackShow(true);
      setTimeout(() => setCreatedCategorySnackShow(true), 1000);
    } else if (!categoryExists && isLast) {
      setSuccessSnackShow(true);
      setTimeout(() => setDeletedCategorySnackShow(true), 1000);
      setTimeout(() => setCreatedCategorySnackShow(true), 3000);
    }
  };

  return (
    <PageDefault>
      <MainContainerFlix>
        <FormContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <MaterialTable
                style={{ background: 'lightgray' }}
                title="Admin area"
                columns={[
                  { title: 'Title', field: 'title' },
                  { title: 'Video URL', field: 'url' },
                  { title: 'Category', field: 'categoryName' },
                ]}
                data={rows}
                options={{
                  headerStyle: {
                    backgroundColor: 'gray',
                    color: '#FFF',
                  },
                  rowStyle: {
                    backgroundColor: '#EEE',
                  },
                }}
                editable={{
                  //@ts-ignore
                  onRowUpdate: (newData: iVideos, oldData: iVideos) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          const dataUpdate = [...rows];
                          const index = rows.findIndex(
                            (x) => x.id === oldData.id,
                          );

                          if (
                            dataUpdate[index].title === newData.title &&
                            dataUpdate[index].url === newData.url &&
                            dataUpdate[index].categoryName ===
                              newData.categoryName
                          ) {
                            //do nothing
                          } else {
                            editTheVideo(newData);
                            dataUpdate[index] = newData;

                            setRows([...dataUpdate]);
                          }
                        }
                        resolve();
                      }, 1000);
                    }),
                  onRowDelete: (oldData: iVideos) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          deleteTheVideo(oldData.id, oldData.categoryId);
                          const dataUpdate = [...rows];
                          const index = rows.findIndex(
                            (x) => x.id === oldData.id,
                          );
                          dataUpdate.splice(index, 1);

                          setRows([...dataUpdate]);
                        }
                        resolve();
                      }, 1000);
                    }),
                }}
              />

              <EndBox>
                <span>
                  You can go to
                  <BackLink to="/register/video"> new video area</BackLink> or
                  <BackLink to="/"> go home</BackLink>, if you want.
                </span>
              </EndBox>
            </>
          )}

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={successSnackShow}
            autoHideDuration={1000}
            onClose={successSnackClose}
          >
            <Alert severity="success">Success!</Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={createdCategorySnackShow}
            autoHideDuration={2000}
            onClose={createdCategorySnackClose}
          >
            <Alert severity="info">
              Category doensn't exists, creating for you...
            </Alert>
          </Snackbar>
          <Snackbar
            open={deletedCategorySnackShow}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={2000}
            onClose={deletedCategorySnackClose}
          >
            <Alert severity="info">
              Last item, deleting the category too...
            </Alert>
          </Snackbar>
        </FormContainer>
      </MainContainerFlix>
    </PageDefault>
  );
};

export default AdminArea;
