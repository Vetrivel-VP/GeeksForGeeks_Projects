import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Accordion,
  AutoSuggestion,
  Carousel,
  CustomBreadCrumb,
  CustomFormValidations,
  CustomSearchBar,
  DragAndDrop,
  Home,
  InfiniteScroll,
  Pagination,
  ToastNotification,
} from "./pages";
import { Auth } from "./components";
import ProtectedRoute from "./components/ProtectedRoute";
import Practice from "./pages/Practice";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="draganddrop" element={<DragAndDrop />} />
          <Route path="accordion" element={<Accordion />} />
          <Route path="toast" element={<ToastNotification />} />
          <Route path="carousel" element={<Carousel />} />
          <Route path="infiniteScroll" element={<InfiniteScroll />} />
          <Route path="auto-suggestion" element={<AutoSuggestion />} />
          <Route path="breadCrumb" element={<CustomBreadCrumb />} />
          <Route path="formValidations" element={<CustomFormValidations />} />
          <Route path="searchBar" element={<CustomSearchBar />} />
          <Route path="ui" element={<Practice />} />
          <Route path="pagination" element={<Pagination />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
