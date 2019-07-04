import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PreviewLocation from '../components/PreviewLocation';

type Props = {
  location: RouteComponentProps['location']
  title: string
}

const Page: React.FC<Props> = ({ title, location }) => (
  <>
    <h1>{title}</h1>
    <PreviewLocation location={location} />
  </>
);

export default Page;
