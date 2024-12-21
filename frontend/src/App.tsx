import './App.css';
import ToolBar from './components/UI/ToolBar/ToolBar.tsx';
import NewsContainer from './features/news/containers/NewsContainer.tsx';
import { Route, Routes } from 'react-router-dom';
import AddNewNews from './features/news/containers/AddNewNews.tsx';
import NewsInformation from './features/news/containers/NewsInformation.tsx';

const App = () => {

  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<NewsContainer/>}/>
          <Route path="/news" element={<NewsContainer/>}/>
          <Route path="/news/add" element={<AddNewNews/>}/>
          <Route path="/news/:id" element={<NewsInformation/>}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>
    </>
  )
};

export default App;
