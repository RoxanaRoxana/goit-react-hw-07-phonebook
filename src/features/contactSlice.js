import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    try {
      const response = await axios.get(
        'https://624831f5229b222a3fd53797.mockapi.io/contacts'
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  contactList: [],
  status: null,
  filter: '',
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    saveContact: (state, action) => {
      if (state.contactList.some(item => item.name === action.payload.name)) {
        alert(`${action.payload.name} is already on list!`);
      } else {
        state.contactList.push(action.payload);
      }
    },
    deleteContact: (state, action) => {
      const newList = state.contactList.filter(
        item => item.id !== action.payload.id
      );
      state.contactList = newList;
    },

    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getContacts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getContacts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.contactList = action.payload;
    },
    [getContacts.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { saveContact, deleteContact, filterContacts } =
  contactSlice.actions;
export const selectContacts = state => state.contacts.contactList;
export const selectFilter = state => state.contacts.filter;

export default contactSlice.reducer;
