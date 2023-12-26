import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tool: "Draw",
    backgroundColour: "#fff",
    penColour: "#000",
    brushSize: 40,
    trigger: 0
};


const toolBarSlice = createSlice({
    name: 'toolBar',
    initialState,
    reducers: {
        updateTool(state, action) {
            console.log(action.payload)
            state.tool = action.payload.tool;
            if (action.payload.tool === "Redo" || action.payload.tool === "Undo")
                state.trigger = state.trigger + 1;
        },

        updateBackgroundColour(state, action) {
            console.log(action.payload)
            state.backgroundColour = action.payload.backgroundColour;
        },

        updatePenColour(state, action) {
            console.log(action.payload)
            state.penColour = action.payload.penColour;
        },

        updateBrushSize(state, action) {
            console.log(action.payload)
            state.brushSize = action.payload.brushSize;
        },

        updateBrushSize(state, action) {
            console.log(action.payload)
            state.brushSize = action.payload.brushSize;
        },
    },

});

export const { updateTool, updateBackgroundColour, updatePenColour, updateBrushSize } = toolBarSlice.actions;
export default toolBarSlice.reducer;
