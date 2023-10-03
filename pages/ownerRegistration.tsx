import * as React from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import Link from '../src/Link'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, TextField } from '@mui/material'

interface IBreed {
  label: string
  value: string
  id: number
}

interface IDogData {
  dogName: string
  dogBirthDate: string
  dogBreed: string
  dogGender: string
  dogSize: string
  dogCleanDifficulty: string
}

export default function OwnerRegistration() {
  const [formData, setFormData] = React.useState({
    breed: '',
    gender: '',    
    ownerName: '',
    email: '',
    phone: '',
    numForms: 1,
    dogData: [
      {
        dogName: '',
        dogBirthDate: '',
        dogBreed: '',
        dogGender: '',
        dogSize: '',
        dogCleanDifficulty: '',
      },
    ],
  })

  const [loading, setLoading] = React.useState(false)

  const optionsBreed = [
    { label: 'Labrador', value: 'labrador', id: 1 },
    { label: 'Poodle', value: 'poodle', id: 2 },
    { label: 'Pug', value: 'pug', id: 3 },
    { label: 'Bulldog', value: 'bulldog', id: 4 },
  ]

  const breedOptionsProps = {
    options: optionsBreed,
    getOptionLabel: (option: IBreed) => option.label,
  }

  const handleRegister = async () => {
    setLoading(true)

    const body = {
      ownerName: formData.ownerName,
      email: formData.email,
      phone: formData.phone,
      dogData: formData.dogData,
    }
    try {
      const response = await axios.post('http://localhost:3000/dados', body)

      console.log(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          User Registration
        </Typography>
        <FormControl fullWidth>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              id="fullName"
              placeholder="Full Name"
              variant="outlined"
              onChange={(event) => setFormData(
                (prevState) => {
                  const newState = { ...prevState }
                  newState.ownerName = event.target.value
                  return newState
                }
              )}
              required
            />
            <TextField
              id="ownerEmail"
              placeholder="Email"
              variant="outlined"
              onChange={(event) => setFormData(
                (prevState) => {
                  const newState = { ...prevState }
                  newState.email = event.target.value
                  return newState
                }
              )}
              required
            />
            <TextField
              id="ownerPhone"
              placeholder="Phone"
              variant="outlined"
              onChange={(event) => setFormData(
                (prevState) => {
                  const newState = { ...prevState }
                  newState.phone = event.target.value
                  return newState
                }
              )}
              required
            />
          </FormControl>
          <Button
            variant="contained"
            id="addNewDogFormButton"
            onClick={() =>
              setFormData({ ...formData, numForms: formData.numForms + 1 })
            }
          >
            Add a new dog
          </Button>
          <Button
            variant="contained"
            id="removeDogFormButton"
            onClick={() => {
              if (formData.numForms > 1) {
                setFormData({ ...formData, numForms: formData.numForms - 1 })
              }
            }}
            disabled={formData.numForms === 1}
          >
            Remove a dog
          </Button>

          {Array.from({ length: formData.numForms }).map((_, index) => (
            <div key={index}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField placeholder="Dog Name" variant="outlined" />
                <TextField placeholder="Dog Birth Date" variant="outlined" />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Autocomplete
                  disablePortal
                  id={`breed-${index}`}
                  {...breedOptionsProps}
                  value={formData.dogData[index].dogBreed || ''}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Breed" />
                  )}
                  onChange={(event, value) =>
                    setFormData((prevState) => {
                      const newState = { ...prevState }
                      newState.dogData[index].dogBreed = value?.value || ''
                      return newState
                    })
                  }

                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id={`gender-label-${index}`}>Gender</InputLabel>
                <Select
                  labelId={`gender-label-${index}`}
                  id={`gender-select-${index}`}
                  value={formData.dogData[index].dogGender}
                  label="Gender"
                  onChange={
                    (event: SelectChangeEvent) => setFormData((prevState) => {
                      const newState = { ...prevState }
                      newState.dogData[index].dogGender = event.target.value as string
                      return newState
                    })
                  }
                >
                  <MenuItem value="M">Masculine</MenuItem>
                  <MenuItem value="F">Feminine</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id={`dog-size-label-${index}`}>
                    Dog Size
                  </InputLabel>
                  <Select
                    labelId={`dog-size-label-${index}`}
                    id={`dog-size-select-${index}`}
                    value={formData.dogData[index].dogSize}
                    label="Dog Size"
                    onChange={(event: SelectChangeEvent) =>
                      setFormData((prevState) => {
                        const newState = { ...prevState }
                        newState.dogData[index].dogSize = event.target
                          .value as string
                        return newState
                      })
                    }
                  >
                    <MenuItem value="XSmall">X Small</MenuItem>
                    <MenuItem value="Small">Small</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Large">Large</MenuItem>
                    <MenuItem value="XLarge">X Large</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id={`clean-difficulty-label-${index}`}>
                    Clean Difficulty
                  </InputLabel>
                  <Select
                    labelId={`clean-difficulty-label-${index}`}
                    id={`clean-difficulty-select-${index}`}
                    value={formData.dogData[index].dogCleanDifficulty}
                    label="Clean Difficulty"
                    onChange={(event: SelectChangeEvent) =>
                      setFormData((prevState) => {
                        const newState = { ...prevState }
                        newState.dogData[index].dogCleanDifficulty = event
                          .target.value as string
                        return newState
                      })
                    }
                  >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                  </Select>
                </FormControl>
              </FormControl>
            </div>
          ))}
          <Button
            variant="contained"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Register'}
          </Button>
        </FormControl>
        <Link href="/" color="secondary">
          Go to the home page
        </Link>
      </Box>
    </Container>
  )
}
