import * as React from "react";
import { Routes, Route } from "react-router-dom"
import AuthLayout from "../pages/AuthLayout/AuthLayout";
import PaletteGallery from "../pages/PaletteGallery/PaletteGallery";
import DrawingBoard from "../components/DrawingBoard/DrawingBoard";

const RouterConfig = () => {

    return (
        <>
            <Routes >
                <Route path="/" element={<AuthLayout />} />
                <Route path="/gallery" element={<PaletteGallery />} />
                <Route path="/drawingBoard" element={<DrawingBoard />} />
            </Routes>
        </>
    )
}

export default RouterConfig