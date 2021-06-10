import Header from "./Components/Header";
import { HashRouter as Router, Route  } from 'react-router-dom'
import ArticlesScreen from './Screens/ArticlesScreen'
import ArticleScreen from "./Screens/ArticleScreen";
import SearchArticlesScreen from "./Screens/SearchArticlesScreen";
import TagSearchArticlesScreen from "./Screens/TagSearchArticlesScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import CreateArticle from "./Screens/CreateArticle";
import HelpScreen from "./Screens/HelpScreen";

function App() {
  return (
    <Router>
      <Header />
      <main style={{marginTop: 65, background: '#f4f5f9', minHeight: '100vh'}}>
        <Route path="/" component={ArticlesScreen} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/articles/:url" component={ArticleScreen} />
        <Route path="/article/create" component={CreateArticle} />
        <Route path="/search/articles/:name" component={SearchArticlesScreen} />
        <Route path="/search/tags/articles/:name" component={TagSearchArticlesScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/support" component={HelpScreen} />
      </main>
    </Router>
  );
}

export default App;
