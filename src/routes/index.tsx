import { Routes, Route } from 'react-router-dom'
import { Dashboard } from '../pages/dashboard'
import { AddTodoForm } from '../pages/addTodoForm'
import { Header } from '../components/header'

export const AppRouter = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/add" element={<AddTodoForm />}></Route>
    </Routes>
    </>
  )
}