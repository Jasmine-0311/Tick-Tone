import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name:'message',
    initialState:[
    ],
    reducers:{
        creatMessage(state, action){
            state.push({
                id: action.payload.id,
                type:action.payload.success?'success':'danger',
                title: action.payload.success?'成功':'失敗',
                text: action.payload.message,
            })
        },
        removeMessage(state, action){
            const index = state.findIndex(message => message.id === action.payload);
            if(index !== -1){
                state.splice(index, 1);
            }
        }
    }
})

export const creatAsyncMessage = createAsyncThunk(
    'message/creatAsyncMessage',
    async (payload, { dispatch, requestId }) => {
       dispatch(creatMessage({
        ...payload,
        id:requestId
       }));
       setTimeout(() => {
        dispatch(removeMessage(requestId));
       },2000);
    }
);

export const { creatMessage, removeMessage } = messageSlice.actions;    
export default messageSlice.reducer;