import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const otherUsers = createAsyncThunk(
  "fetchOtherUsers", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Token not found");
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/allusers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      return result; 
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const getMessage = createAsyncThunk(
    "getMessage", async (id, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue("No token found");
      }
      console.log("Fetching messages for user ID:", id); 
      try {
        const response = await fetch(`http://localhost:8000/api/message/get/${id}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

       
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const result = await response.json();
        console.log("response", result)
        return result;  
      } catch (error) {
        console.error(error);
        return rejectWithValue(error.message || "An error occurred");
      }
    }
);


export const handleSendMessage = createAsyncThunk(
  "sendMessage", 
  async ({ id, message }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch(`http://localhost:8000/api/message/send/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      return result; 
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const userSlice = createSlice({
  name: "User",
  initialState: {
    User: null,
    currentChatReciever: null,
    otherUsers: [],
    Conversation:[],
    sendMessage: [],
    loading: false,
    error: null,
  },
  reducers: {
    setauthUser: (state, action) => {
      state.User = action.payload;
    },
    setMessageReciever:(state, action)=>{
      state.currentChatReciever = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(otherUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otherUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.otherUsers = action.payload.users || [];  // Check the API response structure
      })
      .addCase(otherUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.Conversation = action.payload ;  // Assuming messages are in 'messages' key
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handleSendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.Conversation.push(action.payload.message);
      })
      .addCase(handleSendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setauthUser , setMessageReciever} = userSlice.actions;

export default userSlice.reducer;
