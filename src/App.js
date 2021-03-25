import React, { useState, useEffect } from 'react';
//import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';



import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles';
 
//const alanKey ='64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage',
const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
     key: '64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage',
     //key:alanKey; 
     onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
             alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);
  return(
    <div >
    <div className ={classes.logoContainer}>
                <img src='https://s3-us-west-1.amazonaws.com/welcome.ai/attachments/attachments/000/017/901/thumb/alan-logo-vertical-color.png?1571682334' className={classes.alanlogo} alt="alan logo"/>
               
      </div>
      <NewsCards articles ={newsArticles} activeArticle = {activeArticle}/>
    </div>
  )
}

export default App;
