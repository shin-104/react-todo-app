import React from 'react'

export const Header = () => {
  return (
<header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <span className="ml-3 text-4xl">Todo List</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a className="mr-5 hover:text-gray-900" href="/">ToDo一覧</a>
      <a className="mr-5 hover:text-gray-900" href="/add">ToDo追加</a>
    </nav>
  </div>
</header>
  )
}
