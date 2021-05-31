import Header from "./Components/Header";
import { HashRouter as Router, Route  } from 'react-router-dom'
import ArticlesScreen from './Screens/ArticlesScreen'
import ArticleScreen from "./Screens/ArticleScreen";
import SearchArticlesScreen from "./Screens/SearchArticlesScreen";
import TagSearchArticlesScreen from "./Screens/TagSearchArticlesScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/" component={ArticlesScreen} exact />
        <Route path="/articles/:url" component={ArticleScreen} />
        <Route path="/search/articles/:name" component={SearchArticlesScreen} />
        <Route path="/search/articles/tag/:name" component={TagSearchArticlesScreen} />
      </main>
    </Router>
  );
}

export default App;
