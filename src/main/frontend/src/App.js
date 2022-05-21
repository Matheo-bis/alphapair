import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminAddPromotionComponent from './components/admin/AdminAddPromotionComponent';
import AdminPromotionComponent from './components/admin/AdminPromotionComponent';
import AdminPromotionGroupsComponent from './components/admin/AdminPromotionGroupsComponent';
import AdminPromotionPairsComponent from './components/admin/AdminPromotionPairsComponent';
import AdminPromotionStudentsComponent from './components/admin/AdminPromotionStudentsComponent';
import AdminPromotionSubjectsComponent from './components/admin/AdminPromotionSubjectsComponent';
import AdminStudentsComponent from './components/admin/AdminStudentsComponent';
import UITestComponent from './components/admin/UITestComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import RoleFilter from './components/RoleFilter';
import SignupComponent from './components/SignupComponent';
import StudentChoicesComponent from './components/student/StudentChoicesComponent';
import StudentGroupsComponent from './components/student/StudentGroupsComponent';
import StudentJoinComponent from './components/student/StudentJoinComponent';
import StudentPairsComponent from './components/student/StudentPairsComponent';
import StudentSubjectsComponent from './components/student/StudentSubjectsComponent';



function App() {
  return (
    <div>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="/login" element={<LoginComponent/>}/>
          <Route path="/signup" element={<SignupComponent/>}/>

          <Route
            path="/home"
            element={
              <RoleFilter
                adminRequired={null}
                component={HomeComponent}
              />

              
              
            }
          />

          {/* Admin routing */}
          <Route
            path='/create'
            element={
              <RoleFilter
                adminRequired={true}
                component={AdminAddPromotionComponent}
              />
            }
          />
          <Route
            path='/class/:id'
            element={
              <RoleFilter
                adminRequired={true}
                component={AdminPromotionComponent}
              />
            }
          />
          <Route
            path='/class/:id/groups'
            element={
              <RoleFilter
                adminRequired={true}
                component={AdminPromotionGroupsComponent}
              />
            }
          />
          <Route
            path='/class/:id/pairs'
            element={
              <RoleFilter
                adminRequired={true}
                component={AdminPromotionPairsComponent}
              />
            }
          />
          <Route
            path='/class/:id/students'
            element={
              <RoleFilter
                adminRequired={true}
                component={AdminPromotionStudentsComponent}
              />
            }
          />
          <Route
            path='/class/:id/subjects'
            element={
              <RoleFilter
                adminRequired={true}
                component={AdminPromotionSubjectsComponent}
              />
            }
          />
          <Route
            path='/students'
            element={
              <RoleFilter
                adminRequired={true}
                component={UITestComponent}
              />
            }
          />

          {/* Student routing */}
          <Route path='/join' element={<StudentJoinComponent/>}/>
          
          <Route
            path='/groups'
            element={
              <RoleFilter
                adminRequired={false}
                component={StudentGroupsComponent}
              />
            }
          />
          <Route
            path='/pairs'
            element={
              <RoleFilter
                adminRequired={false}
                component={StudentPairsComponent}
              />
            }
          />
          <Route
            path='/subjects'
            element={
              <RoleFilter
                adminRequired={false}
                component={StudentSubjectsComponent}
              />
            }
          />
          <Route
            path='/choices'
            element={
              <RoleFilter
                adminRequired={false}
                component={StudentChoicesComponent}
              />
            }
          />
          

          <Route exact path="*" element={<Navigate to="/home" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;