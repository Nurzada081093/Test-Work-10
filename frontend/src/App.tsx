import './App.css';
import ToolBar from './components/UI/ToolBar/ToolBar.tsx';
import NewsContainer from './features/news/containers/NewsContainer.tsx';

const App = () => {

  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main>
        <NewsContainer/>
      </main>
    </>
  )
};

export default App;
