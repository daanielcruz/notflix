import React, { useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault';
import {
  getAllCategoriesWithVideosAsync,
  deleteVideoAsync,
  editVideoAsync,
} from '../../api';
import { Loading, MainContainerFlix, Title } from '../../styles/global';
import { FormContainer } from './styles';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { EndBox, BackLink } from '../NewVideo/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

interface iVideos {
  id: number;
  categoryId: number;
  title: string;
  url: string;
  isEditMode?: boolean;
  categoryName?: string;
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    height: 400,
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const CustomTableCell = ({
  row,
  name,
  onChange,
}: {
  row: iVideos;
  name: 'title' | 'url' | 'categoryName';
  onChange: (e: React.ChangeEvent<HTMLInputElement>, row: iVideos) => void;
}) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell className={classes.tableCell} align="left">
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          className={classes.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e, row)
          }
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const AdminArea = () => {
  const [data, setData] = useState<iCategories[]>();
  const [rows, setRows] = useState<iVideos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [tempContentToDelete, setTempContentToDelete] = useState<
    number | ObjectToDelete
  >(0);
  const [tempContentToEdit, setTempContentToEdit] = useState<iVideos>({
    id: 0,
    categoryId: 0,
    title: '',
    url: '',
    isEditMode: false,
    categoryName: '',
  });
  const [successSnackShow, setSuccessSnackShow] = useState(false);
  const [
    successAndCategorySnackShow,
    setSuccessAndCategorySnackShow,
  ] = useState(false);
  const [deletedCategorySnackShow, setDeletedCategorySnackShow] = useState(
    false,
  );

  const classes = useStyles();

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const successSnackClose = () => {
    setSuccessSnackShow(false);
  };

  const successAndCategorySnackClose = () => {
    setSuccessAndCategorySnackShow(false);
    setDeletedCategorySnackShow(true);
  };

  const deletedCategorySnackClose = () => {
    setDeletedCategorySnackShow(false);
  };

  useEffect(() => {
    setIsLoading(true);
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

  const arrayOfVideos: iVideos[] = [];

  useEffect(() => {
    if (data !== undefined) {
      data.map((category) => {
        category.videos.map((video) => {
          arrayOfVideos.push({
            ...video,
            isEditMode: false,
            categoryName: category.title,
          });
        });
      });
      setRows(arrayOfVideos);
      setIsLoading(false);
    }
  }, [data]);

  const onToggleEditMode = (id: number) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, row: iVideos) => {
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const deleteTheVideo = async () => {
    await deleteVideoAsync(tempContentToDelete);
    setOpenDeleteDialog(false);
    setIsEdited(isEdited + 1);

    if (typeof tempContentToDelete === 'number') {
      setSuccessSnackShow(true);
    } else {
      setSuccessAndCategorySnackShow(true);
    }
  };

  const editTheVideo = async () => {
    await editVideoAsync(tempContentToEdit);
    setOpenEditDialog(false);
    setIsEdited(isEdited + 1);
    setSuccessSnackShow(true);
  };

  const handleClickOpenDeleteDialog = (id: number | ObjectToDelete) => {
    setOpenDeleteDialog(true);
    setTempContentToDelete(id);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleClickOpenEditDialog = (Video: iVideos) => {
    setOpenEditDialog(true);
    setTempContentToEdit(Video);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <PageDefault>
      <MainContainerFlix>
        <FormContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Title> Admin Area </Title>

              <Paper className={classes.root}>
                <Table className={classes.table} aria-label="caption table">
                  {data.length === 0 ? (
                    <h1>There is no videos =(((((</h1>
                  ) : (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left" />
                          <TableCell align="left">Video Title</TableCell>
                          <TableCell align="left">Category</TableCell>
                          <TableCell align="left">Url&nbsp;</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {!isLoading &&
                          rows.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell className={classes.selectTableCell}>
                                {row.isEditMode ? (
                                  <>
                                    <IconButton
                                      aria-label="done"
                                      onClick={() =>
                                        handleClickOpenEditDialog({
                                          id: row.id,
                                          categoryId: row.categoryId,
                                          title: row.title,
                                          url: row.url,
                                        })
                                      }
                                    >
                                      <DoneIcon />
                                    </IconButton>
                                    <IconButton
                                      aria-label="revert"
                                      onClick={() => setIsEdited(isEdited + 1)}
                                    >
                                      <RevertIcon />
                                    </IconButton>
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() => {
                                        const isLastItem = data.find(
                                          (category) => {
                                            return (
                                              category.id == row.categoryId
                                            );
                                          },
                                        );

                                        if (isLastItem !== undefined)
                                          if (isLastItem.videos.length > 1) {
                                            handleClickOpenDeleteDialog(row.id);
                                          } else {
                                            handleClickOpenDeleteDialog({
                                              videoId: row.id,
                                              categoryId: row.categoryId,
                                            });
                                          }
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </>
                                ) : (
                                  <IconButton
                                    aria-label="edit"
                                    onClick={() => onToggleEditMode(row.id)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                )}
                              </TableCell>

                              <CustomTableCell
                                {...{ row, name: 'title', onChange }}
                              />
                              <CustomTableCell
                                {...{ row, name: 'categoryName', onChange }}
                              />
                              <CustomTableCell
                                {...{ row, name: 'url', onChange }}
                              />
                            </TableRow>
                          ))}
                      </TableBody>
                    </>
                  )}
                </Table>
              </Paper>
              <EndBox>
                <span>
                  If you want you can go
                  <BackLink to="/register/video"> new video area</BackLink> or
                  <BackLink to="/"> go home</BackLink>.
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
            open={successAndCategorySnackShow}
            autoHideDuration={1000}
            onClose={successAndCategorySnackClose}
          >
            <Alert severity="success">Success!</Alert>
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

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? This decision is
            irreversible!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            No
          </Button>
          <Button onClick={deleteTheVideo} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to edit this item? This decision is
            irreversible!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            No
          </Button>
          <Button onClick={editTheVideo} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </PageDefault>
  );
};

export default AdminArea;
