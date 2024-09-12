    import React, { useState } from 'react';
    import { 
      Container, 
      Typography, 
      TextField, 
      Button, 
      List, 
      ListItem, 
      ListItemText, 
      IconButton, 
      Box,
      Paper,
      Grid,
      Modal
    } from '@mui/material';
    import { Add, Delete, Edit } from '@mui/icons-material';
    import { createTheme, ThemeProvider } from '@mui/material/styles';
    import Swal from 'sweetalert2';

    const theme = createTheme({
      palette: {
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
      },
    });

    function App() {
      const [cars, setCars] = useState([]);
      const [newCar, setNewCar] = useState({ make: '', model: '', year: '' });
      const [editingCar, setEditingCar] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);

      const addCar = () => {
        if (newCar.make && newCar.model && newCar.year) {
          setCars([...cars, { ...newCar, id: Date.now() }]);
          setNewCar({ make: '', model: '', year: '' });
      
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New car added successfully',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
        }
      };

      const openEditModal = (car) => {
        setEditingCar(car);
        setIsModalOpen(true);
      };

      const closeEditModal = () => {
        setEditingCar(null);
        setIsModalOpen(false);
      };

      const updateCar = () => {
        setCars(cars.map(car => car.id === editingCar.id ? editingCar : car));
        closeEditModal();
        Swal.fire({
          title: 'Success!',
          text: 'Car updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      };

      const deleteCar = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            setCars(cars.filter(car => car.id !== id));
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Car deleted successfully',
              showConfirmButton: false,
              timer: 1500,
              toast: true,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
          }
        });
      };

      return (
        <ThemeProvider theme={theme}>
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h3" gutterBottom align="center">
              Luxury Car Management
            </Typography>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Make"
                    variant="outlined"
                    value={newCar.make}
                    onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Model"
                    variant="outlined"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Year"
                    variant="outlined"
                    type="number"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={addCar}
                  >
                    Add Car
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <List>
              {cars.map(car => (
                <ListItem
                  key={car.id}
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" aria-label="edit" onClick={() => openEditModal(car)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteCar(car.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={`${car.make} ${car.model}`}
                    secondary={`Year: ${car.year}`}
                  />
                </ListItem>
              ))}
            </List>

            <Modal
              open={isModalOpen}
              onClose={closeEditModal}
              aria-labelledby="edit-car-modal"
              aria-describedby="modal-to-edit-car-details"
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Edit Car
                </Typography>
                <TextField
                  fullWidth
                  label="Make"
                  value={editingCar?.make || ''}
                  onChange={(e) => setEditingCar({...editingCar, make: e.target.value})}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Model"
                  value={editingCar?.model || ''}
                  onChange={(e) => setEditingCar({...editingCar, model: e.target.value})}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Year"
                  type="number"
                  value={editingCar?.year || ''}
                  onChange={(e) => setEditingCar({...editingCar, year: e.target.value})}
                  margin="normal"
                />
                <Button variant="contained" onClick={updateCar} sx={{ mt: 2 }}>
                  Update Car
                </Button>
              </Box>
            </Modal>
          </Container>
        </ThemeProvider>
      );
    }

    export default App;