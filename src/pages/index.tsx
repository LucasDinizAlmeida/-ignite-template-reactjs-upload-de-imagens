import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { InfiniteData, useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface GetImagesProps {
  pageParam?: string
}

interface ImageProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface PageProps {
  data: ImageProps[]
}

interface DataProps {
  pages: PageProps[]
}

interface GetImagesResponse {
  after: string;
  data: ImageProps[];
}

export default function Home(): JSX.Element {


  async function getImages({ pageParam }: GetImagesProps) {
    const response = await api.get('/api/images', {
      params: {
        after: pageParam ?? null
      }
    })
    return response.data
  }



  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    getImages
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage => lastPage?.after || null,
    }

  );

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });

    return formatted;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>

        <CardList cards={formattedData} />

        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}

        {
          hasNextPage &&
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        }
      </Box>

    </>
  );
}
/* eslint-disable */