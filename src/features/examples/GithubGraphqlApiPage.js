import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { List, Spin } from 'antd';
import { StarFilled, EyeFilled } from '@ant-design/icons';

const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    url
    descriptionHTML
    primaryLanguage {
      name
    }
    owner {
      login
      url
    }
    stargazers {
      totalCount
    }
    viewerHasStarred
    watchers {
      totalCount
    }
    viewerSubscription
  }
`;

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      repositories(first: 20, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

export default function GithubGraphqlApiPage({searchKeyWord}) {
  const { loading, error, data } = useQuery(GET_REPOSITORIES_OF_ORGANIZATION,{
    variables: {
      "organizationName": searchKeyWord
    }
  });

  const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
  );
  
  if (loading) return <Spin/>;
  if (error) return <p>{error.toString()}</p>;
  return (
    <div>
      <List
        itemLayout="vertical"
        dataSource={data.organization.repositories.edges}
        renderItem={item => (
          <List.Item
            actions={[
              <IconText icon={StarFilled} text={item.node.stargazers.totalCount} key="list-vertical-star" />,
              <IconText icon={EyeFilled} text={item.node.watchers.totalCount} key="list-vertical-eye" />,
            ]}
          >
            <List.Item.Meta
              title={<a href={item.node.url}>{item.node.name}</a>}
              // description={item.node.descriptionHTML}
            />
            <div
              dangerouslySetInnerHTML={{ __html: item.node.descriptionHTML }}
            />
          </List.Item>
        )}
      />
    </div>
  )
}