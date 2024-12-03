import {createSlice} from "@reduxjs/toolkit"

 const userSlice = createSlice({
     name: "User",
     initialState:{
        User : null,
        Conversation : null
     },

     reducers:{
        setauthUser:(state, action)=> {
           state.User = action.payload
        },
        setConversation:(state, action)=> {
            state.Conversation = action.payload
        }

     }
 })

 export const {setauthUser, setConversation} = userSlice.actions
 export default userSlice.reducer