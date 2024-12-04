import {createSlice} from "@reduxjs/toolkit"

 const userSlice = createSlice({
     name: "User",
     initialState:{
        User : null,
        Conversation : null,
        currentChatReciever : null
     },

     reducers:{
        setauthUser:(state, action)=> {
           state.User = action.payload
        },
        setConversation:(state, action)=> {
            state.Conversation = action.payload
        }, 
        setcurrentChatReciever :(state, action)=> {
         state.currentChatReciever = action.payload
     }

     }
 })

 export const {setauthUser, setConversation, setcurrentChatReciever} = userSlice.actions
 export default userSlice.reducer