import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';
import TweetCard from './TweetCard';

const Tweets = () => {
  const [searchWord, setSearchWord] = useState('');
  const [tweets, setTweets] = useState([]);
  const [recentTweets, setRecentTweets] = useState([]);

  const handleSearch = async () => {
    try {
        console.log(searchWord)
      const response = await axios.get(`http://127.0.0.1:8000/twitter?word=${searchWord}&number=2`);
      console.log(response.data.tweets.tweets)
      
      setTweets(response.data.tweets.tweets); // Assuming the response contains an array of tweets
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  // useEffect(async()=>{
  //   try {
  //       // console.log(searchWord)
  //     const response2 = await axios.get(`http://127.0.0.1:8000/twitter?word='flood'&number=2`);
  //     console.log(response2.data.tweets.tweets)

  //     setRecentTweets(response2.data.tweets.tweets); // Assuming the response contains an array of tweets
  //   } catch (error) {
  //     console.error('Error fetching tweets:', error);
  //   }
  // }, [])

  return (
    <div>
      <Input
        placeholder="Enter search word"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        style={{ width: '40%', height: '40%', marginRight: '8px' }}
      />
      <Button style={{backgroundColor: '#ff675a', color: 'white'}} onClick={handleSearch}>
        Search
      </Button>

      <div style={{ marginTop: '16px' }}>
        {tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <TweetCard tweet={tweet}/>
            </div>
          ))
        ) : (
          <div>No tweets found</div>
          // recentTweets.map((tweet, index) => (
          //   <div key={index} style={{ marginBottom: '8px' }}>
          //     <TweetCard tweet={tweet}/>
          //   </div>
          // ))
        )}
      </div>
    </div>
  );
};

export default Tweets;
