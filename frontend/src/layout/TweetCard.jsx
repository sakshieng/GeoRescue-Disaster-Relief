import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
// import {HeartOutlined, CommentOutlined} from '@ant-design/icons'

const cardStyle = {
  width: 620,
};
const imgStyle = {
  display: 'block',
  width: 50,
  borderRadius: 100,
  align: 'left',
  marginRight: 10
};
const TweetCard = ({tweet}) => (
  <Card
    hoverable
    style={cardStyle}
    bodyStyle={{
      padding: 0,
      overflow: 'hidden',
    }}
  >
    <Flex justify="space-between">
      <Flex
        vertical
        align="center"
        justify="space-between"
        style={{
          // padding: 5,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Flex
            align="center"
            justify="space-between"
        >
            <img
                alt="avatar"
                src={tweet.user.avatar}
                style={imgStyle}
            />
            <Typography.Title level={4} style={{paddingRight: 40, paddingBottom: 15}}>{tweet.user.username}</Typography.Title>
            <Typography.Title level={5} style={{paddingBottom: 10}}>{tweet.date}</Typography.Title>
        </Flex>
        <Typography.Title level={4}>
          {tweet.text.slice(0,200)} <a href={tweet.link} target='_blank' color='black'>...</a>
        </Typography.Title>
        {tweet.pictures.length > 0 && (
          <img src={tweet.pictures[0]} style={{ height: 300, width: 500 }} alt="tweet-image" />
        )}

        <Flex
            align="center"
            justify="space-between"
        >
            <GoHeart  size={25} style={{marginRight: 5}}/> <Typography.Title style={{marginBottom: 25}} level={4}>{tweet.stats.likes}</Typography.Title>
            <FaRegComment  size={25} style={{marginLeft: 20, marginRight: 5}}/> <Typography.Title style={{marginBottom: 25}} level={4}>{tweet.stats.comments}</Typography.Title>
        </Flex>
      </Flex>
    </Flex>
  </Card>
);
export default TweetCard;