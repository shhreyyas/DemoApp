import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchApiData = createAsyncThunk(
  'api/fetchData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  data: [],
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    searchData: (state, action) => {
      const searchText = action.payload.toLowerCase();
      if (!searchText) {
        state.data = state.data;
      } else {
        state.data = state.data.filter(item =>
          item.title.toLowerCase().includes(searchText),
        );
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchApiData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const {searchData} = apiSlice.actions;

export default apiSlice.reducer;
